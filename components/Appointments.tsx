
import React, { useState } from 'react';
import { Appointment, User } from '../types.ts';
import { DOCTORS } from '../constants.tsx';

interface AppointmentsProps {
  user: User;
  appointments: Appointment[];
  onBook: (docId: string, date: string, time: string) => void;
  onJoinCall: (id: string) => void;
}

const Appointments: React.FC<AppointmentsProps> = ({ user, appointments, onBook, onJoinCall }) => {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingTime, setBookingTime] = useState<string>('');

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDoc && bookingDate && bookingTime) {
      onBook(selectedDoc, bookingDate, bookingTime);
      setSelectedDoc(null);
      setBookingDate('');
      setBookingTime('');
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Appointments</h2>
          <p className="text-slate-500">Manage your visits and schedule new consultations.</p>
        </div>
        <button 
          onClick={() => setSelectedDoc(DOCTORS[0].id)}
          className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all flex items-center justify-center space-x-2"
        >
          <i className="fa-solid fa-calendar-plus"></i>
          <span>Book New Visit</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-slate-800 text-lg">Upcoming Schedule</h3>
          {appointments.filter(a => a.status === 'SCHEDULED').length > 0 ? (
            appointments.filter(a => a.status === 'SCHEDULED').map((apt) => {
              const doc = DOCTORS.find(d => d.id === apt.doctorId);
              return (
                <div key={apt.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-sky-200 transition-colors">
                  <div className="flex items-center space-x-4">
                    <img src={doc?.avatar} alt={doc?.name} className="w-14 h-14 rounded-full object-cover bg-slate-100" />
                    <div>
                      <p className="font-bold text-slate-800 text-lg">{doc?.name}</p>
                      <p className="text-slate-500 text-sm">{doc?.specialty}</p>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full font-semibold">{apt.type}</span>
                        <span className="text-xs text-slate-400 flex items-center">
                          <i className="fa-solid fa-clock mr-1"></i> {apt.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="flex-1 md:flex-none border border-slate-200 text-slate-600 px-4 py-2 rounded-lg font-semibold hover:bg-slate-50">Reschedule</button>
                    <button 
                      onClick={() => onJoinCall(apt.id)}
                      className="flex-1 md:flex-none bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-emerald-600 shadow-sm flex items-center justify-center space-x-2"
                    >
                      <i className="fa-solid fa-video"></i>
                      <span>Join Call</span>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white p-12 text-center rounded-2xl border border-dashed border-slate-300">
              <i className="fa-solid fa-calendar-day text-slate-200 text-5xl mb-4"></i>
              <p className="text-slate-500">No appointments scheduled.</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Recent Past Visits</h3>
            <div className="space-y-4">
               {appointments.filter(a => a.status === 'COMPLETED').map(apt => {
                 const doc = DOCTORS.find(d => d.id === apt.doctorId);
                 return (
                    <div key={apt.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                      <div className="flex items-center space-x-3">
                        <img src={doc?.avatar} className="w-10 h-10 rounded-full" />
                        <div>
                          <p className="text-sm font-bold text-slate-800">{doc?.name}</p>
                          <p className="text-xs text-slate-500">{apt.date}</p>
                        </div>
                      </div>
                      <button className="text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity"><i className="fa-solid fa-chevron-right"></i></button>
                    </div>
                 );
               })}
            </div>
          </section>

          {selectedDoc && (
             <section className="bg-sky-50 p-6 rounded-2xl border border-sky-100 shadow-sm animate-in fade-in zoom-in duration-300">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-sky-800">New Booking</h3>
                  <button onClick={() => setSelectedDoc(null)} className="text-sky-400 hover:text-sky-600"><i className="fa-solid fa-xmark"></i></button>
                </div>
                <form onSubmit={handleBooking} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-sky-700 uppercase mb-1">Select Doctor</label>
                    <select 
                      value={selectedDoc} 
                      onChange={(e) => setSelectedDoc(e.target.value)}
                      className="w-full bg-white border border-sky-200 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      {DOCTORS.map(d => <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-sky-700 uppercase mb-1">Date</label>
                      <input 
                        type="date" 
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-white border border-sky-200 rounded-lg p-2 text-sm outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-sky-700 uppercase mb-1">Time</label>
                      <input 
                        type="time" 
                        required
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full bg-white border border-sky-200 rounded-lg p-2 text-sm outline-none" 
                      />
                    </div>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-sky-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-sky-700 transition-colors"
                  >
                    Confirm Booking
                  </button>
                </form>
             </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
