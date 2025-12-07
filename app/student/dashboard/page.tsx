import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Calendar, CheckCircle2, Clock } from 'lucide-react';

export default function StudentDashboard() {
  // Dummy data
  const todayDate = 'Senin, 7 Desember 2025';
  const todayClasses = 3;
  const tasksCompleted = 5;
  const totalTasks = 9;
  const nextClass = {
    name: 'Pemrograman Web',
    time: '10:00 - 12:00',
    location: 'Lab Komputer 3',
  };
  
  const upcomingTasks = [
    { id: 1, task: 'Laporan Tugas Akhir Desain', course: 'Desain UI/UX', due: '10 Des 2025', priority: 'high', status: 'in-progress' },
    { id: 2, task: 'Presentasi Proposal', course: 'Metodologi Penelitian', due: '12 Des 2025', priority: 'high', status: 'todo' },
    { id: 3, task: 'Quiz Chapter 5', course: 'Basis Data', due: '15 Des 2025', priority: 'medium', status: 'todo' },
    { id: 4, task: 'Essay Analisis Kasus', course: 'Sistem Informasi', due: '18 Des 2025', priority: 'low', status: 'todo' },
  ];
  
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
      userName="Budi Santoso"
    >
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
                    style={{ width: `${(tasksCompleted / totalTasks) * 100}%` }}
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
        {/* Upcoming Tasks - Larger */}
        <div className="lg:col-span-2">
          <Card title="Upcoming Tasks" subtitle="Tugas yang perlu diselesaikan">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Task</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Course</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Due Date</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Priority</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingTasks.map((task) => (
                    <tr key={task.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4 text-sm text-slate-900">{task.task}</td>
                      <td className="py-3 px-4 text-sm text-slate-600">{task.course}</td>
                      <td className="py-3 px-4 text-sm text-slate-600">{task.due}</td>
                      <td className="py-3 px-4">
                        <Badge variant={getPriorityColor(task.priority) as any}>
                          {task.priority.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={getStatusColor(task.status) as any}>
                          {getStatusLabel(task.status)}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
