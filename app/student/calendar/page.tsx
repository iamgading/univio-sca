'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CalendarPage() {
  const [currentMonth] = useState('Desember 2025');
  
  // Dummy calendar data - simplified grid
  const daysOfWeek = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
  
  // Simplified calendar days (December 2025 starts on Monday)
  const calendarDays = [
    { date: 1, events: [{ type: 'class', title: 'Algoritma' }] },
    { date: 2, events: [] },
    { date: 3, events: [{ type: 'exam', title: 'Quiz Basis Data' }] },
    { date: 4, events: [] },
    { date: 5, events: [{ type: 'class', title: 'Pemrograman Web' }] },
    { date: 6, events: [] },
    { date: 7, events: [{ type: 'event', title: 'Seminar IT' }] },
    { date: 8, events: [{ type: 'class', title: 'Algoritma' }] },
    { date: 9, events: [] },
    { date: 10, events: [{ type: 'exam', title: 'UTS Desain UI/UX' }] },
    { date: 11, events: [] },
    { date: 12, events: [{ type: 'class', title: 'Basis Data' }] },
    { date: 13, events: [] },
    { date: 14, events: [] },
    { date: 15, events: [{ type: 'class', title: 'Pemrograman Web' }] },
    { date: 16, events: [] },
    { date: 17, events: [{ type: 'event', title: 'Workshop Mobile' }] },
    { date: 18, events: [] },
    { date: 19, events: [{ type: 'class', title: 'Algoritma' }] },
    { date: 20, events: [] },
    { date: 21, events: [] },
    { date: 22, events: [{ type: 'exam', title: 'Final Project' }] },
    { date: 23, events: [] },
    { date: 24, events: [] },
    { date: 25, events: [] },
    { date: 26, events: [] },
    { date: 27, events: [] },
    { date: 28, events: [] },
    { date: 29, events: [] },
    { date: 30, events: [] },
    { date: 31, events: [] },
  ];
  
  const todaySchedule = [
    { time: '08:00 - 09:40', course: 'Algoritma & Struktur Data', room: 'Ruang 301' },
    { time: '10:00 - 12:00', course: 'Pemrograman Web', room: 'Lab Komputer 3' },
    { time: '13:00 - 14:40', course: 'Basis Data', room: 'Ruang 205' },
  ];
  
  const upcomingDeadlines = [
    { task: 'Laporan Tugas Akhir Desain', due: '10 Des', priority: 'high' },
    { task: 'Presentasi Proposal', due: '12 Des', priority: 'high' },
    { task: 'Quiz Chapter 5', due: '15 Des', priority: 'medium' },
  ];
  
  const getEventColor = (type: string) => {
    switch (type) {
      case 'class': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'exam': return 'bg-red-100 text-red-700 border-red-200';
      case 'event': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };
  
  return (
    <DashboardLayout
      role="student"
      pageTitle="Calendar"
      pageSubtitle="Jadwal kuliah dan event kampus"
      userName="Budi Santoso"
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar - Main */}
        <div className="lg:col-span-3">
          <Card>
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">{currentMonth}</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Today</Button>
                <div className="flex gap-1">
                  <button className="p-2 hover:bg-slate-100 rounded-lg">
                    <ChevronLeft size={20} />
                  </button>
                  <button className="p-2 hover:bg-slate-100 rounded-lg">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* View Tabs */}
            <div className="flex gap-2 mb-6">
              {['Month', 'Week', 'Day'].map((view) => (
                <button
                  key={view}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    view === 'Month'
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {view}
                </button>
              ))}
            </div>
            
            {/* Calendar Grid */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              {/* Days of Week Header */}
              <div className="grid grid-cols-7 bg-slate-50">
                {daysOfWeek.map((day) => (
                  <div key={day} className="p-3 text-center text-sm font-semibold text-slate-700 border-b border-slate-200">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar Days */}
              <div className="grid grid-cols-7">
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className="min-h-[100px] p-2 border-b border-r border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    <div className={`text-sm font-medium mb-1 ${
                      day.date === 7 ? 'text-[var(--primary)]' : 'text-slate-700'
                    }`}>
                      {day.date}
                    </div>
                    <div className="space-y-1">
                      {day.events.map((event, idx) => (
                        <div
                          key={idx}
                          className={`text-xs px-2 py-1 rounded border ${getEventColor(event.type)}`}
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Schedule */}
          <Card title="Today's Schedule">
            <div className="space-y-3">
              {todaySchedule.map((schedule, index) => (
                <div
                  key={index}
                  className="p-3 bg-slate-50 rounded-lg border border-slate-200"
                >
                  <p className="text-xs text-slate-500 font-medium">{schedule.time}</p>
                  <p className="text-sm font-semibold text-slate-900 mt-1">{schedule.course}</p>
                  <p className="text-xs text-slate-600 mt-1">{schedule.room}</p>
                </div>
              ))}
            </div>
          </Card>
          
          {/* Upcoming Deadlines */}
          <Card title="Upcoming Deadlines">
            <div className="space-y-3">
              {upcomingDeadlines.map((deadline, index) => (
                <div
                  key={index}
                  className="p-3 bg-slate-50 rounded-lg border border-slate-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm font-medium text-slate-900">{deadline.task}</p>
                    <Badge variant={deadline.priority === 'high' ? 'error' : 'warning'} className="text-xs">
                      {deadline.priority.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600">Due: {deadline.due}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
