export interface XAiGrokConfig {
  apiKey?: string;
  model?: string;
}

export class XAiGrokEngine {
  private apiKey: string;
  private model: string;

  constructor(config: XAiGrokConfig = {}) {
    this.apiKey = config.apiKey || (typeof process !== "undefined" ? process.env.XAI_API_KEY : "") || "";
    this.model = config.model || "grok-2";
  }

  public async chat(prompt: string) {
    if (!this.apiKey) {
      return { reply: `[Simulated xAI] ${prompt}`, status: "simulated" };
    }
    const response = await fetch("https://api.x.ai/v1/chat/completions", {
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
    if (!response.ok) throw new Error(`xAI API error: ${response.statusText}`);
    const data = await response.json();
    return { reply: data.choices[0].message.content, status: "success" };
  }
}

export const grokEngine = new XAiGrokEngine();
