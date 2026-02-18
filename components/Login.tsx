
import React from 'react';
import { UserRole } from '../types.ts';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-white p-8 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="mb-12">
        <div className="w-16 h-16 bg-sky-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-sky-200">
          <i className="fa-solid fa-house-chimney-medical text-3xl"></i>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h2>
        <p className="text-slate-500">Choose your profile type to continue to your dashboard</p>
      </div>

      <div className="space-y-4">
        <button 
          onClick={() => onLogin('PATIENT')}
          className="w-full bg-white border-2 border-slate-100 p-6 rounded-2xl flex items-center space-x-4 hover:border-sky-500 transition-all text-left group"
        >
          <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600 group-hover:bg-sky-500 group-hover:text-white transition-colors">
            <i className="fa-solid fa-user-injured text-xl"></i>
          </div>
          <div className="flex-1">
            <p className="font-bold text-slate-800">I am a Patient</p>
            <p className="text-sm text-slate-500">Access health records & book visits</p>
          </div>
          <i className="fa-solid fa-chevron-right text-slate-200 group-hover:text-sky-500 transition-colors"></i>
        </button>

        <button 
          onClick={() => onLogin('DOCTOR')}
          className="w-full bg-white border-2 border-slate-100 p-6 rounded-2xl flex items-center space-x-4 hover:border-emerald-500 transition-all text-left group"
        >
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
            <i className="fa-solid fa-user-md text-xl"></i>
          </div>
          <div className="flex-1">
            <p className="font-bold text-slate-800">I am a Doctor</p>
            <p className="text-sm text-slate-500">Manage patients & consultations</p>
          </div>
          <i className="fa-solid fa-chevron-right text-slate-200 group-hover:text-emerald-500 transition-colors"></i>
        </button>
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-slate-400">
          New to HealthBridge? <span className="text-sky-600 font-bold">Get Started</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
