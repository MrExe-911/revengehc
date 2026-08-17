import { useEffect, useState } from "react";
import { serverConfig } from "@/lib/serverConfig";
import { createPoller } from "@/lib/pollingCache";

// Ambil status server (online/offline, jumlah player) dari mcsrvstat.us —
// lewat proxy sendiri (api/server-status.js) kalau tersedia (di-cache di
// CDN ~30 detik supaya SEMUA pengunjung berbagi 1 hasil fetch yang sama,
// bukan tiap user trigger request baru sendiri-sendiri), dengan fallback
// otomatis ke mcsrvstat.us langsung kalau proxy belum ter-deploy (mis. saat
// development lokal pakai `npm run dev` biasa).
//
// Di-poll ulang di BACKGROUND tiap serverConfig.serverStatusRefreshSeconds
// detik (default 30 detik) — satu poller dipakai bersama oleh semua
// komponen, jadi navigasi antar halaman tidak memicu fetch baru berulang,
// dan tampilan tidak pernah kosong saat sedang refresh (data lama tetap
// tampil sampai data baru berhasil didapat).
//
// PENTING: hook ini TIDAK PERNAH menampilkan angka player palsu/dummy.
// Selagi belum pernah berhasil sama sekali → players/maxPlayers/online null
// + error: true. Begitu pernah berhasil sekali, data itu jadi "data terakhir
// yang diketahui" dan tetap ditampilkan walau refresh berikutnya gagal.
const REFRESH_SECONDS = Math.max(5, serverConfig.serverStatusRefreshSeconds || 30);

async function fetchServerStatus() {
  const directUrl = `https://api.mcsrvstat.us/3/${serverConfig.javaIp}:${serverConfig.javaPort}`;
  const proxyUrl = serverConfig.serverStatusApiUrl || "/api/server-status";
  const started = performance.now();

  const parse = async (res) => {
    if (!res.ok) throw new Error("Server status request failed");
    const data = await res.json();
    const online = !!data.online;
    return {
      online,
      // Kalau server memang offline, jumlah player yang benar adalah 0 —
      // bukan dianggap "tidak diketahui", karena ini data asli dari API.
      players: online ? (data.players?.online ?? 0) : 0,
      maxPlayers: online ? (data.players?.max ?? null) : null,
      latency: data.debug?.ping ? Math.round(performance.now() - started) : null,
    };
  };

  try {
    // Coba lewat proxy sendiri dulu (bisa di-cache di CDN, hemat request ke mcsrvstat.us).
    const res = await fetch(proxyUrl);
    return await parse(res);
  } catch {
    // Proxy belum ter-deploy / gagal -> fallback langsung ke mcsrvstat.us
    // supaya tetap jalan saat development lokal tanpa serverless function.
    const res = await fetch(directUrl);
    return await parse(res);
  }
}

const poller = createPoller({
  fetcher: fetchServerStatus,
  intervalMs: REFRESH_SECONDS * 1000,
});

export function useServerStatus() {
  const [state, setState] = useState(poller.getState());

  useEffect(() => poller.subscribe(setState), []);

  return {
    online: state.data?.online ?? null,
    players: state.data?.players ?? null,
    maxPlayers: state.data?.maxPlayers ?? null,
    latency: state.data?.latency ?? null,
    loading: state.loading,
    isLive: state.isLive,
    error: state.error,
  };
}
