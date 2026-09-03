// ==========================================
// MyMRTJ Ecosystem Sequence Visualizer Engine
// ==========================================

// 1. Definition of Actors with Dedicated Tailwind / Lucide Icons
const ACTORS_DATA = [
  { id: 'User', name: 'Pengguna (User)', category: 'End User', icon: 'user', iconColor: 'text-blue-400', iconBg: 'bg-blue-500/15 border-blue-500/30', desc: 'Pengguna aplikasi mobile MyMRTJ yang bepergian di koridor MRT.' },
  { id: 'App', name: 'MyMRTJ App', category: 'Client App', icon: 'smartphone', iconColor: 'text-cyan-400', iconBg: 'bg-cyan-500/15 border-cyan-500/30', desc: 'Aplikasi mobile penumpang (iOS & Android) dengan integrasi multi-moda.' },
  { id: 'API', name: 'MRT Link API', category: 'Backend Gateway', icon: 'network', iconColor: 'text-indigo-400', iconBg: 'bg-indigo-500/15 border-indigo-500/30', desc: 'API Gateway terpusat penghubung seluruh microservice & sistem mitra.' },
  { id: 'Auth', name: 'Auth Service', category: 'Security', icon: 'shield-check', iconColor: 'text-purple-400', iconBg: 'bg-purple-500/15 border-purple-500/30', desc: 'Layanan manajemen identitas, verifikasi kredensial, dan token JWT.' },
  { id: 'Journey', name: 'Journey Builder', category: 'Core Service', icon: 'navigation-2', iconColor: 'text-teal-400', iconBg: 'bg-teal-500/15 border-teal-500/30', desc: 'Mesin kalkulasi rute multi-moda (first-mile, MRT mainline, last-mile).' },
  { id: 'MRT', name: 'MRT System', category: 'Transit Core', icon: 'train-track', iconColor: 'text-emerald-400', iconBg: 'bg-emerald-500/15 border-emerald-500/30', desc: 'Sistem inti operasi MRT: ticketing, gating station, jadwal real-time.' },
  { id: 'Feeder', name: 'Feeder Partner API', category: 'Partner Integration', icon: 'bike', iconColor: 'text-amber-400', iconBg: 'bg-amber-500/15 border-amber-500/30', desc: 'Integrasi API armada pengumpan (Ojol, Ride-hailing, Bus Feeder).' },
  { id: 'Payment', name: 'Payment Gateway', category: 'Finance', icon: 'credit-card', iconColor: 'text-rose-400', iconBg: 'bg-rose-500/15 border-rose-500/30', desc: 'Pemroses transaksi QRIS, e-wallet, kartu kredit/debit secara aman.' },
  { id: 'Notif', name: 'Notification Service', category: 'Communication', icon: 'bell', iconColor: 'text-orange-400', iconBg: 'bg-orange-500/15 border-orange-500/30', desc: 'Pemberitahuan push & tracking real-time status armada dan kereta.' },
  { id: 'Reward', name: 'Reward / Loyalty', category: 'Gamification', icon: 'gift', iconColor: 'text-pink-400', iconBg: 'bg-pink-500/15 border-pink-500/30', desc: 'Manajemen Marti Point, cashback, dan program loyalitas pelanggan.' },
  { id: 'DB', name: 'Database Core', category: 'Data Store', icon: 'database', iconColor: 'text-slate-400', iconBg: 'bg-slate-500/15 border-slate-400/30', desc: 'Penyimpanan data transaksi, profil user, log perjalanan, dan log gating.' },
  { id: 'Admin', name: 'Admin / Analis', category: 'Internal User', icon: 'user-cog', iconColor: 'text-sky-400', iconBg: 'bg-sky-500/15 border-sky-500/30', desc: 'Pengelola operasional MRT Jakarta dan analis performa multi-moda.' }
];

function getActor(id) {
  return ACTORS_DATA.find(a => a.id === id) || { 
    id, 
    name: id, 
    icon: 'activity', 
    iconColor: 'text-cyan-400', 
    iconBg: 'bg-cyan-500/15 border-cyan-500/30' 
  };
}

// 2. Scenarios with Clean Mermaid Sequence and Interactive Steps
const SCENARIOS = {
  all: {
    id: 'all',
    title: 'Semua Skenario (Master End-to-End)',
    badge: 'Overview Komprehensif',
    description: 'Seluruh alur hidup interaksi pengguna dan sistem MyMRTJ dari registrasi, pemilihan moda, rencana perjalanan, pemesanan terpadu, asisten koneksi real-time, penyelesaian perjalanan, hingga analytics admin.',
    mermaidCode: `sequenceDiagram
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
    API-->>Admin: Dashboard + KPI metrics`
  },
  s1: {
    id: 's1',
    title: 'Skenario 1: Registrasi & Login',
    badge: 'Autentikasi & Keamanan',
    description: 'Proses verifikasi identitas pengguna, pengecekan data di basis data, dan penerbitan token sesi JWT untuk otentikasi di aplikasi MyMRTJ.',
    mermaidCode: `sequenceDiagram
    autonumber
    actor User as Pengguna
    participant App as MyMRTJ App
    participant Auth as Auth Service
    participant DB as Database

    Note over User,DB: SCENARIO 1: Registrasi & Login
    User->>App: Buka aplikasi & login
    App->>Auth: Verifikasi kredensial
    Auth->>DB: Cek data pengguna
    DB-->>Auth: Data valid
    Auth-->>App: Token autentikasi
    App-->>User: Berhasil login`,
    steps: [
      { step: 1, from: 'User', to: 'App', label: 'Buka aplikasi & login', desc: 'Pengguna memasukkan email/no hp dan PIN/kata sandi di layar login MyMRTJ.', tech: 'POST /api/v1/auth/login' },
      { step: 2, from: 'App', to: 'Auth', label: 'Verifikasi kredensial', desc: 'MyMRTJ App mengirimkan payload kredensial terenkripsi ke Auth Microservice.', tech: 'TLS 1.3 Payload (hash SHA-256)' },
      { step: 3, from: 'Auth', to: 'DB', label: 'Cek data pengguna', desc: 'Auth Service mengkueri record pengguna dan memeriksa hash kata sandi serta status akun.', tech: 'SELECT * FROM users WHERE phone = ?' },
      { step: 4, from: 'DB', to: 'Auth', label: 'Data valid', desc: 'Database mengembalikan status pengguna aktif dan record terverifikasi.', tech: '200 OK Record matched' },
      { step: 5, from: 'Auth', to: 'App', label: 'Token autentikasi', desc: 'Auth Service menerbitkan Access Token (JWT) dan Refresh Token untuk sesi aplikasi.', tech: 'JWT Bearer token (TTL: 24h)' },
      { step: 6, from: 'App', to: 'User', label: 'Berhasil login', desc: 'Aplikasi membuka dashboard utama dan menampilkan saldo tiket & Marti Point pengguna.', tech: 'UI State: Dashboard render' }
    ]
  },
  s2: {
    id: 's2',
    title: 'Skenario 2: Bandingkan Moda (MRT Conversion)',
    badge: 'Konversi & Perbandingan',
    description: 'Fitur komparasi cerdas yang membandingkan estimasi waktu dan biaya kendaraan pribadi (motor/mobil) vs kombinasi Feeder + MRT untuk mendorong peralihan ke transportasi publik.',
    mermaidCode: `sequenceDiagram
    autonumber
    actor User as Pengguna
    participant App as MyMRTJ App
    participant API as MRT Link API
    participant MRT as MRT System
    participant Feeder as Feeder Partner API

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
    App-->>User: Motor/Mobil vs Feeder+MRT`,
    steps: [
      { step: 1, from: 'User', to: 'App', label: 'Input asal & tujuan', desc: 'Pengguna memasukkan titik penjemputan awal dan lokasi tujuan akhir di peta.', tech: 'GeoJSON coordinates origin & destination' },
      { step: 2, from: 'App', to: 'API', label: 'Request perbandingan moda', desc: 'Aplikasi meminta kalkulasi komparasi efisiensi biaya, waktu, dan jejak karbon.', tech: 'GET /api/v1/modal-comparison' },
      { step: 3, from: 'API', to: 'API', label: 'Hitung estimasi kendaraan pribadi', desc: 'API menghitung biaya bensin, tarif tol, parkir, dan estimasi waktu macet jalanan.', tech: 'Distance Matrix & Traffic Engine' },
      { step: 4, from: 'API', to: 'MRT', label: 'Request jadwal MRT', desc: 'API meminta jadwal kedatangan kereta berikutnya dan tarif antar stasiun terdekat.', tech: 'GET /mrt/schedule-fare' },
      { step: 5, from: 'MRT', to: 'API', label: 'Jadwal & tarif MRT', desc: 'Sistem MRT mengirimkan headway 5 menit dan tarif standar.', tech: 'Tarif Lebak Bulus - Bundaran HI' },
      { step: 6, from: 'API', to: 'Feeder', label: 'Request ketersediaan feeder', desc: 'API memeriksa ketersediaan mitra feeder di radius origin/destination.', tech: 'Feeder Partner Dispatch API' },
      { step: 7, from: 'Feeder', to: 'API', label: 'Rute & tarif feeder', desc: 'Mitra feeder memberikan estimasi tarif first-mile dan last-mile.', tech: 'Feeder SLA & ETA 3-5 mins' },
      { step: 8, from: 'API', to: 'API', label: 'Bandingkan waktu & biaya', desc: 'Komparasi algoritma: Kendaraan pribadi vs Feeder + MRT.', tech: 'Savings: 30 mins, Rp 19.000, 2.1kg CO2' },
      { step: 9, from: 'API', to: 'App', label: 'Tampilkan perbandingan', desc: 'Mengirimkan respons JSON komparatif ke aplikasi pengguna.', tech: 'Comparison Card JSON' },
      { step: 10, from: 'App', to: 'User', label: 'Motor/Mobil vs Feeder+MRT', desc: 'UI menampilkan kartu perbandingan visual yang menonjolkan penghematan waktu dan biaya.', tech: 'Interactive UI Choice' }
    ]
  },
  s3: {
    id: 's3',
    title: 'Skenario 3: Journey Builder (Rencana Perjalanan)',
    badge: 'Multi-Moda Itinerary',
    description: 'Penyusunan rencana perjalanan terpadu (door-to-door) yang mengintegrasikan feeder first-mile, perjalanan utama kereta MRT, dan sambungan last-mile.',
    mermaidCode: `sequenceDiagram
    autonumber
    actor User as Pengguna
    participant App as MyMRTJ App
    participant Journey as Journey Builder
    participant MRT as MRT System
    participant Feeder as Feeder Partner API
    participant DB as Database

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
    App-->>User: Rencana perjalanan door-to-door`,
    steps: [
      { step: 1, from: 'User', to: 'App', label: 'Pilih opsi Feeder+MRT', desc: 'Pengguna mengetuk opsi perjalanan kombinasi Feeder + MRT.', tech: 'User tap event' },
      { step: 2, from: 'App', to: 'Journey', label: 'Request rencana perjalanan', desc: 'Aplikasi memanggil Journey Builder Microservice untuk memformulasi jadwal detail.', tech: 'POST /api/v1/journey/plan' },
      { step: 3, from: 'Journey', to: 'MRT', label: 'Dapatkan rute MRT optimal', desc: 'Journey Builder mencari stasiun keberangkatan dan tujuan yang paling efisien.', tech: 'Stn Fatmawati -> Stn Dukuh Atas' },
      { step: 4, from: 'MRT', to: 'Journey', label: 'Rute & waktu MRT', desc: 'Sistem MRT merespons durasi perjalanan kereta (22 menit) dan frekuensi.', tech: 'MRT Schedule Payload' },
      { step: 5, from: 'Journey', to: 'Feeder', label: 'Dapatkan feeder terdekat', desc: 'Mencari feeder first-mile menuju stasiun asal dan feeder last-mile dari stasiun akhir.', tech: 'Feeder Geo-query' },
      { step: 6, from: 'Feeder', to: 'Journey', label: 'Lokasi & jadwal feeder', desc: 'Mitra feeder mengonfirmasi armada penjemputan tersedia dengan ETA 4 menit.', tech: 'Feeder Availability OK' },
      { step: 7, from: 'Journey', to: 'Journey', label: 'Integrasi first-mile + MRT + last-mile', desc: 'Menghubungkan ketiga segmen perjalanan dengan buffer transfer aman.', tech: 'Multi-segment graph sync' },
      { step: 8, from: 'Journey', to: 'DB', label: 'Simpan preferensi pengguna', desc: 'Menyimpan rute favorit dan preferensi moda pengguna untuk personalisasi masa depan.', tech: 'INSERT INTO user_journey_prefs' },
      { step: 9, from: 'Journey', to: 'App', label: 'Tampilkan itinerary lengkap', desc: 'Mengirimkan rencana perjalanan terstruktur lengkap dengan waktu tiba dan estimasi biaya.', tech: 'Door-to-door itinerary payload' },
      { step: 10, from: 'App', to: 'User', label: 'Rencana perjalanan door-to-door', desc: 'Pengguna melihat visualisasi timeline perjalanan langkah demi langkah di peta aplikasi.', tech: 'Step-by-step Map View' }
    ]
  },
  s4: {
    id: 's4',
    title: 'Skenario 4: Partner Booking (Pesan & Bayar)',
    badge: 'Single Checkout & Tiket',
    description: 'Pemesanan sekaligus (single checkout) untuk armada feeder dan tiket MRT dalam satu transaksi pembayaran, diakhiri dengan penerbitan tiket digital QR code.',
    mermaidCode: `sequenceDiagram
    autonumber
    actor User as Pengguna
    participant App as MyMRTJ App
    participant API as MRT Link API
    participant Feeder as Feeder Partner API
    participant MRT as MRT System
    participant Payment as Payment Gateway
    participant DB as Database
    participant Notif as Notification Service

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
    App-->>User: Booking confirmed + QR code`,
    steps: [
      { step: 1, from: 'User', to: 'App', label: 'Konfirmasi pemesanan', desc: 'Pengguna menekan tombol "Bayar & Pesan Sekaligus" pada rute terpilih.', tech: 'Action button triggered' },
      { step: 2, from: 'App', to: 'API', label: 'Request booking terintegrasi', desc: 'API gateway menerima permintaan multi-order (Feeder Ride + MRT Ticket).', tech: 'POST /api/v1/booking/integrated' },
      { step: 3, from: 'API', to: 'Feeder', label: 'Booking feeder (pick-up)', desc: 'Menghubungi partner ride-hailing untuk lock harga dan order penjemputan.', tech: 'POST /partner/v1/rides/reserve' },
      { step: 4, from: 'Feeder', to: 'Feeder', label: 'Cek ketersediaan driver', desc: 'Sistem mitra mencocokkan driver pengumpan di sekitar radius penjemputan.', tech: 'Driver matching algorithm' },
      { step: 5, from: 'Feeder', to: 'API', label: 'Konfirmasi feeder tersedia', desc: 'Driver dialokasikan sementara dengan Reservation ID partner.', tech: 'Reservation confirmed (Hold 10m)' },
      { step: 6, from: 'API', to: 'MRT', label: 'Reserve tiket MRT', desc: 'Membuat reservasi tiket single-trip MRT dengan relasi stasiun asal & tujuan.', tech: 'POST /mrt/ticket/reserve' },
      { step: 7, from: 'MRT', to: 'API', label: 'Tiket MRT berhasil', desc: 'Tiket di-reserve dengan status PENDING_PAYMENT.', tech: 'Ticket ID: MRT-2026-X89K' },
      { step: 8, from: 'API', to: 'API', label: 'Hitung total harga (feeder + MRT)', desc: 'Menggabungkan biaya perjalanan: Feeder + MRT.', tech: 'Bundling calculation & discounts' },
      { step: 9, from: 'API', to: 'Payment', label: 'Request pembayaran', desc: 'Membuat payment intent / tagihan QRIS / debit saldo e-wallet.', tech: 'Create Payment Intent (Snap/QRIS)' },
      { step: 10, from: 'Payment', to: 'User', label: 'Tampilkan metode pembayaran', desc: 'Menampilkan modal pembayaran pilihan (QRIS, GoPay, AstraPay, Kartu Kredit).', tech: 'Payment Sheet UI' },
      { step: 11, from: 'User', to: 'Payment', label: 'Konfirmasi pembayaran', desc: 'Pengguna mengotorisasi pembayaran dengan PIN atau biometrik.', tech: 'PIN / Biometric Auth' },
      { step: 12, from: 'Payment', to: 'Payment', label: 'Proses transaksi', desc: 'Payment gateway memproses settlement dan debet rekening pengguna.', tech: 'Bank Settlement / Core Payment' },
      { step: 13, from: 'Payment', to: 'API', label: 'Pembayaran berhasil', desc: 'Webhook konfirmasi pembayaran sukses dikirimkan ke MRT Link API.', tech: 'Webhook payment.success 200 OK' },
      { step: 14, from: 'API', to: 'Feeder', label: 'Kirim detail pesanan', desc: 'Memfinalisasi pesanan driver feeder untuk segera meluncur ke titik jemput.', tech: 'Dispatch Driver CONFIRMED' },
      { step: 15, from: 'API', to: 'MRT', label: 'Aktivasi tiket MRT', desc: 'Mengubah status tiket menjadi ACTIVE dan menghasilkan QR payload dinamis.', tech: 'Status: ACTIVE (dynamic QR)' },
      { step: 16, from: 'API', to: 'DB', label: 'Simpan transaksi', desc: 'Mencatat transaksi terpadu ke tabel ledger pembayaran & riwayat pesanan.', tech: 'INSERT INTO orders, payments' },
      { step: 17, from: 'API', to: 'Notif', label: 'Kirim notifikasi booking', desc: 'Meminta layanan push notification mengirim konfirmasi ke device pengguna.', tech: 'FCM / APNs payload dispatch' },
      { step: 18, from: 'Notif', to: 'App', label: 'Push notification', desc: 'Notifikasi muncul: "Pesanan terkonfirmasi! Driver Anda sedang menuju ke lokasi".', tech: 'Push Received' },
      { step: 19, from: 'App', to: 'User', label: 'Booking confirmed + QR code', desc: 'Layar tiket aktif menampilkan QR Code tiket MRT terenkripsi dan info live driver.', tech: 'Render QR Pass + Live Map' }
    ]
  },
  s5: {
    id: 's5',
    title: 'Skenario 5: Connection Assist (Real-Time)',
    badge: 'Monitoring & Auto-Rebooking',
    description: 'Asisten pemantauan perjalanan secara langsung yang melacak posisi GPS feeder dan status jadwal kereta, serta memberikan peringatan dini dan opsi rebooking otomatis jika terjadi keterlambatan.',
    mermaidCode: `sequenceDiagram
    autonumber
    actor User as Pengguna
    participant App as MyMRTJ App
    participant API as MRT Link API
    participant Notif as Notification Service
    participant Feeder as Feeder Partner API
    participant MRT as MRT System

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
    end`,
    steps: [
      { step: 1, from: 'User', to: 'App', label: 'Pantau perjalanan', desc: 'Pengguna membuka tab "Live Trip" untuk melihat kemajuan perjalanan.', tech: 'Polling / WebSocket connect' },
      { step: 2, from: 'App', to: 'Notif', label: 'Request real-time update', desc: 'Aplikasi meminta telemetri status armada dan perkiraan waktu tiba stasiun.', tech: 'Subcribe /trip/{tripId}/live' },
      { step: 3, from: 'Notif', to: 'Feeder', label: 'Track lokasi feeder', desc: 'Meminta koordinat GPS terkini dan estimasi durasi penjemputan dari armada feeder.', tech: 'GPS Poll: Lat, Long, Speed' },
      { step: 4, from: 'Feeder', to: 'Notif', label: 'GPS location feeder', desc: 'Mengembalikan koordinat realtime feeder serta traffic delay terkini.', tech: 'Telemetry stream' },
      { step: 5, from: 'Notif', to: 'MRT', label: 'Cek status kereta', desc: 'Memeriksa jadwal realtime kereta MRT target keberangkatan di stasiun.', tech: 'MRT ATS / Signalling Data' },
      { step: 6, from: 'MRT', to: 'Notif', label: 'Jadwal real-time MRT', desc: 'Kereta tiba tepat waktu dalam 8 menit di peron stasiun penjemputan.', tech: 'Train ID 102 ON TIME' },
      { step: 7, from: 'Notif', to: 'Notif', label: 'Analisis koneksi', desc: 'Algoritma komputasi mengevaluasi apakah penumpang sempat pindah moda tanpa ketinggalan kereta.', tech: 'Connection Margin calculation' },
      { step: 8, from: 'Notif', to: 'App', label: 'Kondisi 1: Feeder On-time', desc: '[ALT IF ON-TIME] Estimasi tiba stasiun 4 menit sebelum kereta tiba.', tech: 'Status: GREEN (Safe Connection)' },
      { step: 9, from: 'App', to: 'User', label: 'Notifikasi hijau', desc: 'Aplikasi menampilkan indikator hijau: "Perjalanan Anda lancar dan tepat waktu".', tech: 'UI Notification Banner (Green)' },
      { step: 10, from: 'Notif', to: 'API', label: 'Kondisi 2: Feeder Terlambat', desc: '[ALT IF DELAYED] Feeder terjebak macet, ETA meleset dari jadwal kereta.', tech: 'Status: YELLOW / RED (Missed Connection)' },
      { step: 11, from: 'API', to: 'API', label: 'Cari alternatif feeder / kereta', desc: 'API secara proaktif menghitung jadwal kereta berikutnya atau rute ojol alternatif.', tech: 'Auto Re-route optimization' },
      { step: 12, from: 'API', to: 'Notif', label: 'Kirim opsi alternatif', desc: 'Menyiapkan rekomendasi penyesuaian jadwal kereta berikutnya tanpa biaya tambahan.', tech: 'Alternative Journey Options' },
      { step: 13, from: 'Notif', to: 'App', label: 'Warning + alternatif', desc: 'Aplikasi menerima alert interaktif opsi reschedule satu sentuhan.', tech: 'Interactive Push Alert' },
      { step: 14, from: 'App', to: 'User', label: 'Notifikasi kuning + rebooking', desc: 'Notifikasi peringatan: "Feeder terlambat 7 menit. Ketuk untuk beralih ke kereta pukul 08.15 gratis".', tech: 'One-click Rebook Modal' }
    ]
  },
  s6: {
    id: 's6',
    title: 'Skenario 6: Perjalanan Selesai & Marti Point',
    badge: 'Gating & Gamifikasi',
    description: 'Alur tap-in dan tap-out tiket QR di gate stasiun MRT, pembaruan status perjalanan selesai, dan perhitungan reward otomatis loyalitas Marti Point untuk penumpang.',
    mermaidCode: `sequenceDiagram
    autonumber
    actor User as Pengguna
    participant App as MyMRTJ App
    participant MRT as MRT System
    participant DB as Database
    participant Reward as Reward/Loyalty Service

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
    App-->>User: +100 Marti Point + feedback form`,
    steps: [
      { step: 1, from: 'User', to: 'App', label: 'Scan QR di stasiun', desc: 'Pengguna mendekatkan QR code dinamis di layar MyMRTJ ke scanner gate stasiun asal.', tech: 'Dynamic Encrypted QR Scanner' },
      { step: 2, from: 'App', to: 'MRT', label: 'Validasi tiket', desc: 'Gate scanner memvalidasi keabsahan QR code dan saldo tiket secara offline/online cepat (<300ms).', tech: 'Gate Validator NFC/Optical' },
      { step: 3, from: 'MRT', to: 'App', label: 'Akses granted', desc: 'Flap gate terbuka dan layar gerbang menampilkan pesan "Silakan Masuk".', tech: 'Status: BOARDED' },
      { step: 4, from: 'User', to: 'MRT', label: 'Naik MRT', desc: 'Penumpang masuk ke peron dan menaiki kereta Ratangga.', tech: 'Passenger onboard' },
      { step: 5, from: 'MRT', to: 'DB', label: 'Log boarding', desc: 'Mencatat timestamp tap-in, kode stasiun asal, dan ID gate ke database.', tech: 'INSERT INTO station_logs (type=TAP_IN)' },
      { step: 6, from: 'User', to: 'MRT', label: 'Turun di stasiun tujuan', desc: 'Penumpang tiba di stasiun tujuan dan melakukan tap-out tiket QR di gate keluar.', tech: 'Tap-out at Destination Gate' },
      { step: 7, from: 'MRT', to: 'DB', label: 'Log alighting', desc: 'Mencatat tap-out keluar stasiun, menghitung tarif akhir, dan menutup sesi tiket.', tech: 'UPDATE ticket SET status=COMPLETED' },
      { step: 8, from: 'DB', to: 'Reward', label: 'Trigger reward calculation', desc: 'Database event listener memicu event perjalanan selesai ke Reward Microservice.', tech: 'Event: journey.completed' },
      { step: 9, from: 'Reward', to: 'DB', label: 'Cek riwayat pengguna', desc: 'Reward service mengecek tier loyalitas dan streak perjalanan minggu ini.', tech: 'SELECT tier, total_trips FROM user_rewards' },
      { step: 10, from: 'Reward', to: 'Reward', label: 'Hitung Marti Point', desc: 'Perhitungan poin reward: Perjalanan multi-moda = +100 Marti Point + Green Carbon Bonus.', tech: 'Points Engine: 100 Base + Bonus' },
      { step: 11, from: 'Reward', to: 'DB', label: 'Update poin pengguna', desc: 'Menambahkan saldo poin di database profil pengguna.', tech: 'UPDATE users SET marti_points = marti_points + 100' },
      { step: 12, from: 'DB', to: 'App', label: 'Journey completed', desc: 'Aplikasi menerima push state bahwa perjalanan telah selesai 100%.', tech: 'State: TRIP_FINISHED' },
      { step: 13, from: 'App', to: 'User', label: '+100 Marti Point + feedback form', desc: 'Muncul dialog perayaan: "Selamat! Anda mendapat 100 Marti Point" serta survei kepuasan.', tech: 'Gamification Modal UI' }
    ]
  },
  s7: {
    id: 's7',
    title: 'Skenario 7: Analytics & Reporting (Admin)',
    badge: 'Business Intelligence',
    description: 'Dashboard analitik eksekutif untuk memantau performa harian operasional, rasio konversi kendaraan pribadi ke MRT, total pendapatan multi-moda, dan wawasan berbasis data.',
    mermaidCode: `sequenceDiagram
    autonumber
    actor Admin as Admin
    participant API as MRT Link API
    participant DB as Database

    Note over Admin,DB: SCENARIO 7: Analytics & Reporting
    Admin->>API: Request dashboard data
    API->>DB: Query transaksi harian
    API->>DB: Query konversi pengguna
    API->>DB: Query revenue feeder+MRT
    DB-->>API: Aggregated data
    API->>API: Generate insights
    API-->>Admin: Dashboard + KPI metrics`,
    steps: [
      { step: 1, from: 'Admin', to: 'API', label: 'Request dashboard data', desc: 'Admin operasional MRT mengakses dashboard analitik web portal.', tech: 'GET /api/v1/admin/analytics/overview' },
      { step: 2, from: 'API', to: 'DB', label: 'Query transaksi harian', desc: 'Mengambil ringkasan volume tiket terjual, jam sibuk (rush hour), dan stasiun tersibuk.', tech: 'SELECT count(*), hour FROM transactions GROUP BY hour' },
      { step: 3, from: 'API', to: 'DB', label: 'Query konversi pengguna', desc: 'Menghitung conversion rate: Berapa banyak pengguna yang beralih dari mobil/motor ke Feeder+MRT.', tech: 'Modal Conversion Rate metric (Target: >35%)' },
      { step: 4, from: 'API', to: 'DB', label: 'Query revenue feeder+MRT', desc: 'Menghitung total pendapatan gabungan tiket MRT dan komisi bagi hasil armada feeder.', tech: 'SELECT SUM(mrt_rev), SUM(feeder_rev) FROM sales' },
      { step: 5, from: 'DB', to: 'API', label: 'Aggregated data', desc: 'Database OLAP/Data Warehouse mengembalikan kumpulan data teragregasi kecepatan tinggi.', tech: 'Aggregated Analytics JSON' },
      { step: 6, from: 'API', to: 'API', label: 'Generate insights', desc: 'Mesin analitik memproses proyeksi tren, indeks kepuasan, dan penghematan emisi karbon.', tech: 'AI Insight & KPI Aggregator' },
      { step: 7, from: 'API', to: 'Admin', label: 'Dashboard + KPI metrics', desc: 'Dashboard interaktif menampilkan grafik konversi, heat map stasiun, dan performa finansial.', tech: 'Admin Executive BI Dashboard' }
    ]
  }
};

// Global state
let currentScenarioId = 'all';
let panzoomInstance = null;
let currentStepIndex = -1;
let autoPlayInterval = null;

// DOM Elements Initialization
document.addEventListener('DOMContentLoaded', () => {
  initMermaid();
  renderActorCards();
  initTabs();
  initPanzoom();
  initControls();
  switchScenario('all');
  lucide.createIcons();
});

// Initialize Mermaid with custom dark MRT styling
function initMermaid() {
  mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    securityLevel: 'loose',
    sequence: {
      diagramMarginX: 30,
      diagramMarginY: 20,
      actorMargin: 50,
      width: 150,
      height: 60,
      boxMargin: 10,
      boxTextMargin: 5,
      noteMargin: 10,
      messageMargin: 35,
      mirrorActors: true,
      bottomMarginAdj: 10,
      useMaxWidth: false,
      rightAngles: false,
      showSequenceNumbers: true
    },
    themeVariables: {
      darkMode: true,
      background: '#0F2042',
      primaryColor: '#15274E',
      primaryTextColor: '#F0F6FC',
      primaryBorderColor: '#00A3E0',
      lineColor: '#38BDF8',
      secondaryColor: '#004B87',
      tertiaryColor: '#00A651',
      noteBkgColor: '#1E293B',
      noteTextColor: '#FCD34D',
      noteBorderColor: '#FFB81C',
      actorBkg: '#15274E',
      actorBorder: '#00A3E0',
      actorTextColor: '#FFFFFF',
      actorLineColor: '#00A3E0',
      signalColor: '#38BDF8',
      signalTextColor: '#F1F5F9',
      labelBoxBkgColor: '#1E293B',
      labelBoxBorderColor: '#00A651',
      labelTextColor: '#FFFFFF',
      loopTextColor: '#00A651',
      activationBorderColor: '#00A3E0',
      activationBkgColor: '#0072CE',
      sequenceNumberColor: '#0F2042'
    }
  });
}

// Render Actor/Service Cards with Tailwind SVG Icons
function renderActorCards() {
  const container = document.getElementById('actors-catalog-grid');
  if (!container) return;

  container.innerHTML = ACTORS_DATA.map(actor => `
    <div class="glass-card p-4 rounded-xl border border-white/5 hover:border-cyan-400/30 transition duration-200 flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-3">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center border ${actor.iconBg} ${actor.iconColor} shadow-inner">
            <i data-lucide="${actor.icon}" class="w-5 h-5"></i>
          </div>
          <span class="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-800/50">
            ${actor.category}
          </span>
        </div>
        <h4 class="font-bold text-white text-sm mb-1">${actor.name}</h4>
        <p class="text-xs text-slate-300/80 leading-relaxed">${actor.desc}</p>
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

// Setup Tab Switching
function initTabs() {
  const tabButtons = document.querySelectorAll('.scenario-tab');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-scenario');
      switchScenario(targetId);
    });
  });
}

// Switch Active Scenario
async function switchScenario(scenarioId) {
  if (!SCENARIOS[scenarioId]) return;
  currentScenarioId = scenarioId;
  const scenario = SCENARIOS[scenarioId];

  // Stop any active autoplay
  stopAutoPlay();
  currentStepIndex = -1;

  // Update tab buttons active state
  document.querySelectorAll('.scenario-tab').forEach(btn => {
    const isTarget = btn.getAttribute('data-scenario') === scenarioId;
    if (isTarget) {
      btn.className = 'scenario-tab px-3.5 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all duration-150 bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-cyan-900/30 border border-cyan-400/30';
    } else {
      btn.className = 'scenario-tab px-3.5 py-2 text-xs md:text-sm font-medium rounded-lg transition-all duration-150 text-slate-300 hover:text-white hover:bg-white/5 border border-transparent';
    }
  });

  // Update Scenario Information Header
  document.getElementById('scenario-title').innerText = scenario.title;
  document.getElementById('scenario-badge').innerText = scenario.badge;
  document.getElementById('scenario-description').innerText = scenario.description;

  // Render Simulator panel if steps exist
  const simulatorSection = document.getElementById('simulator-container');
  if (scenario.steps && scenario.steps.length > 0) {
    simulatorSection.classList.remove('hidden');
    renderSimulatorSteps(scenario.steps);
  } else {
    simulatorSection.classList.add('hidden');
  }

  // Render Mermaid Diagram
  await renderDiagram(scenario.mermaidCode);

  // Re-sync Panzoom after render
  if (panzoomInstance) {
    panzoomInstance.reset();
  }

  lucide.createIcons();
}

// Render Mermaid Diagram Code
async function renderDiagram(code) {
  const container = document.getElementById('diagram-container');
  const loading = document.getElementById('diagram-loading');
  
  if (loading) loading.classList.remove('hidden');
  container.innerHTML = '';

  try {
    const uniqueId = 'mermaid-' + Math.random().toString(36).substring(2, 9);
    const { svg } = await mermaid.render(uniqueId, code);
    container.innerHTML = svg;
    
    // Add dark theme class
    const svgElem = container.querySelector('svg');
    if (svgElem) {
      svgElem.classList.add('mermaid-dark');
      svgElem.style.display = 'block';
      svgElem.style.margin = '0 auto';
    }
  } catch (err) {
    console.error('Mermaid render error:', err);
    container.innerHTML = `
      <div class="p-6 text-center text-red-400">
        <p class="font-semibold mb-2">Gagal me-render sequence diagram.</p>
        <pre class="text-xs bg-black/40 p-4 rounded text-left overflow-auto">${err.message || err}</pre>
      </div>
    `;
  } finally {
    if (loading) loading.classList.add('hidden');
  }
}

// Initialize Panzoom
function initPanzoom() {
  const viewport = document.getElementById('diagram-viewport');
  const container = document.getElementById('diagram-container');

  if (viewport && container && window.Panzoom) {
    panzoomInstance = Panzoom(container, {
      maxScale: 4,
      minScale: 0.3,
      contain: false,
      cursor: 'grab'
    });

    viewport.parentElement.addEventListener('wheel', panzoomInstance.zoomWithWheel);
  }
}

// Initialize Controls
function initControls() {
  document.getElementById('btn-zoom-in')?.addEventListener('click', () => {
    if (panzoomInstance) panzoomInstance.zoomIn();
  });

  document.getElementById('btn-zoom-out')?.addEventListener('click', () => {
    if (panzoomInstance) panzoomInstance.zoomOut();
  });

  document.getElementById('btn-reset-zoom')?.addEventListener('click', () => {
    if (panzoomInstance) panzoomInstance.reset();
  });

  document.getElementById('btn-copy-mermaid')?.addEventListener('click', () => {
    copyMermaidCode();
  });

  document.getElementById('btn-download-svg')?.addEventListener('click', () => {
    downloadSvg();
  });

  document.getElementById('btn-download-png')?.addEventListener('click', () => {
    downloadPng();
  });

  document.getElementById('btn-fullscreen')?.addEventListener('click', () => {
    toggleFullscreen();
  });

  // Simulator controls
  document.getElementById('sim-prev')?.addEventListener('click', () => stepSimulator(-1));
  document.getElementById('sim-next')?.addEventListener('click', () => stepSimulator(1));
  document.getElementById('sim-play')?.addEventListener('click', () => toggleAutoPlay());
  document.getElementById('sim-reset')?.addEventListener('click', () => {
    stopAutoPlay();
    currentStepIndex = -1;
    updateSimulatorUI();
  });
}

// Render Simulator Steps list with Tailwind SVG Icons
function renderSimulatorSteps(steps) {
  const listEl = document.getElementById('simulator-steps-list');
  if (!listEl) return;

  listEl.innerHTML = steps.map((item, idx) => {
    const fromActor = getActor(item.from);
    const toActor = getActor(item.to);

    return `
      <div class="step-item p-3 rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 transition border border-white/5 mb-2.5" data-step="${idx}">
        <div class="flex items-center justify-between gap-2 mb-1.5">
          <span class="text-xs font-bold text-white flex items-center gap-1.5">
            <span class="w-5 h-5 flex items-center justify-center rounded-full bg-cyan-900 text-cyan-200 text-[11px] font-mono border border-cyan-700">
              ${item.step}
            </span>
            ${item.label}
          </span>
          <div class="flex items-center gap-1 text-[10px] text-slate-300 font-medium">
            <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
              <i data-lucide="${fromActor.icon}" class="w-3 h-3 ${fromActor.iconColor}"></i>
              ${fromActor.name}
            </span>
            <i data-lucide="arrow-right" class="w-3 h-3 text-slate-500"></i>
            <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
              <i data-lucide="${toActor.icon}" class="w-3 h-3 ${toActor.iconColor}"></i>
              ${toActor.name}
            </span>
          </div>
        </div>
        <p class="text-xs text-slate-300/80 line-clamp-2">${item.desc}</p>
      </div>
    `;
  }).join('');

  // Add click listeners to step items
  listEl.querySelectorAll('.step-item').forEach(el => {
    el.addEventListener('click', () => {
      stopAutoPlay();
      currentStepIndex = parseInt(el.getAttribute('data-step'), 10);
      updateSimulatorUI();
    });
  });

  updateSimulatorUI();
  lucide.createIcons();
}

// Step through simulator
function stepSimulator(delta) {
  const scenario = SCENARIOS[currentScenarioId];
  if (!scenario || !scenario.steps) return;
  const max = scenario.steps.length - 1;

  currentStepIndex += delta;
  if (currentStepIndex > max) currentStepIndex = 0;
  if (currentStepIndex < 0) currentStepIndex = max;

  updateSimulatorUI();
}

// Toggle Autoplay
function toggleAutoPlay() {
  const playBtn = document.getElementById('sim-play');
  if (autoPlayInterval) {
    stopAutoPlay();
  } else {
    if (playBtn) playBtn.innerHTML = '<i data-lucide="pause" class="w-4 h-4 text-amber-300"></i> Jeda';
    lucide.createIcons();
    stepSimulator(1);
    autoPlayInterval = setInterval(() => {
      const scenario = SCENARIOS[currentScenarioId];
      if (!scenario || !scenario.steps) return;
      if (currentStepIndex >= scenario.steps.length - 1) {
        currentStepIndex = 0;
      } else {
        currentStepIndex++;
      }
      updateSimulatorUI();
    }, 2800);
  }
}

function stopAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
    const playBtn = document.getElementById('sim-play');
    if (playBtn) playBtn.innerHTML = '<i data-lucide="play" class="w-4 h-4 text-cyan-300"></i> Putar Otomatis';
    lucide.createIcons();
  }
}

// Update UI elements in the Step Simulator with Tailwind Icons
function updateSimulatorUI() {
  const scenario = SCENARIOS[currentScenarioId];
  if (!scenario || !scenario.steps) return;

  const steps = scenario.steps;
  const currentStep = steps[currentStepIndex];

  // Update active step class
  document.querySelectorAll('#simulator-steps-list .step-item').forEach((el, idx) => {
    if (idx === currentStepIndex) {
      el.classList.add('active-step', 'border-cyan-400', 'bg-cyan-950/40');
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      el.classList.remove('active-step', 'border-cyan-400', 'bg-cyan-950/40');
    }
  });

  const detailBox = document.getElementById('active-step-details');
  if (!detailBox) return;

  if (currentStep) {
    const fromActor = getActor(currentStep.from);
    const toActor = getActor(currentStep.to);

    detailBox.innerHTML = `
      <div class="p-5 rounded-2xl bg-gradient-to-br from-blue-950/80 to-slate-900/90 border border-cyan-400/40 shadow-xl">
        <div class="flex items-center justify-between mb-3">
          <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 flex items-center gap-1.5">
            <i data-lucide="activity" class="w-3 h-3"></i>
            Langkah ${currentStep.step} dari ${steps.length}
          </span>
          <span class="text-xs text-slate-400 font-mono flex items-center gap-1">
            <i data-lucide="cpu" class="w-3.5 h-3.5 text-cyan-400"></i>
            ${currentStep.tech || 'Synchronous Message'}
          </span>
        </div>
        
        <h4 class="text-lg font-bold text-white mb-2.5">${currentStep.label}</h4>

        <!-- Actor Route with Tailwind SVG Icon Badges -->
        <div class="flex items-center gap-2 mb-3 text-xs font-semibold">
          <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${fromActor.iconBg} ${fromActor.iconColor}">
            <i data-lucide="${fromActor.icon}" class="w-4 h-4"></i>
            <span class="text-white">${fromActor.name}</span>
          </div>
          <i data-lucide="arrow-right" class="w-4 h-4 text-cyan-400"></i>
          <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${toActor.iconBg} ${toActor.iconColor}">
            <i data-lucide="${toActor.icon}" class="w-4 h-4"></i>
            <span class="text-white">${toActor.name}</span>
          </div>
        </div>

        <p class="text-sm text-slate-200 leading-relaxed mb-4">${currentStep.desc}</p>

        <div class="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span class="flex items-center gap-1.5">
            <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i>
            Status: <strong class="text-emerald-400">200 OK / Berhasil</strong>
          </span>
          <span class="text-[11px] flex items-center gap-1">
            <i data-lucide="clock" class="w-3.5 h-3.5 text-slate-400"></i>
            Latensi: ~45ms
          </span>
        </div>
      </div>
    `;
  } else {
    detailBox.innerHTML = `
      <div class="p-8 rounded-2xl bg-slate-900/50 border border-white/5 text-center text-slate-400 text-sm">
        <div class="w-12 h-12 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto mb-3 border border-cyan-500/20">
          <i data-lucide="mouse-pointer-click" class="w-6 h-6"></i>
        </div>
        <p class="font-medium text-slate-300 mb-1">Pilih salah satu langkah transaksi</p>
        <p class="text-xs text-slate-400">Klik langkah pada daftar di kiri atau tekan <strong>Putar Otomatis</strong> untuk animasi alur pesan.</p>
      </div>
    `;
  }

  lucide.createIcons();
}

// Copy Mermaid Code
function copyMermaidCode() {
  const scenario = SCENARIOS[currentScenarioId];
  if (!scenario) return;

  navigator.clipboard.writeText(scenario.mermaidCode).then(() => {
    showToast('Kode Mermaid berhasil disalin ke clipboard!');
  }).catch(err => {
    console.error('Clipboard error:', err);
    showToast('Gagal menyalin kode.', true);
  });
}

// Download SVG file
function downloadSvg() {
  const svg = document.querySelector('#diagram-container svg');
  if (!svg) {
    showToast('Diagram belum dimuat.', true);
    return;
  }

  const svgData = new XMLSerializer().serializeToString(svg);
  const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `MyMRTJ-${currentScenarioId}-sequence.svg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  showToast('Diagram SVG vektor berhasil diunduh!');
}

// Download PNG file
function downloadPng() {
  const svg = document.querySelector('#diagram-container svg');
  if (!svg) {
    showToast('Diagram belum dimuat.', true);
    return;
  }

  const svgData = new XMLSerializer().serializeToString(svg);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();

  const bbox = svg.getBoundingClientRect();
  const width = Math.max(bbox.width * 2, 1600);
  const height = Math.max(bbox.height * 2, 1000);

  canvas.width = width;
  canvas.height = height;

  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  img.onload = () => {
    ctx.fillStyle = '#0B132B';
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);
    URL.revokeObjectURL(url);

    const pngUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = pngUrl;
    link.download = `MyMRTJ-${currentScenarioId}-sequence.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Diagram PNG resolusi tinggi berhasil diunduh!');
  };

  img.src = url;
}

// Toggle Fullscreen on viewport
function toggleFullscreen() {
  const container = document.getElementById('diagram-card');
  if (!container) return;

  if (!document.fullscreenElement) {
    container.requestFullscreen().catch(err => {
      console.error(`Error attempting fullscreen: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}

// Toast Notification with Tailwind SVG Icons
function showToast(message, isError = false) {
  let toast = document.getElementById('custom-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'custom-toast';
    toast.className = 'fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-2xl transition-all duration-300 flex items-center gap-2 text-sm font-medium';
    document.body.appendChild(toast);
  }

  toast.innerHTML = isError
    ? `<i data-lucide="alert-triangle" class="w-4 h-4 text-rose-300"></i> ${message}`
    : `<i data-lucide="check-check" class="w-4 h-4 text-emerald-300"></i> ${message}`;
  
  toast.className = `fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-2xl transition-all duration-300 flex items-center gap-2 text-sm font-medium ${
    isError ? 'bg-rose-950 text-rose-200 border border-rose-600' : 'bg-emerald-950 text-emerald-200 border border-emerald-500'
  } translate-y-0 opacity-100`;

  lucide.createIcons();

  setTimeout(() => {
    toast.className += ' translate-y-4 opacity-0 pointer-events-none';
  }, 3200);
}
