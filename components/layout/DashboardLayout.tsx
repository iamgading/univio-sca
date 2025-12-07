import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'student' | 'admin';
  pageTitle: string;
  pageSubtitle?: string;
  userName?: string;
}

export default function DashboardLayout({
  children,
  role,
  pageTitle,
  pageSubtitle,
  userName,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col">
        <Topbar title={pageTitle} subtitle={pageSubtitle} userName={userName} role={role} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
