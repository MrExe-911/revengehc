import { useEffect, useState } from "react";
import { serverConfig } from "@/lib/serverConfig";
import { createPoller } from "@/lib/pollingCache";

// Ambil leaderboard Top Voters ASLI dari Minecraft-MP lewat proxy server sendiri
// (api/top-voters.js, di-cache di CDN ~5 menit) — API key TIDAK PERNAH ada di
// kode frontend ini.
//
// Data di-refresh di BACKGROUND tiap serverConfig.topVotersRefreshMinutes menit
// (default 5 menit) lewat 1 poller yang dipakai bersama semua komponen — jadi
// tiap kali halaman Vote dibuka lagi, data cache yang sudah ada langsung
// tampil (tidak fetch ulang tiap kali dibuka), dan saat refresh berjalan di
// background, leaderboard lama tetap tampil sampai data baru siap.
//
// PENTING: hook ini TIDAK PERNAH menampilkan nama/angka vote palsu.
// - Selagi belum pernah berhasil sama sekali -> voters: [], error: true.
// - Kalau proxy belum ter-deploy / gagal diakses / API key belum di-setup ->
//   tetap tampilkan pesan "data belum tersedia" yang jujur, bukan nama contoh.
const REFRESH_MINUTES = Math.max(1, serverConfig.topVotersRefreshMinutes || 5);

async function fetchTopVoters() {
  if (!serverConfig.topVotersApiUrl) throw new Error("Top voters API URL not configured");
  const res = await fetch(serverConfig.topVotersApiUrl);
  if (!res.ok) throw new Error("Top voters request failed");
  const data = await res.json();
  // Array kosong itu valid (belum ada yang vote bulan ini) -> bukan error.
  return Array.isArray(data.voters) ? data.voters : [];
}

const poller = createPoller({
  fetcher: fetchTopVoters,
  intervalMs: REFRESH_MINUTES * 60 * 1000,
});

export function useTopVoters() {
  const [state, setState] = useState(poller.getState());

  useEffect(() => poller.subscribe(setState), []);

  return {
    voters: state.data ?? [],
    loading: state.loading,
    isLive: state.isLive,
    error: state.error,
  };
}
