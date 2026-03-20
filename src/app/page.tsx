"use client";

import { useState } from "react";
import EmergencyForm from "@/components/EmergencyForm";
import Dashboard from "@/components/Dashboard";
import ProcessingAnimation from "@/components/ProcessingAnimation";
import FollowUpForm from "@/components/FollowUpForm";

export default function Home() {
  const [status, setStatus] = useState<"idle" | "processing" | "needs_info" | "complete">("idle");
  const [data, setData] = useState<any>(null);
  
  // Keep track of the initial input to send alongside follow-up info
  const [initialInput, setInitialInput] = useState({ symptoms: "", history: "" });
  const [question, setQuestion] = useState("");

  const handleAnalyze = async (symptoms: string, history: string, forceRoute: boolean = false) => {
    setStatus("processing");
    // Ensure we keep initial values state updated
    if (!forceRoute) {
      setInitialInput({ symptoms, history });
    }
    
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms, history, forceRoute }),
      });
      
      const result = await response.json();
      
      // Artificial delay for smooth UX transition and premium feel
      setTimeout(() => {
        if (result.requiresMoreInfo) {
          setQuestion(result.question);
          setStatus("needs_info");
        } else {
          setData(result);
          setStatus("complete");
        }
      }, 1800);

    } catch (e) {
      console.error(e);
      // Fallback mock if network issue
      setTimeout(() => {
        setData({
          hospitalName: "Central Med Center",
          distance: "2.4 miles",
          eta: "6 mins",
          department: "Emergency Response",
          severity: "HIGH",
          summary: "Patient exhibiting signs that require immediate attention."
        });
        setStatus("complete");
      }, 1500);
    }
  };

  const handleFollowUpSubmit = (additionalInfo: string) => {
    // Combine old symptoms with new details and force route
    handleAnalyze(`${initialInput.symptoms}. Additional details: ${additionalInfo}`, initialInput.history, true);
  };

  const handleSkip = () => {
    // Force route without additional info
    handleAnalyze(initialInput.symptoms, initialInput.history, true);
  };

  return (
    <div className="w-full flex justify-center py-4 md:py-8">
      {status === "idle" && <EmergencyForm onSubmit={(s, h) => handleAnalyze(s, h, false)} />}
      {status === "processing" && <ProcessingAnimation />}
      {status === "needs_info" && (
        <FollowUpForm 
          question={question} 
          onSubmit={handleFollowUpSubmit} 
          onSkip={handleSkip} 
        />
      )}
      {status === "complete" && data && <Dashboard data={data} onReset={() => setStatus("idle")} />}
    </div>
  );
}
