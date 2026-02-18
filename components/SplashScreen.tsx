
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-sky-600 flex flex-col items-center justify-center z-[200] animate-in fade-in duration-500">
      <div className="mb-6 relative">
        <div className="w-24 h-24 bg-white/20 rounded-3xl backdrop-blur-md flex items-center justify-center animate-bounce">
          <i className="fa-solid fa-house-chimney-medical text-5xl text-white"></i>
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-400 rounded-full border-4 border-sky-600 flex items-center justify-center">
          <i className="fa-solid fa-check text-white text-[10px]"></i>
        </div>
      </div>
      <h1 className="text-3xl font-bold text-white tracking-tight mb-2">HealthBridge</h1>
      <p className="text-sky-100 font-medium">Your Health, Our Priority</p>
      
      <div className="mt-12 flex space-x-1">
        <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default SplashScreen;
