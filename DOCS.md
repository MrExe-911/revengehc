# DOCS — Referensi Customisasi Revenge Hardcore

Dokumen ini berisi daftar nama-nama yang bisa kamu pakai di `src/lib/serverConfig.js`
(icon, kategori rank, warna, dsb). Untuk panduan "edit apa di file mana", baca **CUSTOMIZE.md**.

---

## 1. Daftar nama Icon

Tulis salah satu nama di bawah ini pada field `icon:` di config (huruf besar/kecil harus persis sama).
Kalau nama icon tidak ditemukan di daftar ini, akan otomatis fallback ke icon kotak (Boxes).

Butuh icon lain yang belum ada di daftar? Tambahkan sendiri di `src/components/Icon.jsx` —
cari nama icon yang kamu mau di https://lucide.dev/icons lalu tambahkan `NamaIcon: Icons.NamaIcon,`
ke object `map` di file itu.

**Umum / navigasi:** LayoutGrid, Home, Menu, X, Search, SlidersHorizontal, ArrowRight, ArrowLeft,
ArrowUpRight, ChevronDown, ChevronUp, Plus, Minus, Check, Settings, LogIn, UserPlus, Users, Users2,
Compass, Globe, MousePointerClick

**Server / teknis:** Server, Wifi, Cpu, Monitor, Database, HardDrive, Bot, Activity, Gamepad2, Clock,
CalendarDays, CalendarHeart

**Rank / gamer:** Map, Shield, ShieldCheck, ShieldPlus, Sparkles, Crown, Flame, Star, Trophy, Medal,
Award, Zap, Sword, Swords, Target, Flag, Rocket, Skull, Ghost, Wand2, Anvil, PawPrint, Trees, TreePine,
Mountain, Anchor, Fish, Bird, Bug, Cat, Dog, Snowflake, Sun, Moon, CloudLightning

**Ekonomi / store:** Coins, CircleDollarSign, Gem, Gift, Boxes, Package, Key, Lock, Unlock, Wallet,
ShoppingCart, ShoppingBag, Tag, Ticket, Truck, Hammer, Wrench, Apple, Feather, Cross, Palette

**Sosial / komunikasi:** MessageCircle, MessageSquare, Send, Youtube, Instagram, Music2, Music, Camera,
Heart, ThumbsUp, ThumbsDown, Hash

**Info / dokumen:** Newspaper, ScrollText, HelpCircle, Info, FileText, User

Dipakai di: `ranks[].icon`, `ranks[].benefits[].icon`, `moneyPackages[].icon`, `keys[].icon`,
`voteRewards[].icon`, dan item dropdown `navLinks[].dropdown[].icon`.

---

## 2. Warna Rank (`rankColors`)

Dipakai di field `ranks[].colorKey`. Pilih salah satu nama warna berikut, atau isi langsung
dengan kode hex sendiri (misal `colorKey: "#123ABC"`).

| Nama key   | Warna          |
|------------|----------------|
| green      | Hijau          |
| cyan       | Cyan           |
| blue       | Biru           |
| purple     | Ungu           |
| pink       | Pink           |
| red        | Merah          |
| orange     | Oranye         |
| yellow     | Kuning         |
| gray       | Abu-abu        |
| indigo     | Indigo         |
| teal       | Teal (hijau kebiruan) |
| lime       | Hijau lime     |

Mau tambah warna baru? Tambahkan baris baru di object `rankColors` pada `serverConfig.js`,
misal `magenta: "#D946EF",` lalu pakai `colorKey: "magenta"` di rank manapun.

## 3. Kategori Rank (`ranks[].category`)

**Bebas diisi teks apa saja** — tidak lagi dibatasi ke "common/rare/epic/legendary/mythic".
Contoh yang sudah dipakai: `"Starter"`, `"Populer"`, `"Pro"`, `"Elite"`, `"Ultimate"`.
Bisa diganti jadi `"VIP"`, `"VVIP"`, `"Donatur"`, `"Season 1"`, dst — tinggal ketik saja.

## 4. Tier Keys (`keys[].tier` / `rarityConfig`)

Khusus produk **Keys** (crate key) masih pakai sistem tier untuk badge warna:
`common`, `rare`, `epic`, `legendary`, `mythic`. Untuk menambah tier baru, tambahkan
entry baru di object `rarityConfig` pada `serverConfig.js` (butuh `color`, `label`, `glow`).

---

## 5. Struktur Menu Navbar (`navLinks`)

```js
export const navLinks = [
  { label: "Home", path: "/" },                 // item biasa
  {
    label: "Community", path: "/community",     // item dengan dropdown
    dropdown: [
      { label: "Staff Directory", path: "/staff", icon: "ShieldCheck" },
      // tambah/hapus/urutkan item dropdown di sini
    ],
  },
];
```
Item dengan `dropdown` akan menampilkan menu turun saat di-hover/klik di desktop, dan
tetap tampil sebagai daftar biasa di menu mobile (hamburger).

---

## 6. Kategori Store (`storeCategories`)

Hanya 3 jenis produk: `ranks`, `money` (In-Game Money), `keys` (Key). Tab "All"
menampilkan ketiganya dengan judul section + garis pemisah.

Tambah jenis produk baru? Butuh 3 langkah:
1. Tambah array data baru (contoh: `export const bundles = [...]`) di `serverConfig.js`.
2. Tambah entry baru ke `storeCategories` dengan `id` yang sama, misal `{ id: "bundles", label: "Bundles", icon: "Package" }`.
3. Di `src/pages/Store.jsx`, tambahkan filter + section render seperti pola Ranks/Money/Keys yang sudah ada.

---

## 7. Moments (galeri foto)

Diatur di `momentTeams` (daftar tim) dan `moments` (daftar foto). Tiap tim di
`momentTeams` cukup butuh `id`, `label`, dan `icon` (fallback) / `logo` (opsional,
link atau path gambar) — tampil sebagai judul section (logo + nama) sebelum galeri
foto tim itu, tanpa info tambahan lain.

Tiap foto di `moments` punya field `team`:
- `team: "general"` → foto umum/komunitas, otomatis masuk section **All Moments**.
- `team: "<id-tim>"` (cocok dengan salah satu id di `momentTeams`) → foto ini HANYA
  muncul di section tim tersebut, TIDAK otomatis masuk All Moments (supaya All Moments
  tidak penuh oleh foto tim tertentu). Kalau memang ingin foto itu tetap tampil juga
  di All Moments, tambahkan `includeInAll: true` pada foto itu.

```js
export const momentTeams = [
  { id: "development", label: "Development Team", icon: "Cpu", logo: "" },
];

export const moments = [
  { id: "mo1", team: "general", caption: "Grand Opening", image: "/assets/moments/1.jpg" },
  { id: "mo2", team: "development", caption: "Testing update", image: "/assets/moments/2.jpg" },
  { id: "mo3", team: "development", caption: "Rilis event", image: "/assets/moments/3.jpg", includeInAll: true },
];
```

## 8. Logo server
`serverConfig.logoUrl` — isi dengan link gambar atau path lokal
(taruh file di `public/assets/logo/`, lihat `public/assets/logo/README.txt`).
Kosongkan `""` untuk pakai ikon kotak default. Dipakai otomatis di navbar & footer.

## 9. Data member Discord (live)
`serverConfig.discordStatsApiUrl` — URL Discord Invite API
(`https://discord.com/api/v10/invites/KODE-INVITE?with_counts=true`, ganti `KODE-INVITE`
dengan kode invite Discord server kamu). Data online member & total member di halaman
Community diambil otomatis dari sini dan di-refresh tiap `discordStatsRefreshMinutes`
menit. `discordFallbackOnlineMembers` / `discordFallbackMemberCount` dipakai kalau API
gagal diakses (misal browser memblokir request atau kode invite salah).

## 10. Background per halaman (`pageBackgrounds`)

```js
export const pageBackgrounds = {
  "/": "/assets/backgrounds/home.jpg",
  "/store": "https://domainmu.com/store-bg.jpg",
  "/vote": "",   // "" artinya pakai default (serverConfig.backgroundImage)
};
```

---

## 11. Order via WhatsApp / Discord

Diatur di `serverConfig.whatsappNumber` (format `62xxxxxxxxxx`, tanpa `+` / `0` di depan)
dan `serverConfig.discordContactUrl`. Tombol "Order via WhatsApp" di halaman produk otomatis
membuka chat dengan pesan berisi nama produk, jumlah, username, platform, dan total harga.

## 12. Play Now → buka Minecraft otomatis

Tombol "Play Now" di Home menampilkan pilihan Java/Bedrock. Saat dipilih, browser akan
membuka link `minecraft://?addExternalServer=NAMA_SERVER|ip:port` yang otomatis membuka
aplikasi Minecraft dan menambahkan server ke daftar multiplayer (kalau OS/launcher
mendukung protokol `minecraft://`). IP & port diambil dari `serverConfig.javaIp/javaPort`
dan `bedrockIp/bedrockPort`.

## 13. Status server real-time

`serverConfig.serverStatusApiUrl` (kosongkan untuk pakai default: API publik
`api.mcsrvstat.us` berdasarkan `javaIp:javaPort`) dan `serverStatusRefreshSeconds`
(default 15 detik, biar terasa real-time). Status ONLINE/OFFLINE dan jumlah player
di Home & halaman Server diambil otomatis dari sini — tidak perlu API key, dan bisa
dipanggil langsung dari browser. Kalau request gagal, halaman TIDAK menampilkan angka
palsu — cukup status "Checking…" / "Status tidak tersedia" sampai data asli didapat.

## 14. Top Voters real-time & keamanan API key

Data Top Voters diambil dari Minecraft-MP API. **API key Minecraft-MP TIDAK BOLEH**
ditaruh di `serverConfig.js` atau file frontend manapun — siapa saja bisa membuka
DevTools browser dan membacanya. Karena itu, key-nya disimpan di **server**, lewat
serverless function `api/top-voters.js` yang sudah disiapkan di project ini.

**Cara setup (contoh di Vercel — paling umum untuk project Vite):**
1. Deploy project ini ke Vercel (folder `api/` otomatis dikenali sebagai serverless function).
2. Buka Project → Settings → Environment Variables, tambahkan:
   - `MINECRAFT_MP_API_KEY` = API key asli dari akun Minecraft-MP kamu
   - `MINECRAFT_MP_SERVER_ID` = ID server kamu di Minecraft-MP (opsional, angka di URL vote-mu)
3. Redeploy.

Frontend otomatis memanggil `serverConfig.topVotersApiUrl` (default `/api/top-voters`,
bukan langsung ke minecraft-mp.com), yang diproses oleh `api/top-voters.js` di server.
Kalau proxy ini gagal dihubungi (belum di-deploy, API key belum diisi, dst), halaman Vote
**TIDAK menampilkan nama/angka contoh** — cukup pesan "data belum tersedia" yang jujur.

**Kenapa `npm run dev` biasa tidak menampilkan data asli:** `npm run dev` cuma menjalankan
Vite (frontend saja), tanpa serverless function `/api/top-voters`. Supaya proxy ini jalan
saat development lokal, pakai `vercel dev` (kalau target hosting-nya Vercel) atau jalankan
`api/top-voters.js` lewat CLI platform hosting kamu masing-masing. Di production (setelah
deploy ke Vercel/Netlify/dst dengan `MINECRAFT_MP_API_KEY` terisi), proxy ini otomatis jalan
tanpa langkah tambahan.

Untuk platform selain Vercel (Netlify Functions, Cloudflare Workers, VPS + Express, dst),
konsepnya sama: taruh API key sebagai environment variable di server, buat endpoint yang
memanggil minecraft-mp.com dari server itu, lalu arahkan `topVotersApiUrl` ke endpoint itu.

## 15. Copy IP & Port Bedrock terpisah
Layar "Add Server" di Minecraft Bedrock punya 2 kolom terpisah (Server Address & Port),
beda dengan Java yang cuma 1 kolom gabungan. Karena itu, IP pill Bedrock di Home dan
tombol di halaman Server sudah punya 2 tombol salin terpisah: "Copy IP" dan "Copy Port".

## 16. News & Events sebagai "blog" (halaman detail + Read More)
Tiap item di `news` (serverConfig.js) dan `events` punya field `content` — teks panjang
berisi paragraf lengkap (pisahkan tiap paragraf dengan baris kosong `\n\n`). Field ini
dipakai di halaman detail:
- News: card di `/news` klik → buka `/news/:id` (`src/pages/NewsDetail.jsx`).
- Events: card di Community/Server klik → buka `/community/events/:id` (`src/pages/EventDetail.jsx`).

Kalau `content` kosong, halaman detail otomatis fallback pakai `excerpt` (news) atau
`description` (events) supaya tetap tidak kosong.

## 17. Community Events juga tampil di halaman Server
Section "Server Events" otomatis muncul di bagian bawah halaman `/server`, menampilkan
data yang sama dari `events` di serverConfig.js — jadi cukup edit array `events` sekali,
otomatis update di halaman Community & Server.

## 18. Caching data live (server status, top voters, Discord) — tidak fetch terus-menerus
Data live (status server, top voters, member Discord) TIDAK di-fetch ulang setiap kali
komponen/halaman dibuka. Semuanya pakai "shared poller" (`src/lib/pollingCache.js`):
- Satu poller berjalan di background per jenis data, dipakai bersama oleh semua komponen
  yang butuh data itu di halaman manapun.
- Interval refresh: status server tiap **30 detik** (`serverStatusRefreshSeconds`), top
  voters tiap **5 menit** (`topVotersRefreshMinutes`), member Discord tiap **5 menit**
  (`discordStatsRefreshMinutes`) — semua bisa diubah di serverConfig.js.
- Saat pindah halaman lalu balik lagi (atau ada komponen lain yang butuh data sama), data
  cache yang sudah ada langsung ditampilkan — tidak fetch ulang dan tidak nge-reset ke
  status loading/kosong.
- Selama proses refresh di background, data LAMA tetap ditampilkan dulu; begitu data baru
  selesai diambil, baru diganti ke data baru. Jadi tampilan tidak pernah kosong/kedip
  setiap kali refresh berjalan.
- Kalau satu kali refresh gagal (misal jaringan sempat putus) TAPI sebelumnya sudah pernah
  berhasil, data terakhir yang valid tetap dipertahankan (bukan langsung dianggap error).

**Caching di level server (CDN), bukan cuma di browser:** `api/server-status.js` dan
`api/top-voters.js` sama-sama mengirim header `Cache-Control: s-maxage=...` — artinya kalau
di-deploy ke Vercel/platform yang mendukung edge caching, SEMUA pengunjung dalam jendela
waktu itu (30 detik untuk status server, 5 menit untuk top voters) berbagi 1 hasil fetch
yang sama ke mcsrvstat.us / minecraft-mp.com, bukan tiap pengunjung memicu request sendiri.
Ini yang membuat web tetap cepat & tidak membebani API pihak ketiga walau pengunjung ramai.

`useServerStatus` mencoba proxy `/api/server-status` dulu (biar kena cache CDN); kalau
proxy belum ter-deploy (mis. development lokal pakai `npm run dev` biasa), otomatis
fallback langsung ke mcsrvstat.us dari browser supaya tetap berfungsi tanpa perlu setup apa-apa.

## 19. Avatar kepala player (Top Voters & Team/Contributors)
Halaman Vote dan Team & Contributors otomatis menampilkan avatar kepala Minecraft
(`src/components/PlayerHead.jsx`) dari [minotar.net](https://minotar.net) berdasarkan
`username`, contoh: `https://minotar.net/helm/Notch/128.png`. Gratis, tanpa API key.
- Username tidak dikenali → otomatis fallback ke skin Steve (bawaan minotar.net, bukan error).
- minotar.net gagal diakses (jaringan bermasalah) → fallback ke ikon generik lokal, tidak
  pernah muncul gambar rusak/patah.
Supaya avatar tampil benar, isi `username` di data staff (serverConfig.js) dengan
username Minecraft asli (bukan nickname Discord), begitu juga `username`/`nickname` yang
dikembalikan API Top Voters (sudah otomatis, tidak perlu setting tambahan).

## 20. Ikon WhatsApp asli
Tombol WhatsApp (Team & Contributors, order rank di halaman Store) sekarang pakai logo
WhatsApp asli (`src/components/WhatsAppIcon.jsx`), bukan ikon chat bubble generik lagi.

## 21. Keamanan — sudah production-ready
- **Tidak ada lagi dependency ke platform pihak ketiga (Base44)** — project ini sekarang
  murni React + Vite + Tailwind biasa, bisa di-deploy ke platform manapun yang mendukung
  Vite + serverless functions (Vercel, Netlify, dst) tanpa akun/SDK tambahan apapun.
- `.gitignore` sudah mengecualikan `.env`/`.env.local` — API key tidak akan pernah
  ke-commit ke Git secara tidak sengaja.
- `vercel.json` menambahkan HTTP security headers standar: Content-Security-Policy,
  X-Frame-Options (anti clickjacking), X-Content-Type-Options (anti MIME-sniffing),
  Strict-Transport-Security (paksa HTTPS), dan Permissions-Policy (blokir akses
  kamera/mikrofon/lokasi yang tidak dibutuhkan situs ini).
- Semua API key (Minecraft-MP) tetap hanya hidup di environment variable server —
  tidak pernah ada di kode frontend yang bisa dilihat pengunjung lewat "View Source".
- Kalau nanti mau tambah form/login sungguhan, ingat: validasi input HARUS selalu
  dilakukan di sisi server (serverless function), bukan cuma di browser.

## 22. Empty state untuk News & Events
Kalau array `news` atau `events` di serverConfig.js dikosongkan (belum ada konten sama
sekali), halaman `/news` dan section Events di `/community` otomatis menampilkan pesan
"Belum ada berita/event saat ini" yang rapi — bukan halaman kosong polos. Begitu kamu isi
lagi array-nya, pesan ini otomatis hilang dan diganti daftar berita/event seperti biasa.

## 23. Format tanggal event (tanggal - bulan - tahun)
Field `date` di data event tetap ditulis format ISO (`"YYYY-MM-DD"`, mis. `"2026-08-15"`)
supaya gampang di-sort/dibandingkan. Yang TAMPIL ke pengunjung otomatis diformat ulang
lewat `formatEventDate()` jadi "15 Agustus 2026" (tanggal dulu, baru nama bulan, baru
tahun) — dipakai di `EventCard.jsx` dan `EventDetail.jsx`. Jangan ubah format field `date`
di data-nya, cukup edit tanggalnya saja.

## 24. Pendaftaran event: Discord atau WhatsApp (bisa diatur per-event)
Tiap event di `events` (serverConfig.js) punya field opsional `registerVia`:
```js
registerVia: "discord",  // atau "whatsapp"
registerWhatsappText: "Pesan pembuka custom kalau via WhatsApp (opsional)",
```
- Kalau tidak diisi, otomatis pakai `defaultEventRegisterVia` (default: `"discord"`).
- Tombol "Daftar via ..." di halaman detail event (`/community/events/:id`) otomatis
  ganti ikon & link sesuai setting ini — Discord pakai `serverConfig.discordUrl`,
  WhatsApp pakai `serverConfig.whatsappNumber` + `registerWhatsappText`.

## 25. Join WhatsApp Group (Navbar & Footer)
Isi `serverConfig.whatsappGroupUrl` dengan link invite grup WhatsApp komunitas (beda
dari `whatsappNumber` yang untuk chat pribadi/order). Begitu diisi, tombol/ikon "Join
WhatsApp Group" otomatis muncul di:
- Navbar desktop (pojok kanan atas, sebelah ikon Discord)
- Dropdown menu mobile (di bawah tombol "Join Discord")
- Footer (baris ikon sosial media)
Kosongkan (`""`) untuk sembunyikan tombolnya kalau belum punya grup WhatsApp.

## 26. Perbaikan tampilan mobile (HP)
- Pill IP Java & Bedrock di Home, dan tombol Copy IP/Port Bedrock di halaman Server:
  di layar HP sekarang otomatis SUSUN KE BAWAH (info IP di atas, tombol salin full-width
  di bawahnya) supaya tidak mepet/overflow — di layar lebih lebar (tablet/laptop) tetap
  jadi 1 baris ringkas seperti pill.
- List Top Voters: nama panjang sekarang otomatis terpotong dengan "..." (bukan
  overflow/dorong baris lain) — arahkan kursor/tap-hold untuk lihat nama lengkap.
- Halaman detail event: jarak antara link "Kembali ke Community" dan badge tanggal
  diperbesar supaya tidak mepet.
- Ukuran teks & spacing di hero Home, judul section, dan menu mobile sedikit dikecilkan
  supaya lebih pas/tidak "kebesaran" di layar HP, tanpa mengubah layout/fitur.

## 27. Team leaderboard real-time (BetterTeams via panel Pterodactyl)

Halaman **Team** (`/team`) menampilkan 10 tim (guild) teratas di server, diambil
LANGSUNG dari data plugin BetterTeams lewat panel hosting kamu — bukan data
contoh. Sama seperti Top Voters, ini butuh proxy server supaya API key panel
tidak pernah bocor ke browser pengunjung.

### Cara setup
1. Pastikan plugin **BetterTeams** aktif di server dan menyimpan data ke YAML
   (default), di folder `plugins/BetterTeams/teamInfo/`.
2. Buat API key di panel Pterodactyl kamu: Account (pojok kanan atas) →
   **API Credentials** → Create API Key. Ini "Client API Key", BUKAN
   "Application API Key".
3. Deploy project ke Vercel (atau platform serverless lain), lalu di
   Environment Variables tambahkan:
   - `PTERODACTYL_PANEL_URL` — contoh `https://panel.domainmu.id` (tanpa `/` di akhir)
   - `PTERODACTYL_SERVER_ID` — ID pendek server (lihat di URL panel saat buka server)
   - `PTERODACTYL_API_KEY` — API key dari langkah 2
   - `BETTERTEAMS_PATH` — opsional, isi kalau path foldernya beda dari default
4. Redeploy. Halaman Team otomatis mulai menampilkan data asli dalam beberapa saat.

### Cara kerja & sumber data
- `api/teams.js` membaca daftar file `.yml` di folder `teamInfo`, mengambil isi
  tiap file (nama tim, score, daftar member), lalu mengurutkan berdasarkan
  `score` tertinggi dan mengambil 10 besar (`serverConfig.teamsTopCount`).
- **Owner** tim diambil dari player berstatus `OWNER` di file tim, lalu UUID-nya
  di-resolve jadi username lewat file `/usercache.json` bawaan Minecraft (dimuat
  1x per request langsung dari panel, bukan lewat API luar). File ini otomatis
  dibuat Minecraft dan mencatat semua player yang pernah join — cara ini dipakai
  (bukan API Mojang publik) supaya tetap berfungsi untuk player Bedrock lewat
  Geyser/Floodgate maupun server offline-mode/cracked. Kalau UUID owner-nya
  somehow tidak ada di usercache.json, owner tampil "Unknown" — itu wajar, bukan bug.
- **Jumlah member** = jumlah entri di daftar player tim (semua role, bukan cuma owner).
- Response di-cache 15 menit (`Cache-Control` di `api/teams.js`) supaya tidak
  membebani panel — samakan dengan `serverConfig.teamsRefreshMinutes` kalau diubah.
- Kalau proxy belum di-setup / gagal diakses, halaman Team menampilkan pesan
  jujur "data belum tersedia" — TIDAK PERNAH menampilkan tim/score contoh.

### Icon tim
Diatur lewat folder `public/iconteam/` — nama file harus sama persis dengan
NAMA TIM (field `name` di file `.yml`-nya, bukan UUID/id file), contoh
`public/iconteam/Dragon Slayers.png`. Kalau tidak ada file untuk tim tertentu,
otomatis fallback ke kepala Minecraft si owner (lewat minotar.net, otomatis
membuang titik di depan nickname kalau owner-nya player Bedrock), lalu ke ikon
generik kalau owner juga tidak diketahui. Lihat `public/iconteam/README.txt`
untuk detail (termasuk catatan soal nama tim yang sama persis/duplikat).

### Info cara score dihitung
Teks penjelasan di atas daftar tim (kotak "Cara Score Dihitung") diatur di
`uiText.team.scoreInfoTitle` / `scoreInfoText` di `serverConfig.js` — edit
teksnya kalau kamu mengubah aturan `events.kill.score` / `events.death.score`
di `config.yml` plugin BetterTeams.

### Catatan tentang data Staff/Contributor lama
Halaman ini menggantikan "Team & Contributors" (staff directory) yang lama.
Data staff (`staff`, `team`, `teamGroups`, `roleColors` di `serverConfig.js`,
dan komponen `StaffCard.jsx`) TIDAK dihapus — cuma sudah tidak ditampilkan di
halaman manapun. Kalau suatu saat mau menampilkan staff directory lagi (misal
di halaman Community atau halaman baru), datanya masih tersedia dan siap pakai.

## 28. QRIS di halaman checkout Store
Halaman detail produk (`/store/product/:id`) sekarang menampilkan kode QRIS
sebelum tombol order, supaya alurnya jadi: isi username & platform → lihat
total & scan/download QRIS → transfer → klik tombol WhatsApp/Discord (pesan
otomatis sudah berisi detail pesanan + pengingat untuk lampirkan bukti transfer).

- File QR: `public/assets/payment/qris.jpg` — ganti file ini kalau QRIS-mu
  berubah (lihat `public/assets/payment/README.txt`).
- Nama merchant yang tampil di bawah QR: `serverConfig.qrisMerchantName`.
- Kosongkan `serverConfig.qrisImageUrl` (jadi `""`) untuk sembunyikan seluruh
  langkah QRIS — checkout otomatis kembali ke alur lama (langsung ke tombol
  WhatsApp/Discord tanpa kotak QR).
- **Catatan penting:** ini BUKAN payment gateway otomatis (tidak ada webhook/
  konfirmasi pembayaran otomatis). Alurnya tetap "manual terverifikasi staff":
  pembeli transfer sendiri lalu kirim bukti lewat chat, staff cek manual baru
  proses rank/item-nya. Kalau nanti mau full otomatis (auto-cek status bayar +
  auto-kasih rank), itu perlu integrasi payment gateway sungguhan (Midtrans/
  Xendit) + sedikit database — bisa dibantu disiapkan kalau diperlukan nanti.
- **⚠️ PENTING untuk staff yang memproses order:** screenshot/foto bukti transfer
  BISA DIREKAYASA (edit aplikasi, screenshot lama dipakai ulang, dsb). Karena
  alur ini manual (bukan payment gateway otomatis), SELALU cek mutasi rekening
  atau riwayat transaksi e-wallet ASLI kamu sebelum memberikan rank/item —
  jangan proses pesanan hanya berdasarkan screenshot yang dikirim pembeli.
