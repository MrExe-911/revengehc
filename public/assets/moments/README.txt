Taruh file-file foto Moments kamu di folder ini (contoh: 1.jpeg, 2.jpeg, dst).
Lalu di src/lib/serverConfig.js, di array `moments`, isi field image dengan path:

  image: "/assets/moments/1.jpeg"

(pakai tanda "/" di depan, BUKAN "public/assets/...").
