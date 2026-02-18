
import React, { useState } from 'react';
import { MedicalRecord, User } from '../types.ts';
import { summarizeMedicalNote } from '../services/gemini.ts';

interface MedicalRecordsProps {
  user: User;
  records: MedicalRecord[];
}

const MedicalRecords: React.FC<MedicalRecordsProps> = ({ user, records }) => {
  const [summaries, setSummaries] = useState<Record<string, string>>({});
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());

  const handleSummarize = async (record: MedicalRecord) => {
    if (loadingIds.has(record.id)) return;
    
    setLoadingIds(prev => new Set(prev).add(record.id));
    try {
      const summary = await summarizeMedicalNote(record.content);
      setSummaries(prev => ({ ...prev, [record.id]: summary }));
    } finally {
      setLoadingIds(prev => {
        const next = new Set(prev);
        next.delete(record.id);
        return next;
      });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Medical Records</h2>
          <p className="text-slate-500">View and manage your health history and documentation.</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
            <i className="fa-solid fa-filter mr-2"></i> Filter
          </button>
          <button className="bg-sky-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-sky-700 transition-colors">
            <i className="fa-solid fa-cloud-arrow-up mr-2"></i> Upload
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {records.map((record) => (
          <div key={record.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-all">
            <div className="p-5 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  record.type === 'LAB' ? 'bg-blue-50 text-blue-600' : 
                  record.type === 'PRESCRIPTION' ? 'bg-purple-50 text-purple-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  <i className={`fa-solid ${
                    record.type === 'LAB' ? 'fa-flask' : 
                    record.type === 'PRESCRIPTION' ? 'fa-prescription-bottle' : 'fa-file-lines'
                  }`}></i>
                </div>
                <span className="text-xs font-semibold text-slate-400">{record.date}</span>
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-2">{record.title}</h3>
              <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed mb-4">
                {record.content}
              </p>

              {summaries[record.id] && (
                <div className="mt-4 p-4 bg-sky-50 rounded-xl border border-sky-100 text-sm animate-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center space-x-2 mb-2 text-sky-700 font-bold">
                    <i className="fa-solid fa-wand-magic-sparkles text-xs"></i>
                    <span>AI Summary</span>
                  </div>
                  <p className="text-sky-800 leading-relaxed italic">
                    {summaries[record.id]}
                  </p>
                </div>
              )}
            </div>
            
            <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button className="text-slate-600 text-sm font-bold hover:text-sky-600 transition-colors">
                <i className="fa-solid fa-download mr-1"></i> View PDF
              </button>
              <button 
                onClick={() => handleSummarize(record)}
                disabled={loadingIds.has(record.id)}
                className="text-sky-600 text-sm font-bold flex items-center space-x-1 hover:text-sky-700 transition-colors disabled:opacity-50"
              >
                {loadingIds.has(record.id) ? (
                  <i className="fa-solid fa-circle-notch fa-spin"></i>
                ) : (
                  <i className="fa-solid fa-wand-magic-sparkles text-xs"></i>
                )}
                <span>{summaries[record.id] ? 'Re-summarize' : 'Summarize'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalRecords;
