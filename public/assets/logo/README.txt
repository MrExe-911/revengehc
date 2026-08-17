Taruh file logo server kamu di sini dengan nama persis "logo.jpg" (idealnya
persegi/1:1, minimal 512x512 biar tajam di semua ukuran).

File ini dipakai otomatis untuk 3 tempat:
1. Logo di sebelah kiri nama server (Navbar & Footer)
2. Favicon / icon tab browser (index.html)
3. Icon PWA / "Add to Home Screen" (manifest.json)

Kalau mau ganti nama file atau format (mis. logo.png), update juga path-nya di:
- src/lib/serverConfig.js -> logoUrl
- index.html -> <link rel="icon" ...>
- public/manifest.json -> icons[0].src

Kosongkan logoUrl ("") di serverConfig.js untuk kembali ke ikon kotak default
(tidak memengaruhi favicon/manifest, itu tetap perlu file logo.jpg manual).
