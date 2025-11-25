import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "KEY" });

export async function main(text:string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: text,
  });
  return response;
}
