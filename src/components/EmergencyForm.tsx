"use client";

import { useState } from "react";
import { Activity, User, Send, Mic, Image as ImageIcon, FileText, Globe } from "lucide-react";
import { motion } from "framer-motion";

export interface EmergencyFormData {
  age: string;
  gender: string;
  history: string; // pre-medical history
  symptoms: string; // the messy input
}

interface EmergencyFormProps {
  onSubmit: (data: EmergencyFormData) => void;
}

export default function EmergencyForm({ onSubmit }: EmergencyFormProps) {
  const [formData, setFormData] = useState<EmergencyFormData>({
    age: "",
    gender: "",
    history: "",
    symptoms: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.symptoms.trim() || !formData.age || !formData.gender || !formData.history) return;
    onSubmit(formData);
  };

  const handleMockInput = (type: string) => {
    // This mocks the UI capability of other multimodal inputs
    alert(`[Demo] Activated ${type} Input Layer. In production, this opens a media picker or hardware hook.`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-6 md:p-8 rounded-2xl max-w-3xl mx-auto w-full border border-slate-200/50 dark:border-slate-800/50 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-400 to-indigo-500"></div>
      
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Activity className="text-primary w-6 h-6" /> Multimodal Ingestion Layer
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Accepts messy text, voice, images, and context APIs.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Details Section */}
        <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl border border-slate-100 dark:border-slate-800 space-y-4">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-2">
            <User className="w-4 h-4" /> Patient Data (Mandatory)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-500 block mb-1">Age</label>
              <input
                required
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="e.g. 34"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-black/50 focus:ring-2 focus:ring-primary outline-none transition-all text-slate-800 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 block mb-1">Gender</label>
              <select
                required
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-black/50 focus:ring-2 focus:ring-primary outline-none transition-all text-slate-800 dark:text-slate-100"
              >
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div>
             <label className="text-xs font-medium text-slate-500 block mb-1">Pre-Medical History</label>
             <textarea
               required
               name="history"
               value={formData.history}
               onChange={handleChange}
               placeholder="Hypertension, allergies, previous surgeries..."
               className="w-full h-16 px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-black/50 focus:ring-2 focus:ring-primary outline-none transition-all resize-none text-slate-800 dark:text-slate-100 text-sm"
             />
          </div>
        </div>

        {/* Messy Input Section */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-800 dark:text-slate-200 block">
            Emergency Description (Messy Input)
          </label>
          <div className="relative">
            <textarea
              required
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              placeholder="Describe symptoms, transcribe voice, or upload a prescription..."
              className="w-full h-32 px-4 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-black/80 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none text-slate-800 dark:text-slate-100 shadow-sm overflow-hidden"
            />
            {/* Multimodal Mock Action Bar */}
            <div className="absolute bottom-3 left-3 flex gap-2">
               <button type="button" onClick={() => handleMockInput('Voice')} className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 transition-colors" title="Voice / Speech-to-Text">
                 <Mic className="w-4 h-4" />
               </button>
               <button type="button" onClick={() => handleMockInput('Image')} className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 transition-colors" title="Upload Image / Prescription">
                 <ImageIcon className="w-4 h-4" />
               </button>
               <button type="button" onClick={() => handleMockInput('Document')} className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 transition-colors" title="Upload PDF History">
                 <FileText className="w-4 h-4" />
               </button>
               <button type="button" onClick={() => handleMockInput('Context API')} className="p-2 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-lg text-indigo-600 dark:text-indigo-400 transition-colors ml-2 border border-indigo-200 dark:border-indigo-800" title="Fetch Context APIs (Traffic, Weather)">
                 <Globe className="w-4 h-4" />
               </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-blue-700 text-white font-medium py-4 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-primary/25 active:scale-[0.98] text-lg mt-4"
        >
          <Send className="w-5 h-5" /> Process via Gemini AI
        </button>
      </form>
    </motion.div>
  );
}
