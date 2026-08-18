// ============================================================
// Revenge Hardcore — Central config & admin-ready data layer
// SEMUA teks, warna, background, dan data yang tampil di web
// diatur dari file ini. Baca CUSTOMIZE.md & DOCS.md untuk
// panduan lengkap + daftar nama icon/kategori/warna yang tersedia.
// ============================================================

import { includes } from "lodash";

export const serverConfig = {
  // ---- Info dasar server (tampil di navbar, hero, footer, dsb) ----
  name: "Revenge Hardcore",
  tagline: "Build Tempat Aman, Bertahan, dan Taklukkan Dunia",
  subtext: "Masuki dunia survival penuh tantangan, bangun tempat perlindungan, kumpulkan sumber daya, dan bertahan hidup bersama komunitas.",

  // ---- IP Server (Java & Bedrock terpisah, masing-masing dengan port) ----
  javaIp: "play.revengehc.my.id",
  javaPort: "25504",
  bedrockIp: "play.revengehc.my.id",
  bedrockPort: "25603",

  version: "1.21.x",
  edition: "Java + Bedrock",
  playersOnline: 1284,
  playersMax: 5000,
  status: "online",

  discordUrl: "https://discord.gg/yqvG4pRwc",
  youtubeUrl: "https://youtube.com/@revengehardcore",
  tiktokUrl: "https://tiktok.com/@revengehardcore",
  instagramUrl: "https://instagram.com/revengehardcore",

  // ---- Kontak untuk pembelian (dipakai tombol "Order via WhatsApp/Discord") ----
  // Nomor WhatsApp format internasional, TANPA tanda "+" dan tanpa "0" di depan.
  // Contoh nomor 0812-3456-7890 ditulis: "6281234567890"
  whatsappNumber: "628819048602",
  // Username/invite Discord untuk kontak pembelian (bisa link invite server juga).
  discordContactUrl: "https://discord.gg/yqvG4pRwc",
  // Link invite GROUP WhatsApp komunitas (beda dari whatsappNumber di atas yang untuk
  // chat pribadi). Dipakai tombol "Join WhatsApp Group" di Navbar. Kosongkan ("") untuk
  // sembunyikan tombolnya kalau belum punya grup WhatsApp.
  whatsappGroupUrl: "https://chat.whatsapp.com/CqWfNLzXZHm1MEifyy0DRa?s=cl&p=a&mlu=0",

  // ---- QRIS pembayaran (halaman checkout Store) ----
  // Gambar QRIS ditaruh di public/assets/payment/qris.jpg (lihat README.txt di
  // folder itu untuk cara ganti). Kosongkan qrisImageUrl ("") untuk sembunyikan
  // seluruh langkah QRIS di checkout (pembeli langsung ke tombol WhatsApp/Discord
  // seperti sebelumnya, tanpa kotak QR).
  qrisImageUrl: "/assets/payment/qris.jpg",
  qrisMerchantName: "JASDIT BY DHIKAA",

  // ---- Data member Discord asli (live) ----
  // Diambil dari Discord Invite API. Ganti kode invite di URL di bawah dengan
  // kode invite Discord server kamu sendiri (bagian setelah discord.gg/).
  // Endpoint ini publik & tidak butuh token bot.
  discordStatsApiUrl: "https://discord.com/api/v10/invites/yqvG4pRwc?with_counts=true",
  // Setiap berapa menit data member di-refresh otomatis.
  discordStatsRefreshMinutes: 5,
  // CATATAN: dulu ada "angka cadangan" (discordFallbackOnlineMembers/MemberCount) yang
  // tampil kalau API Discord gagal diakses — sekarang SUDAH DIHAPUS supaya web tidak
  // pernah menampilkan angka member palsu. Kalau API gagal, halaman Community akan
  // menampilkan status "Data tidak tersedia" (lihat src/hooks/useDiscordStats.js).

  // ---- Top Voters real-time (dari Minecraft-MP API) ----
  // JANGAN taruh API key Minecraft-MP di sini / di file frontend manapun — API key
  // WAJIB disimpan di server (environment variable), lihat /api/top-voters.js dan
  // DOCS.md bagian "Top Voters real-time & keamanan API key" untuk cara setup.
  // URL di bawah ini menunjuk ke endpoint proxy milikmu sendiri (bukan langsung ke
  // minecraft-mp.com), supaya API key tetap aman di server. Proxy ini juga di-cache
  // di CDN selama 5 menit (lihat header Cache-Control di api/top-voters.js) supaya
  // SEMUA pengunjung berbagi 1 hasil fetch, bukan tiap user request sendiri-sendiri.
  topVotersApiUrl: "/api/top-voters",
  // Setiap berapa menit data voters di-refresh otomatis (samakan dengan cache di api/top-voters.js).
  topVotersRefreshMinutes: 5,

  // ---- Status server real-time (jumlah player, online/offline) ----
  // Diambil lewat proxy sendiri (api/server-status.js, di-cache di CDN ~30 detik
  // supaya semua pengunjung berbagi 1 hasil fetch) yang meneruskan ke API publik
  // mcsrvstat.us. Kalau proxy belum ter-deploy (mis. development lokal pakai
  // `npm run dev` biasa tanpa serverless function), otomatis fallback langsung ke
  // mcsrvstat.us dari browser (lihat src/hooks/useServerStatus.js).
  // Kosongkan ("") untuk pakai default "/api/server-status", atau isi manual kalau
  // mau pakai endpoint proxy lain.
  serverStatusApiUrl: "",
  // Setiap berapa detik status di-refresh otomatis (samakan dengan cache di api/server-status.js).
  serverStatusRefreshSeconds: 30,

  // ---- Team leaderboard real-time (dari plugin BetterTeams via panel Pterodactyl) ----
  // JANGAN taruh API key panel di sini / di file frontend manapun — API key WAJIB
  // disimpan di server (environment variable: PTERODACTYL_PANEL_URL,
  // PTERODACTYL_SERVER_ID, PTERODACTYL_API_KEY), lihat /api/teams.js dan DOCS.md
  // bagian "Team leaderboard real-time & keamanan API key" untuk cara setup.
  teamsApiUrl: "/api/teams",
  // Berapa banyak tim teratas yang ditampilkan di halaman Team.
  teamsTopCount: 10,
  // Setiap berapa menit data tim di-refresh otomatis (samakan dengan cache di api/teams.js).
  teamsRefreshMinutes: 15,

  // ---- Logo server ----
  // Kosongkan ("") untuk pakai logo default (ikon kotak bawaan).
  // Isi dengan link gambar logo atau path lokal (public/assets/logo/nama-file.png)
  // untuk pakai logo server sendiri di navbar & footer.
  logoUrl: "/assets/logo/logo.jpg",

  // ---- Background default (dipakai halaman yang tidak diset khusus di pageBackgrounds) ----
  // Bisa diisi 2 cara, tanpa perlu ubah kode komponen apapun:
  //   1) Link gambar dari luar, misal: "https://domain-kamu.com/bg.jpg"
  //   2) File lokal: taruh gambarnya di public/assets/backgrounds/nama-file.jpg
  //      lalu isi path-nya di sini, contoh: "/assets/backgrounds/nama-file.jpg"
  // Lihat public/assets/backgrounds/README.txt untuk detail.
  backgroundImage: "/assets/backgrounds/background-2.jpg",

  // Overlay gelap di atas background supaya teks tetap kebaca.
  // Format: rgba(r, g, b, opacity) — makin besar opacity, makin gelap/pekat overlay-nya.
  overlayColor: "rgba(5, 10, 25, 0.65)",
};

// ---- Background PER HALAMAN (opsional) ----
// Kosongkan ("") kalau mau halaman itu pakai serverConfig.backgroundImage (default).
// Isi dengan link gambar atau path lokal (public/assets/backgrounds/...) untuk
// pakai background berbeda khusus halaman tersebut.
export const pageBackgrounds = {
  "/": "",
  "/server": "/assets/backgrounds/background-1.jpg",
  "/store": "/assets/backgrounds/background-3.jpg",
  "/vote": "",
  "/moments": "",
  "/community": "",
  "/team": "",
  "/news": "",
  "/rules": "",
  "/faq": "",
};

// Dipakai BackgroundLayer.jsx untuk memilih background sesuai halaman aktif.
export const getPageBackground = (pathname) => {
  if (pageBackgrounds[pathname]) return pageBackgrounds[pathname];
  // fallback: cocokkan awalan path, misal /store/product/xxx -> /store
  const match = Object.keys(pageBackgrounds).find((p) => p !== "/" && pathname.startsWith(p));
  if (match && pageBackgrounds[match]) return pageBackgrounds[match];
  return serverConfig.backgroundImage;
};

// ---- Link WhatsApp / Discord siap pakai untuk order produk ----
export const buildWhatsAppOrderUrl = (text) =>
  `https://wa.me/${serverConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
export const buildDiscordOrderUrl = () => serverConfig.discordContactUrl;

// Link WhatsApp untuk kontak per-admin (dipakai StaffCard, kalau data staff dipakai di halaman lain).
// Kalau staff punya nomor sendiri, isi `socials.whatsapp` di data staff (format
// internasional tanpa "+", contoh "6281234567890"). Kalau tidak diisi, otomatis
// pakai nomor WhatsApp umum server (serverConfig.whatsappNumber).
export const buildStaffWhatsAppUrl = (staffMember) => {
  const number = staffMember ?.socials ?.whatsapp || serverConfig.whatsappNumber;
  const text = `Halo ${staffMember?.displayName || ""}, saya mau tanya soal ${serverConfig.name}.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
};

// ---- Link untuk buka Minecraft & auto-add server (dipakai tombol Play Now) ----
// Format resmi Minecraft: minecraft://?addExternalServer=NAMA|ip:port
// `platform` = "java" atau "bedrock".
export const buildMinecraftDeepLink = (platform = "java") => {
  const ip = platform === "bedrock" ? serverConfig.bedrockIp : serverConfig.javaIp;
  const port = platform === "bedrock" ? serverConfig.bedrockPort : serverConfig.javaPort;
  return `minecraft://?addExternalServer=${encodeURIComponent(serverConfig.name)}|${ip}:${port}`;
};


// ---- Semua teks UI di website (judul section, tombol, label, dsb) ----
// Ganti nilainya di sini untuk mengubah teks yang tampil, tanpa sentuh kode.
export const uiText = {
  hero: {
    onlineBadge: "Server Online",
    playNow: "Play Now",
    exploreServer: "Explore Server",
    javaLabel: "Java Edition",
    bedrockLabel: "Bedrock Edition",
    versionPrefix: "v",
  },
  whyPlay: {
    kicker: "Why Us",
    title: "Why Play With Us?",
    subtitle: "Semua yang kamu butuhkan untuk petualangan tanpa batas, dalam satu server.",
  },
  storePreview: {
    kicker: "Marketplace",
    title: "Featured Ranks",
    subtitle: "Naik kelas dengan rank premium dan kekuatan tanpa tanding.",
    cta: "Explore Full Store",
  },
  votePreview: {
    kicker: "Rewards",
    title: "Vote & Earn Free Rewards",
    subtitle: "Dukung server dan klaim hadiah harian gratis.",
    voteNow: "Vote Now",
  },
  discordCta: {
    title: "Join Our Discord Community",
    subtitle: "Ribuan pemain, event harian, dan support 24/7. Bergabunglah dan jadi bagian dari keluarga",
    button: "Join Discord",
  },
  server: {
    kicker: "Server",
    title: "Server Overview",
    subtitle: "Informasi teknis dan fitur lengkap server.",
    featuresKicker: "Features",
    featuresTitle: "Server Features",
    featuresSubtitle: "Sistem-sistem yang membuat pengalaman bermain tak terlupakan.",
    joinKicker: "Getting Started",
    joinTitle: "How to Join",
    joinSubtitle: "Empat langkah sederhana untuk masuk ke dunia server.",
    copyJavaIp: "Copy Java IP",
    copyBedrockIp: "Copy Bedrock IP",
    browseRanks: "Browse Ranks",
    eventsKicker: "Upcoming",
    eventsTitle: "Server Events",
    eventsSubtitle: "Event yang sedang berlangsung dan segera datang.",
  },
  store: {
    kicker: "Marketplace",
    title: "Store & Marketplace",
    subtitle: "Rank, in-game money, dan key untuk mempercepat petualanganmu.",
    searchPlaceholder: "Search product...",
    emptyTitle: "Coming Soon",
    emptyDesc: "Produk di kategori ini akan segera hadir.",
    sectionRanks: "Ranks",
    sectionMoney: "In-Game Money",
    sectionKeys: "Keys",
  },
  productDetail: {
    back: "Back to Store",
    includedFeatures: "Included Features",
    benefits: "Benefits",
    badge1: "Fast Response",
    badge2: "Secure Order",
    badge3: "Trusted Seller",
    usernameLabel: "Username / Gamertag",
    usernamePlaceholder: "Masukkan username Minecraft-mu",
    usernameError: "Username wajib diisi.",
    platformLabel: "Platform",
    platformJava: "Java",
    platformBedrock: "Bedrock",
    orderWhatsapp: "Order via WhatsApp",
    orderDiscord: "Order via Discord",
    orderNote: "Klik salah satu tombol di atas, staff kami akan proses pesananmu secara manual dengan cepat.",
    notFoundTitle: "Product not found",
    qrisTitle: "Bayar via QRIS",
    qrisNote: "Scan atau download QR di bawah, transfer sesuai total, lalu kirim bukti transfer + data pesanan lewat tombol WhatsApp/Discord di bawah ini.",
    qrisDownload: "Download QR",
  },
  vote: {
    kicker: "Rewards",
    title: "Vote & Rewards",
    subtitle: "Vote di situs-situs berikut untuk membantu server naik ranking dan klaim hadiahnya.",
    howItWorksTitle: "Cara Klaim Reward",
    howItWorksDesc: "Vote dilakukan di website pihak ketiga (bukan di sini). Klik tombol Vote pada salah satu situs di bawah, vote menggunakan username Minecraft-mu, lalu reward otomatis terkirim ke akun in-game setelah vote terverifikasi.",
    voteSiteCta: "Vote di Situs Ini",
    topVoterKicker: "Leaderboard",
    topVoterTitle: "Top Voters Bulan Ini",
    topVoterSubtitle: "Apresiasi untuk para pendukung setia server.",
    helpCta: "Butuh bantuan? Tanya di Discord",
  },
  moments: {
    kicker: "Gallery",
    title: "Moments",
    subtitle: "Kumpulan momen dan kenangan seru dari komunitas server.",
    allSectionTitle: "All Moments",
    emptyText: "Belum ada foto di kategori ini.",
  },
  community: {
    kicker: "Community",
    title: "Community Hub",
    subtitle: "Jantung dari server — di mana para petualang berkumpul.",
    discordTitle: "Discord Community",
    discordSubtitle: "Bergabung dengan ribuan anggota aktif, event harian, dan support tim.",
    followUs: "Follow Us",
    eventsKicker: "Upcoming",
    eventsTitle: "Community Events",
    eventsSubtitle: "Event seru yang menanti partisipasimu.",
    eventBack: "Kembali ke Community",
    eventNotFound: "Event tidak ditemukan.",
  },
  team: {
    kicker: "Leaderboard",
    title: "Team",
    subtitle: "10 tim teratas di server, diurutkan berdasarkan score.",
    scoreInfoTitle: "Cara Score Dihitung",
    scoreInfoText: "Score tim didapat dari aktivitas member di dalam game: setiap Kill +1 poin, setiap Death -1 poin.",
    ownerLabel: "Owner",
    membersLabel: "Members",
    scoreLabel: "Score",
    emptyText: "Belum ada data tim.",
    errorText: "Gagal mengambil data tim dari server. Coba lagi nanti.",
    loadingText: "Memuat data tim…",
    unknownOwner: "Unknown",
  },
  news: {
    kicker: "Updates",
    title: "News & Updates",
    subtitle: "Berita terbaru, patch, dan event dari server.",
    searchPlaceholder: "Search news...",
    emptyText: "Tidak ada berita ditemukan.",
    back: "Kembali ke News",
    notFoundTitle: "Berita tidak ditemukan.",
    readMore: "Read More",
  },
  rules: {
    kicker: "Guidelines",
    title: "Server Rules",
    subtitle: "Patuhi aturan berikut untuk menjaga server tetap nyaman untuk semua.",
  },
  faq: {
    kicker: "Help Center",
    title: "FAQ / Help Center",
    subtitle: "Temukan jawaban cepat untuk pertanyaan umum.",
    searchPlaceholder: "What do you need help with?",
    emptyText: "Tidak ada hasil untuk pencarianmu.",
  },
  footer: {
    rights: "All Rights Reserved.",
    disclaimer: "Not affiliated with Mojang or Microsoft. Made with love by the community.",
  },
};

// ---- Menu navbar ----
// Item biasa: { label, path }
// Item dengan dropdown (menampung halaman lain agar mudah diakses, tidak "terisolasi"):
//   { label, path, dropdown: [{ label, path, icon }] }
export const navLinks = [{
    label: "Home",
    path: "/"
  },
  {
    label: "Server",
    path: "/server"
  },
  {
    label: "Store",
    path: "/store"
  },
  {
    label: "Vote",
    path: "/vote"
  },
  {
    label: "Moments",
    path: "/moments"
  },
  {
    label: "Community",
    path: "/community",
    dropdown: [{
        label: "Community Hub",
        path: "/community",
        icon: "Users"
      },
      {
        label: "Team",
        path: "/team",
        icon: "Heart"
      },
      {
        label: "News & Updates",
        path: "/news",
        icon: "Newspaper"
      },
      {
        label: "Server Rules",
        path: "/rules",
        icon: "ScrollText"
      },
      {
        label: "FAQ / Help Center",
        path: "/faq",
        icon: "HelpCircle"
      },
    ],
  },
];

export const footerLinks = {
  server: [{
      label: "Server Overview",
      path: "/server"
    },
    {
      label: "Server Rules",
      path: "/rules"
    },
  ],
  community: [{
      label: "Community Hub",
      path: "/community"
    },
    {
      label: "Vote & Rewards",
      path: "/vote"
    },
    {
      label: "Moments",
      path: "/moments"
    },
    {
      label: "Team",
      path: "/team"
    },
  ],
  store: [{
      label: "Ranks",
      path: "/store"
    },
    {
      label: "In-Game Money",
      path: "/store"
    },
    {
      label: "Keys",
      path: "/store"
    },
  ],
  support: [{
      label: "Help Center",
      path: "/faq"
    },
    {
      label: "News & Updates",
      path: "/news"
    },
  ],
};

// ---- Palet warna rank (fleksibel, tinggal tambah warna baru sesuka hati) ----
// Pakai salah satu key di bawah untuk field `colorKey` pada rank,
// ATAU isi `colorKey` langsung dengan kode hex sendiri (misal "#123ABC").
export const rankColors = {
  green: "#10B981",
  cyan: "#00F2FF",
  blue: "#3B82F6",
  purple: "#A855F7",
  pink: "#EC4899",
  red: "#EF4444",
  orange: "#F59E0B",
  yellow: "#EAB308",
  gray: "#94A3B8",
  indigo: "#6366F1",
  teal: "#14B8A6",
  lime: "#84CC16",
  gold: "#D4AF37",
};

export const getRankColor = (rank) => rankColors[rank.colorKey] || rank.colorKey || rankColors.cyan;

// Ubah hex jadi rgba untuk efek glow. Dipakai internal oleh RankCard/ProductDetail.
export const hexToRgba = (hex, alpha = 0.5) => {
  const clean = (hex || "#00F2FF").replace("#", "");
  const bigint = parseInt(clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean, 16);
  const r = (bigint >> 16) & 255,
    g = (bigint >> 8) & 255,
    b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Tier badge untuk Keys (crate key). Kalau mau tambah tier baru, tinggal tambah key baru di sini.
export const rarityConfig = {
  common: {
    color: "#94A3B8",
    label: "Common",
    glow: "rgba(148,163,184,0.4)"
  },
  rare: {
    color: "#3B82F6",
    label: "Rare",
    glow: "rgba(59,130,246,0.5)"
  },
  epic: {
    color: "#A855F7",
    label: "Epic",
    glow: "rgba(168,85,247,0.55)"
  },
  legendary: {
    color: "#F59E0B",
    label: "Legendary",
    glow: "rgba(245,158,11,0.6)"
  },
  mythic: {
    color: "#EF4444",
    label: "Mythic",
    glow: "rgba(239,68,68,0.6)"
  },
  // ---- Tier crate key custom Revenge Hardcore ----
  havra: {
    color: "#22D3EE",
    label: "Havra",
    glow: "rgba(34,211,238,0.55)"
  },
  abnormal: {
    color: "#EF4444",
    label: "Abnormal",
    glow: "rgba(239,68,68,0.55)"
  },
  cronus: {
    color: "#10B981",
    label: "Cronus",
    glow: "rgba(16,185,129,0.55)"
  },
};

// ---- STORE: Ranks ----
// `colorKey`  : nama warna dari rankColors di atas (atau hex custom)
// `category`  : label bebas, TIDAK dibatasi common/rare/epic/dst lagi — isi apa saja,
//               misal "Starter", "Populer", "Eksklusif", "VVIP", dsb.
export const ranks = [{
    id: "rank-member",
    name: "Member",
    colorKey: "gray",
    category: "Default",
    price: 0,
    discount: 0,
    icon: "User",
    description: "Rank dasar yang otomatis dimiliki semua pemain baru saat pertama kali bergabung — tidak perlu dibeli. Titik awal sebelum melangkah ke rank donasi Ascension.",
    features: [],
    benefits: [{
        icon: "Home",
        label: "1x Sethome"
      },
      {
        icon: "Package",
        label: "Starter Kit"
      },
      {
        icon: "Coins",
        label: "$15.000"
      }
    ],
  },
  {
    id: "rank-ascension",
    name: "Ascension",
    colorKey: "green",
    category: "Starter",
    price: 10000,
    discount: 0,
    icon: "Mountain",
    description: "Awali perjalananmu menuju puncak Revenge Hardcore. Ascension memberikan fondasi kuat untuk bertahan hidup, membangun wilayah, dan berkembang lebih cepat di dunia yang penuh ancaman.",
    features: ["/workbench", "/loom", "/pv 1-3"],
    benefits: [{
        icon: "Gift",
        label: "Semua Fitur Member"
      },
      {
        icon: "Home",
        label: "4x Sethome"
      },
      {
        icon: "Apple",
        label: "Feed Command"
      },
      {
        icon: "Hammer",
        label: "Blood Kit"
      },
      {
        icon: "Coins",
        label: "$50.000"
      },
      {
        icon: "Tag",
        label: "Bonus Sell 5%"
      }
    ],
  },
  {
    id: "rank-genesis",
    name: "Genesis",
    colorKey: "yellow",
    category: "Elite",
    price: 35000,
    oldPrice: 40000,
    discount: 13,
    icon: "Flame",
    description: "Langkah berikutnya menuju kekuasaan. Genesis memperluas ruang gerakmu dengan lebih banyak tempat penyimpanan, akses utilitas tambahan, dan modal ekonomi untuk menghadapi kerasnya Revenge Hardcore.",
    features: ["/workbench", "/stonecutter", "/pv 1-5"],
    benefits: [{
        icon: "Gift",
        label: "Semua Fitur Blood Kit"
      },
      {
        icon: "Home",
        label: "6x Sethome"
      },
      {
        icon: "Apple",
        label: "Feed Command"
      },
      {
        icon: "Cross",
        label: "Heal Command"
      },
      {
        icon: "Hammer",
        label: "Crimson Kit"
      },
      {
        icon: "Coins",
        label: "$150.000"
      },
      {
        icon: "Tag",
        label: "Bonus Sell 8%"
      }
    ],
  },
  {
    id: "rank-legacy",
    name: "Legacy",
    colorKey: "blue",
    category: "Premium",
    price: 60000,
    discount: 0,
    icon: "ShieldCheck",
    description: "Bangun warisanmu di Revenge Hardcore. Legacy memberikan kebebasan lebih besar untuk menjelajah, mengelola perlengkapan, dan kembali dari situasi berbahaya dengan berbagai kemampuan eksklusif.",
    features: ["/enderchest", "/grindstone", "/back", "/pv 1-7"],
    benefits: [{
        icon: "Gift",
        label: "Semua Fitur Crimson Kit"
      },
      {
        icon: "Home",
        label: "8x Sethome"
      },
      {
        icon: "Wrench",
        label: "Repair 1x per hari"
      },
      {
        icon: "Hammer",
        label: "Reaper Kit"
      },
      {
        icon: "Coins",
        label: "$300.000"
      },
      {
        icon: "Feather",
        label: "Enable Fly"
      },
      {
        icon: "Tag",
        label: "Bonus Sell 10%"
      }
    ],
  },
  {
    id: "rank-infinity",
    name: "Infinity",
    colorKey: "purple",
    category: "Ultimate",
    price: 100000,
    oldPrice: 120000,
    discount: 17,
    icon: "Zap",
    description: "Melampaui batas para petualang biasa. Infinity menghadirkan kapasitas yang lebih luas, utilitas tingkat tinggi, dan kekuatan ekonomi untuk mendominasi dunia Revenge Hardcore.",
    features: ["/back", "/smithingtable", "/pv 1-10"],
    benefits: [{
        icon: "Gift",
        label: "Semua Fitur Reaper Kit"
      },
      {
        icon: "Home",
        label: "12x Sethome"
      },
      {
        icon: "Feather",
        label: "Enable Fly"
      },
      {
        icon: "Apple",
        label: "Feed Command"
      },
      {
        icon: "Cross",
        label: "Heal Command"
      },
      {
        icon: "Wrench",
        label: "Repair 1x per hari"
      },
      {
        icon: "Hammer",
        label: "Inferno Kit"
      },
      {
        icon: "Coins",
        label: "$500.000"
      },
      {
        icon: "Tag",
        label: "Bonus Sell 12%"
      }
    ],
  },
  {
    id: "rank-eternalis",
    name: "Eternalis",
    colorKey: "cyan",
    category: "MYTHIC",
    price: 150000,
    discount: 0,
    icon: "Crown",
    description: "Hanya mereka yang mampu bertahan yang layak mencapai Eternallis. Nikmati kapasitas luar biasa, akses fitur premium yang semakin lengkap, serta kekuatan ekonomi untuk membangun kejayaanmu.",
    features: ["/cartographytable", "/pv 1-15"],
    benefits: [{
        icon: "Gift",
        label: "Semua Fitur Inferno Kit"
      },
      {
        icon: "Home",
        label: "20x Sethome"
      },
      {
        icon: "Wrench",
        label: "Repair 1x per hari"
      },
      {
        icon: "Apple",
        label: "Feed Command"
      },
      {
        icon: "Feather",
        label: "Enable Fly"
      },
      {
        icon: "Cross",
        label: "Heal Command"
      },
      {
        icon: "User",
        label: "Custom Nickname"
      },
      {
        icon: "Clock",
        label: "Time Set Command"
      },
      {
        icon: "Anvil",
        label: "Repair All Inventory"
      },
      {
        icon: "Hammer",
        label: "Infinity Kit"
      },
      {
        icon: "Coins",
        label: "$800.000"
      },
      {
        icon: "Tag",
        label: "Bonus Sell 15%"
      }
    ],
  },
  {
    id: "rank-primodial",
    name: "Primodial",
    colorKey: "red",
    category: "Transcendent",
    price: 200000,
    oldPrice: 250000,
    discount: 20,
    icon: "Skull",
    description: "Puncak perjalanan di Revenge Hardcore. Primodial adalah simbol supremasi dengan kebebasan tanpa batas, akses premium terlengkap, dan seluruh kekuatan yang dibutuhkan untuk menjadi legenda.",
    features: ["/pv 1-20"],
    benefits: [{
        icon: "Gift",
        label: "Semua Fitur Eternalis Kit"
      },
      {
        icon: "Home",
        label: "Unlimited Sethome"
      },
      {
        icon: "Sparkles",
        label: "All Premium Command"
      },
      {
        icon: "Palette",
        label: "Custom & Colored Nickname (RGB)"
      },
      {
        icon: "Apple",
        label: "Feed Command"
      },
      {
        icon: "Cross",
        label: "Heal Command"
      },
      {
        icon: "Clock",
        label: "Time Set Command"
      },
      {
        icon: "Sun",
        label: "Weather Set Command"
      },
      {
        icon: "Anvil",
        label: "Repair All Inventory"
      },
      {
        icon: "Hammer",
        label: "Primodial Kit"
      },
      {
        icon: "Coins",
        label: "$1.000.000"
      },
      {
        icon: "Tag",
        label: "Bonus Sell 18%"
      }
    ],
  },
  {
    id: "rank-sovereign",
    name: "Sovereign",
    colorKey: "gold",
    category: "GODLIKE",
    price: 500000,
    discount: 0,
    icon: "Gem",
    description: "Tahta tertinggi Revenge Hardcore. Sovereign adalah rank paling eksklusif — nickname berwarna emas, kekuatan hampir tanpa batas, dan hak istimewa yang tidak dimiliki rank manapun di bawahnya.",
    features: ["/vanish", "/invsee", "/fly"],
    benefits: [{
        icon: "Palette",
        label: "Nickname Emas"
      },
      {
        icon: "Swords",
        label: "Kit OP"
      },
      {
        icon: "Gift",
        label: "Semua Fitur Primodial"
      },
      {
        icon: "ScrollText",
        label: "Itemlore Tools + Armor"
      },
      {
        icon: "Home",
        label: "Unlimited Sethome"
      },
      {
        icon: "Ghost",
        label: "Vanish"
      },
      {
        icon: "Eye",
        label: "Invsee (Anti-Curi Barang)"
      },
      {
        icon: "Key",
        label: "Bonus Key Cronus x20"
      },
      {
        icon: "Key",
        label: "Bonus Key Havra x30"
      },
      {
        icon: "Coins",
        label: "$5.000.000"
      },
      {
        icon: "Tag",
        label: "Bonus Sell 25%"
      }
    ],
  },
];

// ---- STORE: In-Game Money (boleh atur jumlah/qty di halaman produk) ----
export const moneyPackages = [{
    id: "money-100k",
    name: "$100.000",
    category: "money",
    price: 10000,
    amount: 100000,
    icon: "Coins",
    description: "Top up saldo in-game instan untuk kebutuhan trading awalmu."
  },
  {
    id: "money-500k",
    name: "$500.000",
    category: "money",
    price: 35000,
    amount: 500000,
    icon: "Coins",
    description: "Modal lebih besar untuk membangun bisnis pertama di server."
  },
  {
    id: "money-1m",
    name: "$1.000.000",
    category: "money",
    price: 60000,
    amount: 1000000,
    icon: "CircleDollarSign",
    description: "Jutaan koin untuk investasi property dan auction house."
  },
  {
    id: "money-5m",
    name: "$5.000.000",
    category: "money",
    price: 250000,
    amount: 5000000,
    icon: "Gem",
    description: "Paket konglomerat. Kuasai ekonomi server dalam sekejap."
  },
];

// ---- STORE: Keys (boleh atur jumlah/qty di halaman produk) ----
export const keys = [{
    id: "key-havra",
    name: "Havra Crate Key",
    quantity: 1,
    category: "keys",
    price: 5000,
    icon: "Key",
    tier: "havra",
    description: "1x Key untuk buka Havra Crate — hadiah eksklusif tema biru-cyan."
  },
  {
    id: "key-cronus",
    name: "Cronus Crate Key",
    quantity: 1,
    category: "keys",
    price: 5000,
    icon: "Key",
    tier: "cronus",
    description: "1x Key untuk buka Cronus Crate — hadiah eksklusif tema hijau."
  },
  {
    id: "key-abnormal",
    name: "Abnormal Crate Key",
    quantity: 5,
    category: "keys",
    price: 10000,
    icon: "Key",
    tier: "abnormal",
    description: "Paket hemat 5x Key untuk buka Abnormal Crate — hadiah eksklusif tema merah."
  },
];

// Kategori tab di halaman Store. Sekarang cuma 3 jenis produk + All.
export const storeCategories = [{
    id: "all",
    label: "All",
    icon: "LayoutGrid"
  },
  {
    id: "ranks",
    label: "Ranks",
    icon: "Crown"
  },
  {
    id: "money",
    label: "In-Game Money",
    icon: "Coins"
  },
  {
    id: "keys",
    label: "Keys",
    icon: "Key"
  },
];

export const sortOptions = [{
    id: "popular",
    label: "Popular"
  },
  {
    id: "newest",
    label: "Newest"
  },
  {
    id: "price-asc",
    label: "Price: Low → High"
  },
  {
    id: "price-desc",
    label: "Price: High → Low"
  },
  {
    id: "discount",
    label: "Biggest Discount"
  },
];

// ---- Staff ----
export const staff = [{
    id: "s1",
    username: "Vexarion",
    displayName: "Vex",
    role: "Owner",
    status: "online",
    bio: "Founder Revenge Hardcore. Membangun server sejak 2021.",
    color: "#EF4444",
    socials: {
      discord: "vexarion"
    }
  },
  {
    id: "s2",
    username: "NoctisDev",
    displayName: "Noctis",
    role: "Developer",
    status: "online",
    bio: "Plugin developer & sistem ekonomi.",
    color: "#00F2FF",
    socials: {
      discord: "noctis"
    }
  },
  {
    id: "s3",
    username: "LyraSan",
    displayName: "Lyra",
    role: "Administrator",
    status: "online",
    bio: "Menjaga ketertiban dan kelola tiket komunitas.",
    color: "#8B5CF6",
    socials: {
      discord: "lyra"
    }
  },
  {
    id: "s4",
    username: "Kaelith",
    displayName: "Kael",
    role: "Moderator",
    status: "idle",
    bio: "Moderasi chat dan penegak aturan PvP.",
    color: "#3B82F6",
    socials: {
      discord: "kael"
    }
  },
  {
    id: "s5",
    username: "MiraBuilds",
    displayName: "Mira",
    role: "Builder",
    status: "online",
    bio: "Arsitek spawn & dungeon custom.",
    color: "#F59E0B",
    socials: {
      discord: "mira"
    }
  },
  {
    id: "s6",
    username: "OrinHelp",
    displayName: "Orin",
    role: "Helper",
    status: "offline",
    bio: "Membantu pemain baru di lobby server.",
    color: "#10B981",
    socials: {
      discord: "orin"
    }
  },
  {
    id: "s7",
    username: "SoraMedia",
    displayName: "Sora",
    role: "Media",
    status: "online",
    bio: "Konten creator & event host.",
    color: "#EC4899",
    socials: {
      discord: "sora"
    }
  },
  {
    id: "s8",
    username: "ThaneCo",
    displayName: "Thane",
    role: "Co-Owner",
    status: "online",
    bio: "Operasional & partnership server.",
    color: "#F59E0B",
    socials: {
      discord: "thane"
    }
  },
];

export const roleColors = {
  Owner: "#EF4444",
  "Co-Owner": "#F59E0B",
  Administrator: "#8B5CF6",
  Moderator: "#3B82F6",
  Helper: "#10B981",
  Developer: "#00F2FF",
  Builder: "#F59E0B",
  Media: "#EC4899",
};

// ---- Team ----
export const team = {
  management: staff.filter((s) => ["Owner", "Co-Owner"].includes(s.role)),
  development: staff.filter((s) => s.role === "Developer"),
  builder: staff.filter((s) => s.role === "Builder"),
  media: staff.filter((s) => s.role === "Media"),
  event: [{
    id: "e1",
    username: "Fenrir",
    displayName: "Fen",
    role: "Event Manager",
    status: "online",
    bio: "Koordinator event & turnamen mingguan.",
    color: "#A855F7",
    socials: {
      discord: "fen"
    }
  }],
  community: staff.filter((s) => ["Helper", "Moderator", "Administrator"].includes(s.role)),
};

export const teamGroups = [{
    id: "management",
    label: "Management"
  },
  {
    id: "development",
    label: "Development Team"
  },
  {
    id: "builder",
    label: "Builder Team"
  },
  {
    id: "media",
    label: "Media Team"
  },
  {
    id: "event",
    label: "Event Team"
  },
  {
    id: "community",
    label: "Community Team"
  },
];

// ---- Moments (galeri foto) ----
// `team` pada tiap foto harus salah satu id di `momentTeams` di bawah, ATAU "general"
// untuk foto umum/komunitas yang bukan foto tim manapun.
// Section "All Moments" HANYA menampilkan foto dengan team: "general", supaya foto
// tim tertentu tidak membuat All Moments penuh. Kalau mau foto tim tertentu tetap
// ikut muncul di All Moments, tambahkan `includeInAll: true` pada foto itu.
// Setiap tim di `momentTeams` cukup butuh `id`, `label`, dan `icon`/`logo` — akan
// tampil sebagai judul section (logo + nama) sebelum galeri foto tim tersebut.
export const momentTeams = [
  //   { id: "development", label: "Development Team", icon: "Cpu", logo: "" },
  {
    id: "Fotbar",
    label: "Fotbar",
    icon: "",
    logo: "/assets/logo/logo.jpg",
  },
  {
    id: "Ilegals",
    label: "Ilegals Team",
    icon: "Skull",
    logo: "",
}
];

// Contoh foto tim (tidak ikut All Moments kecuali includeInAll: true):
//   { id: "mo2", team: "development", caption: "...", image: "/assets/moments/2.jpeg", includeInAll: false },
export const moments = [
//FOTBAR
{
  id: "fotbar_1",
  team: "Fotbar",
  caption: "We are the Revenge Hardcore family. :)",
  image: "/assets/moments/fotbar/1.jpeg",
  includeInAll: true
},
{
  id: "fotbar_2",
  team: "Fotbar",
  caption: "We are the Revenge Hardcore family. :)",
  image: "/assets/moments/fotbar/2.jpeg",
  includeInAll: true
},
{
  id: "fotbar_3",
  team: "Fotbar",
  caption: "",
  image: "/assets/moments/fotbar/3.jpeg"
},
{
  id: "fotbar_4",
  team: "Fotbar",
  caption: "",
  image: "/assets/moments/fotbar/4.jpeg"
},
{
  id: "fotbar_5",
  team: "Fotbar",
  caption: "",
  image: "/assets/moments/fotbar/5.jpeg"
},
{
  id: "fotbar_6",
  team: "Fotbar",
  caption: "",
  image: "/assets/moments/fotbar/6.jpeg"
},
{
  id: "fotbar_7",
  team: "Fotbar",
  caption: "",
  image: "/assets/moments/fotbar/7.jpeg"
},
{
  id: "fotbar_8",
  team: "Fotbar",
  caption: "",
  image: "/assets/moments/fotbar/8.jpeg"
},
{
  id: "fotbar_9",
  team: "Fotbar",
  caption: "",
  image: "/assets/moments/fotbar/9.jpeg"
},
{
  id: "fotbar_10",
  team: "Fotbar",
  caption: "",
  image: "/assets/moments/fotbar/10.jpeg"
},

// ILEGALS TEAM 
  {
  id: "Ilegals_1",
  team: "Ilegals",
  caption: "We are an illegals team.",
  image: "/assets/moments/ilegals/1.jpeg",
  includeInAll: true,
},
{
  id: "Ilegals_2",
  team: "Ilegals",
  caption: "",
  image: "/assets/moments/ilegals/2.jpeg"
},
{
  id: "Ilegals_3",
  team: "Ilegals",
  caption: "",
  image: "/assets/moments/ilegals/3.jpeg"
},

];

// ---- News ----
export const news = [{
    id: "n1",
    title: "Patch 1.21.4: Sistem Quest Baru & Dungeon Crystal",
    category: "Update",
    date: "2026-08-06",
    author: "NoctisDev",
    excerpt: "Update terbaru membawa sistem quest berjenjang, dungeon baru dengan boss Crystal Warden, dan rebalance ekonomi.",
    image: "/assets/news/patch-dungeon.svg",
    content: "Update 1.21.4 hadir dengan sistem quest berjenjang yang memungkinkan pemain menyelesaikan misi harian dan mingguan untuk mendapatkan reward eksklusif. Dungeon Crystal baru menampilkan boss Crystal Warden dengan mekanik unik. Selain itu, kami melakukan rebalance ekonomi untuk menjaga stabilitas pasar auction house.",
  },
  {
    id: "n2",
    title: "Event Cyber City: Balapan Elytra di Kota Neon",
    category: "Event",
    date: "2026-08-03",
    author: "SoraMedia",
    excerpt: "Ajang balapan Elytra di distrik cyberpunk kota server. Total hadiah jutaan koin & rank eksklusif.",
    image: "/assets/news/neon-race.svg",
    content: "Bersiaplah untuk Event Cyber City! Balapan Elytra melintasi kota neon yang futuristik. Pemenang akan mendapatkan hadiah jutaan koin in-game, rank eksklusif, dan Trophy Crystal. Pendaftaran dibuka di Discord.",
  },
  {
    id: "n3",
    title: "Maintenance Terjadwal: Optimalisasi Performa Server",
    category: "Maintenance",
    date: "2026-08-09",
    author: "Vexarion",
    excerpt: "Server akan masuk maintenance singkat untuk upgrade hardware & optimasi chunk loading.",
    image: "/assets/news/maintenance.svg",
    content: "Untuk meningkatkan pengalaman bermain, kami akan melakukan maintenance terjadwal pada 10 Agustus 2026 pukul 03.00 WIB. Durasi diperkirakan 2 jam. Setelahnya, performa chunk loading akan jauh lebih cepat dan kapasitas pemain meningkat.",
  },
  {
    id: "n4",
    title: "Pengumuman: Turnamen PvP Seasons Finals",
    category: "Announcement",
    date: "2026-07-28",
    author: "Fenrir",
    excerpt: "Finals turnamen PvP musim ini akan digelar akhir bulan. Total prizepool Rp 5.000.000.",
    image: "/assets/news/pvp-arena.svg",
    content: "Seasons Finals turnamen PvP akan segera dimulai! 16 pemain terbaik akan bertanding di arena custom. Total prizepool mencapai Rp 5.000.000 plus rank Titan untuk juara umum. Saksikan langsung di kanal YouTube kami.",
  },
];

export const newsCategories = ["Update", "Announcement", "Event", "Maintenance", "Development"];

// ---- Vote ----
// `url` = link ke situs vote pihak ketiga (dibuka di tab baru saat tombol "Vote di Situs Ini" diklik).
export const voteSites = [{
  id: "v1",
  name: "Minecraft-MP",
  reward: "$50.000 + 1 Vote Key",
  cooldownHours: 24,
  url: "https://minecraft-mp.com/server/361765/vote/"
}, ];

export const voteRewards = [{
    icon: "Coins",
    label: "$50.000"
  },
  {
    icon: "Key",
    label: "1x Vote Key"
  },
  {
    icon: "Gift",
    label: "10 Claimblock"
  },
];

// ---- Top Voters (leaderboard, tampil di bawah halaman Vote) ----
// CATATAN: dulu ada data contoh/dummy di sini yang dipakai sebagai fallback saat
// API Minecraft-MP gagal diakses — sekarang SUDAH DIHAPUS. Website tidak lagi
// menampilkan nama/angka vote palsu; kalau data asli gagal diambil, halaman Vote
// akan menampilkan pesan "data belum tersedia" (lihat src/hooks/useTopVoters.js).

// ---- FAQ ----
export const faqCategories = ["Getting Started", "Account", "Gameplay", "Store", "Payment", "Ranks", "Technical Issues", "Punishment"];

export const faq = [{
    category: "Getting Started",
    items: [{
        q: "Bagaimana cara join server?",
        a: "Buka Minecraft → Multiplayer → Add Server → masukkan IP Java atau Bedrock sesuai edisimu. Pastikan menggunakan versi 1.21.x."
      },
      {
        q: "Apakah mendukung Bedrock Edition?",
        a: "Ya. Pemain Bedrock bisa join menggunakan IP Bedrock dengan port yang tertera di halaman Server."
      },
    ]
  },
  {
    category: "Account",
    items: [{
        q: "Bagaimana mendaftar akun?",
        a: "Akun otomatis dibuat saat pertama login. Login premium direkomendasikan untuk keamanan."
      },
      {
        q: "Saya lupa password, bagaimana?",
        a: "Gunakan fitur reset di situs atau hubungi staff melalui Discord."
      },
    ]
  },
  {
    category: "Store",
    items: [{
        q: "Berapa lama rank dikirim setelah pembelian?",
        a: "Setelah order dikirim via WhatsApp/Discord, staff kami akan merespon dan memproses pesanan dengan cepat."
      },
      {
        q: "Apakah pembayaran bisa di refund?",
        a: "Refund berlaku jika rank belum dikirim. Hubungi support untuk detail."
      },
    ]
  },
  {
    category: "Payment",
    items: [{
      q: "Bagaimana cara order di store?",
      a: "Pilih produk, lalu klik tombol Order via WhatsApp atau Order via Discord. Staff kami akan bantu proses pembayaran & pengiriman secara manual."
    }, ]
  },
  {
    category: "Ranks",
    items: [{
      q: "Apakah rank permanen?",
      a: "Semua rank di Revenge Hardcore bersifat permanen, sekali beli berlaku selamanya."
    }, ]
  },
  {
    category: "Technical Issues",
    items: [{
      q: "Mengapa ping saya tinggi?",
      a: "Server berlokasi Asia Tenggara. Gunakan koneksi stabil dan pilih versi yang tepat."
    }, ]
  },
  {
    category: "Punishment",
    items: [{
      q: "Cara mengajukan banding ban?",
      a: "Buka tiket di Discord dengan format appeal, staff akan meninjau dalam 48 jam."
    }, ]
  },
];

// ---- Rules ----
export const ruleCategories = ["General Rules", "Chat Rules", "Gameplay Rules", "PvP Rules", "Economy Rules", "Staff Rules"];

export const rules = [{
    category: "General Rules",
    items: [
      "01. Respect Other Players — dilarang melecehkan, rasisme, atau diskriminasi.",
      "02. No Cheating — dilarang menggunakan cheat, hack client, atau modifikasi ilegal.",
      "03. No Exploiting Bugs — wajib melaporkan bug, dilarang menyalahgunakannya.",
      "04. No Advertising — dilarang mempromosikan server lain.",
      "05. No Toxic Behavior — jaga suasana komunitas tetap sehat.",
    ]
  },
  {
    category: "Chat Rules",
    items: [
      "01. Larangan spam dan flood di chat global.",
      "02. Dilarang memposting konten NSFW.",
      "03. Bahasa kasar berlebihan akan diberi sanksi.",
    ]
  },
  {
    category: "Gameplay Rules",
    items: [
      "01. Dilarang griefing claim milik pemain lain.",
      "02. Dilarang mencuri item dari unprotected area aktif.",
      "03. Farming AFK melebihi batas akan direset.",
    ]
  },
  {
    category: "PvP Rules",
    items: [
      "01. PvP hanya di zona yang ditentukan.",
      "02. Dilarang combat logging.",
      "03. Targeting pemain baru secara berulang dilarang.",
    ]
  },
  {
    category: "Economy Rules",
    items: [
      "01. Dilarang duplikasi item atau uang.",
      "02. Harga bebas, namun scam dilarang keras.",
      "03. Real Money Trading (RMT) di luar store resmi dilarang.",
    ]
  },
  {
    category: "Staff Rules",
    items: [
      "01. Staff wajib adil dan profesional.",
      "02. Dilarang menyalahgunakan wewenang.",
      "03. Keputusan staff bersifat final kecuali ada banding resmi.",
    ]
  },
];

// ---- Events ----
// Field "registerVia" per-event: "discord" (default) atau "whatsapp" — atur mau
// tombol pendaftaran event mengarah ke Discord atau WhatsApp. Kalau tidak diisi,
// otomatis pakai defaultEventRegisterVia di bawah ini. Untuk WhatsApp, bisa juga
// isi "registerWhatsappText" per-event untuk pesan pembuka custom.
export const defaultEventRegisterVia = "discord"; // "discord" | "whatsapp"

export const events = [{
    id: "ev1",
    title: "Summer Survival Event",
    date: "2026-08-15",
    prize: "Rp 2.000.000 + Rank Astra",
    participants: 128,
    image: "/assets/events/survival-island.svg",
    description: "Event bertahan hidup musim panas di pulau tropis custom. Kumpulkan resource, bangun base, dan jadi tim terkuat.",
    content: "Summer Survival Event mengajak seluruh pemain untuk bertahan hidup di pulau tropis custom yang dirancang khusus untuk musim panas ini. Kumpulkan resource langka, bangun base pertahanan, dan bentuk aliansi dengan pemain lain untuk bertahan dari tantangan lingkungan dan mob custom yang muncul.\n\nTim dengan waktu bertahan terlama dan base terkuat akan dinilai oleh staff berdasarkan kreativitas, ketahanan, dan kerja sama tim. Pastikan untuk mendaftar lewat Discord sebelum event dimulai agar timmu tercatat di leaderboard resmi.\n\nHadiah utama berupa Rp 2.000.000 plus Rank Astra akan diberikan ke tim juara, dengan hadiah hiburan untuk runner-up. Event ini terbuka untuk semua pemain aktif, baik solo maupun tim hingga 4 orang.",
    registerVia: "discord"
  },
  {
    id: "ev2",
    title: "Crystal Dungeon Raid",
    date: "2026-08-20",
    prize: "Crystal Crate + $1.000.000",
    participants: 64,
    image: "/assets/news/patch-dungeon.svg",
    description: "Raid dungeon baru dengan boss Crystal Warden. Tim 4 pemain, first clear mendapat hadiah spesial.",
    content: "Dungeon baru Crystal Dungeon Raid menghadirkan boss custom Crystal Warden dengan mekanik serangan bertahap dan fase-fase unik yang menuntut kerja sama tim yang solid. Bentuk tim berisi 4 pemain untuk menantang dungeon ini bersama-sama.\n\nSetiap fase boss memiliki mekanik berbeda — mulai dari serangan area, summon minion, hingga fase enrage di akhir pertarungan. Tim yang berhasil melakukan first clear akan tercatat di hall of fame server dan mendapatkan hadiah spesial.\n\nHadiah mencakup Crystal Crate eksklusif dan $1.000.000 in-game money untuk tim first clear, dengan reward tambahan untuk seluruh peserta yang berhasil menyelesaikan dungeon selama periode event berlangsung.",
    registerVia: "whatsapp",
    registerWhatsappText: "Halo, saya mau daftar tim untuk Crystal Dungeon Raid!"
  },
];

// ---- Helpers ----
export const getNewsById = (id) => news.find((n) => n.id === id);
export const getEventById = (id) => events.find((e) => e.id === id);

// Format tanggal event dari "YYYY-MM-DD" (ISO) jadi "D Bulan YYYY" (tanggal dulu,
// baru bulan, baru tahun — bukan kebalikannya), contoh: "2026-08-15" -> "15 Agustus 2026".
export const formatEventDate = (isoDate) => {
  if (!isoDate) return "";
  const parsed = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return isoDate; // fallback kalau format tidak dikenali
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(parsed);
};

// Link pendaftaran event — bisa diatur per-event ("registerVia": "discord" | "whatsapp")
// lewat field di data event, atau pakai default global di bawah kalau event tidak
// menentukan sendiri. Isi "registerWhatsappText" per-event untuk pesan WA custom.
export const getEventRegisterLink = (event) => {
  const via = event?.registerVia || defaultEventRegisterVia;
  if (via === "whatsapp") {
    const text = event?.registerWhatsappText || `Halo, saya mau daftar event "${event?.title}" di ${serverConfig.name}.`;
    return {
      via: "whatsapp",
      url: `https://wa.me/${serverConfig.whatsappNumber}?text=${encodeURIComponent(text)}`,
      label: "Daftar via WhatsApp"
    };
  }
  return {
    via: "discord",
    url: serverConfig.discordUrl,
    label: "Daftar via Discord"
  };
};
export const formatRupiah = (n) => "Rp " + Number(n).toLocaleString("id-ID");

// Unified product lookup for product detail & store filtering
export const allProducts = [
  ...ranks.map((r) => ({
    ...r,
    type: "rank",
    category: "ranks"
  })),
  ...moneyPackages.map((m) => ({
    ...m,
    type: "money",
    name: m.name,
    icon: m.icon
  })),
  ...keys.map((k) => ({
    ...k,
    type: "key"
  })),
];

export const getProductById = (id) => allProducts.find((p) => p.id === id);