// ==========================================
// MyMRTJ End-to-End Sequence Diagram Visualizer
// ==========================================

const SEQUENCE_DIAGRAM_CODE = `sequenceDiagram
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
    API-->>Admin: Dashboard + KPI metrics`;

let panzoomInstance = null;

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', async () => {
  initMermaid();
  initPanzoom();
  initControls();
  await renderSequence();
  lucide.createIcons();
});

// Configure Mermaid theme
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
      bottomMarginAdj: 15,
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

// Render the Diagram
async function renderSequence() {
  const container = document.getElementById('diagram-container');
  const loading = document.getElementById('diagram-loading');
  
  if (loading) loading.classList.remove('hidden');
  container.innerHTML = '';

  try {
    const { svg } = await mermaid.render('mrt-e2e-sequence', SEQUENCE_DIAGRAM_CODE);
    container.innerHTML = svg;
    
    const svgElem = container.querySelector('svg');
    if (svgElem) {
      svgElem.classList.add('mermaid-dark');
      svgElem.style.display = 'block';
      svgElem.style.margin = '0 auto';
    }

    if (panzoomInstance) {
      panzoomInstance.reset();
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

// Initialize Panzoom for smooth canvas navigation
function initPanzoom() {
  const viewport = document.getElementById('diagram-viewport');
  const container = document.getElementById('diagram-container');

  if (viewport && container && window.Panzoom) {
    panzoomInstance = Panzoom(container, {
      maxScale: 4,
      minScale: 0.25,
      contain: false,
      cursor: 'grab'
    });

    viewport.parentElement.addEventListener('wheel', panzoomInstance.zoomWithWheel);

    viewport.addEventListener('dblclick', () => {
      panzoomInstance.reset();
    });
  }
}

// Setup toolbar action controls
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
    copyCode();
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
}

// Copy Mermaid Code
function copyCode() {
  navigator.clipboard.writeText(SEQUENCE_DIAGRAM_CODE).then(() => {
    showToast('Kode Mermaid berhasil disalin ke clipboard!');
  }).catch(() => {
    showToast('Gagal menyalin kode.', true);
  });
}

// Download Diagram as SVG
function downloadSvg() {
  const svg = document.querySelector('#diagram-container svg');
  if (!svg) {
    showToast('Diagram belum siap.', true);
    return;
  }

  const svgData = new XMLSerializer().serializeToString(svg);
  const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'MyMRTJ-EndToEnd-Sequence.svg';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  showToast('Diagram SVG berhasil diunduh!');
}

// Download Diagram as PNG
function downloadPng() {
  const svg = document.querySelector('#diagram-container svg');
  if (!svg) {
    showToast('Diagram belum siap.', true);
    return;
  }

  const svgData = new XMLSerializer().serializeToString(svg);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();

  const bbox = svg.getBoundingClientRect();
  const width = Math.max(bbox.width * 2, 1800);
  const height = Math.max(bbox.height * 2, 1400);

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
    link.download = 'MyMRTJ-EndToEnd-Sequence.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Diagram PNG berhasil diunduh!');
  };

  img.src = url;
}

// Toggle Fullscreen Mode
function toggleFullscreen() {
  const container = document.getElementById('diagram-card');
  if (!container) return;

  if (!document.fullscreenElement) {
    container.requestFullscreen().catch(err => {
      console.error('Fullscreen error:', err);
    });
  } else {
    document.exitFullscreen();
  }
}

// Toast Feedback Notification with Tailwind SVG icon
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
  }, 3000);
}
