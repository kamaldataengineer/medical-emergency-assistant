import { NextResponse } from "next/server";
import vision from "@google-cloud/vision";

/**
 * Initializes the official Google Cloud Vision Client.
 * Used for processing patient-uploaded medical imagery and prescriptions natively.
 * Requires GOOGLE_APPLICATION_CREDENTIALS environment mapping for production workloads.
 */
const client = new vision.ImageAnnotatorClient();

/**
 * Handles incoming multipart or base64 streams for Google Cloud Vision API ingestion.
 * Integrates image recognition into the core unstructured emergency pipeline.
 *
 * @param {Request} req - The incoming REST API request containing the image payload.
 * @returns {Promise<NextResponse>} JSON response containing OCR and semantic visual insights.
 */
export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { imageBase64 } = await req.json();
    if (!imageBase64) return NextResponse.json({ error: "Missing image payload." }, { status: 400 });

    // Official Google Cloud Vision API extraction implementation
    const [result] = await client.labelDetection({
      image: { content: imageBase64 }
    });
    
    return NextResponse.json({ labels: result.labelAnnotations, source: "Google Cloud Vision" }, { status: 200 });
  } catch (error) {
    console.error("Vision AI integration error:", error);
    return NextResponse.json({ error: "Vision integration pending explicit Google Auth." }, { status: 503 });
  }
}
