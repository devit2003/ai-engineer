# Devit AI Engineer OS

Command center pribadi untuk perjalanan 90 hari menuju AI Engineer + AI Automation Builder.

## Menjalankan secara lokal

1. `npm install`
2. Salin `.env.example` ke `.env` dan isi `DATABASE_URL` dengan koneksi PostgreSQL-mu.
3. `npx prisma generate`
4. `npx prisma migrate dev --name init`
5. `npm run db:seed` — mengisi 90 hari kurikulum ke database.
6. `npm run dev` — buka http://localhost:3000

## Status implementasi

- **Fase 1 (selesai):** setup proyek, layout, navigasi (sidebar desktop + bottom nav mobile), dashboard & semua halaman dengan empty state — seluruhnya berbahasa Indonesia.
- **Fase 2 (sebagian):** skema Prisma lengkap, seed 90 hari kurikulum, `progress.service.ts` (kalkulasi progres murni, tidak disimpan statis), `learningDay.repo.ts`. Belum: wiring halaman ke data asli (menunggu `prisma generate` dijalankan di lingkungan dengan akses jaringan penuh — lihat catatan di bawah).

### Catatan penting
`prisma generate` / `migrate` tidak bisa dijalankan di sandbox pengembangan ini karena `binaries.prisma.sh` diblokir oleh whitelist jaringan sandbox. Jalankan kedua perintah itu di mesinmu sendiri atau CI — skema dan seed script sudah siap pakai.
