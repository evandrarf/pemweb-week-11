# Pemrograman Web - Week 11: Fundamental React

Aplikasi **Manajemen Produk** dibangun dengan React dan runtime Bun untuk memenuhi tugas praktikum Pemrograman Web (Week 11 - Fundamental React).

## Fitur Utama
- **Katalog Produk:** Menampilkan daftar kartu produk dengan ID, nama, dan harga terformat (Rupiah).
- **Pencarian Produk:** Filter langsung berdasarkan nama produk dengan penghitung hasil.
- **Tambah Produk (Modal):** Menambahkan produk baru dengan validasi form (harga > 0).
- **Edit Produk (Modal):** Memperbarui nama dan harga produk yang sudah ada.
- **Hapus Produk (Modal):** Konfirmasi hapus produk dengan dialog peringatan dan preview kartu.

## Teknologi
- **Runtime & Package Manager:** Bun
- **Frontend Framework:** React 19
- **Bundler:** Vite
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React

## Cara Menjalankan
1. Pastikan Bun terpasang pada sistem.
2. Jalankan perintah instalasi dependensi:
   ```bash
   bun install
   ```
3. Jalankan server pengembangan:
   ```bash
   bun dev
   ```
4. Buka browser pada URL yang ditampilkan (default: `http://localhost:5173`).
