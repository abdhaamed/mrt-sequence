# MyMRTJ Ecosystem - End-to-End Sequence Diagram Preview

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-00A3E0?style=for-the-badge&logo=github)](https://abdhaamed.github.io/mrt-sequence/)
[![MRT Jakarta](https://img.shields.io/badge/PT%20MRT%20Jakarta-MyMRTJ%20App-004B87?style=for-the-badge)](https://jakartamrt.co.id/)
[![Tailwind CSS Icons](https://img.shields.io/badge/Icons-Tailwind%20%2F%20Lucide%20SVG-38BDF8?style=for-the-badge&logo=tailwindcss)](https://lucide.dev/)
[![Mermaid.js](https://img.shields.io/badge/Diagram-Mermaid.js%20v10-FF3E00?style=for-the-badge&logo=mermaid)](https://mermaid.js.org/)

Halaman web preview interaktif untuk **Sequence Diagram End-to-End Ekosistem MyMRTJ (MRT Jakarta)**. Dirancang khusus untuk memvisualisasikan seluruh alur transaksi terpadu end-to-end secara jelas dan terpusat tanpa distraksi.

🔗 **Akses Preview Web (GitHub Pages):**  
👉 **[https://abdhaamed.github.io/mrt-sequence/](https://abdhaamed.github.io/mrt-sequence/)**

---

## Fitur Preview

- **Tampilan End-to-End Penuh**: Memvisualisasikan seluruh 7 skenario interaksi dalam satu alur utuh.
- **Pan & Zoom Canvas**: Memperbesar, memperkecil, dan menggeser canvas diagram dengan mulus.
- **Unduh Format Vektor & Gambar**: Ekspor diagram langsung ke format **SVG** atau **PNG** resolusi tinggi.
- **Salin Kode Mermaid**: Menyalin kode sumber diagram dengan satu klik.
- **Layar Penuh (Fullscreen)**: Mode presentasi layar penuh.

---

## Sequence Diagram End-to-End

```mermaid
sequenceDiagram
    autonumber
    actor User as Pengguna
    participant App as MyMRTJ App
    participant API as MRT Link API
    participant Auth as Auth Service
    participant Journey as Journey Builder
    participant MRT as MRT System
    participant Feeder as Feeder Partner API
    participant Payment as Payment Gateway
    participant Notif as Notification Service
    participant Reward as Reward/Loyalty Service
    participant DB as Database
    actor Admin as Admin

    %% ==========================================
    %% SCENARIO 1: REGISTRASI & LOGIN
    %% ==========================================
    Note over User,DB: SCENARIO 1: Registrasi & Login
    User->>App: Buka aplikasi & login
    App->>Auth: Verifikasi kredensial
    Auth->>DB: Cek data pengguna
    DB-->>Auth: Data valid
    Auth-->>App: Token autentikasi
    App-->>User: Berhasil login

    %% ==========================================
    %% SCENARIO 2: BANDINKAN MODA (MRT CONVERSION)
    %% ==========================================
    Note over User,Feeder: SCENARIO 2: Bandingkan Moda (MRT Conversion)
    User->>App: Input asal & tujuan
    App->>API: Request perbandingan moda
    API->>API: Hitung estimasi kendaraan pribadi
    API->>MRT: Request jadwal MRT
    MRT-->>API: Jadwal & tarif MRT
    API->>Feeder: Request ketersediaan feeder
    Feeder-->>API: Rute & tarif feeder
    API->>API: Bandingkan waktu & biaya
    API-->>App: Tampilkan perbandingan
    App-->>User: Motor/Mobil vs Feeder+MRT

    %% ==========================================
    %% SCENARIO 3: JOURNEY BUILDER
    %% ==========================================
    Note over User,Feeder: SCENARIO 3: Journey Builder (Rencana Perjalanan)
    User->>App: Pilih opsi Feeder+MRT
    App->>Journey: Request rencana perjalanan
    Journey->>MRT: Dapatkan rute MRT optimal
    MRT-->>Journey: Rute & waktu MRT
    Journey->>Feeder: Dapatkan feeder terdekat
    Feeder-->>Journey: Lokasi & jadwal feeder
    Journey->>Journey: Integrasi first-mile + MRT + last-mile
    Journey->>DB: Simpan preferensi pengguna
    Journey-->>App: Tampilkan itinerary lengkap
    App-->>User: Rencana perjalanan door-to-door

    %% ==========================================
    %% SCENARIO 4: PARTNER BOOKING
    %% ==========================================
    Note over User,Payment: SCENARIO 4: Partner Booking (Pesan & Bayar)
    User->>App: Konfirmasi pemesanan
    App->>API: Request booking terintegrasi
    API->>Feeder: Booking feeder (pick-up)
    Feeder->>Feeder: Cek ketersediaan driver
    Feeder-->>API: Konfirmasi feeder tersedia
    API->>MRT: Reserve tiket MRT
    MRT-->>API: Tiket MRT berhasil
    API->>API: Hitung total harga (feeder + MRT)
    API->>Payment: Request pembayaran
    Payment->>User: Tampilkan metode pembayaran
    User->>Payment: Konfirmasi pembayaran
    Payment->>Payment: Proses transaksi
    Payment-->>API: Pembayaran berhasil
    API->>Feeder: Kirim detail pesanan
    API->>MRT: Aktivasi tiket MRT
    API->>DB: Simpan transaksi
    API->>Notif: Kirim notifikasi booking
    Notif->>App: Push notification
    App-->>User: Booking confirmed + QR code

    %% ==========================================
    %% SCENARIO 5: CONNECTION ASSIST
    %% ==========================================
    Note over User,Notif: SCENARIO 5: Connection Assist (Real-Time)
    User->>App: Pantau perjalanan
    App->>Notif: Request real-time update
    Notif->>Feeder: Track lokasi feeder
    Feeder-->>Notif: GPS location feeder
    Notif->>MRT: Cek status kereta
    MRT-->>Notif: Jadwal real-time MRT
    Notif->>Notif: Analisis koneksi
    alt Feeder tepat waktu
        Notif-->>App: Feeder on-time
        App-->>User: Notifikasi hijau
    else Feeder terlambat
        Notif->>API: Alert keterlambatan
        API->>API: Cari alternatif feeder
        API->>Notif: Kirim opsi alternatif
        Notif-->>App: Warning + alternatif
        App-->>User: Notifikasi kuning + rebooking
    end

    %% ==========================================
    %% SCENARIO 6: PERJALANAN & COMPLETION
    %% ==========================================
    Note over User,DB: SCENARIO 6: Perjalanan Selesai
    User->>App: Scan QR di stasiun
    App->>MRT: Validasi tiket
    MRT-->>App: Akses granted
    User->>MRT: Naik MRT
    MRT->>DB: Log boarding
    User->>MRT: Turun di stasiun tujuan
    MRT->>DB: Log alighting
    DB->>Reward: Trigger reward calculation
    Reward->>DB: Cek riwayat pengguna
    Reward->>Reward: Hitung Marti Point
    Reward->>DB: Update poin pengguna
    DB-->>App: Journey completed
    App-->>User: +100 Marti Point + feedback form

    %% ==========================================
    %% SCENARIO 7: ANALYTICS (ADMIN)
    %% ==========================================
    Note over Admin,DB: SCENARIO 7: Analytics & Reporting
    Admin->>API: Request dashboard data
    API->>DB: Query transaksi harian
    API->>DB: Query konversi pengguna
    API->>DB: Query revenue feeder+MRT
    DB-->>API: Aggregated data
    API->>API: Generate insights
    API-->>Admin: Dashboard + KPI metrics
```

---

## 7 Skenario yang Dicakup

1. **Registrasi & Login**: Autentikasi kredensial pengguna dan penerbitan token sesi JWT.
2. **Bandingkan Moda (MRT Conversion)**: Komparasi waktu dan biaya moda pribadi vs Feeder + MRT.
3. **Journey Builder**: Integrasi rute door-to-door (first-mile + MRT + last-mile).
4. **Partner Booking**: Pemesanan terpadu armada feeder dan tiket MRT dalam single checkout.
5. **Connection Assist**: Pelacakan posisi GPS feeder dan alert auto-rebooking kereta jika terlambat.
6. **Perjalanan & Completion**: Validasi gate stasiun dan perolehan reward Marti Point.
7. **Analytics (Admin)**: Dashboard KPI transaksi harian dan agregasi revenue multi-moda.

---

## Menjalankan Secara Lokal

```bash
git clone https://github.com/abdhaamed/mrt-sequence.git
cd mrt-sequence
python -m http.server 8000
```
Buka browser di `http://localhost:8000`.

---

© 2026 MyMRTJ Ecosystem Architecture.
