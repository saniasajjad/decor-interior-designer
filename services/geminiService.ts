
import { GoogleGenAI, Modality } from "@google/genai";

// Utility function to convert File to base64
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                // remove the header from the base64 string e.g., "data:image/png;base64,"
                resolve(reader.result.split(',')[1]);
            } else {
                reject(new Error('Failed to convert file to base64'));
            }
        };
        reader.onerror = (error) => reject(error);
    });
};

export const generateDesigns = async (
    imageFile: File,
    style: string,
    customPrompt: string
): Promise<string[]> => {
    const apiKey = import.meta.env.VITE_API_KEY as string | undefined;
    if (!apiKey) {
        throw new Error("VITE_API_KEY environment variable not set. Please configure it to use the AI features.");
    }

    const ai = new GoogleGenAI({ apiKey });
    const base64Image = await fileToBase64(imageFile);

    const fullPrompt = `Redesign this room in a ${style} style. ${customPrompt}. Maintain the room's core structure (windows, doors) but feel free to change furniture, colors, lighting, and decor.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [
                {
                    inlineData: {
                        data: base64Image,
                        mimeType: imageFile.type,
                    },
                },
                {
                    text: fullPrompt,
                },
            ],
        },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });

    const generatedImages: string[] = [];
    if (response.candidates && response.candidates.length > 0) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64ImageData = part.inlineData.data;
                const imageUrl = `data:${part.inlineData.mimeType};base64,${base64ImageData}`;
                generatedImages.push(imageUrl);
            }
        }
    }

    if (generatedImages.length === 0) {
        throw new Error("The AI could not generate any designs. Please try a different image or prompt.");
    }
    
    return generatedImages;
};
