import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Users, ClipboardList, Calendar, Megaphone, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  // Dummy statistics data
  const stats = [
    {
      label: 'Total Students',
      value: '1,234',
      icon: Users,
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      label: 'Active Tasks',
      value: '87',
      icon: ClipboardList,
      color: 'bg-teal-100',
      iconColor: 'text-teal-600',
    },
    {
      label: 'Upcoming Deadlines',
      value: '23',
      icon: Calendar,
      color: 'bg-amber-100',
      iconColor: 'text-amber-600',
    },
    {
      label: 'Active Announcements',
      value: '12',
      icon: Megaphone,
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ];

  // Recent tasks data
  const recentTasks = [
    {
      id: 1,
      task: 'Laporan Tugas Akhir Desain',
      course: 'Desain UI/UX',
      assignedTo: 'Kelas 3A',
      due: '10 Des 2025',
      status: 'in-progress',
    },
    {
      id: 2,
      task: 'Presentasi Proposal',
      course: 'Metodologi Penelitian',
      assignedTo: 'Kelas 4B',
      due: '12 Des 2025',
      status: 'todo',
    },
    {
      id: 3,
      task: 'Quiz Chapter 5',
      course: 'Basis Data',
      assignedTo: 'Kelas 2A',
      due: '15 Des 2025',
      status: 'todo',
    },
    {
      id: 4,
      task: 'Essay Analisis Kasus',
      course: 'Sistem Informasi',
      assignedTo: 'Kelas 3B',
      due: '18 Des 2025',
      status: 'done',
    },
    {
      id: 5,
      task: 'Praktikum Web Development',
      course: 'Pemrograman Web',
      assignedTo: 'Kelas 2B',
      due: '20 Des 2025',
      status: 'todo',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done':
        return 'success';
      case 'in-progress':
        return 'info';
      case 'todo':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'done':
        return 'Done';
      case 'in-progress':
        return 'In Progress';
      case 'todo':
        return 'To Do';
      default:
        return status;
    }
  };

  return (
    <DashboardLayout
      role="admin"
      pageTitle="Admin Dashboard"
      pageSubtitle="Kelola sistem Univio"
      userName="Admin User"
    >
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <div className="flex items-start gap-4">
                <div className={`p-3 ${stat.color} rounded-lg`}>
                  <Icon className={stat.iconColor} size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tasks Table */}
        <div className="lg:col-span-2">
          <Card title="Recent Tasks" subtitle="Tugas yang baru ditambahkan">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                      Task
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                      Course
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                      Assigned To
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                      Due Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentTasks.map((task) => (
                    <tr
                      key={task.id}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="py-3 px-4 text-sm text-slate-900">{task.task}</td>
                      <td className="py-3 px-4 text-sm text-slate-600">{task.course}</td>
                      <td className="py-3 px-4 text-sm text-slate-600">{task.assignedTo}</td>
                      <td className="py-3 px-4 text-sm text-slate-600">{task.due}</td>
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

        {/* Statistics Sidebar */}
        <div className="space-y-6">
          {/* Completion Rate */}
          <Card>
            <div className="flex items-start gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="text-green-600" size={24} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-500">Completion Rate</p>
                <p className="text-sm text-slate-600 mt-1">This Week</p>
                <div className="mt-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-slate-900">78</span>
                    <span className="text-slate-500">%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: '78%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card title="Quick Actions">
            <div className="space-y-3">
              <a
                href="/admin/tasks"
                className="block w-full px-4 py-3 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-lg text-sm font-medium transition-colors"
              >
                + Create New Task
              </a>
              <a
                href="/admin/calendar"
                className="block w-full px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors"
              >
                + Add Calendar Event
              </a>
              <a
                href="/admin/announcements"
                className="block w-full px-4 py-3 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-sm font-medium transition-colors"
              >
                + Post Announcement
              </a>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card title="Recent Activity">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full mt-1.5"></div>
                <div>
                  <p className="text-sm text-slate-900">New task assigned</p>
                  <p className="text-xs text-slate-500 mt-1">5 minutes ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                <div>
                  <p className="text-sm text-slate-900">Event created</p>
                  <p className="text-xs text-slate-500 mt-1">1 hour ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                <div>
                  <p className="text-sm text-slate-900">Announcement posted</p>
                  <p className="text-xs text-slate-500 mt-1">3 hours ago</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
