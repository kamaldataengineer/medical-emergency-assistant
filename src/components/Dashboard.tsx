"use client";

import { motion } from "framer-motion";
import { Hospital, MapPin, Navigation, AlertTriangle, ShieldCheck } from "lucide-react";

interface DashboardProps {
  data: {
    hospitalName: string;
    distance: string;
    eta: string;
    department: string;
    severity: "CRITICAL" | "HIGH" | "MODERATE" | "LOW";
    summary: string;
    firstAidAdvice?: string;
    alternativeFacility?: {
      name: string;
      distance: string;
      type: string;
    };
  };
  onReset: () => void;
}

export default function Dashboard({ data, onReset }: DashboardProps) {
  const isCritical = data.severity === "CRITICAL" || data.severity === "HIGH";

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto w-full space-y-6"
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Hospital Card */}
        <div 
           className={`glass-panel rounded-2xl p-6 flex-1 border-l-4 ${isCritical ? 'border-l-red-500' : 'border-l-primary'}`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Nearest Specialized Facility</p>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mt-1">{data.hospitalName}</h2>
              <p className="text-primary dark:text-blue-400 font-medium">{data.department} Department</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-full text-primary dark:bg-blue-900/40 dark:text-blue-400">
              <Hospital className="w-6 h-6" />
            </div>
          </div>
          
          <div className="mt-6 flex flex-col gap-3">
            <div className="flex gap-4 text-sm text-slate-600 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-800/50 p-4 rounded-xl">
              <div className="flex-1 flex items-center gap-2">
                <Navigation className="w-4 h-4" /> {data.distance} away
              </div>
              <div className="flex-1 border-l border-slate-300 dark:border-slate-700 pl-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" /> ETA: <span className="font-bold">{data.eta}</span>
              </div>
            </div>
            
            {data.alternativeFacility && (
              <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
                <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-full text-indigo-600 dark:text-indigo-400">
                  <Hospital className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold">Alternative: {data.alternativeFacility.name}</div>
                  <div className="text-xs opacity-80">{data.alternativeFacility.type} ({data.alternativeFacility.distance} away)</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* AI Summary Card */}
        <div className="glass-panel rounded-2xl p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-rose-500 dark:text-rose-400 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 13h2l2 3 2-6 1 2h2"/></svg>
              Care Assessment
            </div>
            <p className="text-slate-800 dark:text-slate-200 leading-relaxed text-sm">
              &quot;{data.summary}&quot;
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <span className="text-sm font-medium text-slate-500">Severity Level</span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${isCritical ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 ring-1 ring-red-500/20' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 ring-1 ring-yellow-500/20'}`}>
              {data.severity}
            </span>
          </div>
          {data.firstAidAdvice && (
            <div className="mt-4 bg-rose-50 dark:bg-rose-900/20 p-4 rounded-xl border border-rose-200 dark:border-rose-900/50">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm mb-1">
                <AlertTriangle className="w-4 h-4" /> Golden Hour Advice
              </div>
              <p className="text-sm text-rose-800 dark:text-rose-200 leading-snug">
                {data.firstAidAdvice}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Map & Mock Alerts Section */}
      <div className="glass-panel rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row min-h-[16rem]">
        <div className="flex-1 relative bg-slate-200 dark:bg-slate-800 flex items-center justify-center p-0 min-h-[16rem]">
           {process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ? (
             <iframe
               title="Google Maps Route"
               width="100%"
               height="100%"
               style={{ border: 0, minHeight: '100%', position: 'absolute', inset: 0 }}
               loading="lazy"
               allowFullScreen
               referrerPolicy="no-referrer-when-downgrade"
               src={`https://www.google.com/maps/embed/v1/directions?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&origin=Current+Location&destination=${encodeURIComponent(data.hospitalName)}`}
             ></iframe>
           ) : (
             <div className="z-10 bg-white/90 dark:bg-black/90 backdrop-blur-md p-5 rounded-xl border border-slate-200 dark:border-slate-700 text-center max-w-xs w-full shadow-lg m-8">
                <MapPin className="w-8 h-8 mx-auto text-primary animate-bounce mb-3" />
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Google Maps Integration</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Live routing requires NEXT_PUBLIC_GOOGLE_MAPS_KEY in .env.</p>
             </div>
           )}
        </div>
        
        <div className="w-full md:w-1/3 bg-slate-50/90 dark:bg-slate-900/90 p-6 flex flex-col justify-center gap-4 border-l border-slate-200 dark:border-slate-800">
           <div className="flex items-center gap-3 text-emerald-700 dark:text-emerald-400 bg-emerald-100/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/50">
             <ShieldCheck className="w-6 h-6 shrink-0" />
             <div>
               <div className="text-sm font-bold">Services Alerted</div>
               <div className="text-xs opacity-80 mt-0.5">Receiving hospital standing by.</div>
             </div>
           </div>
           
           <button 
             onClick={onReset} 
             className="w-full py-3.5 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary text-slate-800 dark:text-slate-100 font-medium transition-all shadow-sm"
           >
             Start New Analysis
           </button>
        </div>
      </div>
    </motion.div>
  );
}
