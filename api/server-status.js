// ============================================================
// Serverless proxy — Server Status (mcsrvstat.us)
// ============================================================
// Kenapa ini ada padahal mcsrvstat.us bisa dipanggil langsung dari browser?
// Supaya bisa di-cache di CDN/edge (lihat header Cache-Control di bawah).
// Tanpa proxy ini, SETIAP pengunjung website akan memicu request baru ke
// mcsrvstat.us sendiri-sendiri. Dengan proxy + cache, ribuan pengunjung
// dalam jendela waktu 30 detik yang sama cukup memicu SATU request asli ke
// mcsrvstat.us — sisanya dilayani dari cache. Ini juga yang membuat halaman
// terasa lebih cepat karena tidak menunggu round-trip ke server luar tiap kali.
//
// Endpoint ini TIDAK butuh API key (mcsrvstat.us publik), jadi aman dipanggil
// dari server maupun langsung dari browser sebagai fallback (lihat
// src/hooks/useServerStatus.js).
// ============================================================

import { serverConfig } from "../src/lib/serverConfig.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const url = `https://api.mcsrvstat.us/3/${serverConfig.javaIp}:${serverConfig.javaPort}`;

  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error("mcsrvstat.us request failed");
    const data = await response.json();

    // Cache di CDN selama 30 detik (samakan dengan serverConfig.serverStatusRefreshSeconds),
    // dengan stale-while-revalidate supaya request yang datang tepat saat cache
    // kedaluwarsa tetap dapat balasan instan (data sedikit basi) sambil di-refresh di belakang layar.
    res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");
    res.status(200).json(data);
  } catch (err) {
    res.status(502).json({ error: "Gagal mengambil status server dari mcsrvstat.us." });
  }
}
