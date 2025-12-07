# Smart Campus Assistant - Frontend UI

Sistem manajemen kampus modern untuk membantu mahasiswa dan admin mengelola jadwal kuliah, tugas, dan pengumuman dalam satu tempat.

## 🎯 Tentang Project

Smart Campus Assistant adalah aplikasi web statis yang dibangun dengan **Next.js** dan **Tailwind CSS**. Project ini fokus pada UI/UX yang clean, modern, dan mudah di-import ke Figma menggunakan plugin seperti `html.to.design`.

**Catatan:** Ini adalah frontend statis dengan dummy data. Tidak ada backend atau autentikasi yang sebenarnya.

## 🚀 Teknologi

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Language:** TypeScript
- **Package Manager:** npm

## 📁 Struktur Project

```
smart-campus-assistant/
├── app/
│   ├── login/              # Halaman login
│   ├── student/            # Halaman untuk role Student
│   │   ├── dashboard/      # Dashboard mahasiswa
│   │   ├── tasks/          # Manajemen tugas
│   │   ├── calendar/       # Kalender jadwal
│   │   ├── notifications/  # Notifikasi
│   │   └── profile/        # Profil mahasiswa
│   └── admin/              # Halaman untuk role Admin
│       ├── dashboard/      # Dashboard admin
│       ├── tasks/          # Kelola tugas
│       ├── calendar/       # Kelola kalender
│       └── announcements/  # Kelola pengumuman
├── components/
│   ├── layout/             # Komponen layout (Sidebar, Topbar, DashboardLayout)
│   └── ui/                 # Komponen UI reusable (Button, Card, Badge, Input)
└── public/                 # Asset statis

```

## 🎨 Fitur Halaman

### 👤 Student Pages

1. **Login** (`/login`)
   - Form login dengan pilihan role (Student/Admin)
   - Redirect ke dashboard sesuai role

2. **Dashboard** (`/student/dashboard`)
   - Overview hari ini (tanggal, jumlah kelas, next class)
   - Progress tugas dengan progress bar
   - Tabel upcoming tasks
   - Jadwal kuliah hari ini

3. **My Tasks** (`/student/tasks`)
   - Filter dan search tugas
   - Tabel tugas dengan status dan priority
   - Sidebar dengan task progress dan recommended task

4. **Task Detail** (`/student/tasks/[id]`)
   - Detail lengkap tugas
   - Breadcrumb navigation
   - Checklist sub-tugas
   - Attachments
   - Sidebar dengan task info

5. **Calendar** (`/student/calendar`)
   - Grid kalender bulanan
   - Event pills (Class, Exam, Campus Event)
   - Sidebar dengan today's schedule dan upcoming deadlines

6. **Notifications** (`/student/notifications`)
   - Filter tab (All, Tasks, Announcements, System)
   - List notifikasi dengan timestamp
   - Unread indicator

7. **Profile** (`/student/profile`)
   - Avatar dengan inisial
   - Form personal information
   - Notification preferences dengan toggle switches

### 👨‍💼 Admin Pages

1. **Dashboard** (`/admin/dashboard`)
   - Statistics cards (Total Students, Active Tasks, dll)
   - Recent tasks table
   - Completion rate
   - Quick actions
   - Recent activity feed

2. **Manage Tasks** (`/admin/tasks`)
   - Filter by course, status, date range
   - Tasks table dengan edit/delete actions
   - Modal create/edit task

3. **Manage Calendar** (`/admin/calendar`)
   - Calendar grid dengan events
   - Create event form
   - Upcoming events sidebar

4. **Manage Announcements** (`/admin/announcements`)
   - Filter by status dan category
   - Announcements table
   - Modal create/edit dengan publish now/schedule options

## 🎨 Design System

### Colors
- **Primary:** Teal (`#14B8A6`)
- **Background:** Light Gray (`#F3F4F6`)
- **Text:** Dark Gray (`#111827`, `#4B5563`)
- **Accent Colors:**
  - Success: Green (`#10B981`)
  - Warning: Amber (`#F59E0B`)
  - Error: Red (`#EF4444`)
  - Info: Blue (`#3B82F6`)

### Typography
- Font: Inter (via Google Fonts)
- Heading: text-xl/2xl, font-bold
- Body: text-sm/base, font-normal

### Components
- **Card:** White background, rounded corners, subtle shadow
- **Button:** Primary (teal) dan Secondary (gray)
- **Badge:** Color-coded untuk status dan priority
- **Input:** Border dengan focus ring teal

## 🚀 Cara Menjalankan

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Buka browser:**
   ```
   http://localhost:3000
   ```

4. **Build untuk production:**
   ```bash
   npm run build
   npm start
   ```

## 📱 Navigasi

- **Root** (`/`) → Redirect ke `/login`
- **Login** (`/login`) → Pilih role Student/Admin
- **Student Dashboard** → `/student/dashboard`
- **Admin Dashboard** → `/admin/dashboard`

## 🎯 Import ke Figma

Untuk mengimport UI ini ke Figma:

1. Install plugin **html.to.design** di Figma
2. Jalankan `npm run dev`
3. Buka halaman yang ingin di-import (misal: `http://localhost:3000/student/dashboard`)
4. Gunakan plugin untuk import HTML ke Figma
5. Struktur layout dan styling akan otomatis ter-convert

## 📝 Catatan Penting

- **Semua data adalah dummy/statis** - tidak ada koneksi ke backend
- **Tidak ada autentikasi real** - tombol login hanya redirect
- **Tidak ada state management** - data tidak persisten
- **Fokus pada UI/Layout** - bukan pada fungsionalitas JavaScript kompleks

## 🔮 Pengembangan Selanjutnya

Untuk mengembangkan project ini lebih lanjut:

1. Tambahkan backend API (Node.js, Python, dll)
2. Implementasi autentikasi real (JWT, OAuth)
3. Tambahkan state management (Redux, Zustand)
4. Koneksi ke database (PostgreSQL, MongoDB)
5. Tambahkan real-time features (WebSocket)
6. Implementasi file upload untuk attachments
7. Tambahkan unit tests dan E2E tests

## 📄 License

MIT License - Feel free to use this project for learning purposes.

## 👨‍💻 Developer

Developed as a static UI prototype for Smart Campus Assistant system.

