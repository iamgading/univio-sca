'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { useData } from '@/contexts/DataContext';
import { calculateAIPriority } from '@/lib/aiPriority';
import { Calendar, CheckCircle2, Clock, Sparkles, Link as LinkIcon, X } from 'lucide-react';

export default function StudentDashboard() {
  const { tasks } = useData();
  const [showBanner, setShowBanner] = useState(false);
  const [hasConnections, setHasConnections] = useState(false);
  
  // Check connection status
  useEffect(() => {
    const saved = localStorage.getItem('univio_connections');
    if (saved) {
      const connections = JSON.parse(saved);
      const connected = connections.siakad?.connected || connections.email?.connected || connections.whatsapp?.connected;
      setHasConnections(connected);
      setShowBanner(!connected);
    } else {
      setShowBanner(true);
    }
  }, []);
  
  // Calculate AI priorities for all tasks
  const tasksWithAI = useMemo(() => {
    return tasks.map(task => ({
      ...task,
      aiPriority: calculateAIPriority(task),
    }));
  }, [tasks]);
  
  // Sort by AI priority score (highest first)
  const sortedTasks = useMemo(() => {
    return [...tasksWithAI]
      .filter(t => t.status !== 'done')
      .sort((a, b) => b.aiPriority.score - a.aiPriority.score)
      .slice(0, 5); // Top 5 tasks
  }, [tasksWithAI]);
  
  // Stats
  const todayDate = new Date().toLocaleDateString('id-ID', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const todayClasses = 3;
  const tasksCompleted = tasks.filter(t => t.status === 'done').length;
  const totalTasks = tasks.length;
  const nextClass = {
    name: 'Pemrograman Web',
    time: '10:00 - 12:00',
    location: 'Lab Komputer 3',
  };
  
  const todaySchedule = [
    { time: '08:00 - 09:40', course: 'Algoritma & Struktur Data', room: 'Ruang 301' },
    { time: '10:00 - 12:00', course: 'Pemrograman Web', room: 'Lab Komputer 3' },
    { time: '13:00 - 14:40', course: 'Basis Data', room: 'Ruang 205' },
  ];
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done': return 'success';
      case 'in-progress': return 'info';
      case 'todo': return 'default';
      default: return 'default';
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'done': return 'Done';
      case 'in-progress': return 'In Progress';
      case 'todo': return 'To Do';
      default: return status;
    }
  };
  
  return (
    <DashboardLayout
      role="student"
      pageTitle="Dashboard"
      pageSubtitle="Selamat datang kembali!"
      userName="Gading Satrio"
    >
      {/* Connection Banner */}
      {showBanner && (
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <div className="p-2 bg-blue-100 rounded-lg">
                <LinkIcon className="text-blue-600" size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 mb-1">Connect Your Platforms</h3>
                <p className="text-sm text-slate-600 mb-3">
                  Connect SIAKAD, Email, or WhatsApp to automatically sync your tasks and schedules. 
                  Get AI-powered priority recommendations!
                </p>
                <Link href="/settings/integrations">
                  <Button variant="primary" size="sm">
                    <LinkIcon size={16} className="mr-2" />
                    Connect Now
                  </Button>
                </Link>
              </div>
            </div>
            <button 
              onClick={() => setShowBanner(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Today Overview - 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-teal-100 rounded-lg">
              <Calendar className="text-teal-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Today</p>
              <p className="text-lg font-semibold text-slate-900 mt-1">{todayDate}</p>
              <p className="text-sm text-slate-600 mt-2">{todayClasses} kelas hari ini</p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <CheckCircle2 className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Task Progress</p>
              <div className="mt-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-slate-900">{tasksCompleted}</span>
                  <span className="text-slate-500">/ {totalTasks}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-[var(--primary)] h-2 rounded-full"
                    style={{ width: `${totalTasks > 0 ? (tasksCompleted / totalTasks) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-100 rounded-lg">
              <Clock className="text-amber-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Next Class</p>
              <p className="text-lg font-semibold text-slate-900 mt-1">{nextClass.name}</p>
              <p className="text-sm text-slate-600 mt-1">{nextClass.time}</p>
              <p className="text-xs text-slate-500">{nextClass.location}</p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Tasks with AI Priority - Larger */}
        <div className="lg:col-span-2">
          <Card 
            title={
              <div className="flex items-center gap-2">
                <Sparkles className="text-purple-600" size={20} />
                <span>Upcoming Tasks (AI Prioritized)</span>
              </div>
            }
            subtitle="Tugas diurutkan berdasarkan AI Priority Score"
          >
            <div className="space-y-4">
              {sortedTasks.length === 0 ? (
                <p className="text-center text-slate-500 py-8">No active tasks</p>
              ) : (
                sortedTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-4 border border-slate-200 rounded-lg hover:border-[var(--primary)] transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900">{task.task}</h4>
                        <p className="text-sm text-slate-600 mt-1">{task.course}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={getStatusColor(task.status) as any}>
                          {getStatusLabel(task.status)}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* AI Priority Section */}
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-3 border border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Sparkles size={14} className="text-purple-600" />
                          <span className="text-xs font-semibold text-purple-900">AI Priority Score</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-purple-600">{task.aiPriority.score}</span>
                          <Badge variant={getPriorityColor(task.aiPriority.priority) as any}>
                            {task.aiPriority.priority.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="text-xs text-slate-700 space-y-1">
                        <p><strong>Reason:</strong> {task.aiPriority.reason}</p>
                        <p><strong>Recommendation:</strong> {task.aiPriority.recommendation}</p>
                      </div>
                      
                      <div className="mt-2 pt-2 border-t border-purple-200">
                        <div className="flex justify-between text-xs text-slate-600">
                          <span>Deadline: {task.aiPriority.breakdown.deadlineScore}pts</span>
                          <span>Grade: {task.aiPriority.breakdown.gradeWeightScore}pts</span>
                          <span>Complexity: {task.aiPriority.breakdown.complexityScore}pts</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-xs text-slate-500">
                      Due: {new Date(task.due).toLocaleDateString('id-ID')} at {task.dueTime}
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
        
        {/* Today's Schedule */}
        <div>
          <Card title="Today's Schedule" subtitle="Jadwal kuliah hari ini">
            <div className="space-y-4">
              {todaySchedule.map((schedule, index) => (
                <div
                  key={index}
                  className="p-4 bg-slate-50 rounded-lg border border-slate-200"
                >
                  <p className="text-xs text-slate-500 font-medium">{schedule.time}</p>
                  <p className="text-sm font-semibold text-slate-900 mt-1">{schedule.course}</p>
                  <p className="text-xs text-slate-600 mt-1">{schedule.room}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
