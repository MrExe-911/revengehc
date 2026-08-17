File `qris.jpg` di folder ini adalah kode QRIS pembayaran yang ditampilkan di
halaman checkout Store (saat pembeli klik "Bayar Sekarang").

Untuk ganti QRIS (misal pindah rekening/merchant, atau QRIS kadaluarsa dan
kamu generate ulang dari aplikasi bank/e-wallet kamu):
1. Ganti file "qris.jpg" ini dengan file QRIS baru (nama file HARUS tetap
   persis "qris.jpg", format JPG/PNG keduanya boleh selama ekstensi filenya
   tetap .jpg — atau ubah juga path-nya di serverConfig.js -> qrisImageUrl).
2. Update juga `qrisMerchantName` di serverConfig.js kalau nama merchant beda.

CATATAN KEAMANAN: kode QRIS itu sendiri AMAN untuk ditampilkan publik (memang
didesain untuk discan siapa saja) — bukan seperti password/API key. Yang perlu
kamu jaga adalah akses ke akun bank/e-wallet penerima dana, bukan gambar QR-nya.
