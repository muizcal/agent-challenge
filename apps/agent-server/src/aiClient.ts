// apps/agent-server/src/aiClient.ts
import "dotenv/config";
import fetch from "node-fetch";
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

console.log("🔑 GEMINI_API_KEY loaded:", !!process.env.GEMINI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`⏱️ Ollama timed out after ${ms / 1000}s`));
    }, ms);
    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

export async function generateText(prompt: string): Promise<string> {
  console.log("🧠 generateText() called with:", prompt);

  // 🔹 Try Ollama first
  try {
    console.log("🔹 Trying Ollama first...");
    const response = await withTimeout(
      fetch(`${process.env.OLLAMA_API_URL || "http://127.0.0.1:11434"}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: process.env.MODEL_NAME_AT_ENDPOINT || "phi3",
          prompt,
          stream: false,
        }),
      }),
      20000
    );

    if (response.ok) {
      const data = await response.json();
      if (data.response) {
        console.log("✅ Response from Ollama");
        return data.response.trim();
      }
    }
  } catch (err: any) {
    console.warn("⚠️ Ollama unavailable or slow:", err.message || err);
  }

  // 🔁 Fallback to Gemini
  try {
    console.log("🔁 Falling back to Gemini...");

    // Use GEMINI_MODEL from environment variables, default to "models/text-bison-001"
    const geminiModelName = process.env.GEMINI_MODEL || "models/gemini-2.5-flash";

    const model = genAI.getGenerativeModel({ model: geminiModelName });
    const result = await model.generateContent(prompt);

    // Extract the text safely
    const text = result?.response?.text?.() || "";

    console.log("✅ Gemini generation successful");
    return text;
} catch (err) {
    console.error("❌ Gemini generation failed:", err);
}

  // 🔁 Fallback to OpenAI (if Gemini also fails)
  try {
    console.log("🔁 Falling back to OpenAI...");
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const message = completion.choices[0]?.message?.content?.trim();
    if (message) {
      console.log("✅ Response from OpenAI");
      return message;
    }
  } catch (openaiErr: any) {
    console.error("❌ OpenAI generation failed:", openaiErr);
  }

  return "⚠️ AI generation failed. Check your Ollama, Gemini, or OpenAI setup.";
}

// ✅ Alias for MCP
export const generateSummaryWithAI = generateText;
