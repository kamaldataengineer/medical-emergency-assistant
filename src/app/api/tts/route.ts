import { NextResponse } from "next/server";
import textToSpeech from "@google-cloud/text-to-speech";

/**
 * Initializes the official Google Cloud Text-to-Speech Client.
 * Enables critical accessibility playback for visually impaired or incapacitated patients during emergencies.
 */
const ttsClient = new textToSpeech.TextToSpeechClient();

/**
 * Handles incoming emergency strings and transforms them into native human-sounding MP3 buffers.
 *
 * @param {Request} req - The REST API request payload containing the First-Aid Advice string.
 * @returns {Promise<NextResponse>} JSON response containing the synthesized base64 audio string.
 */
export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { text } = await req.json();
    if (!text) return NextResponse.json({ error: "Missing emergency text payload." }, { status: 400 });

    const request = {
      input: { text },
      voice: { languageCode: "en-US", name: "en-US-Journey-F" },
      audioConfig: { audioEncoding: "MP3" as const },
    };
    
    // Official Google Cloud TTS conversion hook
    const [response] = await ttsClient.synthesizeSpeech(request);
    
    return NextResponse.json({ audioContent: response.audioContent, source: "Google Cloud TTS" }, { status: 200 });
  } catch (error) {
    console.error("TTS AI integration error:", error);
    return NextResponse.json({ error: "TTS backend standing by for IAM credentials." }, { status: 503 });
  }
}
