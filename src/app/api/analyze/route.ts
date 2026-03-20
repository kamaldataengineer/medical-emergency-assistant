import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { symptoms, history } = await req.json();

    // ----------------------------------------------------
    // Mocking Google Gemini SDK Implementation due to lack of API key
    // For real world: 
    // const { GoogleGenerativeAI } = require("@google/generative-ai");
    // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro", generationConfig: { responseMimeType: "application/json" } });
    // const prompt = `Analyze: ${symptoms}...`;
    // const result = await model.generateContent(prompt);
    // // ----------------------------------------------------

    // Simulated parsing logic based on highly requested keywords
    const lowerSymptoms = symptoms.toLowerCase();
    const isCritical = lowerSymptoms.includes("chest") || lowerSymptoms.includes("breath") || lowerSymptoms.includes("heart") || lowerSymptoms.includes("bleed");
    
    // Return mock structured JSON response
    const mockResponse = {
      hospitalName: isCritical ? "City General - Cardiac & Trauma Center" : "Community Health Urgent Care",
      distance: isCritical ? "1.8 miles" : "3.2 miles",
      eta: isCritical ? "5 mins" : "12 mins",
      department: isCritical ? "Emergency Operations" : "Express Care",
      severity: isCritical ? "CRITICAL" : "MODERATE",
      summary: `AI analyzed the symptoms as ${isCritical ? 'a potentially life-threatening emergency' : 'a standard urgent care case'}, factoring in the provided medical history. A route to the nearest suitable facility has been generated.`
    };

    // Simulate AI model processing time
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json(mockResponse);
  } catch (error) {
    return NextResponse.json({ error: "Failed to process request securely." }, { status: 500 });
  }
}
