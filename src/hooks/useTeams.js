import { useEffect, useState } from "react";
import { serverConfig } from "@/lib/serverConfig";
import { createPoller } from "@/lib/pollingCache";

// Ambil leaderboard Team ASLI dari plugin BetterTeams (lewat panel server) via
// proxy sendiri (api/teams.js, di-cache di CDN ~15 menit) — API key panel
// TIDAK PERNAH ada di kode frontend ini.
//
// Data di-refresh di BACKGROUND tiap serverConfig.teamsRefreshMinutes menit
// lewat 1 poller yang dipakai bersama semua komponen, sama seperti
// useTopVoters/useServerStatus — lihat src/lib/pollingCache.js.
//
// PENTING: hook ini TIDAK PERNAH menampilkan tim/score contoh/palsu.
// - Selagi belum pernah berhasil sama sekali -> teams: [], error: true.
// - Kalau proxy belum ter-deploy / gagal diakses / API key belum di-setup ->
//   tetap tampilkan pesan "data belum tersedia" yang jujur, bukan tim contoh.
const REFRESH_MINUTES = Math.max(1, serverConfig.teamsRefreshMinutes || 15);

async function fetchTeams() {
  if (!serverConfig.teamsApiUrl) throw new Error("Teams API URL not configured");
  const url = `${serverConfig.teamsApiUrl}?limit=${serverConfig.teamsTopCount || 10}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Teams request failed");
  const data = await res.json();
  return Array.isArray(data.teams) ? data.teams : [];
}

const poller = createPoller({
  fetcher: fetchTeams,
  intervalMs: REFRESH_MINUTES * 60 * 1000,
});

export function useTeams() {
  const [state, setState] = useState(poller.getState());

  useEffect(() => poller.subscribe(setState), []);

  return {
    teams: state.data ?? [],
    loading: state.loading,
    isLive: state.isLive,
    error: state.error,
  };
}
