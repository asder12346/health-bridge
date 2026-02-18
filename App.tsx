
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout.tsx';
import Dashboard from './components/Dashboard.tsx';
import DoctorDashboard from './components/DoctorDashboard.tsx';
import Appointments from './components/Appointments.tsx';
import MedicalRecords from './components/MedicalRecords.tsx';
import VideoCall from './components/VideoCall.tsx';
import SplashScreen from './components/SplashScreen.tsx';
import Login from './components/Login.tsx';
import SignUp from './components/SignUp.tsx';
import { User, Appointment, MedicalRecord, UserRole } from './types.ts';
import { DOCTORS } from './constants.tsx';

type AuthView = 'LOGIN' | 'SIGNUP';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [authView, setAuthView] = useState<AuthView>('LOGIN');
  const [selectedRole, setSelectedRole] = useState<UserRole>('PATIENT');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCalling, setIsCalling] = useState<string | null>(null);
  
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 'apt1',
      patientId: 'user123',
      doctorId: 'doc1',
      date: 'Oct 25, 2024',
      time: '10:30 AM',
      status: 'SCHEDULED',
      type: 'VIDEO',
    },
    {
      id: 'apt2',
      patientId: 'user123',
      doctorId: 'doc2',
      date: 'Oct 12, 2024',
      time: '02:00 PM',
      status: 'COMPLETED',
      type: 'IN_PERSON',
    }
  ]);

  const [records, setRecords] = useState<MedicalRecord[]>([
    {
      id: 'rec1',
      userId: 'user123',
      title: 'Blood Analysis - Full Panel',
      date: 'Oct 10, 2024',
      type: 'LAB',
      content: 'WBC: 6.5, RBC: 4.8, Hemoglobin: 14.2, Glucose: 92 mg/dL. All levels within normal physiological ranges.'
    },
    {
      id: 'rec2',
      userId: 'user123',
      title: 'Post-Consultation Note',
      date: 'Sep 25, 2024',
      type: 'NOTE',
      content: 'Patient reports persistent fatigue. Recommended increased hydration and sleep.'
    }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleLoginClick = (role: UserRole) => {
    setSelectedRole(role);
    setAuthView('SIGNUP');
  };

  const handleSignUpFinish = (name: string, email: string) => {
    setUser({
      id: Math.random().toString(36).substr(2, 9),
      name: name,
      email: email,
      role: selectedRole,
      avatar: selectedRole === 'PATIENT' ? `https://picsum.photos/seed/${name}/200/200` : 'https://picsum.photos/seed/doc1/200/200',
      specialty: selectedRole === 'DOCTOR' ? 'General Practitioner' : undefined
    });
  };

  const handleBookAppointment = (docId: string, date: string, time: string) => {
    const newApt: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      patientId: user?.id || 'guest',
      doctorId: docId,
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: time,
      status: 'SCHEDULED',
      type: 'VIDEO'
    };
    setAppointments([newApt, ...appointments]);
    setActiveTab('appointments');
  };

  if (loading) return <SplashScreen />;

  if (!user) {
    if (authView === 'SIGNUP') {
      return (
        <SignUp 
          role={selectedRole} 
          onSignUp={handleSignUpFinish} 
          onBack={() => setAuthView('LOGIN')} 
        />
      );
    }
    return <Login onLogin={handleLoginClick} />;
  }

  const currentAppointment = appointments.find(a => a.id === isCalling);

  return (
    <>
      {isCalling && currentAppointment && (
        <VideoCall 
          user={user} 
          appointment={currentAppointment} 
          onEndCall={() => setIsCalling(null)} 
        />
      )}
      
      <Layout 
        user={user} 
        onLogout={() => {
          setUser(null);
          setAuthView('LOGIN');
        }} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
      >
        {activeTab === 'dashboard' && (
          user.role === 'DOCTOR' ? (
            <DoctorDashboard 
              user={user} 
              appointments={appointments} 
              onJoinCall={(id) => setIsCalling(id)} 
            />
          ) : (
            <Dashboard user={user} appointments={appointments} />
          )
        )}
        
        {activeTab === 'appointments' && (
          <Appointments 
            user={user} 
            appointments={appointments} 
            onBook={handleBookAppointment}
            onJoinCall={(id) => setIsCalling(id)}
          />
        )}
        
        {activeTab === 'records' && <MedicalRecords user={user} records={records} />}
        
        {activeTab === 'profile' && (
          <div className="animate-in slide-in-from-right-4 duration-500 space-y-6">
            <div className="flex flex-col items-center py-6">
              <div className="relative">
                <img src={user.avatar} className="w-24 h-24 rounded-full border-4 border-white shadow-xl bg-slate-100" />
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center border-2 border-white shadow-md">
                  <i className="fa-solid fa-camera text-xs"></i>
                </button>
              </div>
              <h2 className="mt-4 text-xl font-bold text-slate-900">{user.name}</h2>
              <p className="text-slate-500 text-sm">{user.email}</p>
              <div className="mt-2 flex items-center space-x-2">
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${user.role === 'DOCTOR' ? 'bg-emerald-100 text-emerald-600' : 'bg-sky-100 text-sky-600'}`}>
                  {user.role}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-2 shadow-sm border border-slate-100 overflow-hidden">
              <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-50">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center">
                    <i className="fa-solid fa-user-gear"></i>
                  </div>
                  <span className="font-bold text-slate-700">Account Settings</span>
                </div>
                <i className="fa-solid fa-chevron-right text-slate-300 text-xs"></i>
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-50">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                    <i className="fa-solid fa-shield-halved"></i>
                  </div>
                  <span className="font-bold text-slate-700">Privacy & Security</span>
                </div>
                <i className="fa-solid fa-chevron-right text-slate-300 text-xs"></i>
              </button>
              <button 
                onClick={() => setUser(null)}
                className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-colors group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors">
                    <i className="fa-solid fa-right-from-bracket"></i>
                  </div>
                  <span className="font-bold text-red-600">Sign Out</span>
                </div>
                <i className="fa-solid fa-chevron-right text-red-200 text-xs"></i>
              </button>
            </div>
            
            <p className="text-center text-[10px] text-slate-300 font-bold uppercase tracking-[2px]">HealthBridge v1.0.4 Premium</p>
          </div>
        )}
      </Layout>
    </>
  );
};

export default App;
