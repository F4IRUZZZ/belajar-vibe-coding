# Project Planning

## Ringkasan
Buat REST API project baru di folder ini menggunakan **Bun** sebagai runtime, **ElysiaJS** sebagai framework, **Drizzle ORM** untuk database layer, dan **MySQL** sebagai database.

---

## Tech Stack
- **Runtime**: Bun
- **Framework**: ElysiaJS
- **ORM**: Drizzle ORM
- **Database**: MySQL

---

## Langkah-langkah

### 1. Inisialisasi Project
- Inisialisasi project baru menggunakan `bun init`
- Tambahkan dependency: `elysia`, `drizzle-orm`, `mysql2`, `drizzle-kit`

### 2. Konfigurasi Database
- Buat file konfigurasi koneksi MySQL (host, port, user, password, database)
- Setup Drizzle config (`drizzle.config.ts`)

### 3. Buat Schema Database
- Definisikan schema tabel menggunakan Drizzle schema builder
- Jalankan migration ke database MySQL

### 4. Setup Server ElysiaJS
- Inisialisasi Elysia app
- Buat struktur routing dasar (misalnya `/api/...`)
- Integrasikan Drizzle sebagai database client di dalam handler

### 5. Buat Endpoint CRUD (Contoh)
- `GET /items`    -- ambil semua data
- `POST /items`   -- tambah data baru
- `PUT /items/:id` -- update data
- `DELETE /items/:id` -- hapus data

### 6. Jalankan Project
- Gunakan `bun run dev` atau `bun index.ts` untuk menjalankan server

---

## Catatan
- Gunakan environment variable (`.env`) untuk menyimpan kredensial database
- Sesuaikan nama tabel/entity sesuai kebutuhan bisnis
