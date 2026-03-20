"use client";

import { useState } from "react";
import EmergencyForm from "@/components/EmergencyForm";
import Dashboard from "@/components/Dashboard";
import ProcessingAnimation from "@/components/ProcessingAnimation";

export default function Home() {
  const [status, setStatus] = useState<"idle" | "processing" | "complete">("idle");
  const [data, setData] = useState<any>(null);

  const handleAnalyze = async (symptoms: string, history: string) => {
    setStatus("processing");
    
    try {
      // Simulate API call to Next.js API route that interfaces with Gemini
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms, history }),
      });
      
      const result = await response.json();
      
      // Artificial delay for smooth UX transition and premium feel
      setTimeout(() => {
        setData(result);
        setStatus("complete");
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
          summary: "Patient exhibiting signs that require immediate attention based on symptoms."
        });
        setStatus("complete");
      }, 1500);
    }
  };

  return (
    <div className="w-full flex justify-center py-4 md:py-8">
      {status === "idle" && <EmergencyForm onSubmit={handleAnalyze} />}
      {status === "processing" && <ProcessingAnimation />}
      {status === "complete" && data && <Dashboard data={data} onReset={() => setStatus("idle")} />}
    </div>
  );
}
