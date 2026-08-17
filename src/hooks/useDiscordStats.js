import { useEffect, useState } from "react";
import { serverConfig } from "@/lib/serverConfig";
import { createPoller } from "@/lib/pollingCache";

// Ambil jumlah member online & total member Discord dari Discord Invite API
// (publik, tidak butuh bot token). Di-refresh di BACKGROUND tiap
// serverConfig.discordStatsRefreshMinutes menit lewat 1 poller yang dipakai
// bersama semua komponen — sama seperti useServerStatus/useTopVoters: tidak
// fetch ulang tiap kali komponen dibuka lagi, dan angka lama tetap tampil
// selagi refresh berjalan di background.
//
// PENTING: hook ini TIDAK PERNAH menampilkan angka member palsu/dummy.
// Selagi belum pernah berhasil sama sekali -> online/members null + error: true.
const REFRESH_MINUTES = Math.max(1, serverConfig.discordStatsRefreshMinutes || 5);

async function fetchDiscordStats() {
  if (!serverConfig.discordStatsApiUrl) throw new Error("Discord stats API URL not configured");
  const res = await fetch(serverConfig.discordStatsApiUrl);
  if (!res.ok) throw new Error("Discord API request failed");
  const data = await res.json();
  if (typeof data.approximate_presence_count !== "number" || typeof data.approximate_member_count !== "number") {
    throw new Error("Discord API response missing counts");
  }
  return {
    online: data.approximate_presence_count,
    members: data.approximate_member_count,
  };
}

const poller = createPoller({
  fetcher: fetchDiscordStats,
  intervalMs: REFRESH_MINUTES * 60 * 1000,
});

export function useDiscordStats() {
  const [state, setState] = useState(poller.getState());

  useEffect(() => poller.subscribe(setState), []);

  return {
    online: state.data?.online ?? null,
    members: state.data?.members ?? null,
    loading: state.loading,
    isLive: state.isLive,
    error: state.error,
  };
}
