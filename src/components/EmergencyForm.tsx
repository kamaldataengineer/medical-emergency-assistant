"use client";

import { useState } from "react";
import { Activity, History, Send } from "lucide-react";
import { motion } from "framer-motion";

interface EmergencyFormProps {
  onSubmit: (symptoms: string, history: string) => void;
}

export default function EmergencyForm({ onSubmit }: EmergencyFormProps) {
  const [symptoms, setSymptoms] = useState("");
  const [history, setHistory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;
    onSubmit(symptoms, history);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-6 md:p-8 rounded-2xl max-w-2xl mx-auto w-full"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Activity className="text-primary w-6 h-6" /> Describe the Situation
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Our AI will process your input to route you to the best facility immediately.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block">
            Current Symptoms (Required)
          </label>
          <textarea
            required
            aria-label="Current Symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="e.g. Severe chest pain, shortness of breath, radiating pain in left arm..."
            className="w-full h-32 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-black/50 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <History className="w-4 h-4" /> Medical History (Optional)
          </label>
          <textarea
            aria-label="Medical History"
            value={history}
            onChange={(e) => setHistory(e.target.value)}
            placeholder="e.g. Type 2 Diabetes, hypertension, allergic to penicillin..."
            className="w-full h-24 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-black/50 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-blue-700 text-white font-medium py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-primary/25 active:scale-[0.98]"
        >
          <Send className="w-5 h-5" /> Analyze & Route
        </button>
      </form>
    </motion.div>
  );
}
