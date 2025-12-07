'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Search, Filter } from 'lucide-react';

export default function MyTasksPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const tasks = [
    { id: 1, task: 'Laporan Tugas Akhir Desain', course: 'Desain UI/UX', due: '10 Des 2025', priority: 'high', status: 'in-progress' },
    { id: 2, task: 'Presentasi Proposal', course: 'Metodologi Penelitian', due: '12 Des 2025', priority: 'high', status: 'todo' },
    { id: 3, task: 'Quiz Chapter 5', course: 'Basis Data', due: '15 Des 2025', priority: 'medium', status: 'todo' },
    { id: 4, task: 'Essay Analisis Kasus', course: 'Sistem Informasi', due: '18 Des 2025', priority: 'low', status: 'todo' },
    { id: 5, task: 'Praktikum Jaringan Komputer', course: 'Jaringan Komputer', due: '20 Des 2025', priority: 'medium', status: 'todo' },
    { id: 6, task: 'Tugas Kelompok Mobile App', course: 'Pemrograman Mobile', due: '5 Des 2025', priority: 'high', status: 'done' },
    { id: 7, task: 'Review Jurnal Internasional', course: 'Metodologi Penelitian', due: '3 Des 2025', priority: 'medium', status: 'done' },
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
  
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const totalTasks = tasks.length;
  
  return (
    <DashboardLayout
      role="student"
      pageTitle="My Tasks"
      pageSubtitle="Kelola semua tugas kuliah Anda"
      userName="Budi Santoso"
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            {/* Filter Bar */}
            <div className="mb-6 space-y-4">
              {/* Filter Chips */}
              <div className="flex flex-wrap gap-2">
                {['all', 'today', 'this-week', 'completed'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeFilter === filter
                        ? 'bg-[var(--primary)] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {filter === 'all' && 'All'}
                    {filter === 'today' && 'Today'}
                    {filter === 'this-week' && 'This Week'}
                    {filter === 'completed' && 'Completed'}
                  </button>
                ))}
              </div>
              
              {/* Search & Sort */}
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  />
                </div>
                <select className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
                  <option>Sort by: Due date</option>
                  <option>Sort by: Priority</option>
                  <option>Sort by: Course</option>
                </select>
              </div>
            </div>
            
            {/* Tasks Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Task</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Course</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Due</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Priority</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4 text-sm font-medium text-slate-900">{task.task}</td>
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
                      <td className="py-3 px-4">
                        <Link href={`/student/tasks/${task.id}`}>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Task Progress */}
          <Card title="Task Progress">
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--primary)]">
                {completedTasks}/{totalTasks}
              </div>
              <p className="text-sm text-slate-600 mt-2">tasks completed</p>
              <div className="w-full bg-slate-200 rounded-full h-3 mt-4">
                <div
                  className="bg-[var(--primary)] h-3 rounded-full transition-all"
                  style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                {Math.round((completedTasks / totalTasks) * 100)}% Complete
              </p>
            </div>
          </Card>
          
          {/* Next Recommended Task */}
          <Card title="Next Recommended">
            <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg">
              <Badge variant="error" className="mb-2">HIGH PRIORITY</Badge>
              <h4 className="font-semibold text-slate-900 mb-1">Laporan Tugas Akhir Desain</h4>
              <p className="text-sm text-slate-600 mb-3">Due: 10 Des 2025</p>
              <Link href="/student/tasks/1">
                <Button variant="primary" size="sm" className="w-full">
                  Open Task
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
