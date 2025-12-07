'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Edit2, Trash2, X } from 'lucide-react';

export default function AdminManageTasks() {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Dummy tasks data
  const tasks = [
    {
      id: 1,
      task: 'Laporan Tugas Akhir Desain',
      course: 'Desain UI/UX',
      assignedTo: 'Kelas 3A',
      due: '10 Des 2025',
      status: 'in-progress',
      priority: 'high',
    },
    {
      id: 2,
      task: 'Presentasi Proposal',
      course: 'Metodologi Penelitian',
      assignedTo: 'Kelas 4B',
      due: '12 Des 2025',
      status: 'todo',
      priority: 'high',
    },
    {
      id: 3,
      task: 'Quiz Chapter 5',
      course: 'Basis Data',
      assignedTo: 'Kelas 2A',
      due: '15 Des 2025',
      status: 'todo',
      priority: 'medium',
    },
    {
      id: 4,
      task: 'Essay Analisis Kasus',
      course: 'Sistem Informasi',
      assignedTo: 'Kelas 3B',
      due: '18 Des 2025',
      status: 'done',
      priority: 'low',
    },
    {
      id: 5,
      task: 'Praktikum Web Development',
      course: 'Pemrograman Web',
      assignedTo: 'Kelas 2B',
      due: '20 Des 2025',
      status: 'todo',
      priority: 'medium',
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
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
      pageTitle="Manage Tasks"
      pageSubtitle="Kelola tugas untuk mahasiswa"
      userName="Admin User"
    >
      {/* Filter Bar */}
      <Card className="mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full">
            {/* Course Filter */}
            <select className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm">
              <option value="">All Courses</option>
              <option value="desain">Desain UI/UX</option>
              <option value="metodologi">Metodologi Penelitian</option>
              <option value="basis-data">Basis Data</option>
              <option value="sistem-informasi">Sistem Informasi</option>
              <option value="pemrograman-web">Pemrograman Web</option>
            </select>

            {/* Status Filter */}
            <select className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm">
              <option value="">All Status</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>

            {/* Date Range (Placeholder) */}
            <input
              type="text"
              placeholder="Date range"
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm"
            />
          </div>

          {/* Create Button */}
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              setIsEditing(false);
              setShowModal(true);
            }}
          >
            + Create New Task
          </Button>
        </div>
      </Card>

      {/* Tasks Table */}
      <Card>
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
                  Priority
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
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >
                  <td className="py-3 px-4 text-sm text-slate-900">{task.task}</td>
                  <td className="py-3 px-4 text-sm text-slate-600">{task.course}</td>
                  <td className="py-3 px-4 text-sm text-slate-600">{task.assignedTo}</td>
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

      {/* Create/Edit Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">
                {isEditing ? 'Edit Task' : 'Create New Task'}
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
                {/* Task Title */}
                <Input
                  label="Task Title"
                  type="text"
                  placeholder="Enter task title"
                />

                {/* Course */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Course
                  </label>
                  <select className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
                    <option value="">Select course</option>
                    <option value="desain">Desain UI/UX</option>
                    <option value="metodologi">Metodologi Penelitian</option>
                    <option value="basis-data">Basis Data</option>
                    <option value="sistem-informasi">Sistem Informasi</option>
                    <option value="pemrograman-web">Pemrograman Web</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Enter task description"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none"
                  ></textarea>
                </div>

                {/* Due Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Due Date" type="date" />
                  <Input label="Due Time" type="time" />
                </div>

                {/* Priority & Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Priority
                    </label>
                    <select className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Status
                    </label>
                    <select className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                  </div>
                </div>

                {/* Assign To */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Assign To
                  </label>
                  <select className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
                    <option value="">Select class/group</option>
                    <option value="kelas-2a">Kelas 2A</option>
                    <option value="kelas-2b">Kelas 2B</option>
                    <option value="kelas-3a">Kelas 3A</option>
                    <option value="kelas-3b">Kelas 3B</option>
                    <option value="kelas-4a">Kelas 4A</option>
                    <option value="kelas-4b">Kelas 4B</option>
                  </select>
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 justify-end p-6 border-t border-slate-200">
              <Button variant="secondary" size="md" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="md" onClick={() => setShowModal(false)}>
                {isEditing ? 'Save Changes' : 'Create Task'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
