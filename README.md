# Pemrograman Web - Week 11: Fundamental React

Aplikasi **Manajemen Produk** dibangun dengan **React 19**, **Bun**, dan **Tailwind CSS v4** untuk memenuhi tugas praktikum Pemrograman Web - Fundamental React (Slide 27).

---

## 📸 Fitur & Tampilan Antarmuka

Aplikasi mereplikasi dan menyempurnakan spesifikasi tampilan pada slide praktikum dengan gaya visual yang bersih, fungsional, dan ramah pengguna:

1. **Halaman Utama (Product Catalog)**
   - Header aplikasi: judul *Manajemen Produk*, deskripsi, dan tombol aksi utama `+ Tambah Produk`.
   - Bilah pencarian produk (*live search*) dengan penghitung total item.
   - Grid kartu produk responsif (1 kolom pada mobile, 2 kolom pada tablet, 3 kolom pada desktop).
   - Setiap kartu menampilkan badge `ID: {id}`, nama produk, harga terformat Rupiah (`Rp{price}`), serta tombol aksi `Edit` dan `Hapus`.
   - Ringkasan tampilan di footer (*Menampilkan X dari Y produk*) serta tombol *Reset ke Data Awal*.

2. **Pop-up Tambah Produk**
   - Modal input untuk menambah produk baru ke dalam daftar.
   - Validasi data input: nama produk wajib diisi dan harga harus berupa angka lebih dari 0.
   - Penomoran ID secara otomatis bertambah (*auto-increment*).

3. **Pop-up Edit Produk**
   - Modal edit dengan data yang telah terisi (*pre-filled*) sesuai kartu yang dipilih.
   - Menampilkan badge ID produk yang sedang disunting.
   - Memperbarui data produk secara instan ke state aplikasi dan penyimpanan lokal.

4. **Pop-up Konfirmasi Hapus Produk**
   - Dialog peringatan konfirmasi sebelum menghapus item permanen.
   - Menampilkan kartu ringkasan produk (ID, Nama, Harga) yang akan dihapus.

5. **Penyimpanan Lokal (LocalStorage Persistence)**
   - Setiap penambahan, pembaruan, maupun penghapusan data tersimpan di `localStorage` peramban sehingga tidak hilang saat halaman direfresh.

---

## 🏗️ Struktur Proyek (Atomic Design)

Sesuai materi *Atomic Design* pada slide perkuliahan:

```text
src/
├── components/
│   ├── atoms/          # Komponen dasar (Button, Input, Modal)
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   └── Modal.jsx
│   ├── molecules/      # Komposisi atom (SearchBar, ProductCard)
│   │   ├── ProductCard.jsx
│   │   └── SearchBar.jsx
│   └── organisms/      # Komponen fungsional lengkap & modal dialog
│       ├── AddProductModal.jsx
│       ├── DeleteProductModal.jsx
│       ├── EditProductModal.jsx
│       ├── Header.jsx
│       └── ProductGrid.jsx
├── data/               # Data inisial bawaan tugas
│   └── initialProducts.js
├── utils/              # Fungsi pembantu (format Rupiah, parser harga)
│   └── formatters.js
├── App.jsx             # State orchestration & layout utama
├── index.css           # Styling dasar Tailwind CSS v4
└── main.jsx            # Entry point React 19
```

---

## 🚀 Panduan Menjalankan Proyek

### Prasyarat
- [Bun](https://bun.sh/) (v1.2+) terpasang pada komputer Anda.

### Langkah-langkah
1. **Clone repositori:**
   ```bash
   git clone git@github.com:evandrarf/pemweb-week-11.git
   cd pemweb-week-11
   ```

2. **Pindah ke branch `dev` (jika ingin mereview pekerjaan):**
   ```bash
   git checkout dev
   ```

3. **Install dependensi:**
   ```bash
   bun install
   ```

4. **Jalankan server pengembangan:**
   ```bash
   bun dev
   ```
   Buka peramban pada alamat [http://localhost:5173](http://localhost:5173).

5. **Build produksi:**
   ```bash
   bun run build
   ```
