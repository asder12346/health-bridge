
import React, { useState } from 'react';
import { UserRole } from '../types.ts';

interface SignUpProps {
  role: UserRole;
  onSignUp: (name: string, email: string) => void;
  onBack: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ role, onSignUp, onBack }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      onSignUp(name, email);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8 flex flex-col animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="mb-8">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-600 mb-6">
          <i className="fa-solid fa-arrow-left text-xl"></i>
        </button>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Create {role === 'DOCTOR' ? 'Doctor' : 'Patient'} Account</h2>
        <p className="text-slate-500 text-sm leading-relaxed">Join HealthBridge to start managing your health journey today.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
          <div className="relative">
            <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-slate-800 placeholder:text-slate-300 focus:ring-2 focus:ring-sky-500 transition-all outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
          <div className="relative">
            <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-slate-800 placeholder:text-slate-300 focus:ring-2 focus:ring-sky-500 transition-all outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Password</label>
          <div className="relative">
            <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-slate-800 placeholder:text-slate-300 focus:ring-2 focus:ring-sky-500 transition-all outline-none"
            />
          </div>
        </div>

        <div className="pt-4">
          <button 
            type="submit"
            className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all active:scale-95 ${
              role === 'DOCTOR' ? 'bg-emerald-500 shadow-emerald-200' : 'bg-sky-500 shadow-sky-200'
            }`}
          >
            Create Account
          </button>
        </div>
      </form>

      <div className="mt-auto py-8 text-center">
        <p className="text-sm text-slate-400">
          Already have an account? <button onClick={onBack} className="text-sky-600 font-bold hover:underline">Log In</button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
