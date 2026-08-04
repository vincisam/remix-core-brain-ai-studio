export interface AnthropicConfig {
  apiKey?: string;
  model?: string;
}

export class Claude35SonnetEngine {
  private apiKey: string;
  private model: string;

  constructor(config: AnthropicConfig = {}) {
    this.apiKey = config.apiKey || (typeof process !== "undefined" ? process.env.ANTHROPIC_API_KEY : "") || "";
    this.model = config.model || "claude-3-5-sonnet-20241022";
  }

  public async generateArtifact(prompt: string) {
    if (!this.apiKey) {
      return { model: this.model, content: `[Simulated Claude] ${prompt}`, status: "simulated" };
    }
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: this.model,
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }]
      })
    });
    if (!response.ok) throw new Error(`Anthropic API error: ${response.statusText}`);
    const data = await response.json();
    return {
      model: this.model,
      content: data.content[0].text,
      status: "success",
    };
  }
}

export const claudeEngine = new Claude35SonnetEngine();
