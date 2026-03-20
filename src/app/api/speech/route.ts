import { NextResponse } from "next/server";
import speech from "@google-cloud/speech";

/**
 * Initializes the official Google Cloud Speech-to-Text Client.
 * Supports automated transcription of patient voice-memos during active trauma situations.
 */
const speechClient = new speech.SpeechClient();

/**
 * Ingests audio streams for native Cloud Speech-to-Text inference to bridge accessibility.
 *
 * @param {Request} req - The incoming request containing base64 audio frames.
 * @returns {Promise<NextResponse>} JSON containing transcribed medical history strings.
 */
export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { audioBuffer } = await req.json();
    if (!audioBuffer) return NextResponse.json({ error: "Missing audio channel." }, { status: 400 });

    // Official Google Cloud Speech API audio transcription execution
    const request = {
      audio: { content: audioBuffer },
      config: { encoding: "LINEAR16" as const, languageCode: "en-US", sampleRateHertz: 16000 },
    };
    
    const [response] = await speechClient.recognize(request);
    return NextResponse.json({ transcript: response.results, source: "Google Cloud Speech API" }, { status: 200 });
  } catch (err) {
    console.error("Speech AI integration error:", err);
    return NextResponse.json({ error: "Speech API pending proper IAM binding." }, { status: 503 });
  }
}
