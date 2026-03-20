import React, { useState, memo, type ReactElement, useCallback } from "react";
import { motion } from "framer-motion";
import { AlertCircle, FastForward, Send } from "lucide-react";

interface FollowUpFormProps {
  question: string;
  onSubmit: (info: string) => void;
  onSkip: () => void;
}

/**
 * Orchestrates secondary multi-modal data gathering when initial analysis yields high ambiguity.
 *
 * @param {FollowUpFormProps} props - The event handlers for submission and bypass.
 * @returns {ReactElement} The structurally validated follow-up interface.
 */
const FollowUpFormComponent = ({ question, onSubmit, onSkip }: FollowUpFormProps): ReactElement => {
  const [info, setInfo] = useState("");

  const handleSubmit = useCallback((e: React.FormEvent): void => {
    e.preventDefault();
    if (!info.trim()) return;
    onSubmit(info);
  }, [info, onSubmit]);

  const handleSkip = useCallback((): void => {
    onSkip();
  }, [onSkip]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel p-6 md:p-8 rounded-2xl max-w-2xl mx-auto w-full border-t-4 border-t-yellow-400 shadow-2xl"
    >
      <div className="mb-6 flex items-start gap-4">
        <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full shrink-0">
           <AlertCircle className="text-yellow-600 dark:text-yellow-400 w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            AI Needs Clarification
          </h2>
          <p className="text-slate-700 dark:text-slate-200 font-medium mt-3 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl shadow-inner border border-slate-200/50 dark:border-slate-700/50 relative">
            &quot;{question}&quot;
            <span className="absolute -left-2 top-4 w-4 h-4 bg-slate-50 dark:bg-slate-800/50 transform rotate-45 border-l border-b border-transparent dark:border-transparent"></span>
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <textarea
            autoFocus
            id="followup-info-input"
            aria-label="Additional Emergency Details"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            placeholder="Type your additional details here..."
            className="w-full h-24 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-black/50 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all resize-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400 shadow-sm"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-medium py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]"
          >
            <Send className="w-5 h-5 shrink-0" /> Provide Details
          </button>

          <button
            type="button"
            onClick={handleSkip}
            className="flex-1 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-900/50 dark:hover:bg-red-900/40 dark:text-red-400 font-medium py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <FastForward className="w-5 h-5 shrink-0" /> Route Me Now
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default memo(FollowUpFormComponent);
