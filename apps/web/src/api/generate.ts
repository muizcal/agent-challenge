// apps/web/src/api/generate.ts

export async function generate(prompt: string): Promise<string> {
  try {
    const response = await fetch("http://localhost:4001/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`❌ Backend error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.result || "⚠️ No result returned from server.";
  } catch (error: any) {
    console.error("❌ Error in generate():", error);
    return "⚠️ Could not reach backend server. Is it running?";
  }
}
