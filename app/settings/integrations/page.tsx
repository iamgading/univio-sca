'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/contexts/ToastContext';
import { RefreshCw, Check, X, Loader2, Calendar, Mail, MessageCircle, Link as LinkIcon } from 'lucide-react';

export default function IntegrationsPage() {
  const { addTask, addEvent, addNotification } = useData();
  const { showToast } = useToast();
  const [syncing, setSyncing] = useState<string | null>(null);
  const [showConnectModal, setShowConnectModal] = useState<string | null>(null);
  
  // Load connection status from localStorage
  const [connections, setConnections] = useState({
    siakad: {
      connected: false,
      username: '',
      password: '',
      lastSync: null as Date | null,
      lastData: { schedules: 0, announcements: 0, tasks: 0 },
    },
    email: {
      connected: false,
      email: '',
      password: '',
      lastSync: null as Date | null,
      newTasks: 0,
    },
    whatsapp: {
      connected: false,
      phone: '',
      group: '',
      lastSync: null as Date | null,
    },
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('univio_connections');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Convert date strings back to Date objects
      if (parsed.siakad?.lastSync) parsed.siakad.lastSync = new Date(parsed.siakad.lastSync);
      if (parsed.email?.lastSync) parsed.email.lastSync = new Date(parsed.email.lastSync);
      if (parsed.whatsapp?.lastSync) parsed.whatsapp.lastSync = new Date(parsed.whatsapp.lastSync);
      setConnections(parsed);
    }
  }, []);

  // Save to localStorage whenever connections change
  useEffect(() => {
    localStorage.setItem('univio_connections', JSON.stringify(connections));
  }, [connections]);

  // Dummy data untuk simulasi sync
  const dummyTasks = [
    {
      task: 'Quiz Basis Data Chapter 5',
      course: 'Basis Data',
      description: 'Quiz online tentang normalisasi database dan SQL queries',
      due: '2025-12-15',
      dueTime: '14:00',
      priority: 'medium' as const,
      status: 'todo' as const,
    },
    {
      task: 'Presentasi Proposal Penelitian',
      course: 'Metodologi Penelitian',
      description: 'Presentasi proposal penelitian di depan kelas dengan durasi 15 menit',
      due: '2025-12-18',
      dueTime: '10:00',
      priority: 'high' as const,
      status: 'todo' as const,
    },
    {
      task: 'Tugas Kelompok Web Development',
      course: 'Pemrograman Web',
      description: 'Membuat website e-commerce sederhana menggunakan React dan Node.js',
      due: '2025-12-20',
      dueTime: '23:59',
      priority: 'high' as const,
      status: 'todo' as const,
    },
    {
      task: 'Laporan Praktikum Jaringan Komputer',
      course: 'Jaringan Komputer',
      description: 'Laporan hasil praktikum konfigurasi router dan switch',
      due: '2025-12-22',
      dueTime: '16:00',
      priority: 'medium' as const,
      status: 'todo' as const,
    },
    {
      task: 'Essay Analisis Sistem Informasi',
      course: 'Sistem Informasi',
      description: 'Essay tentang analisis sistem informasi pada perusahaan',
      due: '2025-12-25',
      dueTime: '23:59',
      priority: 'low' as const,
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

  const handleConnect = (platform: 'siakad' | 'email' | 'whatsapp', credentials: any) => {
    // Simulate connection
    setConnections(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        ...credentials,
        connected: true,
        lastSync: new Date(),
      },
    }));

    showToast(`Connected to ${platform === 'siakad' ? 'SIAKAD' : platform === 'email' ? 'Email' : 'WhatsApp'} successfully!`, 'success');

    // Auto-sync after connection
    setTimeout(() => {
      handleSync(platform);
    }, 1000);

    setShowConnectModal(null);
  };

  const handleDisconnect = (platform: 'siakad' | 'email' | 'whatsapp') => {
    setConnections(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        connected: false,
        username: '',
        password: '',
        email: '',
        phone: '',
        group: '',
      },
    }));
    showToast(`Disconnected from ${platform === 'siakad' ? 'SIAKAD' : platform === 'email' ? 'Email' : 'WhatsApp'}`, 'info');
  };

  const handleSync = async (platform: 'siakad' | 'email' | 'whatsapp') => {
    setSyncing(platform);

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Get random tasks
    const randomCount = Math.floor(Math.random() * 2) + 1; // 1-2 tasks
    const randomTasks = [];
    for (let i = 0; i < randomCount; i++) {
      const randomIndex = Math.floor(Math.random() * dummyTasks.length);
      randomTasks.push(dummyTasks[randomIndex]);
    }

    // Add dummy data based on platform
    if (platform === 'siakad') {
      // Add tasks and events
      randomTasks.forEach(task => addTask(task));
      if (Math.random() > 0.5) {
        addEvent(dummyEvents[Math.floor(Math.random() * dummyEvents.length)]);
      }
      
      addNotification({
        id: Date.now().toString(),
        type: 'System',
        title: 'SIAKAD Synced',
        description: `Added ${randomTasks.length} new task(s) from SIAKAD`,
        timestamp: new Date().toISOString(),
        read: false,
      });

      showToast(`SIAKAD Synced! Found ${randomTasks.length} new items.`, 'success');

      // Update stats
      setConnections(prev => ({
        ...prev,
        siakad: {
          ...prev.siakad,
          lastSync: new Date(),
          lastData: {
            schedules: prev.siakad.lastData.schedules + (Math.random() > 0.5 ? 1 : 0),
            announcements: prev.siakad.lastData.announcements + (Math.random() > 0.7 ? 1 : 0),
            tasks: prev.siakad.lastData.tasks + randomTasks.length,
          },
        },
      }));
    } else if (platform === 'email') {
      randomTasks.forEach(task => addTask(task));
      
      addNotification({
        id: Date.now().toString(),
        type: 'Tasks',
        title: 'New task from Email',
        description: randomTasks[0].task,
        timestamp: new Date().toISOString(),
        read: false,
      });

      showToast(`Email Checked! ${randomTasks.length} new tasks found.`, 'success');

      setConnections(prev => ({
        ...prev,
        email: {
          ...prev.email,
          lastSync: new Date(),
          newTasks: prev.email.newTasks + randomTasks.length,
        },
      }));
    } else if (platform === 'whatsapp') {
      randomTasks.forEach(task => addTask(task));
      
      addNotification({
        id: Date.now().toString(),
        type: 'Tasks',
        title: 'New task from WhatsApp',
        description: randomTasks[0].task,
        timestamp: new Date().toISOString(),
        read: false,
      });

      showToast('WhatsApp Group synced! New tasks added.', 'success');

      setConnections(prev => ({
        ...prev,
        whatsapp: {
          ...prev.whatsapp,
          lastSync: new Date(),
        },
      }));
    }

    setSyncing(null);
  };

  const formatTimeAgo = (date: Date | null) => {
    if (!date) return 'Never';
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
                    <span className="flex items-center gap-1 text-sm text-slate-500">
                      <X size={16} />
                      Not Connected
                    </span>
                  )}
                </div>
                
                {connections.siakad.connected ? (
                  <div className="space-y-2 text-sm text-slate-600">
                    <p>Username: <span className="font-medium">{connections.siakad.username}</span></p>
                    <p>Last Sync: <span className="font-medium">{formatTimeAgo(connections.siakad.lastSync)}</span></p>
                    
                    <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs font-semibold text-slate-700 mb-2">Data Fetched:</p>
                      <ul className="text-xs space-y-1">
                        <li>• {connections.siakad.lastData.schedules} jadwal kuliah</li>
                        <li>• {connections.siakad.lastData.announcements} pengumuman baru</li>
                        <li>• {connections.siakad.lastData.tasks} tugas dari dosen</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">Connect your SIAKAD account to automatically sync schedules and tasks</p>
                )}
              </div>
            </div>
            
            <div className="flex gap-2">
              {connections.siakad.connected ? (
                <>
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
                  <Button variant="secondary" size="sm" onClick={() => handleDisconnect('siakad')}>
                    Disconnect
                  </Button>
                </>
              ) : (
                <Button variant="primary" size="sm" onClick={() => setShowConnectModal('siakad')}>
                  <LinkIcon size={16} className="mr-2" />
                  Connect
                </Button>
              )}
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
                    <span className="flex items-center gap-1 text-sm text-slate-500">
                      <X size={16} />
                      Not Connected
                    </span>
                  )}
                </div>
                
                {connections.email.connected ? (
                  <div className="space-y-2 text-sm text-slate-600">
                    <p>Email: <span className="font-medium">{connections.email.email}</span></p>
                    <p>Last Check: <span className="font-medium">{formatTimeAgo(connections.email.lastSync)}</span></p>
                    
                    <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs font-semibold text-slate-700 mb-2">Status:</p>
                      <p className="text-xs">
                        <span className="font-semibold text-purple-600">{connections.email.newTasks}</span> tasks found from email
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">Connect your email to automatically detect tasks from professors</p>
                )}
              </div>
            </div>
            
            <div className="flex gap-2">
              {connections.email.connected ? (
                <>
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
                  <Button variant="secondary" size="sm" onClick={() => handleDisconnect('email')}>
                    Disconnect
                  </Button>
                </>
              ) : (
                <Button variant="primary" size="sm" onClick={() => setShowConnectModal('email')}>
                  <LinkIcon size={16} className="mr-2" />
                  Connect
                </Button>
              )}
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
                    <span className="flex items-center gap-1 text-sm text-slate-500">
                      <X size={16} />
                      Not Connected
                    </span>
                  )}
                </div>
                
                {connections.whatsapp.connected ? (
                  <div className="space-y-2 text-sm text-slate-600">
                    <p>Phone: <span className="font-medium">{connections.whatsapp.phone}</span></p>
                    <p>Monitoring: <span className="font-medium">Group "{connections.whatsapp.group}"</span></p>
                    <p>Last Check: <span className="font-medium">{formatTimeAgo(connections.whatsapp.lastSync)}</span></p>
                    
                    <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs font-semibold text-slate-700 mb-2">Status:</p>
                      <p className="text-xs">Monitoring class group for task announcements</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">Connect WhatsApp to monitor class group messages for tasks</p>
                )}
              </div>
            </div>
            
            <div className="flex gap-2">
              {connections.whatsapp.connected ? (
                <>
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
                  <Button variant="secondary" size="sm" onClick={() => handleDisconnect('whatsapp')}>
                    Disconnect
                  </Button>
                </>
              ) : (
                <Button variant="primary" size="sm" onClick={() => setShowConnectModal('whatsapp')}>
                  <LinkIcon size={16} className="mr-2" />
                  Connect
                </Button>
              )}
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

      {/* Connect Modal */}
      {showConnectModal && (
        <ConnectModal
          platform={showConnectModal}
          onConnect={handleConnect}
          onClose={() => setShowConnectModal(null)}
        />
      )}
    </DashboardLayout>
  );
}

// Connect Modal Component
function ConnectModal({ 
  platform, 
  onConnect, 
  onClose 
}: { 
  platform: string; 
  onConnect: (platform: any, credentials: any) => void;
  onClose: () => void;
}) {
  const [credentials, setCredentials] = useState<any>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConnect(platform, credentials);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            Connect {platform === 'siakad' ? 'SIAKAD' : platform === 'email' ? 'Email' : 'WhatsApp'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {platform === 'siakad' && (
            <>
              <Input
                label="Username/NIM"
                type="text"
                placeholder="Enter your SIAKAD username"
                value={credentials.username || ''}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter your SIAKAD password"
                value={credentials.password || ''}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
              />
            </>
          )}
          
          {platform === 'email' && (
            <>
              <Input
                label="Email Address"
                type="email"
                placeholder="your.email@university.ac.id"
                value={credentials.email || ''}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                required
              />
              <Input
                label="App Password"
                type="password"
                placeholder="Enter Gmail app password"
                value={credentials.password || ''}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
              />
              <p className="text-xs text-slate-500">
                Use Gmail App Password for security. <a href="#" className="text-[var(--primary)]">Learn how</a>
              </p>
            </>
          )}
          
          {platform === 'whatsapp' && (
            <>
              <Input
                label="Phone Number"
                type="tel"
                placeholder="+62 812-3456-7890"
                value={credentials.phone || ''}
                onChange={(e) => setCredentials({ ...credentials, phone: e.target.value })}
                required
              />
              <Input
                label="Group Name"
                type="text"
                placeholder="e.g., Kelas 3A TI"
                value={credentials.group || ''}
                onChange={(e) => setCredentials({ ...credentials, group: e.target.value })}
                required
              />
              <p className="text-xs text-slate-500">
                We'll monitor this group for task announcements
              </p>
            </>
          )}
          
          <div className="flex gap-3 pt-4">
            <Button variant="secondary" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button variant="primary" type="submit" className="flex-1">
              Connect
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
