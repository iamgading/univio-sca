import React from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { ChevronRight, FileText, Calendar, User } from 'lucide-react';

export default function TaskDetailPage({ params }: { params: { id: string } }) {
  // Dummy task data
  const task = {
    id: params.id,
    title: 'Laporan Tugas Akhir Desain',
    course: 'Desain UI/UX',
    deadline: '10 Desember 2025, 23:59',
    status: 'in-progress',
    priority: 'high',
    description: 'Buatlah laporan lengkap mengenai proses desain UI/UX untuk aplikasi mobile yang telah Anda kerjakan selama semester ini. Laporan harus mencakup research, wireframe, prototype, dan hasil testing.',
    assignedBy: 'Dr. Sarah Wijaya',
    createdAt: '1 Desember 2025',
    lastUpdated: '5 Desember 2025',
    subtasks: [
      { id: 1, title: 'Research & User Analysis', completed: true },
      { id: 2, title: 'Wireframe Design', completed: true },
      { id: 3, title: 'High-Fidelity Prototype', completed: false },
      { id: 4, title: 'Usability Testing', completed: false },
      { id: 5, title: 'Final Report Writing', completed: false },
    ],
    attachments: [
      { name: 'Template_Laporan.docx', size: '245 KB' },
      { name: 'Rubrik_Penilaian.pdf', size: '128 KB' },
    ],
  };
  
  const completedSubtasks = task.subtasks.filter(st => st.completed).length;
  
  return (
    <DashboardLayout
      role="student"
      pageTitle="Task Detail"
      pageSubtitle="Detail informasi tugas"
      userName="Budi Santoso"
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-600 mb-6">
        <Link href="/student/dashboard" className="hover:text-[var(--primary)]">Dashboard</Link>
        <ChevronRight size={16} />
        <Link href="/student/tasks" className="hover:text-[var(--primary)]">My Tasks</Link>
        <ChevronRight size={16} />
        <span className="text-slate-900 font-medium">{task.title}</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Task Header */}
          <Card>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{task.title}</h1>
                <p className="text-slate-600 mt-1">{task.course}</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="error">HIGH</Badge>
                <Badge variant="info">In Progress</Badge>
              </div>
            </div>
            
            {/* Meta Info */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
              <div>
                <p className="text-xs text-slate-500 font-medium">Deadline</p>
                <p className="text-sm text-slate-900 mt-1 flex items-center gap-2">
                  <Calendar size={16} />
                  {task.deadline}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Status</p>
                <select className="mt-1 px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
                  <option value="todo">To Do</option>
                  <option value="in-progress" selected>In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </div>
          </Card>
          
          {/* Description */}
          <Card title="Description">
            <p className="text-slate-700 leading-relaxed">{task.description}</p>
          </Card>
          
          {/* Subtasks Checklist */}
          <Card title="Subtasks" subtitle={`${completedSubtasks} of ${task.subtasks.length} completed`}>
            <div className="space-y-3">
              {task.subtasks.map((subtask) => (
                <label
                  key={subtask.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    defaultChecked={subtask.completed}
                    className="w-5 h-5 text-[var(--primary)] rounded focus:ring-2 focus:ring-[var(--primary)]"
                  />
                  <span className={`flex-1 ${subtask.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                    {subtask.title}
                  </span>
                </label>
              ))}
            </div>
          </Card>
          
          {/* Attachments */}
          <Card title="Attachments">
            <div className="space-y-2">
              {task.attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="text-slate-500" size={20} />
                    <div>
                      <p className="text-sm font-medium text-slate-900">{file.name}</p>
                      <p className="text-xs text-slate-500">{file.size}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Download</Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Task Info */}
          <Card title="Task Info">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 font-medium mb-1">Assigned By</p>
                <div className="flex items-center gap-2">
                  <User size={16} className="text-slate-600" />
                  <p className="text-sm text-slate-900">{task.assignedBy}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium mb-1">Created At</p>
                <p className="text-sm text-slate-900">{task.createdAt}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium mb-1">Last Updated</p>
                <p className="text-sm text-slate-900">{task.lastUpdated}</p>
              </div>
            </div>
          </Card>
          
          {/* Actions */}
          <Card>
            <div className="space-y-3">
              <Button variant="primary" className="w-full">
                Mark as Completed
              </Button>
              <Button variant="outline" className="w-full">
                Upload Submission
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
