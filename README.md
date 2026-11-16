# Our Journey — Raihan Fadhlurahman & Arum Mutiasari 💍

Website presentasi romantis interaktif yang didedikasikan khusus oleh **Raihan Fadhlurahman** untuk **Arum Mutiasari**. Berisi kisah awal mula pertemuan, alasan memilih Arum, rencana masa depan, kalkulator finansial interaktif, rencana alokasi anggaran pernikahan (*Wedding Budget Planner*), galeri kenangan, dan surat cinta.

---

## 🌹 Fitur Utama

1. **Access Portal (Gerbang Akses Romantis)**
   - Akses presentasi dilindungi kode spesial: `09112026` (tanggal jadian saat nonton film pertama bersama).
   - Efek konfeti saat terbuka & tersimpan selama sesi browser.

2. **Landing Page**
   - Judul utama: *Presentasi awal Journey of Raihan Fadhlurahman dan Arum Mutiasari*.
   - Foto romantis pasangan (`hero-landing.webp`), intro puitis, dan navigasi mulus.

3. **Tentang Raihan (Calon Pasangan Hidup)**
   - Profil lengkap, keluarga tercinta (Ibu Sri Suhartiningsih & Ayah Rheinold Thamrin), karir di PLN Icon+, hobi traveling & simulator games, karakteristik fisik (±180 cm, ±90 kg), dan kontak lengkap.

4. **Our Story — Why I Choose Arum**
   - Garis waktu perjalanan hubungan:
     - 26 Oktober 2026 — First Connection (TikTok)
     - 29 Oktober 2026 — Moving to WhatsApp
     - 7 November 2026 — First Meeting (Pernikahan teman Arum, seruan *"Sukaaaaaa!"*)
     - 9 November 2026 — Our First Movie (*"Gak Ada Matinya"*, gandengan tangan & komitmen pernikahan)
   - Bagian khusus: *Why I Choose Arum* & Doa Keluarga Sakinah, Mawaddah, Warahmah (SAMAWA).

5. **Our Future Timeline**
   - 2027: Building Our Foundation (menabung bersama, adaptasi, silaturahmi keluarga)
   - 2028: A Step Closer (target pertunangan/lamaran resmi)
   - 2029: Our Wedding (target menikah)
   - Ikhtiar seimbang antara persiapan tempat tinggal dan pernikahan.

6. **Interactive Financial Planner**
   - **Mode A (Target-Based):** Input target total dana, tanggal mulai & selesai, tabungan awal, dan rasio kontribusi (70:30, 50:50, dsb.).
   - **Mode B (Capacity-Based):** Input kemampuan menabung bulanan masing-masing, melihat proyeksi tabungan & estimasi waktu capai target.
   - Grafik interaktif Recharts (Area pertumbuhan tabungan & Proporsi Donut Chart).
   - Format Rupiah (Rp).

7. **Wedding Budget Planner**
   - Alokasi anggaran pernikahan interaktif:
     - Venue & Catering (40%)
     - Dekorasi Pelaminan (15%)
     - Dokumentasi Foto & Video (10%)
     - Busana & Makeup (10%)
     - Seserahan & Mas Kawin (8%)
     - Undangan & Souvenir (5%)
     - Dana Cadangan / Tak Terduga (12%)
   - Dapat menambah, mengubah nominal/persentase, menghapus kategori, serta validasi 100%.

8. **Our Little Memories**
   - Galeri foto polaroid/scrapbook dari momen-momen pertemuan dengan caption dan fitur zoom modal.

9. **A Letter for Arum**
   - Surat cinta personal dengan interaksi buka amplop.
   - Teks surat mudah disunting sewaktu-waktu di `src/data/letter.ts`.

10. **Unduh PDF Rencana Finansial**
    - Tombol *Download Financial Plan PDF* yang menyusun dokumen rapi sesuai input riil pengguna.

11. **Pemutar Musik Latar (Opsional)**
    - Kontrol Play/Pause mengambang di pojok layar yang ramah pengguna.

---

## 🛠️ Menjalankan di Komputer Lokal

1. Buka terminal di folder project:
   ```bash
   npm run dev
   ```
2. Buka peramban di alamat: `http://localhost:3000`
3. Masukkan kode akses: `09112026`

---

## 🚀 Deployment ke GitHub Pages

Project ini sudah dikonfigurasi dengan path relatif (`base: './'`) sehingga dapat langsung di-deploy:

1. Buat build produksi:
   ```bash
   npm run build
   ```
2. Folder `dist/` berisi seluruh file statis yang siap diunggah ke branch `gh-pages` atau via GitHub Actions.

---

## 💌 Menyunting Surat untuk Arum

Isi surat cinta dapat diubah kapan saja dengan membuka file:
`src/data/letter.ts`
Lalu perbarui isi array `paragraphs` sesuai pesan yang ingin disampaikan.
