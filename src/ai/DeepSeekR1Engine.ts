export interface DeepSeekConfig {
  apiKey?: string;
  enableReasoningChain?: boolean;
}

export interface DeepSeekResult {
  reasoningChain: string;
  answer: string;
  status: string;
}

export class DeepSeekR1Engine {
  private apiKey: string;
  private model: string;

  constructor(config: DeepSeekConfig = {}) {
    this.apiKey = config.apiKey || (typeof process !== "undefined" ? process.env.DEEPSEEK_API_KEY : "") || "";
    this.model = "deepseek-reasoner";
  }

  public async solveWithReasoning(prompt: string): Promise<DeepSeekResult> {
    if (!this.apiKey) {
      return { reasoningChain: "<think>Simulated reasoning</think>", answer: `[Simulated DeepSeek] ${prompt}`, status: "simulated" };
    }
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
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
    if (!response.ok) throw new Error(`DeepSeek API error: ${response.statusText}`);
    const data = await response.json();
    return {
      reasoningChain: data.choices[0].message.reasoning_content || "No reasoning chain provided",
      answer: data.choices[0].message.content,
      status: "success"
    };
  }
}

export const deepSeekR1 = new DeepSeekR1Engine();
