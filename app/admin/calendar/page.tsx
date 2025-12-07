'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function AdminManageCalendar() {
  const [currentMonth] = useState('Desember 2025');

  // Calendar grid (simplified - just showing structure)
  const daysOfWeek = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  
  // Dummy calendar data - each item represents a day
  const calendarDays = [
    { date: null, events: [] }, // Empty cells for alignment
    { date: null, events: [] },
    { date: null, events: [] },
    { date: 1, events: [] },
    { date: 2, events: [{ type: 'class', title: 'Pemrograman Web' }] },
    { date: 3, events: [] },
    { date: 4, events: [] },
    { date: 5, events: [{ type: 'exam', title: 'Ujian Tengah Semester' }] },
    { date: 6, events: [] },
    { date: 7, events: [{ type: 'class', title: 'Basis Data' }] },
    { date: 8, events: [] },
    { date: 9, events: [] },
    { date: 10, events: [{ type: 'event', title: 'Seminar Teknologi' }] },
    { date: 11, events: [] },
    { date: 12, events: [{ type: 'class', title: 'Algoritma' }] },
    { date: 13, events: [] },
    { date: 14, events: [] },
    { date: 15, events: [{ type: 'exam', title: 'Quiz Basis Data' }] },
    { date: 16, events: [] },
    { date: 17, events: [] },
    { date: 18, events: [] },
    { date: 19, events: [{ type: 'event', title: 'Workshop AI' }] },
    { date: 20, events: [] },
    { date: 21, events: [] },
    { date: 22, events: [] },
    { date: 23, events: [] },
    { date: 24, events: [] },
    { date: 25, events: [{ type: 'event', title: 'Libur Natal' }] },
    { date: 26, events: [] },
    { date: 27, events: [] },
    { date: 28, events: [] },
    { date: 29, events: [] },
    { date: 30, events: [] },
    { date: 31, events: [] },
  ];

  const getEventColor = (type: string) => {
    switch (type) {
      case 'class':
        return 'bg-blue-500';
      case 'exam':
        return 'bg-red-500';
      case 'event':
        return 'bg-purple-500';
      default:
        return 'bg-slate-500';
    }
  };

  return (
    <DashboardLayout
      role="admin"
      pageTitle="Manage Calendar"
      pageSubtitle="Kelola jadwal dan event kampus"
      userName="Admin User"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar - Left Side (Larger) */}
        <div className="lg:col-span-2">
          <Card>
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">{currentMonth}</h2>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <ChevronLeft size={20} />
                </button>
                <Button variant="secondary" size="sm">
                  Today
                </Button>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* View Tabs */}
            <div className="flex gap-2 mb-6">
              <button className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg text-sm font-medium">
                Month
              </button>
              <button className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors">
                Week
              </button>
              <button className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors">
                Day
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              {/* Days of Week Header */}
              <div className="grid grid-cols-7 bg-slate-50">
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className="py-3 text-center text-sm font-semibold text-slate-700 border-b border-slate-200"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7">
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={`min-h-[100px] p-2 border-b border-r border-slate-200 ${
                      day.date === null ? 'bg-slate-50' : 'bg-white hover:bg-slate-50'
                    } ${index % 7 === 6 ? 'border-r-0' : ''}`}
                  >
                    {day.date && (
                      <>
                        <div className="text-sm font-medium text-slate-900 mb-1">
                          {day.date}
                        </div>
                        <div className="space-y-1">
                          {day.events.map((event, eventIndex) => (
                            <div
                              key={eventIndex}
                              className={`text-xs px-2 py-1 rounded text-white ${getEventColor(
                                event.type
                              )} truncate`}
                              title={event.title}
                            >
                              {event.title}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex gap-4 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-slate-600">Class</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-slate-600">Exam</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded"></div>
                <span className="text-slate-600">Campus Event</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Create Event Form - Right Side */}
        <div>
          <Card title="Create Event" subtitle="Tambah event baru">
            <form className="space-y-4">
              {/* Event Title */}
              <Input label="Event Title" type="text" placeholder="Enter event title" />

              {/* Event Type */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Event Type
                </label>
                <select className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm">
                  <option value="class">Class</option>
                  <option value="exam">Exam</option>
                  <option value="event">Campus Event</option>
                </select>
              </div>

              {/* Date */}
              <Input label="Date" type="date" />

              {/* Time */}
              <div className="grid grid-cols-2 gap-3">
                <Input label="Start Time" type="time" />
                <Input label="End Time" type="time" />
              </div>

              {/* Location */}
              <Input label="Location" type="text" placeholder="e.g., Ruang 301" />

              {/* Target Audience */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Target Audience
                </label>
                <select className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm">
                  <option value="all">All Students</option>
                  <option value="kelas-2a">Kelas 2A</option>
                  <option value="kelas-2b">Kelas 2B</option>
                  <option value="kelas-3a">Kelas 3A</option>
                  <option value="kelas-3b">Kelas 3B</option>
                  <option value="kelas-4a">Kelas 4A</option>
                  <option value="kelas-4b">Kelas 4B</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter event description"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none text-sm"
                ></textarea>
              </div>

              {/* Submit Button */}
              <Button variant="primary" size="md" className="w-full">
                Create Event
              </Button>
            </form>
          </Card>

          {/* Upcoming Events */}
          <Card title="Upcoming Events" className="mt-6">
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">Pemrograman Web</p>
                    <p className="text-xs text-slate-600 mt-1">2 Des, 10:00 - 12:00</p>
                    <p className="text-xs text-slate-500">Lab Komputer 3</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">Ujian Tengah Semester</p>
                    <p className="text-xs text-slate-600 mt-1">5 Des, 08:00 - 10:00</p>
                    <p className="text-xs text-slate-500">Ruang 301</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">Seminar Teknologi</p>
                    <p className="text-xs text-slate-600 mt-1">10 Des, 13:00 - 15:00</p>
                    <p className="text-xs text-slate-500">Auditorium</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
