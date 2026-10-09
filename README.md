# Devit AI Engineer OS

Command center pribadi untuk perjalanan 90 hari menuju AI Engineer.

## Menjalankan secara lokal

1. `npm install`
2. Salin `.env.example` ke `.env`, isi `DATABASE_URL` dengan connection string PostgreSQL (mis. Neon).
3. `npx prisma migrate dev --name init`
4. `npm run db:seed`
5. `npm run dev`, lalu buka http://localhost:3000 (pakai `localhost`, bukan alamat IP).

## Deploy ke Vercel

1. Push repo ke GitHub, import di vercel.com.
2. Tambahkan environment variable `DATABASE_URL` (connection string yang sama dengan `.env`).
3. Deploy. Setiap `git push` berikutnya otomatis ter-deploy.

## Mengubah roadmap

Edit `CURRICULUM` di `prisma/seed.ts`, lalu jalankan `npm run db:seed`. Aman diulang: progres, task,
dan Objektif yang sudah kamu edit manual tidak ditimpa.
