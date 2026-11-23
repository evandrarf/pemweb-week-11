# Pemrograman Web - Week 11: Fundamental React & Integrasi Backend Express.js

Aplikasi **Manajemen Produk** dibangun dengan **React 19**, **Bun**, dan **Tailwind CSS v4** yang diintegrasikan langsung dengan REST API **Express.js + Prisma ORM + PostgreSQL** (`week-10`). Proyek ini mengimplementasikan pengelolaan **state & effect**, pengambilan data dari server backend, serta penanganan 4 kondisi antarmuka (**loading**, **sukses**, **kosong**, dan **error**).

---

## 🎯 Capaian Pembelajaran Praktikum

1. **State & Effect Management (`useState`, `useEffect`)**:
   - Memahami siklus hidup komponen React saat pertama kali dimuat (*mount*).
   - Mengambil data asinkron dari server backend Express.js menggunakan `useEffect` dengan pola *cleanup/cancellation* aman.
   - Mengelola state status aplikasi: `products` (data katalog), `isLoading` (indikator pemuatan), `error` (pesan kegagalan), serta `searchQuery` (filter nama).

2. **4 Kondisi Antarmuka Pengguna (UI States)**:
   - ⏳ **Loading State**: Menampilkan grid *skeleton loader* beranimasi (`animate-pulse`) yang mereplikasi kartu produk saat server sedang merespons request.
   - ✅ **Success State**: Menampilkan daftar kartu produk responsif dari database PostgreSQL, lengkap dengan informasi ID, nama, format harga Rupiah, bilah pencarian *live search*, dan ringkasan jumlah item.
   - 📭 **Empty State**: Tampilan visual khusus dengan pesan informatif:
     - *Empty Database*: Saat basis data belum memiliki produk, disertai tombol pintasan `+ Tambah Produk Baru`.
     - *Empty Search*: Saat kata kunci pencarian tidak ditemukan, disertai tombol `Hapus Pencarian`.
   - ⚠️ **Error State**: Banner peringatan interaktif saat koneksi ke server backend gagal/terputus, lengkap dengan tip troubleshooting dan tombol aksi **"Coba Lagi" (Retry)** untuk mencoba memuat ulang data.

3. **Operasi CRUD Terintegrasi Penuh ke Backend**:
   - `GET /products` : Mengambil seluruh data produk dari database.
   - `POST /products` : Menambah produk baru ke database dengan validasi nama dan harga.
   - `PUT /products/:id` : Memperbarui data nama dan harga produk di database.
   - `DELETE /products/:id` : Menghapus produk secara permanen dari database.

4. **Feedback & Notifikasi Interaktif**:
   - Indikator status tombol *Menyimpan...* / *Menghapus...* saat request mutasi data sedang dikirim.
   - *Toast notification* otomatis saat operasi CRUD berhasil dijalankan.
   - Tombol **Segarkan / Refresh** pada header untuk sinkronisasi instan dengan server.

---

## 🏗️ Struktur Proyek (Atomic Design)

```text
src/
├── components/
│   ├── atoms/          # Komponen dasar atomik
│   │   ├── Button.jsx          # Tombol reusable dengan berbagai varian
│   │   ├── Input.jsx           # Input teks/angka dengan label & validasi
│   │   ├── Modal.jsx           # Kontainer pop-up dialog
│   │   └── Skeleton.jsx        # Placeholder loading beranimasi pulse
│   ├── molecules/      # Komposisi atom
│   │   ├── ErrorAlert.jsx      # Kartu error backend dengan tombol retry
│   │   ├── ProductCard.jsx     # Kartu informasi produk + tombol edit/hapus
│   │   └── SearchBar.jsx       # Bilah pencarian + counter produk
│   └── organisms/      # Komponen kompleks & dialog aksi
│       ├── AddProductModal.jsx    # Pop-up tambah produk ke API
│       ├── DeleteProductModal.jsx # Pop-up konfirmasi hapus dari API
│       ├── EditProductModal.jsx   # Pop-up edit produk ke API
│       ├── Header.jsx             # Header dengan judul & tombol aksi/refresh
│       └── ProductGrid.jsx        # Pengelola 4 kondisi tampilan antarmuka
├── services/           # Modul komunikasi HTTP ke backend Express.js
│   └── api.js          # Fetch client untuk endpoint produk (GET, POST, PUT, DELETE)
├── utils/              # Fungsi pembantu
│   └── formatters.js   # Pemformatan mata uang Rupiah
├── App.jsx             # Orkestrasi state, effect, dan layout utama
├── index.css           # Styling Tailwind CSS v4
├── main.jsx            # Entry point React 19
└── vite.config.js      # Konfigurasi Vite & dev server proxy (/api -> :3000)
```

---

## 🚀 Panduan Menjalankan Proyek (Full Stack)

### Prasyarat
- [Bun](https://bun.sh/) (v1.2+) atau [Node.js](https://nodejs.org/) (v20+).
- Docker Desktop aktif (untuk PostgreSQL database pada `week-10`).

---

### Langkah 1: Jalankan Backend Express.js (`week-10`)
1. Buka terminal baru dan masuk ke folder `week-10`:
   ```bash
   cd ../week-10
   ```
2. Jalankan container PostgreSQL (jika belum aktif):
   ```bash
   npm run docker:up
   ```
3. Lakukan migrasi database & seeding awal:
   ```bash
   npx prisma migrate dev
   ```
4. Jalankan backend Express:
   ```bash
   npm run dev
   ```
   *Backend Express akan berjalan di `http://localhost:3000`.*

---

### Langkah 2: Jalankan Frontend React (`week-11`)
1. Buka terminal pada folder `week-11`:
   ```bash
   cd week-11
   ```
2. Pastikan berada di branch `feat/backend-api-integration`:
   ```bash
   git checkout feat/backend-api-integration
   ```
3. Install dependensi (jika belum):
   ```bash
   bun install
   ```
4. Jalankan server pengembangan Vite:
   ```bash
   bun dev
   ```
   *Aplikasi frontend dapat diakses di [http://localhost:5173](http://localhost:5173).*

---

## 🧪 Skenario Pengujian 4 Kondisi Antarmuka

| Kondisi | Cara Menguji | Tampilan yang Diharapkan |
| :--- | :--- | :--- |
| **Error** | Matikan backend Express (`Ctrl+C` di terminal `week-10`), lalu refresh halaman React. | Muncul kartu peringatan merah `Gagal Memuat Data Produk` lengkap dengan tombol **Coba Lagi**. |
| **Loading** | Klik tombol **Coba Lagi** atau tombol **Segarkan**. | Muncul 6 kartu skeleton berwarna abu-abu berdenyut halus (*pulse animation*). |
| **Sukses** | Nyalakan kembali backend Express, lalu klik **Coba Lagi**. | Muncul grid kartu produk dengan ID asli dari PostgreSQL, harga terformat Rupiah, dan counter produk. |
| **Kosong (Search)** | Ketik kata acak pada bilah pencarian (misal: `xyz123`). | Muncul kartu peringatan kosong *Produk tidak ditemukan* dengan tombol *Hapus Pencarian*. |
| **Kosong (DB)** | Hapus seluruh produk dari database. | Muncul kartu *Belum ada produk di server* dengan tombol *Tambah Produk Baru*. |

---

## 📦 Riwayat Commit Berurutan

Perubahan dalam branch `feat/backend-api-integration` dibagi ke dalam commit atomik yang terpisah:
1. `feat(api): setup API client service and Vite proxy`
2. `feat(ui): implement skeleton loader and error state components`
3. `feat(integration): implement useEffect fetching with loading, empty, and error states`
4. `feat(crud): wire create, update, and delete actions with Express backend`
5. `feat(cors): enable CORS middleware for frontend communication` *(di repository week-10)*
6. `docs: update documentation with API integration and state management guide`
