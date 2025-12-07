'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export type Task = {
  id: string;
  task: string;
  course: string;
  description: string;
  due: string;
  dueTime: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in-progress' | 'done';
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
};

export type CalendarEvent = {
  id: string;
  title: string;
  type: 'class' | 'exam' | 'event';
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  targetAudience: string;
  description?: string;
  createdAt: string;
};

export type Announcement = {
  id: string;
  title: string;
  category: 'General' | 'Academic' | 'System';
  content: string;
  targetAudience: string;
  status: 'active' | 'scheduled' | 'archived';
  publishDate?: string;
  createdDate: string;
};

export type Notification = {
  id: string;
  type: 'Tasks' | 'Announcements' | 'System';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
};

type DataContextType = {
  tasks: Task[];
  events: CalendarEvent[];
  announcements: Announcement[];
  notifications: Notification[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addEvent: (event: Omit<CalendarEvent, 'id' | 'createdAt'>) => void;
  updateEvent: (id: string, event: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'createdDate'>) => void;
  updateAnnouncement: (id: string, announcement: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

// Initial dummy data
const initialTasks: Task[] = [
  {
    id: '1',
    task: 'Laporan Tugas Akhir Desain',
    course: 'Desain UI/UX',
    description: 'Membuat laporan lengkap untuk tugas akhir desain aplikasi mobile',
    due: '2025-12-10',
    dueTime: '23:59',
    priority: 'high',
    status: 'in-progress',
    assignedTo: 'Kelas 3A',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    task: 'Presentasi Proposal',
    course: 'Metodologi Penelitian',
    description: 'Presentasi proposal penelitian di depan kelas',
    due: '2025-12-12',
    dueTime: '10:00',
    priority: 'high',
    status: 'todo',
    assignedTo: 'Kelas 4B',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const initialEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Pemrograman Web',
    type: 'class',
    date: '2025-12-02',
    startTime: '10:00',
    endTime: '12:00',
    location: 'Lab Komputer 3',
    targetAudience: 'Kelas 2A',
    createdAt: new Date().toISOString(),
  },
];

const initialAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Libur Semester Genap 2025',
    category: 'Academic',
    content: 'Libur semester genap akan dimulai pada tanggal 20 Desember 2025.',
    targetAudience: 'All Students',
    status: 'active',
    createdDate: '2025-12-01',
  },
];

const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'Tasks',
    title: 'Tugas baru ditambahkan',
    description: 'Laporan Tugas Akhir Desain - Due: 10 Des 2025',
    timestamp: new Date(Date.now() - 600000).toISOString(),
    read: false,
  },
  {
    id: '2',
    type: 'Announcements',
    title: 'Pengumuman baru',
    description: 'Libur Semester Genap 2025',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: false,
  },
];

export function DataProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const loadedTasks = localStorage.getItem('univio_tasks');
    const loadedEvents = localStorage.getItem('univio_events');
    const loadedAnnouncements = localStorage.getItem('univio_announcements');
    const loadedNotifications = localStorage.getItem('univio_notifications');

    setTasks(loadedTasks ? JSON.parse(loadedTasks) : initialTasks);
    setEvents(loadedEvents ? JSON.parse(loadedEvents) : initialEvents);
    setAnnouncements(loadedAnnouncements ? JSON.parse(loadedAnnouncements) : initialAnnouncements);
    setNotifications(loadedNotifications ? JSON.parse(loadedNotifications) : initialNotifications);
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('univio_tasks', JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('univio_events', JSON.stringify(events));
    }
  }, [events, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('univio_announcements', JSON.stringify(announcements));
    }
  }, [announcements, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('univio_notifications', JSON.stringify(notifications));
    }
  }, [notifications, isLoaded]);

  // Task CRUD
  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
    
    // Add notification
    const newNotification: Notification = {
      id: Date.now().toString(),
      type: 'Tasks',
      title: 'Tugas baru ditambahkan',
      description: `${newTask.task} - Due: ${newTask.due}`,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications([newNotification, ...notifications]);
  };

  const updateTask = (id: string, taskData: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, ...taskData, updatedAt: new Date().toISOString() }
        : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Event CRUD
  const addEvent = (eventData: Omit<CalendarEvent, 'id' | 'createdAt'>) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setEvents([...events, newEvent]);
  };

  const updateEvent = (id: string, eventData: Partial<CalendarEvent>) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, ...eventData } : event
    ));
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  // Announcement CRUD
  const addAnnouncement = (announcementData: Omit<Announcement, 'id' | 'createdDate'>) => {
    const newAnnouncement: Announcement = {
      ...announcementData,
      id: Date.now().toString(),
      createdDate: new Date().toISOString().split('T')[0],
    };
    setAnnouncements([...announcements, newAnnouncement]);
    
    // Add notification
    const newNotification: Notification = {
      id: Date.now().toString(),
      type: 'Announcements',
      title: 'Pengumuman baru',
      description: newAnnouncement.title,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications([newNotification, ...notifications]);
  };

  const updateAnnouncement = (id: string, announcementData: Partial<Announcement>) => {
    setAnnouncements(announcements.map(announcement => 
      announcement.id === id ? { ...announcement, ...announcementData } : announcement
    ));
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter(announcement => announcement.id !== id));
  };

  // Notification functions
  const addNotification = (notification: Notification) => {
    setNotifications([notification, ...notifications]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  return (
    <DataContext.Provider
      value={{
        tasks,
        events,
        announcements,
        notifications,
        addTask,
        updateTask,
        deleteTask,
        addEvent,
        updateEvent,
        deleteEvent,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        addNotification,
        markNotificationAsRead,
        markAllNotificationsAsRead,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
