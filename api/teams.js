// ============================================================
// Serverless proxy — Team Leaderboard (BetterTeams via Pterodactyl panel)
// ============================================================
// Endpoint ini berjalan di SERVER (bukan di browser), jadi API key panel
// Pterodactyl TIDAK PERNAH terkirim ke/terlihat oleh pengunjung website.
// Frontend cuma memanggil "/api/teams" (lihat serverConfig.teamsApiUrl),
// lalu function ini yang membaca file data BetterTeams langsung dari panel
// pakai API key rahasia, lalu mengurutkan tim berdasarkan score.
//
// CARA SETUP (contoh untuk Vercel, paling umum dipakai untuk project Vite):
//   1. Deploy project ini ke Vercel (folder /api otomatis dikenali sebagai serverless functions).
//   2. Di dashboard Vercel: Project -> Settings -> Environment Variables, tambahkan:
//        PTERODACTYL_PANEL_URL  = https://panel.domainmu.id   (TANPA garis miring di akhir)
//        PTERODACTYL_SERVER_ID  = ID pendek server kamu di panel (lihat di URL panel)
//        PTERODACTYL_API_KEY    = API key Client API akun panel kamu (Account -> API Credentials)
//        BETTERTEAMS_PATH       = /plugins/BetterTeams/teamInfo   (opsional, isi kalau path plugin beda)
//   3. Redeploy. Selesai — jangan pernah taruh API key ini di serverConfig.js atau file frontend manapun.
//
// CATATAN PENTING:
// - API key panel ini punya akses SEBATAS server yang diizinkan untuk akun itu.
//   Gunakan API key khusus (bukan akun admin utama) kalau memungkinkan, cukup
//   diberi izin baca file (Read Files) pada server yang bersangkutan saja.
// - Nama & jumlah member tim diambil langsung dari file .yml BetterTeams.
// - Nama "owner" tim di-resolve dari UUID player lewat file usercache.json bawaan
//   Minecraft (dibuat otomatis oleh server, isinya histori semua player yang pernah
//   join — cocok untuk server offline-mode/cracked ATAU pemain Bedrock lewat
//   Geyser/Floodgate, karena tidak bergantung ke API Mojang publik). Kalau UUID
//   ownernya somehow tidak ada di usercache.json, owner akan ditampilkan sebagai
//   "Unknown" di frontend, itu wajar dan bukan bug.
// ============================================================

const CONCURRENCY = 12;
const MAX_FILES = 300; // pengaman supaya tidak timeout kalau jumlah tim sangat banyak

async function fetchJson(url, headers, timeoutMs = 10000) {
  const res = await fetch(url, { headers, signal: AbortSignal.timeout(timeoutMs) });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

async function fetchText(url, headers, timeoutMs = 10000) {
  const res = await fetch(url, { headers, signal: AbortSignal.timeout(timeoutMs) });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.text();
}

// Jalankan `worker(item)` untuk tiap item di `items`, maksimal `limit` sekaligus.
async function mapWithConcurrency(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  async function run() {
    while (cursor < items.length) {
      const i = cursor++;
      try {
        results[i] = await worker(items[i], i);
      } catch {
        results[i] = null;
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return results;
}

async function listTeamFiles(panelUrl, serverId, headers, dir) {
  const files = [];
  let page = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const url = `${panelUrl}/api/client/servers/${serverId}/files/list?directory=${encodeURIComponent(dir)}&page=${page}`;
    const body = await fetchJson(url, headers);
    const pageFiles = (body.data || [])
      .map((f) => f.attributes?.name)
      .filter((name) => name && name.endsWith(".yml"));
    files.push(...pageFiles);

    const totalPages = body.meta?.pagination?.total_pages || 1;
    if (page >= totalPages || files.length >= MAX_FILES) break;
    page += 1;
  }
  return files.slice(0, MAX_FILES);
}

function parsePlayers(rawPlayers) {
  // Format tiap entry: "uuid,ROLE" (contoh: "87c47702-...,OWNER")
  const list = Array.isArray(rawPlayers) ? rawPlayers : [];
  let ownerUuid = null;
  for (const entry of list) {
    const [uuid, role] = String(entry).split(",");
    if (role && role.trim().toUpperCase() === "OWNER" && !ownerUuid) {
      ownerUuid = uuid?.trim() || null;
    }
  }
  return { memberCount: list.length, ownerUuid };
}

// Ambil /usercache.json dari root server (BUKAN dari folder plugin), lalu bikin
// mapping UUID -> nama player terakhir yang diketahui. Cara ini yang dipakai
// karena API Mojang publik tidak bisa resolve UUID player Bedrock/offline-mode,
// sedangkan usercache.json selalu punya data player itu (dibuat oleh Minecraft
// sendiri saat player join, apapun cara mereka connect).
async function loadUsercache(panelUrl, serverId, headers) {
  try {
    const url = `${panelUrl}/api/client/servers/${serverId}/files/contents?file=${encodeURIComponent("/usercache.json")}`;
    const entries = await fetchJson(url, headers);
    const map = new Map();
    for (const entry of Array.isArray(entries) ? entries : []) {
      const uuid = (entry?.uuid || "").trim();
      const name = (entry?.name || "").trim();
      if (uuid && name) map.set(uuid, name);
    }
    return map;
  } catch {
    // Gagal ambil/parse usercache.json -> kembalikan map kosong, owner akan
    // tampil "Unknown" di frontend (bukan fatal error untuk seluruh leaderboard).
    return new Map();
  }
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const panelUrl = (process.env.PTERODACTYL_PANEL_URL || "").replace(/\/+$/, "");
  const serverId = process.env.PTERODACTYL_SERVER_ID;
  const apiKey = process.env.PTERODACTYL_API_KEY;
  const teamInfoDir = process.env.BETTERTEAMS_PATH || "/plugins/BetterTeams/teamInfo";
  const limit = Math.max(1, Math.min(50, Number(req.query?.limit) || 10));

  if (!panelUrl || !serverId || !apiKey) {
    res.status(503).json({ error: "Team API belum dikonfigurasi (PTERODACTYL_PANEL_URL / PTERODACTYL_SERVER_ID / PTERODACTYL_API_KEY kosong)." });
    return;
  }

  const headers = { Authorization: `Bearer ${apiKey}`, Accept: "application/json" };

  try {
    const yaml = await import("js-yaml");
    const [filenames, usercache] = await Promise.all([
      listTeamFiles(panelUrl, serverId, headers, teamInfoDir),
      loadUsercache(panelUrl, serverId, headers),
    ]);

    const rawTeams = await mapWithConcurrency(filenames, CONCURRENCY, async (filename) => {
      const url = `${panelUrl}/api/client/servers/${serverId}/files/contents?file=${encodeURIComponent(`${teamInfoDir}/${filename}`)}`;
      const text = await fetchText(url, headers);
      const data = yaml.load(text) || {};
      const { memberCount, ownerUuid } = parsePlayers(data.players);
      return {
        id: filename.replace(/\.yml$/, ""),
        name: data.name || "(tanpa nama)",
        score: Number(data.score) || 0,
        memberCount,
        // Owner di-resolve langsung dari usercache.json yang sudah dimuat sekali di
        // atas (bukan API luar per-tim) -> cepat, dan berfungsi untuk player
        // Bedrock/offline-mode sekalipun (lihat catatan loadUsercache()).
        owner: (ownerUuid && usercache.get(ownerUuid)) || null,
      };
    });

    const teams = rawTeams.filter(Boolean).sort((a, b) => b.score - a.score).slice(0, limit);

    res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate=1800");
    res.status(200).json({ teams });
  } catch (err) {
    res.status(502).json({ error: "Gagal mengambil data tim dari panel server." });
  }
}
