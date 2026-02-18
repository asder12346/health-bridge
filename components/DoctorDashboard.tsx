
import React from 'react';
import { User, Appointment } from '../types.ts';

interface DoctorDashboardProps {
  user: User;
  appointments: Appointment[];
  onJoinCall: (id: string) => void;
}

const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ user, appointments, onJoinCall }) => {
  const pending = appointments.filter(a => a.status === 'SCHEDULED');

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Dr. {user.name.split(' ').pop()}</h2>
          <p className="text-slate-500 text-sm">{user.specialty}</p>
        </div>
        <div className="w-12 h-12 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center text-slate-400 relative">
          <i className="fa-solid fa-bell text-xl"></i>
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-sky-500 p-5 rounded-[2rem] text-white shadow-xl shadow-sky-100 relative overflow-hidden group">
          <i className="fa-solid fa-user-group absolute -top-4 -right-4 text-white/10 text-6xl group-hover:scale-110 transition-transform"></i>
          <p className="text-sky-100 text-[10px] font-black uppercase tracking-widest mb-1">Total Patients</p>
          <div className="flex items-end space-x-1">
            <p className="text-3xl font-black leading-none">1,284</p>
          </div>
        </div>
        <div className="bg-emerald-500 p-5 rounded-[2rem] text-white shadow-xl shadow-emerald-100 relative overflow-hidden group">
          <i className="fa-solid fa-video absolute -top-4 -right-4 text-white/10 text-6xl group-hover:scale-110 transition-transform"></i>
          <p className="text-emerald-100 text-[10px] font-black uppercase tracking-widest mb-1">Visits Today</p>
          <div className="flex items-end space-x-1">
            <p className="text-3xl font-black leading-none">{pending.length}</p>
          </div>
        </div>
      </div>

      <section>
        <div className="flex justify-between items-center mb-4 px-2">
          <h3 className="font-black text-slate-800 text-lg">Today's Timeline</h3>
        </div>
        
        <div className="space-y-4">
          {pending.length > 0 ? (
            pending.map((apt) => (
              <div key={apt.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={`https://picsum.photos/seed/${apt.id}/100/100`} 
                      alt="Patient" 
                      className="w-12 h-12 rounded-2xl border-2 border-slate-50 shadow-sm object-cover" 
                    />
                    <div>
                      <p className="font-black text-slate-800">Alex Johnson</p>
                      <p className="text-xs text-slate-400 font-medium tracking-tight">ID: #PX-{apt.id.slice(0, 4).toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-slate-800">{apt.time}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                   <button 
                    onClick={() => onJoinCall(apt.id)}
                    className="flex-1 bg-emerald-500 text-white py-3 rounded-2xl font-black text-xs shadow-lg shadow-emerald-50 hover:bg-emerald-600 transition-all flex items-center justify-center space-x-2 active:scale-95"
                  >
                    <i className="fa-solid fa-video"></i>
                    <span>Start Consultation</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-[2rem] border-2 border-dashed border-slate-100">
              <i className="fa-solid fa-calendar-check text-slate-200 text-4xl mb-3"></i>
              <p className="text-slate-400 font-bold text-sm">Schedule is clear!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DoctorDashboard;
