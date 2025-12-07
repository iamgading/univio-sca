'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useData } from '@/contexts/DataContext';
import { RefreshCw, Check, X, Loader2, Calendar, Mail, MessageCircle } from 'lucide-react';

export default function IntegrationsPage() {
  const { addTask, addEvent, addNotification } = useData();
  const [syncing, setSyncing] = useState<string | null>(null);
  const [lastSync, setLastSync] = useState({
    siakad: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    email: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    whatsapp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
  });

  const [connections, setConnections] = useState({
    siakad: {
      connected: true,
      username: 'gading.satrio',
      lastData: {
        schedules: 12,
        announcements: 5,
        tasks: 3,
      },
    },
    email: {
      connected: true,
      email: 'gading.satrio@university.ac.id',
      newTasks: 2,
    },
    whatsapp: {
      connected: true,
      phone: '+62 812-3456-7890',
      group: 'Kelas 3A TI',
      lastMessage: '10 minutes ago',
    },
  });

  // Dummy data untuk simulasi sync
  const dummyTasks = [
    {
      task: 'Quiz Basis Data Chapter 5',
      course: 'Basis Data',
      description: 'Quiz online tentang normalisasi database',
      due: '2025-12-15',
      dueTime: '14:00',
      priority: 'medium' as const,
      status: 'todo' as const,
    },
    {
      task: 'Presentasi Proposal Penelitian',
      course: 'Metodologi Penelitian',
      description: 'Presentasi proposal di depan kelas',
      due: '2025-12-18',
      dueTime: '10:00',
      priority: 'high' as const,
      status: 'todo' as const,
    },
    {
      task: 'Tugas Kelompok Web Development',
      course: 'Pemrograman Web',
      description: 'Membuat website e-commerce sederhana',
      due: '2025-12-20',
      dueTime: '23:59',
      priority: 'high' as const,
      status: 'todo' as const,
    },
  ];

  const dummyEvents = [
    {
      title: 'Ujian Tengah Semester - Algoritma',
      type: 'exam' as const,
      date: '2025-12-16',
      startTime: '08:00',
      endTime: '10:00',
      location: 'Ruang 301',
      targetAudience: 'Kelas 3A',
    },
    {
      title: 'Workshop AI & Machine Learning',
      type: 'event' as const,
      date: '2025-12-19',
      startTime: '13:00',
      endTime: '16:00',
      location: 'Auditorium',
      targetAudience: 'All Students',
    },
  ];

  const handleSync = async (platform: 'siakad' | 'email' | 'whatsapp') => {
    setSyncing(platform);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Add dummy data based on platform
    if (platform === 'siakad') {
      // Add 2 tasks and 1 event
      addTask(dummyTasks[0]);
      addEvent(dummyEvents[0]);
      
      addNotification({
        id: Date.now().toString(),
        type: 'System',
        title: '✅ SIAKAD Synced',
        description: 'Added 1 new task and 1 exam schedule',
        timestamp: new Date().toISOString(),
        read: false,
      });
    } else if (platform === 'email') {
      // Add 1 task
      addTask(dummyTasks[1]);
      
      addNotification({
        id: Date.now().toString(),
        type: 'Tasks',
        title: '📧 New task from Email',
        description: dummyTasks[1].task,
        timestamp: new Date().toISOString(),
        read: false,
      });
    } else if (platform === 'whatsapp') {
      // Add 1 task
      addTask(dummyTasks[2]);
      
      addNotification({
        id: Date.now().toString(),
        type: 'Tasks',
        title: '💬 New task from WhatsApp',
        description: dummyTasks[2].task,
        timestamp: new Date().toISOString(),
        read: false,
      });
    }

    // Update last sync time
    setLastSync(prev => ({
      ...prev,
      [platform]: new Date(),
    }));

    setSyncing(null);
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  };

  return (
    <DashboardLayout
      role="student"
      pageTitle="Platform Integrations"
      pageSubtitle="Connect and sync with external platforms"
      userName="Gading Satrio"
    >
      <div className="space-y-6">
        {/* SIAKAD Integration */}
        <Card>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calendar className="text-blue-600" size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-slate-900">SIAKAD Sunan</h3>
                  {connections.siakad.connected ? (
                    <span className="flex items-center gap-1 text-sm text-green-600">
                      <Check size={16} />
                      Connected
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-sm text-red-600">
                      <X size={16} />
                      Disconnected
                    </span>
                  )}
                </div>
                
                <div className="space-y-2 text-sm text-slate-600">
                  <p>Username: <span className="font-medium">{connections.siakad.username}</span></p>
                  <p>Last Sync: <span className="font-medium">{formatTimeAgo(lastSync.siakad)}</span></p>
                  
                  <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs font-semibold text-slate-700 mb-2">Data Fetched:</p>
                    <ul className="text-xs space-y-1">
                      <li>• {connections.siakad.lastData.schedules} jadwal kuliah</li>
                      <li>• {connections.siakad.lastData.announcements} pengumuman baru</li>
                      <li>• {connections.siakad.lastData.tasks} tugas dari dosen</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleSync('siakad')}
                disabled={syncing !== null}
              >
                {syncing === 'siakad' ? (
                  <>
                    <Loader2 size={16} className="animate-spin mr-2" />
                    Syncing...
                  </>
                ) : (
                  <>
                    <RefreshCw size={16} className="mr-2" />
                    Sync Now
                  </>
                )}
              </Button>
              <Button variant="secondary" size="sm">
                Disconnect
              </Button>
            </div>
          </div>
        </Card>

        {/* Email Integration */}
        <Card>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Mail className="text-purple-600" size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-slate-900">Email (Gmail)</h3>
                  {connections.email.connected ? (
                    <span className="flex items-center gap-1 text-sm text-green-600">
                      <Check size={16} />
                      Connected
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-sm text-red-600">
                      <X size={16} />
                      Disconnected
                    </span>
                  )}
                </div>
                
                <div className="space-y-2 text-sm text-slate-600">
                  <p>Email: <span className="font-medium">{connections.email.email}</span></p>
                  <p>Last Check: <span className="font-medium">{formatTimeAgo(lastSync.email)}</span></p>
                  
                  <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs font-semibold text-slate-700 mb-2">Status:</p>
                    <p className="text-xs">
                      <span className="font-semibold text-purple-600">{connections.email.newTasks}</span> new tasks found from email
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleSync('email')}
                disabled={syncing !== null}
              >
                {syncing === 'email' ? (
                  <>
                    <Loader2 size={16} className="animate-spin mr-2" />
                    Checking...
                  </>
                ) : (
                  <>
                    <RefreshCw size={16} className="mr-2" />
                    Check Now
                  </>
                )}
              </Button>
              <Button variant="secondary" size="sm">
                Disconnect
              </Button>
            </div>
          </div>
        </Card>

        {/* WhatsApp Integration */}
        <Card>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <MessageCircle className="text-green-600" size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-slate-900">WhatsApp</h3>
                  {connections.whatsapp.connected ? (
                    <span className="flex items-center gap-1 text-sm text-green-600">
                      <Check size={16} />
                      Connected
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-sm text-red-600">
                      <X size={16} />
                      Disconnected
                    </span>
                  )}
                </div>
                
                <div className="space-y-2 text-sm text-slate-600">
                  <p>Phone: <span className="font-medium">{connections.whatsapp.phone}</span></p>
                  <p>Monitoring: <span className="font-medium">Group "{connections.whatsapp.group}"</span></p>
                  <p>Last Message: <span className="font-medium">{formatTimeAgo(lastSync.whatsapp)}</span></p>
                  
                  <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs font-semibold text-slate-700 mb-2">Status:</p>
                    <p className="text-xs">Monitoring class group for task announcements</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleSync('whatsapp')}
                disabled={syncing !== null}
              >
                {syncing === 'whatsapp' ? (
                  <>
                    <Loader2 size={16} className="animate-spin mr-2" />
                    Refreshing...
                  </>
                ) : (
                  <>
                    <RefreshCw size={16} className="mr-2" />
                    Refresh
                  </>
                )}
              </Button>
              <Button variant="secondary" size="sm">
                Disconnect
              </Button>
            </div>
          </div>
        </Card>

        {/* Auto-Sync Settings */}
        <Card title="Auto-Sync Settings">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div>
                <p className="text-sm font-medium text-slate-900">Enable Auto-Sync</p>
                <p className="text-xs text-slate-500 mt-1">Automatically sync data every 5 minutes</p>
              </div>
              <button
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-[var(--primary)]"
              >
                <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
              </button>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-slate-900">Sync Interval</p>
                <p className="text-xs text-slate-500 mt-1">How often to check for new data</p>
              </div>
              <select className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
                <option value="5">Every 5 minutes</option>
                <option value="10">Every 10 minutes</option>
                <option value="15">Every 15 minutes</option>
                <option value="30">Every 30 minutes</option>
              </select>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
