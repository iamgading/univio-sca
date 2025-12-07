'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/contexts/ToastContext';
import { calculateAIPriority } from '@/lib/aiPriority';
import { Search, Plus, Edit2, Trash2, X, Sparkles } from 'lucide-react';

export default function MyTasksPage() {
  const { tasks, addTask, updateTask, deleteTask } = useData();
  const { showToast } = useToast();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [formData, setFormData] = useState({
    task: '',
    course: '',
    description: '',
    due: '',
    dueTime: '23:59',
    priority: 'medium' as 'high' | 'medium' | 'low',
    status: 'todo' as 'todo' | 'in-progress' | 'done',
  });
  
  // Filter tasks logic...
  // (kode filter sama, saya skip agar ringkas)
  const filteredTasks = tasks.filter(task => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!task.task.toLowerCase().includes(query) && 
          !task.course.toLowerCase().includes(query)) {
        return false;
      }
    }
    
    // Status filter
    if (activeFilter === 'completed') {
      return task.status === 'done';
    } else if (activeFilter === 'today') {
      const today = new Date().toISOString().split('T')[0];
      return task.due === today;
    } else if (activeFilter === 'this-week') {
      const today = new Date();
      const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      const taskDate = new Date(task.due);
      return taskDate >= today && taskDate <= weekFromNow;
    }
    
    return true; // 'all' filter
  });

  // ... (kode helper colors sama)
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
  
  const handleOpenModal = (task?: any) => {
    if (task) {
      setEditingTask(task);
      setFormData({
        task: task.task,
        course: task.course,
        description: task.description,
        due: task.due,
        dueTime: task.dueTime,
        priority: task.priority,
        status: task.status,
      });
    } else {
      setEditingTask(null);
      setFormData({
        task: '',
        course: '',
        description: '',
        due: '',
        dueTime: '23:59',
        priority: 'medium',
        status: 'todo',
      });
    }
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingTask) {
      // Update existing task
      updateTask(editingTask.id, formData);
      showToast('Task updated successfully!', 'success');
    } else {
      // Create new task
      addTask(formData);
      showToast('New task added successfully!', 'success');
    }
    
    handleCloseModal();
  };
  
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
      showToast('Task deleted successfully', 'info');
    }
  };
  
  // Get top priority task
  const topPriorityTask = tasks
    .filter(t => t.status !== 'done')
    .map(t => ({ ...t, aiPriority: calculateAIPriority(t) }))
    .sort((a, b) => b.aiPriority.score - a.aiPriority.score)[0];
  
  return (
    <DashboardLayout
      role="student"
      pageTitle="My Tasks"
      pageSubtitle="Kelola semua tugas kuliah Anda"
      userName="Gading Satrio"
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            {/* Filter Bar */}
            <div className="mb-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">All Tasks</h2>
                <Button variant="primary" size="sm" onClick={() => handleOpenModal()}>
                  <Plus size={16} className="mr-2" />
                  Add Task
                </Button>
              </div>
              
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
              
              {/* Search */}
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  />
                </div>
              </div>
            </div>
            
            {/* Tasks Table */}
            <div className="overflow-x-auto">
              {filteredTasks.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-500">No tasks found</p>
                  <Button variant="primary" size="sm" className="mt-4" onClick={() => handleOpenModal()}>
                    <Plus size={16} className="mr-2" />
                    Add Your First Task
                  </Button>
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Task</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Course</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Due</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Priority</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTasks.map((task) => (
                      <tr key={task.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-4 text-sm font-medium text-slate-900">{task.task}</td>
                        <td className="py-3 px-4 text-sm text-slate-600">{task.course}</td>
                        <td className="py-3 px-4 text-sm text-slate-600">
                          {new Date(task.due).toLocaleDateString('id-ID')}
                        </td>
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
                            <Link href={`/tasks/${task.id}`}>
                              <button 
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                title="View Details"
                              >
                                <Search size={16} />
                              </button>
                            </Link>
                            <button 
                              onClick={() => handleOpenModal(task)}
                              className="p-1 text-slate-600 hover:bg-slate-100 rounded"
                              title="Edit"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              onClick={() => handleDelete(task.id)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
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
              )}
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
                  style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}% Complete
              </p>
            </div>
          </Card>
          
          {/* Next Recommended Task */}
          {topPriorityTask && (
            <Card title="🤖 AI Recommended">
              <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={14} className="text-purple-600" />
                  <span className="text-xs font-semibold text-purple-900">Priority Score: {topPriorityTask.aiPriority.score}</span>
                </div>
                <Badge variant={getPriorityColor(topPriorityTask.aiPriority.priority) as any} className="mb-2">
                  {topPriorityTask.aiPriority.priority.toUpperCase()}
                </Badge>
                <h4 className="font-semibold text-slate-900 mb-1">{topPriorityTask.task}</h4>
                <p className="text-sm text-slate-600 mb-3">
                  Due: {new Date(topPriorityTask.due).toLocaleDateString('id-ID')}
                </p>
                <p className="text-xs text-slate-700 mb-3">
                  {topPriorityTask.aiPriority.recommendation}
                </p>
                <Link href={`/tasks/${topPriorityTask.id}`}>
                  <Button variant="primary" size="sm" className="w-full">
                    Open Task
                  </Button>
                </Link>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Create/Edit Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">
                {editingTask ? 'Edit Task' : 'Create New Task'}
              </h2>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <Input
                label="Task Title"
                type="text"
                placeholder="e.g., Laporan Tugas Akhir"
                value={formData.task}
                onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                required
              />
              
              <Input
                label="Course"
                type="text"
                placeholder="e.g., Pemrograman Web"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Task description..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] min-h-[100px]"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Due Date"
                  type="date"
                  value={formData.due}
                  onChange={(e) => setFormData({ ...formData, due: e.target.value })}
                  required
                />
                
                <Input
                  label="Due Time"
                  type="time"
                  value={formData.dueTime}
                  onChange={(e) => setFormData({ ...formData, dueTime: e.target.value })}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button variant="secondary" onClick={handleCloseModal} className="flex-1">
                  Cancel
                </Button>
                <Button variant="primary" type="submit" className="flex-1">
                  {editingTask ? 'Save Changes' : 'Create Task'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
