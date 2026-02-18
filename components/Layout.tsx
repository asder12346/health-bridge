
import React from 'react';
import { User } from '../types.ts';

interface LayoutProps {
  user: User;
  onLogout: () => void;
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ user, onLogout, children, activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', icon: 'fa-house', label: 'Home' },
    { id: 'appointments', icon: 'fa-calendar-days', label: 'Visits' },
    { id: 'records', icon: 'fa-folder-medical', label: 'History' },
    { id: 'profile', icon: 'fa-circle-user', label: 'Profile' },
  ];

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden select-none max-w-lg mx-auto border-x border-slate-100 relative">
      {/* Top Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-50 px-6 py-5 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-sky-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-sky-100">
            <i className="fa-solid fa-house-chimney-medical text-sm"></i>
          </div>
          <span className="font-black text-xl text-slate-800 tracking-tight">HealthBridge</span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative p-1 text-slate-400 hover:text-sky-500 transition-colors">
            <i className="fa-solid fa-magnifying-glass text-xl"></i>
          </button>
          <img 
            src={user.avatar} 
            alt="Profile" 
            className="w-10 h-10 rounded-2xl object-cover border-2 border-white shadow-xl shadow-slate-200"
          />
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto pb-32 px-5 pt-6 no-scrollbar bg-slate-50/50">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto z-50 pointer-events-none">
        <div className="bg-white/95 backdrop-blur-xl border-t border-slate-100 px-6 py-4 pb-10 flex justify-between items-center shadow-[0_-8px_30px_rgb(0,0,0,0.04)] pointer-events-auto rounded-t-[2.5rem]">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center group relative px-4 transition-all"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                activeTab === item.id 
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-200 -translate-y-6 scale-110' 
                  : 'text-slate-400 bg-transparent'
              }`}>
                <i className={`fa-solid ${item.icon} ${activeTab === item.id ? 'text-xl' : 'text-2xl'}`}></i>
              </div>
              <span className={`text-[10px] mt-1 font-black uppercase tracking-widest transition-all duration-300 ${
                activeTab === item.id ? 'opacity-0 scale-50' : 'text-slate-400 opacity-60'
              }`}>
                {item.label}
              </span>
              {activeTab === item.id && (
                <div className="absolute -bottom-1 w-1.5 h-1.5 bg-sky-500 rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Layout;
