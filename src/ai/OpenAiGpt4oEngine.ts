export interface OpenAiConfig {
  apiKey?: string;
  model?: string;
}

export class OpenAiGpt4oEngine {
  private apiKey: string;
  private model: string;

  constructor(config: OpenAiConfig = {}) {
    this.apiKey = config.apiKey || (typeof process !== "undefined" ? process.env.OPENAI_API_KEY : "") || "";
    this.model = config.model || "gpt-4o";
  }

  public async chatCompletion(prompt: string) {
    if (!this.apiKey) {
      return { model: this.model, response: `[Simulated OpenAI] ${prompt}`, status: "simulated" };
    }
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
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
    if (!response.ok) throw new Error(`OpenAI API error: ${response.statusText}`);
    const data = await response.json();
    return {
      model: this.model,
      response: data.choices[0].message.content,
      usage: data.usage,
      status: "success",
    };
  }
}

export const gpt4oEngine = new OpenAiGpt4oEngine();
