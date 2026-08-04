export class GroqLpuEngine {
  private apiKey: string;
  private model: string;

  constructor() {
    this.apiKey = (typeof process !== "undefined" ? process.env.GROQ_API_KEY : "") || "";
    this.model = "llama3-70b-8192";
  }

  public async fastInference(prompt: string) {
    if (!this.apiKey) {
      return { result: `[Simulated Groq Llama] ${prompt}`, status: "simulated", latencyMs: 0 };
    }
    const start = performance.now();
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: this.model,
        messages: [{ role: "user", content: prompt }]
      })
    });
    const latency = Math.round(performance.now() - start);
    if (!response.ok) throw new Error(`Groq API error: ${response.statusText}`);
    const data = await response.json();
    return {
      result: data.choices[0].message.content,
      status: "success",
      latencyMs: latency
    };
  }
}

export const groqEngine = new GroqLpuEngine();
