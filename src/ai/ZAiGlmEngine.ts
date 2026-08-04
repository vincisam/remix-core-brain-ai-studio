export interface ZAiConfig {
  apiKey?: string;
  model?: string;
}

export class ZAiGlmEngine {
  private apiKey: string;
  private model: string;

  constructor(config: ZAiConfig = {}) {
    this.apiKey = config.apiKey || (typeof process !== "undefined" ? process.env.ZHIPU_API_KEY : "") || "";
    this.model = config.model || "glm-4";
  }

  public async reason(prompt: string) {
    if (!this.apiKey) {
      return { response: `[Simulated Zhipu GLM] ${prompt}`, status: "simulated" };
    }
    const response = await fetch("https://open.bigmodel.cn/api/paas/v4/chat/completions", {
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
    if (!response.ok) throw new Error(`Zhipu API error: ${response.statusText}`);
    const data = await response.json();
    return { response: data.choices[0].message.content, status: "success" };
  }
}

export const zaiGlmEngine = new ZAiGlmEngine();
