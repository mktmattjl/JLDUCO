import { GoogleGenAI, Type } from "@google/genai";
import { ADMIN_NOTES } from '../adminNotes';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Only initialize AI if API key is available
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;
const model = "gemini-2.5-flash";

// In-memory cache to store fetched descriptions.
const descriptionCache = new Map<string, string>();

/**
 * Retrieves the admin notes for a specific item from the local notes file.
 * This is a synchronous operation for instant loading.
 * @param itemName - The name of the item (e.g., 'Paris Region').
 * @param category - The name of the category (e.g., 'Regions').
 * @returns An array of strings containing the admin notes.
 */
export const getAdminNotes = (itemName: string, category: string): string[] => {
    const notes = ADMIN_NOTES[category]?.[itemName];
    return notes || ["No notes available for this item. Please add them to adminNotes.ts"];
};


const descriptionSchema = {
    type: Type.OBJECT,
    properties: {
        description: {
            type: Type.STRING,
            description: "A single, evocative sentence (max 20 words) for a customer viewing a luxury travel option. It should capture the essence of the experience."
        }
    },
    required: ["description"]
};

/**
 * Generates an evocative, customer-facing description for a travel item using the Gemini API.
 * Results are cached in memory to speed up subsequent requests for the same item.
 * @param itemName - The name of the item.
 * @param category - The name of the category.
 * @returns A promise that resolves to the description string.
 */
export const generateItemDescription = async (itemName: string, category: string): Promise<string> => {
    const cacheKey = `${category}-${itemName}`;

    // If the description is already in our cache, return it instantly.
    if (descriptionCache.has(cacheKey)) {
        return descriptionCache.get(cacheKey)!;
    }

    // If no API key is set, return empty string
    if (!ai) {
        console.warn("Gemini API key not set. Descriptions will not be generated.");
        return "";
    }

    // If not in cache, fetch from the API.
    try {
        const prompt = `Generate a single, evocative sentence (max 20 words) for a luxury French travel experience.
        Category: "${category}"
        Name: "${itemName}"
        
        Provide the content in the specified JSON format.`;

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                systemInstruction: "You are a creative copywriter for a luxury French travel agency. Provide a concise and evocative sentence. Always respond in the requested JSON format.",
                responseMimeType: "application/json",
                responseSchema: descriptionSchema,
                temperature: 0.7,
            }
        });

        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText) as { description: string };
        const description = parsedJson.description;

        // Store the newly fetched description in the cache for next time.
        descriptionCache.set(cacheKey, description);
        
        return description;

    } catch (error) {
        console.error("Error fetching description from Gemini:", error);
        // Return empty string on error so only the title shows
        return "";
    }
};
