import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { symptoms, history, forceRoute } = await req.json();

    const lowerSymptoms = symptoms.toLowerCase();
    const wordCount = symptoms.split(" ").filter(Boolean).length;
    const isCriticalKeyword = lowerSymptoms.includes("chest") || lowerSymptoms.includes("breath") || lowerSymptoms.includes("heart") || lowerSymptoms.includes("bleed");
    
    // Feature: Progressive Triage - ask for more info if not critical and vague
    if (wordCount < 4 && !isCriticalKeyword && !forceRoute) {
      return NextResponse.json({
        requiresMoreInfo: true,
        question: "Your symptoms seem a bit vague. Can you describe the pain or when it started? If you are short on time or patience, you can skip this to get routed immediately."
      });
    }

    const isPsych = lowerSymptoms.includes("panic") || lowerSymptoms.includes("anxious") || lowerSymptoms.includes("stress");
    const isMinor = lowerSymptoms.includes("headache") || lowerSymptoms.includes("cough") || lowerSymptoms.includes("cold");
    const isCritical = !isPsych && !isMinor && isCriticalKeyword;
    
    let responseData;

    if (isCritical) {
      responseData = {
        hospitalName: "City General - Cardiac & Trauma Center",
        distance: "1.8 miles",
        eta: "5 mins",
        department: "Emergency Operations",
        severity: "CRITICAL",
        summary: `AI analyzed the symptoms as a potentially life-threatening emergency. A route to the nearest trauma facility has been generated.`
      };
    } else if (isPsych) {
      responseData = {
        hospitalName: "Telehealth Counselor / Local Pharmacy",
        distance: "0.2 miles (or Online)",
        eta: "Immediate",
        department: "Self-Care & Mental Health",
        severity: "LOW",
        summary: `Symptoms suggest a psychological distress response (like a panic attack). Emergency room routing aborted to prevent unnecessary hospital visits. Recommendation: Over-the-counter soothing aids or connecting with a telehealth professional.`
      };
    } else if (isMinor) {
      responseData = {
        hospitalName: "Neighborhood Pharmacy",
        distance: "0.8 miles",
        eta: "3 mins",
        department: "Over-the-Counter",
        severity: "LOW",
        summary: `Symptoms indicate a minor ailment. Emergency room is not required. Directed to the nearest open pharmacy for over-the-counter medicine.`
      };
    } else {
      responseData = {
        hospitalName: "Community Health Urgent Care",
        distance: "3.2 miles",
        eta: "12 mins",
        department: "Express Care",
        severity: "MODERATE",
        summary: `AI analyzed the symptoms as a standard urgent care case. A route to the nearest clinic has been generated. Since this is a moderate case, a nearby pharmacy is also recommended for over-the-counter relief.`,
        alternativeFacility: {
          name: "Local Pharmacy / CVS",
          distance: "0.5 miles",
          type: "Over-the-Counter Medicine"
        }
      };
    }

    // Simulate AI model processing time
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json(responseData);
  } catch (error) {
    return NextResponse.json({ error: "Failed to process request securely." }, { status: 500 });
  }
}
