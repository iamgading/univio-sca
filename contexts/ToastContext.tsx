'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CheckCircle2, XCircle, AlertCircle, X, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto remove after 3 seconds
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              pointer-events-auto transform transition-all duration-300 ease-in-out
              flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border
              min-w-[300px] max-w-sm animate-in slide-in-from-right-full fade-in
              ${
                toast.type === 'success' ? 'bg-white border-green-100 text-slate-800' :
                toast.type === 'error' ? 'bg-white border-red-100 text-slate-800' :
                'bg-white border-blue-100 text-slate-800'
              }
            `}
          >
            {toast.type === 'success' && <CheckCircle2 className="text-green-500" size={20} />}
            {toast.type === 'error' && <XCircle className="text-red-500" size={20} />}
            {toast.type === 'info' && <Info className="text-blue-500" size={20} />}
            {toast.type === 'warning' && <AlertCircle className="text-amber-500" size={20} />}
            
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            
            <button 
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
