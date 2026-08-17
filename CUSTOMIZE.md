# Panduan Customize Revenge Hardcore

Tampilan/desain website ini **tidak diubah**. Panduan ini menunjukkan di file mana
kamu bisa edit teks, warna, data, dan gambar tanpa perlu sentuh kode komponen.

Semua ada di **satu file utama**: `src/lib/serverConfig.js`.
Untuk daftar lengkap nama icon/warna/kategori yang tersedia, baca **DOCS.md**.

> Catatan: Feedback Center sudah dihapus dari website (halaman, menu, dan datanya).
> Untuk fitur Top Voters real-time, ada API key yang HARUS di-setup lewat environment
> variable server — jangan taruh di file manapun di folder `src/`. Lihat `.env.example`
> dan DOCS.md bagian 14.

## 1. Info server & IP (Java + Bedrock)
`serverConfig.javaIp` / `javaPort`, `bedrockIp` / `bedrockPort`, `name`, `tagline`,
`subtext`, `version`, `playersOnline`, `playersMax`, media sosial, dst.

## 2. Background website (bisa beda tiap halaman)
- Default (semua halaman): `serverConfig.backgroundImage`
- Khusus 1 halaman: isi `pageBackgrounds["/store"]` dst. Kosongkan `""` untuk pakai default.
- Bisa link luar (`https://...`) atau file lokal (taruh di `public/assets/backgrounds/`,
  lalu isi path `/assets/backgrounds/nama-file.jpg`).

## 3. Semua teks UI (judul section, tombol, label)
Object `uiText` di `serverConfig.js` — dikelompokkan per halaman (`uiText.hero`,
`uiText.store`, `uiText.vote`, dst). Ganti nilainya untuk mengubah teks yang tampil.
Konten seperti Rules, FAQ, Staff, News, Events sudah dari awal berbentuk data di file
yang sama (array `rules`, `faq`, `staff`, `news`, `events`).

## 4. Menu navbar (dengan dropdown)
`navLinks` — item biasa `{ label, path }`, atau item dengan dropdown
`{ label, path, dropdown: [...] }` supaya halaman lain (Staff/Team/News/dst)
mudah diakses dari satu menu, bukan tersembunyi di footer saja.

## 5. Store: Ranks, In-Game Money, Keys
- `ranks[]` — tiap rank punya `colorKey` (nama warna atau hex bebas, lihat DOCS.md)
  dan `category` (teks bebas, tidak dibatasi common/rare/dst lagi).
- `moneyPackages[]` — paket in-game money, boleh atur qty di halaman produk.
- `keys[]` — crate key, boleh atur qty di halaman produk, masih pakai tier
  common/rare/epic/legendary/mythic untuk badge warna (lihat `rarityConfig`).
- Tab "All" di halaman Store otomatis mengelompokkan ketiganya dengan judul + garis pemisah.

## 6. Pembelian via WhatsApp / Discord
`serverConfig.whatsappNumber` (format `62xxxxxxxxxx`) dan `serverConfig.discordContactUrl`.
Di halaman produk, pembeli wajib mengisi **username/gamertag** dan memilih **platform
(Java/Bedrock)** dulu sebelum tombol order aktif — data ini otomatis ikut terkirim
di pesan WhatsApp/Discord.

## 6b. Moments (galeri foto)
Array `moments` dan `momentTeams` di `serverConfig.js`. Section "All Moments" hanya
menampilkan foto `team: "general"` (supaya tidak penuh foto tim tertentu) — foto tim
lain baru ikut tampil di All Moments kalau ditandai `includeInAll: true`. Tiap tim di
`momentTeams` cukup butuh nama + logo/icon, tampil sebagai judul section sebelum
galeri fotonya. Menunya ada di navbar, di antara Vote dan Community.

## 6c. Team (leaderboard tim in-game, real-time dari BetterTeams)
Halaman **Team** (`/team`) sekarang menampilkan 10 tim (guild) teratas dari plugin
BetterTeams, diambil live lewat panel hosting — BUKAN staff directory lagi. Butuh
proxy `api/teams.js` + env var `PTERODACTYL_PANEL_URL/SERVER_ID/API_KEY` (lihat
DOCS.md bagian 27 untuk setup lengkap & keamanan API key). Icon tim dari
`public/iconteam/{nama tim}.png`, fallback ke kepala Minecraft owner, lalu ikon generik.
Data staff/contributor lama (`staff`, `team`, `teamGroups` di `serverConfig.js`)
masih ada, cuma tidak dipakai halaman manapun untuk saat ini.

## 6d. Logo server
`serverConfig.logoUrl` — isi link/path gambar logo untuk ganti ikon default di navbar & footer.

## 6e. Data member Discord live
`serverConfig.discordStatsApiUrl` (link Discord Invite API) & `discordStatsRefreshMinutes`.
Online Members & Member Count di halaman Community otomatis ambil data asli dari sini.

## 6f. Play Now → buka Minecraft otomatis
Tombol Play Now di Home menampilkan pilihan Java/Bedrock, lalu membuka
`minecraft://?addExternalServer=...` untuk auto-add server ke Minecraft. IP/port ambil
dari `serverConfig.javaIp/javaPort` dan `bedrockIp/bedrockPort` — tidak perlu setting tambahan.

## 6g. Status server, Top Voters & Team real-time
- Status server (online/offline, jumlah player) di Home & halaman Server otomatis live,
  diambil dari API publik (tanpa API key) berdasarkan `javaIp:javaPort`.
- Top Voters (halaman Vote) & Team leaderboard (halaman Team) live dari API pihak
  ketiga, tapi API key-nya HARUS di-setup sebagai environment variable di server
  (bukan di file ini) — lihat DOCS.md bagian 14 & 27 untuk cara amannya. Selama
  belum di-setup, halaman menampilkan pesan jujur "data belum tersedia", BUKAN data contoh.

## 7. Halaman Vote
Vote dilakukan di situs pihak ketiga — atur link tiap situs di `voteSites[].url`.
Reward info diatur di `voteRewards`. Kartu vote site otomatis center kalau cuma ada 1 situs.

## 8. Icon
Tulis nama icon (lihat daftar lengkap di DOCS.md) di field `icon:` mana pun di config.
Mau nambah icon baru di luar daftar? Edit `src/components/Icon.jsx`.

## 9. Warna & font tema (opsional)
File: `src/index.css` → bagian `:root { ... }`
- `--primary`, `--accent`, dst pakai format HSL (`H S% L%`)
- `--font-heading`, `--font-body` bisa diganti nama font lain (tambahkan link Google Font-nya di `index.html`)

---
Kamu tidak perlu masuk ke folder `src/pages/` atau `src/components/` untuk hal-hal di atas.
