'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { User } from 'lucide-react';

export default function StudentProfile() {
  const [formData, setFormData] = useState({
    fullName: 'Budi Santoso',
    email: 'budi.santoso@university.ac.id',
    phone: '081234567890',
    studentId: '2021110001',
    program: 'Teknik Informatika',
    faculty: 'Fakultas Teknik',
  });

  const [notifications, setNotifications] = useState({
    taskReminders: true,
    classReminders: true,
    announcementAlerts: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
  };

  return (
    <DashboardLayout
      role="student"
      pageTitle="Profile"
      pageSubtitle="Kelola informasi profil Anda"
      userName="Budi Santoso"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Avatar & Basic Info */}
        <div>
          <Card>
            <div className="flex flex-col items-center text-center">
              {/* Avatar */}
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white text-4xl font-bold mb-4">
                BS
              </div>
              
              {/* Name & ID */}
              <h2 className="text-xl font-bold text-slate-900">{formData.fullName}</h2>
              <p className="text-sm text-slate-500 mt-1">Student ID: {formData.studentId}</p>
              <p className="text-sm text-slate-600 mt-2">{formData.program}</p>
              <p className="text-xs text-slate-500">{formData.faculty}</p>
              
              {/* Change Photo Button */}
              <Button variant="secondary" size="sm" className="mt-6 w-full">
                <User size={16} className="mr-2" />
                Change Photo
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column - Form */}
        <div className="lg:col-span-2">
          <Card title="Personal Information" subtitle="Update your personal details">
            <form className="space-y-5">
              {/* Full Name */}
              <Input
                label="Full Name"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
              />

              {/* Email */}
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />

              {/* Phone */}
              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
              />

              {/* Program */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Program
                </label>
                <select
                  name="program"
                  value={formData.program}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                >
                  <option value="Teknik Informatika">Teknik Informatika</option>
                  <option value="Sistem Informasi">Sistem Informasi</option>
                  <option value="Teknik Komputer">Teknik Komputer</option>
                  <option value="Desain Komunikasi Visual">Desain Komunikasi Visual</option>
                </select>
              </div>

              {/* Faculty */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Faculty
                </label>
                <select
                  name="faculty"
                  value={formData.faculty}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                >
                  <option value="Fakultas Teknik">Fakultas Teknik</option>
                  <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
                  <option value="Fakultas Seni dan Desain">Fakultas Seni dan Desain</option>
                  <option value="Fakultas Ilmu Sosial">Fakultas Ilmu Sosial</option>
                </select>
              </div>
            </form>
          </Card>

          {/* Notification Preferences */}
          <Card title="Notification Preferences" subtitle="Manage your notification settings" className="mt-6">
            <div className="space-y-4">
              {/* Task Reminders */}
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <div>
                  <p className="text-sm font-medium text-slate-900">Task Reminders</p>
                  <p className="text-xs text-slate-500 mt-1">Get notified about upcoming task deadlines</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleNotificationChange('taskReminders')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.taskReminders ? 'bg-[var(--primary)]' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.taskReminders ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Class Reminders */}
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <div>
                  <p className="text-sm font-medium text-slate-900">Class Reminders</p>
                  <p className="text-xs text-slate-500 mt-1">Get notified before your classes start</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleNotificationChange('classReminders')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.classReminders ? 'bg-[var(--primary)]' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.classReminders ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Announcement Alerts */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-slate-900">Announcement Alerts</p>
                  <p className="text-xs text-slate-500 mt-1">Get notified about new announcements</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleNotificationChange('announcementAlerts')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.announcementAlerts ? 'bg-[var(--primary)]' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.announcementAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </Card>

          {/* Save Button */}
          <div className="mt-6 flex gap-3 justify-end">
            <Button variant="secondary" size="md">
              Cancel
            </Button>
            <Button variant="primary" size="md">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
