// ============================================================
// Serverless proxy — Top Voters (Minecraft-MP API)
// ============================================================
// Endpoint ini berjalan di SERVER (bukan di browser), jadi API key
// Minecraft-MP TIDAK PERNAH terkirim ke/terlihat oleh pengunjung website.
// Frontend cuma memanggil "/api/top-voters" (lihat serverConfig.topVotersApiUrl),
// lalu function ini yang memanggil minecraft-mp.com pakai API key rahasia.
//
// CARA SETUP (contoh untuk Vercel, paling umum dipakai untuk project Vite):
//   1. Deploy project ini ke Vercel (folder /api otomatis dikenali sebagai serverless functions).
//   2. Di dashboard Vercel: Project → Settings → Environment Variables, tambahkan:
//        MINECRAFT_MP_API_KEY = (API key asli dari akun Minecraft-MP kamu)
//   3. Redeploy. Selesai — jangan pernah taruh API key ini di serverConfig.js atau file frontend manapun.
//
// Platform lain (Netlify Functions / Cloudflare Workers) memakai konsep yang sama:
// env var disimpan di dashboard platform, function ini tinggal disesuaikan formatnya
// (lihat DOCS.md bagian "Top Voters real-time & keamanan API key").
// ============================================================

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.MINECRAFT_MP_API_KEY;

  if (!apiKey) {
    // Belum di-setup -> jangan bocorkan detail internal, cukup beri tahu frontend
    // supaya menampilkan status "data belum tersedia" (bukan data contoh/palsu).
    res.status(503).json({ error: "Top Voters API belum dikonfigurasi (MINECRAFT_MP_API_KEY kosong)." });
    return;
  }

  const params = new URLSearchParams({
    object: "servers",
    element: "voters",
    key: apiKey,
    month: "current",
    format: "json",
    limit: "10",
  });

  try {
    const response = await fetch(`https://minecraft-mp.com/api/?${params.toString()}`, {
      signal: AbortSignal.timeout(15000),
    });
    const data = await response.json();

    // Normalisasi ke bentuk sederhana { rank, username, votes } supaya frontend
    // tidak perlu tahu format asli respons Minecraft-MP.
    // Respons asli Minecraft-MP: { name, address, port, month, voters: [{ nickname, votes }] }
    const rawList = Array.isArray(data?.voters) ? data.voters : [];
    const voters = rawList
      .map((v) => ({
        username: v.nickname || v.username || v.name || v.player || "Unknown",
        votes: Number(v.votes ?? v.vote_count ?? v.count ?? 0),
      }))
      .sort((a, b) => b.votes - a.votes)
      .slice(0, 10)
      .map((v, i) => ({ rank: i + 1, ...v }));

    // Cache singkat di edge/CDN (kalau platform mendukung) supaya tidak spam ke Minecraft-MP.
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    res.status(200).json({ voters });
  } catch (err) {
    res.status(502).json({ error: "Gagal mengambil data dari Minecraft-MP." });
  }
}
