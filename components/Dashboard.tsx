
import React from 'react';
import { User, Appointment } from '../types.ts';
import { DOCTORS } from '../constants.tsx';

interface DashboardProps {
  user: User;
  appointments: Appointment[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, appointments }) => {
  const upcoming = appointments.filter(a => a.status === 'SCHEDULED');

  const categories = [
    { id: 1, name: 'General', icon: 'fa-stethoscope', color: 'bg-blue-100 text-blue-600' },
    { id: 2, name: 'Dental', icon: 'fa-tooth', color: 'bg-purple-100 text-purple-600' },
    { id: 3, name: 'Eye Care', icon: 'fa-eye', color: 'bg-emerald-100 text-emerald-600' },
    { id: 4, name: 'Heart', icon: 'fa-heart-pulse', color: 'bg-rose-100 text-rose-600' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="relative group">
        <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors"></i>
        <input 
          type="text" 
          placeholder="Search doctors, clinics..." 
          className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-sky-500/20 outline-none text-sm transition-all"
        />
      </div>

      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 leading-tight">Hello, {user.name.split(' ')[0]}</h2>
          <p className="text-slate-500 text-sm">Find your specialist today</p>
        </div>
        <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-600 relative">
          <i className="fa-solid fa-calendar-check text-xl"></i>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
        </div>
      </header>

      <div className="flex justify-between space-x-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button key={cat.id} className="flex flex-col items-center flex-shrink-0 space-y-2 group">
            <div className={`${cat.color} w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm group-active:scale-90 transition-transform`}>
              <i className={`fa-solid ${cat.icon} text-2xl`}></i>
            </div>
            <span className="text-xs font-bold text-slate-600">{cat.name}</span>
          </button>
        ))}
      </div>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-800 text-lg">Daily Health Status</h3>
          <button className="text-sky-600 text-[10px] font-bold uppercase tracking-wider">Historical Data</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center">
                <i className="fa-solid fa-heart-pulse text-lg"></i>
              </div>
              <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">Normal</span>
            </div>
            <p className="text-3xl font-black text-slate-800 tracking-tight">72<span className="text-sm font-normal text-slate-400 ml-1">bpm</span></p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Heart Rate</p>
          </div>
          
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
             <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-sky-50 text-sky-500 rounded-xl flex items-center justify-center">
                <i className="fa-solid fa-droplet text-lg"></i>
              </div>
            </div>
            <p className="text-3xl font-black text-slate-800 tracking-tight">120/80</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Blood Pressure</p>
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-end mb-4">
          <h3 className="font-bold text-slate-800 text-lg">Upcoming Appointment</h3>
          <button className="text-sky-600 text-[10px] font-bold uppercase tracking-wider">See All</button>
        </div>
        
        {upcoming.length > 0 ? (
          <div className="bg-gradient-to-br from-indigo-600 to-sky-600 p-6 rounded-[2.5rem] text-white shadow-xl shadow-sky-100 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-6">
                <img 
                  src={DOCTORS.find(d => d.id === upcoming[0].doctorId)?.avatar} 
                  className="w-16 h-16 rounded-2xl border-2 border-white/20 shadow-md" 
                  alt="Doctor"
                />
                <div>
                  <p className="font-bold text-lg leading-tight">{DOCTORS.find(d => d.id === upcoming[0].doctorId)?.name}</p>
                  <p className="text-sky-100 text-xs opacity-80 mt-1">{DOCTORS.find(d => d.id === upcoming[0].doctorId)?.specialty}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-4">
                <div className="flex items-center space-x-3 border-r border-white/10 pr-4">
                  <i className="fa-solid fa-calendar text-sky-200"></i>
                  <span className="text-sm font-bold">{upcoming[0].date}</span>
                </div>
                <div className="flex items-center space-x-3 pl-4">
                  <i className="fa-solid fa-clock text-sky-200"></i>
                  <span className="text-sm font-bold">{upcoming[0].time}</span>
                </div>
              </div>
              
              <button className="w-full bg-white text-indigo-600 py-4 rounded-2xl font-black text-sm shadow-lg hover:bg-sky-50 transition-all active:scale-95">
                Join Consultation
              </button>
            </div>
            <i className="fa-solid fa-stethoscope absolute -bottom-10 -right-10 text-white/5 text-9xl rotate-12"></i>
          </div>
        ) : (
          <div className="bg-white p-10 text-center rounded-[2rem] border-2 border-dashed border-slate-100">
            <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-calendar-plus text-2xl"></i>
            </div>
            <p className="text-slate-400 font-medium">No visits scheduled.</p>
            <button className="mt-4 bg-sky-500 text-white px-6 py-2 rounded-full text-xs font-bold shadow-md shadow-sky-100">Book Appointment</button>
          </div>
        )}
      </section>

      <section className="bg-indigo-50 p-6 rounded-[2rem] border border-indigo-100 relative overflow-hidden">
        <div className="relative z-10 flex items-start space-x-4">
          <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-100">
            <i className="fa-solid fa-wand-magic-sparkles text-sm"></i>
          </div>
          <div>
            <h4 className="font-black text-indigo-900 text-sm mb-1 uppercase tracking-wider">Daily Health Tip</h4>
            <p className="text-indigo-800 text-xs leading-relaxed font-medium">
              Drinking a glass of warm lemon water in the morning can boost your immune system and help digestion.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
