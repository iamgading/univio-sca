'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { CheckCheck, Bell, Megaphone, Settings } from 'lucide-react';

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('all');
  
  const notifications = [
    {
      id: 1,
      type: 'task',
      icon: CheckCheck,
      title: 'New Task Assigned',
      description: 'Laporan Tugas Akhir Desain - Due: 10 Des 2025',
      time: '10 minutes ago',
      unread: true,
    },
    {
      id: 2,
      type: 'announcement',
      icon: Megaphone,
      title: 'Campus Announcement',
      description: 'Seminar Teknologi AI akan diadakan pada 15 Desember 2025',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: 3,
      type: 'task',
      icon: CheckCheck,
      title: 'Task Deadline Reminder',
      description: 'Presentasi Proposal jatuh tempo besok',
      time: 'Yesterday, 13:00',
      unread: false,
    },
    {
      id: 4,
      type: 'system',
      icon: Settings,
      title: 'System Update',
      description: 'Sistem akan maintenance pada Sabtu, 14 Des pukul 02:00',
      time: '2 days ago',
      unread: false,
    },
    {
      id: 5,
      type: 'announcement',
      icon: Megaphone,
      title: 'Exam Schedule Released',
      description: 'Jadwal UAS semester ini telah tersedia',
      time: '3 days ago',
      unread: false,
    },
    {
      id: 6,
      type: 'task',
      icon: CheckCheck,
      title: 'Task Completed',
      description: 'Tugas Kelompok Mobile App telah dinilai',
      time: '4 days ago',
      unread: false,
    },
  ];
  
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'announcements', label: 'Announcements' },
    { id: 'system', label: 'System' },
  ];
  
  const getIconColor = (type: string) => {
    switch (type) {
      case 'task': return 'bg-blue-100 text-blue-600';
      case 'announcement': return 'bg-purple-100 text-purple-600';
      case 'system': return 'bg-slate-100 text-slate-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };
  
  return (
    <DashboardLayout
      role="student"
      pageTitle="Notifications"
      pageSubtitle="Semua notifikasi dan pengumuman"
      userName="Budi Santoso"
    >
      <Card>
        {/* Header with Mark All Read */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <Button variant="ghost" size="sm">
            <CheckCheck size={16} className="mr-2" />
            Mark all as read
          </Button>
        </div>
        
        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notif) => {
            const Icon = notif.icon;
            return (
              <div
                key={notif.id}
                className={`flex items-start gap-4 p-4 rounded-lg border transition-all hover:shadow-sm ${
                  notif.unread
                    ? 'bg-teal-50 border-teal-200'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className={`p-3 rounded-lg ${getIconColor(notif.type)}`}>
                  <Icon size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">{notif.title}</h4>
                      <p className="text-sm text-slate-600 mt-1">{notif.description}</p>
                    </div>
                    {notif.unread && (
                      <span className="w-2 h-2 bg-[var(--primary)] rounded-full"></span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-2">{notif.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </DashboardLayout>
  );
}
