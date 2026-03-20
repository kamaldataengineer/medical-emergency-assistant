"use client";

import React, { useState, useCallback, type ReactElement } from "react";
import dynamic from "next/dynamic";
import EmergencyForm from "@/components/EmergencyForm";
import ProcessingAnimation from "@/components/ProcessingAnimation";
import FollowUpForm from "@/components/FollowUpForm";

// Tactically split the bundle—Dashboard and Maps only load after the AI logic completes
const Dashboard = dynamic(() => import("@/components/Dashboard"), {
  loading: () => <ProcessingAnimation />
});

/**
 * Root Application Entry for the Medical Emergency Assistant.
 * Orchestrates states between multi-modal ingestion, AI analysis, and dashboard routing.
 */
export default function Home(): ReactElement {
  const [status, setStatus] = useState<"idle" | "processing" | "needs_info" | "complete">("idle");
  const [data, setData] = useState<React.ComponentProps<typeof Dashboard>["data"] | null>(null);
  
  // Keep track of the initial input to send alongside follow-up info
  const [initialInput, setInitialInput] = useState({ age: "", gender: "", history: "", symptoms: "" });
  const [question, setQuestion] = useState("");

  /**
   * Dispatches patient data to the Gemini-powered triage API.
   * 
   * @param {typeof initialInput} dataPayload - Mixed patient demographic and symptom block.
   * @param {boolean} forceRoute - Internal flag for follow-up skip logic.
   */
  const handleAnalyze = useCallback(async (dataPayload: typeof initialInput, forceRoute: boolean = false): Promise<void> => {
    setStatus("processing");
    if (!forceRoute) {
      setInitialInput(dataPayload);
    }
    
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...dataPayload, forceRoute }),
      });
      
      const result = await response.json();
      
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
      console.error("Home Analysis Error:", e);
      setTimeout(() => {
        setData({
          hospitalName: "Central Med Center",
          distance: "2.4 miles",
          eta: "6 mins",
          department: "Emergency Response",
          severity: "HIGH",
          summary: "Fallback emergency routed due to network instability."
        });
        setStatus("complete");
      }, 1500);
    }
  }, []);

  const handleFollowUpSubmit = (additionalInfo: string) => {
    handleAnalyze({ ...initialInput, symptoms: `${initialInput.symptoms}. Additional details: ${additionalInfo}` }, true);
  };

  const handleSkip = () => {
    handleAnalyze(initialInput, true);
  };

  return (
    <div className="w-full flex justify-center py-4 md:py-8">
      {status === "idle" && <EmergencyForm onSubmit={(d) => handleAnalyze(d, false)} />}
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
