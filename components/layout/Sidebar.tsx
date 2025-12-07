'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  Bell,
  User,
  ClipboardList,
  CalendarCheck,
  Megaphone,
  Settings,
} from 'lucide-react';

interface SidebarProps {
  role: 'student' | 'admin';
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  
  const studentMenu = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: CheckSquare, label: 'My Tasks', href: '/tasks' },
    { icon: Calendar, label: 'Calendar', href: '/calendar' },
    { icon: Bell, label: 'Notifications', href: '/notifications' },
    { icon: User, label: 'Profile', href: '/profile' },
    { icon: Settings, label: 'Settings', href: '/settings/integrations' },
  ];
  
  const adminMenu = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: ClipboardList, label: 'Manage Tasks', href: '/tasks' },
    { icon: CalendarCheck, label: 'Manage Calendar', href: '/calendar' },
    { icon: Megaphone, label: 'Manage Announcements', href: '/announcements' },
  ];
  
  const menu = role === 'student' ? studentMenu : adminMenu;
  
  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen flex flex-col">
      {/* Logo & Title */}
      <div className="p-6 border-b border-slate-200">
        <h1 className="text-xl font-bold text-[var(--primary)]">
          Univio
        </h1>
        <p className="text-sm text-slate-500 mt-1 capitalize">{role}</p>
      </div>
      
      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-[var(--primary)] text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
