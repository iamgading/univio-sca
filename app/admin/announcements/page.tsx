'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Edit2, Trash2, X } from 'lucide-react';

export default function AdminManageAnnouncements() {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [publishOption, setPublishOption] = useState<'now' | 'schedule'>('now');

  // Dummy announcements data
  const announcements = [
    {
      id: 1,
      title: 'Libur Semester Genap 2025',
      category: 'Academic',
      createdDate: '1 Des 2025',
      status: 'active',
      content: 'Libur semester genap akan dimulai pada tanggal 20 Desember 2025.',
    },
    {
      id: 2,
      title: 'Pendaftaran Mata Kuliah Semester Baru',
      category: 'Academic',
      createdDate: '28 Nov 2025',
      status: 'active',
      content: 'Pendaftaran mata kuliah untuk semester baru dibuka mulai 5 Desember 2025.',
    },
    {
      id: 3,
      title: 'Maintenance Sistem Informasi Akademik',
      category: 'System',
      createdDate: '25 Nov 2025',
      status: 'scheduled',
      content: 'Sistem akan mengalami maintenance pada 10 Desember 2025 pukul 00:00 - 06:00.',
    },
    {
      id: 4,
      title: 'Seminar Nasional Teknologi Informasi',
      category: 'General',
      createdDate: '20 Nov 2025',
      status: 'active',
      content: 'Seminar nasional akan diadakan pada 15 Desember 2025 di Auditorium.',
    },
    {
      id: 5,
      title: 'Pengumuman Beasiswa Tahun 2025',
      category: 'General',
      createdDate: '15 Nov 2025',
      status: 'archived',
      content: 'Pendaftaran beasiswa untuk tahun 2025 telah ditutup.',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'scheduled':
        return 'warning';
      case 'archived':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'scheduled':
        return 'Scheduled';
      case 'archived':
        return 'Archived';
      default:
        return status;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Academic':
        return 'info';
      case 'General':
        return 'default';
      case 'System':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <DashboardLayout
      role="admin"
      pageTitle="Manage Announcements"
      pageSubtitle="Kelola pengumuman untuk mahasiswa"
      userName="Admin User"
    >
      {/* Header with Create Button */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3">
          {/* Filter by Status */}
          <select className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="scheduled">Scheduled</option>
            <option value="archived">Archived</option>
          </select>

          {/* Filter by Category */}
          <select className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm">
            <option value="">All Categories</option>
            <option value="general">General</option>
            <option value="academic">Academic</option>
            <option value="system">System</option>
          </select>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => {
            setIsEditing(false);
            setShowModal(true);
          }}
        >
          + Create New Announcement
        </Button>
      </div>

      {/* Announcements Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                  Title
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                  Category
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                  Created Date
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((announcement) => (
                <tr
                  key={announcement.id}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >
                  <td className="py-3 px-4">
                    <p className="text-sm font-medium text-slate-900">
                      {announcement.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                      {announcement.content}
                    </p>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={getCategoryColor(announcement.category) as any}>
                      {announcement.category}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600">
                    {announcement.createdDate}
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={getStatusColor(announcement.status) as any}>
                      {getStatusLabel(announcement.status)}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setIsEditing(true);
                          setShowModal(true);
                        }}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create/Edit Announcement Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">
                {isEditing ? 'Edit Announcement' : 'Create New Announcement'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <form className="space-y-5">
                {/* Title */}
                <Input
                  label="Announcement Title"
                  type="text"
                  placeholder="Enter announcement title"
                />

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Category
                  </label>
                  <select className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
                    <option value="general">General</option>
                    <option value="academic">Academic</option>
                    <option value="system">System</option>
                  </select>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Content
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Enter announcement content"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none"
                  ></textarea>
                </div>

                {/* Target Audience */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Target Audience
                  </label>
                  <select className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
                    <option value="all">All Students</option>
                    <option value="fakultas-teknik">Fakultas Teknik</option>
                    <option value="fakultas-ekonomi">Fakultas Ekonomi</option>
                    <option value="kelas-2a">Kelas 2A</option>
                    <option value="kelas-2b">Kelas 2B</option>
                    <option value="kelas-3a">Kelas 3A</option>
                    <option value="kelas-3b">Kelas 3B</option>
                  </select>
                </div>

                {/* Publish Options */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Publish Options
                  </label>
                  <div className="space-y-3">
                    {/* Publish Now */}
                    <label className="flex items-center gap-3 p-3 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50">
                      <input
                        type="radio"
                        name="publishOption"
                        value="now"
                        checked={publishOption === 'now'}
                        onChange={(e) => setPublishOption(e.target.value as 'now' | 'schedule')}
                        className="w-4 h-4 text-[var(--primary)] focus:ring-[var(--primary)]"
                      />
                      <div>
                        <p className="text-sm font-medium text-slate-900">Publish Now</p>
                        <p className="text-xs text-slate-500">
                          Announcement will be published immediately
                        </p>
                      </div>
                    </label>

                    {/* Schedule */}
                    <label className="flex items-center gap-3 p-3 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50">
                      <input
                        type="radio"
                        name="publishOption"
                        value="schedule"
                        checked={publishOption === 'schedule'}
                        onChange={(e) => setPublishOption(e.target.value as 'now' | 'schedule')}
                        className="w-4 h-4 text-[var(--primary)] focus:ring-[var(--primary)]"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">Schedule</p>
                        <p className="text-xs text-slate-500 mb-2">
                          Choose when to publish this announcement
                        </p>
                        {publishOption === 'schedule' && (
                          <div className="grid grid-cols-2 gap-3 mt-2">
                            <Input label="" type="date" />
                            <Input label="" type="time" />
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 justify-end p-6 border-t border-slate-200">
              <Button variant="secondary" size="md" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="md" onClick={() => setShowModal(false)}>
                {isEditing ? 'Save Changes' : publishOption === 'now' ? 'Publish Now' : 'Schedule'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
