
import React, { useState, useEffect, useRef } from 'react';
import { Appointment, User } from '../types.ts';
import { DOCTORS } from '../constants.tsx';

interface VideoCallProps {
  user: User;
  appointment: Appointment;
  onEndCall: () => void;
}

const VideoCall: React.FC<VideoCallProps> = ({ user, appointment, onEndCall }) => {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const doctor = DOCTORS.find(d => d.id === appointment.doctorId);

  const startCamera = async () => {
    setPermissionError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 1280, height: 720 }, 
          audio: true 
        });
        streamRef.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        setVideoOn(true);
        setMicOn(true);
      } else {
        throw new Error("Media devices not supported in this browser.");
      }
    } catch (err: any) {
      console.error("Media Error:", err);
      setPermissionError(err.message || "Permission denied. Please check your browser settings and ensure camera/microphone access is allowed.");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => setCallDuration(d => d + 1), 1000);
    startCamera();

    return () => {
      clearInterval(timer);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (streamRef.current) {
      streamRef.current.getVideoTracks().forEach(track => {
        track.enabled = videoOn;
      });
      streamRef.current.getAudioTracks().forEach(track => {
        track.enabled = micOn;
      });
    }
  }, [videoOn, micOn]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900 flex flex-col animate-in fade-in duration-300">
      <div className="p-4 flex justify-between items-center bg-slate-900/50 backdrop-blur-md absolute top-0 w-full z-10">
        <div className="flex items-center space-x-3">
          <div className="bg-red-500 w-2 h-2 rounded-full animate-pulse"></div>
          <span className="text-white font-medium">Live Consultation: {doctor?.name}</span>
          <span className="text-slate-400 text-sm ml-4">{formatTime(callDuration)}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row p-4 pt-20 pb-28 gap-4 relative h-full">
        <div className="flex-1 rounded-3xl bg-slate-800 overflow-hidden relative shadow-2xl border border-slate-700/50 group">
          <img 
            src={`https://picsum.photos/seed/${appointment.doctorId}/1280/720`} 
            alt="Doctor View" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
          <div className="absolute bottom-6 left-6">
            <p className="text-white font-bold text-xl">{doctor?.name}</p>
            <p className="text-sky-400 text-sm">{doctor?.specialty}</p>
          </div>
        </div>

        <div className="w-full md:w-72 md:h-48 rounded-2xl bg-slate-700 overflow-hidden shadow-xl border-2 border-slate-600/50 absolute bottom-32 right-8 md:relative md:bottom-0 md:right-0">
          {permissionError ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 p-4 text-center">
              <i className="fa-solid fa-triangle-exclamation text-amber-500 text-xl mb-2"></i>
              <button 
                onClick={startCamera}
                className="text-[10px] bg-sky-500 text-white px-2 py-1 rounded font-bold"
              >
                Enable Camera
              </button>
            </div>
          ) : (
            <video 
              ref={localVideoRef} 
              autoPlay 
              muted 
              playsInline 
              className={`w-full h-full object-cover transform scale-x-[-1] ${!videoOn ? 'hidden' : ''}`} 
            />
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full p-6 flex justify-center items-center">
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-4 flex items-center space-x-6 md:space-x-12 shadow-2xl">
          <button 
            onClick={() => setMicOn(!micOn)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${micOn ? 'bg-white/10 text-white' : 'bg-red-500 text-white'}`}
          >
            <i className={`fa-solid ${micOn ? 'fa-microphone' : 'fa-microphone-slash'}`}></i>
          </button>
          
          <button 
            onClick={() => setVideoOn(!videoOn)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${videoOn ? 'bg-white/10 text-white' : 'bg-red-500 text-white'}`}
          >
            <i className={`fa-solid ${videoOn ? 'fa-video' : 'fa-video-slash'}`}></i>
          </button>

          <button 
            onClick={onEndCall}
            className="w-16 h-12 bg-red-600 text-white rounded-2xl flex items-center justify-center shadow-lg"
          >
            <i className="fa-solid fa-phone-slash text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
