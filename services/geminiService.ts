import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
// Note: In a real environment, verify API key exists.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateBikeSalesPitch = async (bikeName: string, category: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, exciting, and persuasive sales pitch (max 40 words) in Hebrew for a bicycle named "${bikeName}" which is in the "${category}" category. Focus on lifestyle and freedom. No markdown, just text.`,
    });

    return response.text || 'תיאור לא זמין כרגע.';
  } catch (error) {
    console.error("Error generating content:", error);
    return 'חווה את חופש הרכיבה ברמה חדשה לגמרי.';
  }
};