# Smart Campus Assistant - Routes Reference

Quick reference untuk semua routes yang tersedia di aplikasi.

## 🔗 All Available Routes

### Public Routes
```
/                    → Redirect to /login
/login               → Login page with role selector
```

### Student Routes
```
/student/dashboard           → Student dashboard
/student/tasks               → My tasks list
/student/tasks/1             → Task detail (example ID: 1)
/student/tasks/2             → Task detail (example ID: 2)
/student/calendar            → Calendar view
/student/notifications       → Notifications list
/student/profile             → Student profile & settings
```

### Admin Routes
```
/admin/dashboard             → Admin dashboard
/admin/tasks                 → Manage tasks
/admin/calendar              → Manage calendar & events
/admin/announcements         → Manage announcements
```

## 🧭 Navigation Flow

### Login Flow
```
1. User visits http://localhost:3000
2. Redirected to /login
3. User selects role (Student or Admin)
4. Click "Sign In"
5. Redirected to /{role}/dashboard
```

### Student Flow
```
Login → Student Dashboard → Navigate via Sidebar:
  ├─ Dashboard
  ├─ My Tasks → Task Detail
  ├─ Calendar
  ├─ Notifications
  └─ Profile
```

### Admin Flow
```
Login → Admin Dashboard → Navigate via Sidebar:
  ├─ Dashboard
  ├─ Manage Tasks (with Create/Edit modal)
  ├─ Manage Calendar (with Create Event form)
  └─ Manage Announcements (with Create/Edit modal)
```

## 🎯 Testing Routes

Untuk testing, gunakan URL berikut:

### Student Pages
- http://localhost:3000/login
- http://localhost:3000/student/dashboard
- http://localhost:3000/student/tasks
- http://localhost:3000/student/tasks/1
- http://localhost:3000/student/calendar
- http://localhost:3000/student/notifications
- http://localhost:3000/student/profile

### Admin Pages
- http://localhost:3000/admin/dashboard
- http://localhost:3000/admin/tasks
- http://localhost:3000/admin/calendar
- http://localhost:3000/admin/announcements

## 📱 Sidebar Menu Items

### Student Menu
1. **Dashboard** → `/student/dashboard`
2. **My Tasks** → `/student/tasks`
3. **Calendar** → `/student/calendar`
4. **Notifications** → `/student/notifications`
5. **Profile** → `/student/profile`

### Admin Menu
1. **Dashboard** → `/admin/dashboard`
2. **Manage Tasks** → `/admin/tasks`
3. **Manage Calendar** → `/admin/calendar`
4. **Manage Announcements** → `/admin/announcements`

## 🔄 Active State

Sidebar menu items akan menampilkan active state (background teal + text white) ketika:
- Current path matches exactly, atau
- Current path starts with menu item path (untuk nested routes)

Contoh:
- Di `/student/tasks` → "My Tasks" active
- Di `/student/tasks/1` → "My Tasks" tetap active (nested route)

## 🎨 Import ke Figma

Untuk import specific page ke Figma:

1. Jalankan `npm run dev`
2. Buka page yang ingin di-import
3. Gunakan plugin html.to.design di Figma
4. Copy URL page ke plugin

**Recommended pages untuk import:**
- `/student/dashboard` - Best example of dashboard layout
- `/student/tasks` - Best example of table + filters
- `/admin/tasks` - Best example of modal form
- `/student/calendar` - Best example of calendar grid

---

**Note:** Semua routes menggunakan dummy data statis. Tidak ada autentikasi atau backend yang sebenarnya.
