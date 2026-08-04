export class PerplexitySonarEngine {
  private apiKey: string;

  constructor() {
    this.apiKey = (typeof process !== "undefined" ? process.env.PERPLEXITY_API_KEY : "") || "";
  }

  public async deepSearch(query: string) {
    if (!this.apiKey) {
      return { summary: `[Simulated Perplexity] ${query}`, status: "simulated" };
    }
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.1-sonar-huge-128k-online",
        messages: [{ role: "user", content: query }]
      })
    });
    if (!response.ok) throw new Error(`Perplexity API error: ${response.statusText}`);
    const data = await response.json();
    return { summary: data.choices[0].message.content, status: "success" };
  }
}
export const perplexityEngine = new PerplexitySonarEngine();
