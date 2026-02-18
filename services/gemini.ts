
import { GoogleGenAI, Type } from "@google/genai";

const getAIClient = () => {
  const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : undefined;
  if (!apiKey) {
    throw new Error("API Key is missing. Ensure process.env.API_KEY is configured.");
  }
  return new GoogleGenAI({ apiKey });
};

export const summarizeMedicalNote = async (note: string): Promise<string> => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Summarize the following medical consultation note into key takeaways, diagnosis, and next steps: \n\n${note}`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });

    return response.text || "Summary unavailable.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating summary.";
  }
};

export const getSmartTriage = async (symptoms: string): Promise<any> => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `As a medical assistant, analyze these symptoms: "${symptoms}". Provide a JSON response with urgency level (LOW, MEDIUM, HIGH), potential areas to discuss with a doctor, and any immediate self-care advice. DO NOT provide a final diagnosis.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            urgency: { type: Type.STRING },
            discussionPoints: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            selfCareAdvice: { type: Type.STRING }
          },
          required: ["urgency", "discussionPoints", "selfCareAdvice"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Triage AI Error:", error);
    return null;
  }
};
