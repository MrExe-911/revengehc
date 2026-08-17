Taruh file gambar background kamu di folder ini (contoh: hero-bg.jpg).
Lalu di src/lib/serverConfig.js, ubah baris:

  backgroundImage: "/assets/backgrounds/hero-bg.jpg",

Gambar lokal di folder public/ ini akan selalu ikut ter-deploy bersama
website, jadi tidak tergantung link/CDN dari luar.
