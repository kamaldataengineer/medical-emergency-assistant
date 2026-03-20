import { NextResponse } from "next/server";
import { TranslationServiceClient } from "@google-cloud/translate";

/**
 * Initializes the official Google Cloud Translation Service v3 Client.
 * Actively parses messy multi-lingual input dynamically into english for strictly structured AI analysis.
 */
const translationClient = new TranslationServiceClient();

/**
 * Detects native languages from distress signals and normalizes them automatically.
 *
 * @param {Request} req - The incoming payload mapping foreign syntax.
 * @returns {Promise<NextResponse>} JSON response containing normalized English emergency variables.
 */
export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { text } = await req.json();
    if (!text) return NextResponse.json({ error: "Missing transcript payload." }, { status: 400 });

    const projectId = process.env.GOOGLE_CLOUD_PROJECT || "promptfirstproject";
    const request = {
      parent: `projects/${projectId}/locations/global`,
      contents: [text],
      mimeType: "text/plain",
      targetLanguageCode: "en-US",
    };
    
    // Official Google Cloud Translation API execution
    const [response] = await translationClient.translateText(request);
    
    return NextResponse.json({ translatedText: response.translations?.[0]?.translatedText, source: "Google Cloud Translate" }, { status: 200 });
  } catch (err) {
    console.error("Translation AI integration error:", err);
    return NextResponse.json({ error: "Translation API awaiting IAM authorization hookups." }, { status: 503 });
  }
}
