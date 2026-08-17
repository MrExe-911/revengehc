// ============================================================
// Shared background poller (module-level cache)
// ============================================================
// Dipakai oleh useServerStatus / useTopVoters / useDiscordStats supaya:
// 1. Data di-fetch SEKALI untuk seluruh halaman/komponen yang butuh (bukan
//    per-komponen), lalu di-refresh otomatis tiap `intervalMs` di background.
// 2. Setiap kali komponen baru "subscribe" (misal user pindah halaman lalu
//    balik lagi ke halaman yang sama), dia langsung dapat data cache yang
//    sudah ada — TIDAK perlu nunggu fetch baru / tidak nge-reset ke kosong.
// 3. Saat proses refresh berjalan di background, data lama tetap ditampilkan
//    dulu; begitu data baru selesai diambil, baru data lama diganti data baru.
//    Jadi tampilan tidak pernah kosong/loading berulang-ulang.
// 4. Kalau fetch refresh gagal TAPI sebelumnya sudah pernah berhasil, data
//    lama tetap dipertahankan (bukan dianggap error) — supaya gangguan
//    jaringan sesaat tidak bikin tampilan tiba-tiba kosong.
export function createPoller({ fetcher, intervalMs }) {
  let state = { data: null, loading: true, error: false, isLive: false, lastUpdated: null };
  const subscribers = new Set();
  let started = false;
  let timer = null;

  function notify() {
    subscribers.forEach((cb) => cb(state));
  }

  async function run() {
    try {
      const result = await fetcher();
      state = { data: result, loading: false, error: false, isLive: true, lastUpdated: Date.now() };
    } catch {
      // Fetch gagal: kalau sudah pernah punya data valid sebelumnya, pertahankan
      // data lama (jangan dianggap error total). Kalau belum pernah berhasil
      // sama sekali, baru tandai error supaya UI kasih pesan yang jujur.
      state = { ...state, loading: false, isLive: false, error: state.data === null };
    }
    notify();
  }

  function start() {
    if (started) return;
    started = true;
    run();
    timer = setInterval(run, intervalMs);
  }

  function subscribe(callback) {
    subscribers.add(callback);
    start();
    callback(state); // langsung kirim data/cache yang ada sekarang, tanpa delay.
    return () => {
      subscribers.delete(callback);
    };
  }

  return { subscribe, getState: () => state };
}
