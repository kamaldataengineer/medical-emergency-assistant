"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";

export default function ProcessingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-8">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-primary/20 dark:bg-primary/10 blur-2xl animate-pulse-slow"></div>
        <div className="w-24 h-24 bg-white dark:bg-slate-900 rounded-full shadow-2xl flex items-center justify-center border border-slate-100 dark:border-slate-800 relative z-10">
          <Activity className="w-8 h-8 text-primary animate-pulse" />
        </div>
        <motion.div
           animate={{ rotate: 360 }}
           transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
           className="absolute inset-0 w-full h-full rounded-full border-[3px] border-t-primary border-r-transparent border-b-transparent border-l-transparent z-20"
        />
      </div>
      <div className="text-center space-y-2 animate-pulse">
        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Analyzing Context...</h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto text-sm leading-relaxed">
          Gemini AI is parsing your inputs, evaluating medical severity, and mapping the fastest route to care.
        </p>
      </div>
    </div>
  );
}
