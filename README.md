# Belajar Vibe Coding - REST API

REST API modern menggunakan **Bun**, **ElysiaJS**, **Drizzle ORM**, dan **MySQL**.

## 🚀 Tech Stack
- **Runtime**: [Bun](https://bun.sh)
- **Framework**: [ElysiaJS](https://elysiajs.com)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team)
- **Database**: MySQL

---

## 🛠️ Persiapan & Instalasi

### 1. Install Dependencies
```bash
bun install
```

### 2. Konfigurasi Environment
Salin file `.env.example` ke `.env` lalu sesuaikan kredensial database MySQL Anda:
```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=belajar_vibe_coding
```

### 3. Database Migration
Generate file migration atau jalankan push schema langsung ke database MySQL:

- **Generate migration**:
  ```bash
  bun run db:generate
  ```
- **Push schema langsung ke database**:
  ```bash
  bun run db:push
  ```
- **Jalankan migration**:
  ```bash
  bun run db:migrate
  ```

---

## 🏃 Menjalankan Server

- Mode development (hot-reload):
  ```bash
  bun run dev
  ```
- Mode production:
  ```bash
  bun run start
  ```

Server akan berjalan di `http://localhost:3000`.

---

## 📚 Endpoint API

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/` | Health check & info API |
| `GET` | `/items` | Mendapatkan semua data items |
| `GET` | `/items/:id` | Mendapatkan detail item berdasarkan ID |
| `POST` | `/items` | Menambahkan item baru (Body: `{ name, description }`) |
| `PUT` | `/items/:id` | Mengubah item berdasarkan ID |
| `DELETE` | `/items/:id` | Menghapus item berdasarkan ID |

