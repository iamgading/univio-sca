'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

// Student accounts
type StudentAccount = {
  password: string;
  name: string;
  email: string;
  program: string;
  faculty: string;
};

const STUDENT_ACCOUNTS: Record<string, StudentAccount> = {
  '202351202': {
    password: 'gading123',
    name: 'Gading Satrio',
    email: 'gading.satrio@university.ac.id',
    program: 'Teknik Informatika',
    faculty: 'Fakultas Teknik',
  },
};

export default function LoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    nim: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate loading
    setTimeout(() => {
      const account = STUDENT_ACCOUNTS[credentials.nim];

      if (!account) {
        setError('NIM tidak ditemukan');
        setLoading(false);
        return;
      }

      if (account.password !== credentials.password) {
        setError('Password salah');
        setLoading(false);
        return;
      }

      // Save to localStorage
      localStorage.setItem('univio_user', JSON.stringify({
        nim: credentials.nim,
        ...account,
      }));

      // Redirect to dashboard
      router.push('/dashboard');
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--primary)]">
            Univio
          </h1>
          <p className="text-slate-600 mt-2">
            Kelola jadwal kuliah dan tugas dalam satu tempat
          </p>
        </div>
        
        {/* Login Form */}
        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* NIM Input */}
          <Input
            label="NIM"
            type="text"
            placeholder="Masukkan NIM"
            value={credentials.nim}
            onChange={(e) => setCredentials({ ...credentials, nim: e.target.value })}
            required
          />
          
          {/* Password Input */}
          <Input
            label="Password"
            type="password"
            placeholder="Masukkan password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            required
          />
          
          {/* Sign In Button */}
          <Button 
            variant="primary" 
            size="lg" 
            className="w-full"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
          
          {/* Forgot Password Link */}
          <div className="text-center">
            <a href="#" className="text-sm text-[var(--primary)] hover:underline">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
