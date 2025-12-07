# Univio - Smart Campus Assistant
## Dokumentasi Arsitektur Sistem

Berdasarkan diagram DFD, UML, dan ERD yang telah dianalisis, berikut adalah dokumentasi lengkap arsitektur sistem Univio.

---

## 📊 ANALISIS DIAGRAM SISTEM

### 1. Context Diagram (DFD Level 0)
Dari diagram context yang diberikan, sistem Univio berinteraksi dengan:

**External Entities:**
- **Mahasiswa**: Pengguna utama sistem
  - Input: Login credentials, input tugas manual, update status
  - Output: Display dashboard, notifikasi, prioritas, laporan

- **SIAKAD Server**: Sumber data akademik
  - Input: Jadwal kuliah, pengumuman akademik
  - Output: Request scraping data

- **Email**: Platform komunikasi
  - Input: Email tugas dari dosen
  - Output: Email pengumuman, API request

- **WhatsApp**: Platform notifikasi
  - Input: Chat/pesan tugas
  - Output: Notifikasi push

**Proses Utama:**
Smart Campus Assistant System berfungsi sebagai hub central yang mengagregasi data dari berbagai sumber dan menyajikannya dalam satu interface terpadu.

---

### 2. DFD Level 1 - Proses Utama

Berdasarkan diagram DFD Level 1, sistem memiliki 7 proses utama:

#### **P1: Autentikasi & Manajemen Akun**
- Input: Login credentials dari mahasiswa
- Output: User data, account info
- Data Store: User Account
- Fungsi: Validasi login, manage session, connection settings

#### **P2: Pengumpulan Data**
- Sub-proses:
  - **P2.1**: Scraping SIAKAD (jadwal kuliah, pengumuman)
  - **P2.2**: Fetch Email via API (tugas dari email)
  - **P2.3**: Monitor WhatsApp (chat tugas)
- Output: Combined Data
- Data Store: Platform Connection
- Fungsi: Agregasi data dari multiple sources

#### **P3: Ekstraksi & Parsing Data (NLP)**
- Sub-proses:
  - **P3.1**: Preprocessing Text (cleaning)
  - **P3.2**: Information Extraction
  - **P3.3**: Parse Task (extract task details)
  - **P3.4**: Parse Schedule (extract schedule info)
  - **P3.5**: Data Validation
- Input: Raw data dari P2
- Output: Structured task data, schedule data
- Data Store: Task Data, Schedule Data
- Fungsi: NLP processing untuk extract informasi terstruktur

#### **P4: Manajemen Tugas & Jadwal**
- Input: Task data, schedule data, manual updates
- Output: Updated task list, read data
- Data Store: Task Data, Schedule Data
- Fungsi: CRUD operations untuk tasks dan schedules

#### **P5: Kalkulasi Prioritas AI**
- Input: Task list dari P4
- Output: Score/priority untuk setiap task
- Fungsi: AI algorithm untuk menentukan prioritas berdasarkan:
  - Deadline proximity
  - Task complexity
  - User's schedule
  - Historical patterns

#### **P6: Sistem Notifikasi**
- Input: Data reminder dari task/schedule
- Output: Push notifications ke mahasiswa
- Data Store: Notification Log
- Fungsi: 
  - Generate reminders
  - Send notifications
  - Track notification history
  - Monitor delivery status

#### **P7: Generate Dashboard & Report**
- Input: Task data, schedule data
- Output: Dashboard display, reports
- Fungsi:
  - Aggregate statistics
  - Generate visualizations
  - Create summary reports
  - Display recommendations

---

### 3. Arsitektur Three-Tier

Berdasarkan spesifikasi yang diberikan:

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│                      (Frontend - React.js)                   │
│  - Single Page Application (SPA)                            │
│  - Material Design UI                                       │
│  - Responsive Design (Mobile-First)                         │
│  - Components: Login, Dashboard, Tasks, Calendar, Profile   │
└─────────────────────────────────────────────────────────────┘
                            ↕ REST API
┌─────────────────────────────────────────────────────────────┐
│                  BUSINESS LOGIC LAYER                        │
│                  (Backend - Node.js + Express.js)            │
│  - Authentication & Authorization                           │
│  - Data Aggregation (SIAKAD, Email, WhatsApp)              │
│  - NLP Processing (Text Extraction & Parsing)               │
│  - AI Priority Calculation                                  │
│  - Notification System                                      │
│  - API Endpoints                                            │
└─────────────────────────────────────────────────────────────┘
                            ↕ SQL Queries
┌─────────────────────────────────────────────────────────────┐
│                       DATA LAYER                             │
│                     (Database - MySQL)                       │
│  Tables:                                                     │
│  - users (mahasiswa accounts)                               │
│  - tasks (tugas & assignments)                              │
│  - schedules (jadwal kuliah)                                │
│  - notifications (notification history)                     │
│  - platform_connections (SIAKAD, Email, WA credentials)     │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 FITUR UTAMA BERDASARKAN USE CASE DIAGRAM

Dari use case diagram yang diberikan, mahasiswa dapat:

1. **Login** - Autentikasi ke sistem
2. **Kelola Koneksi Platform** - Connect SIAKAD, Email, WhatsApp
3. **Input Tugas Manual** - Tambah tugas secara manual
4. **Update Status Tugas** - Ubah status (To Do → In Progress → Done)
5. **Kelola Notifikasi** - Atur preferensi notifikasi
6. **Lihat Dashboard** (extends to):
   - **Lihat Rekomendasi Prioritas** - AI-generated task priorities

---

## 🗄️ DATABASE SCHEMA (ERD)

Berdasarkan analisis sistem, berikut adalah schema database yang dibutuhkan:

### **Table: users**
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nim VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  program VARCHAR(100),
  faculty VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### **Table: platform_connections**
```sql
CREATE TABLE platform_connections (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  platform_type ENUM('siakad', 'email', 'whatsapp') NOT NULL,
  credentials JSON, -- encrypted credentials
  is_active BOOLEAN DEFAULT TRUE,
  last_sync TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### **Table: tasks**
```sql
CREATE TABLE tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  course VARCHAR(100),
  due_date DATE NOT NULL,
  due_time TIME,
  priority ENUM('high', 'medium', 'low') DEFAULT 'medium',
  priority_score DECIMAL(5,2), -- AI-calculated score
  status ENUM('todo', 'in-progress', 'done') DEFAULT 'todo',
  source ENUM('manual', 'siakad', 'email', 'whatsapp') DEFAULT 'manual',
  source_data JSON, -- original data from source
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_status (user_id, status),
  INDEX idx_due_date (due_date)
);
```

### **Table: schedules**
```sql
CREATE TABLE schedules (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  course_name VARCHAR(100) NOT NULL,
  day_of_week ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  location VARCHAR(100),
  lecturer VARCHAR(100),
  source ENUM('manual', 'siakad') DEFAULT 'siakad',
  is_active BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_day (user_id, day_of_week)
);
```

### **Table: notifications**
```sql
CREATE TABLE notifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  type ENUM('task_reminder', 'schedule_reminder', 'announcement', 'system') NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT,
  related_task_id INT,
  related_schedule_id INT,
  is_read BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (related_task_id) REFERENCES tasks(id) ON DELETE SET NULL,
  FOREIGN KEY (related_schedule_id) REFERENCES schedules(id) ON DELETE SET NULL,
  INDEX idx_user_read (user_id, is_read)
);
```

### **Table: notification_preferences**
```sql
CREATE TABLE notification_preferences (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL UNIQUE,
  task_reminders BOOLEAN DEFAULT TRUE,
  class_reminders BOOLEAN DEFAULT TRUE,
  announcement_alerts BOOLEAN DEFAULT TRUE,
  reminder_before_minutes INT DEFAULT 60, -- remind X minutes before deadline
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 🔄 DATA FLOW LENGKAP

### **Flow 1: Login & Authentication**
```
Mahasiswa → [Login Form] → P1: Autentikasi 
→ Validate credentials → User Account DB 
→ Create session → Redirect to Dashboard
```

### **Flow 2: Data Aggregation (Automatic)**
```
Scheduled Job → P2.1: Scraping SIAKAD → Get jadwal & pengumuman
              → P2.2: Fetch Email API → Get tugas dari email
              → P2.3: Monitor WhatsApp → Get chat tugas
              ↓
         Combined Data → P3: NLP Processing
              ↓
         [P3.1: Preprocessing] → Clean text
         [P3.2: Information Extraction] → Extract entities
         [P3.3: Parse Task] → Task object
         [P3.4: Parse Schedule] → Schedule object
         [P3.5: Validation] → Validate & save
              ↓
         Task Data DB + Schedule Data DB
```

### **Flow 3: Task Management**
```
Mahasiswa → [Input Manual Task] → P4: Manajemen Tugas
         → Save to Task Data DB
         → Trigger P5: Kalkulasi Prioritas AI
         → Update priority score
         → Trigger P6: Sistem Notifikasi
         → Create reminder
```

### **Flow 4: Dashboard Display**
```
Mahasiswa → [View Dashboard] → P7: Generate Dashboard
         → Read Task Data + Schedule Data
         → Calculate statistics
         → Get AI recommendations from P5
         → Display to user
```

### **Flow 5: Notification System**
```
Cron Job → Check upcoming deadlines
        → P6: Sistem Notifikasi
        → Generate notification
        → Save to Notification Log
        → Send via WhatsApp API
        → Push to frontend
```

---

## 🤖 AI & NLP COMPONENTS

### **NLP Processing (P3)**
Teknologi yang digunakan:
- **Library**: Natural (Node.js NLP library) atau spaCy (Python)
- **Tasks**:
  1. Text Cleaning (remove HTML, special chars)
  2. Tokenization
  3. Named Entity Recognition (NER) untuk extract:
     - Course names
     - Dates & times
     - Locations
     - Task descriptions
  4. Intent Classification (is it a task, schedule, or announcement?)

### **AI Priority Calculation (P5)**
Algorithm untuk menghitung priority score:

```javascript
function calculatePriorityScore(task, userSchedule) {
  let score = 0;
  
  // Factor 1: Deadline proximity (0-40 points)
  const daysUntilDue = getDaysUntilDue(task.due_date);
  if (daysUntilDue <= 1) score += 40;
  else if (daysUntilDue <= 3) score += 30;
  else if (daysUntilDue <= 7) score += 20;
  else score += 10;
  
  // Factor 2: Task complexity (0-30 points)
  const complexity = estimateComplexity(task.description);
  score += complexity * 30;
  
  // Factor 3: Schedule conflicts (0-20 points)
  const conflicts = checkScheduleConflicts(task, userSchedule);
  score += (1 - conflicts) * 20;
  
  // Factor 4: Historical completion rate (0-10 points)
  const completionRate = getUserCompletionRate(task.course);
  score += (1 - completionRate) * 10;
  
  return score; // 0-100
}
```

Priority mapping:
- Score 70-100: **High Priority**
- Score 40-69: **Medium Priority**
- Score 0-39: **Low Priority**

---

## 📱 FRONTEND IMPLEMENTATION (Current Status)

### **Implemented Pages:**
✅ Login Page
✅ Dashboard (overview, stats, upcoming tasks)
✅ My Tasks (list, filter, CRUD)
✅ Task Detail (full info, checklist, attachments)
✅ Calendar (monthly view, events)
✅ Notifications (list, mark as read)
✅ Profile (personal info, preferences)

### **Data Management:**
✅ localStorage for client-side persistence
✅ DataContext for global state management
✅ CRUD operations for tasks, events, announcements

---

## 🚀 NEXT STEPS: Backend Implementation

Untuk melengkapi sistem sesuai arsitektur, perlu diimplementasikan:

### **1. Backend API (Node.js + Express)**
```javascript
// Example API endpoints
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
GET    /api/schedules
GET    /api/notifications
PUT    /api/notifications/:id/read
POST   /api/platforms/connect
GET    /api/dashboard/stats
```

### **2. Data Scraping Services**
- SIAKAD Scraper (Puppeteer/Playwright)
- Email Integration (Gmail API / IMAP)
- WhatsApp Integration (WhatsApp Business API)

### **3. NLP Service**
- Text preprocessing pipeline
- Entity extraction
- Task parsing logic

### **4. AI Priority Service**
- Priority calculation algorithm
- Machine learning model (optional)
- Recommendation engine

### **5. Notification Service**
- Cron jobs for scheduled checks
- WhatsApp notification sender
- Email notification sender
- Push notification (Web Push API)

---

## 📊 KESIMPULAN

Sistem Univio dirancang dengan arsitektur yang solid dan scalable:
- **Frontend**: React SPA dengan Material Design
- **Backend**: Node.js REST API dengan Express
- **Database**: MySQL untuk data terstruktur
- **AI/NLP**: Automated data extraction dan priority calculation
- **Integration**: SIAKAD, Email, WhatsApp

**Current Implementation**: Frontend complete dengan localStorage
**Next Phase**: Backend API + Database + Integration Services

---

*Dokumentasi ini dibuat berdasarkan analisis diagram DFD, Use Case, dan arsitektur three-tier yang telah dispesifikasikan.*
