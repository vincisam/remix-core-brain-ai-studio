export class MistralLargeEngine {
  private apiKey: string;
  private model: string;

  constructor() {
    this.apiKey = (typeof process !== "undefined" ? process.env.MISTRAL_API_KEY : "") || "";
    this.model = "mistral-large-latest";
  }

  public async codeFim(prefix: string, suffix: string) {
    if (!this.apiKey) {
      return { completion: `[Simulated Mistral FIM]`, status: "simulated" };
    }
    const response = await fetch("https://api.mistral.ai/v1/fim/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: "codestral-latest",
        prompt: prefix,
        suffix: suffix
      })
    });
    if (!response.ok) throw new Error(`Mistral API error: ${response.statusText}`);
    const data = await response.json();
    return {
      completion: data.choices[0].message.content,
      status: "success"
    };
  }

  public async chat(prompt: string) {
    if (!this.apiKey) {
      return { response: `[Simulated Mistral] ${prompt}`, status: "simulated" };
    }
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
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
    if (!response.ok) throw new Error(`Mistral API error: ${response.statusText}`);
    const data = await response.json();
    return { response: data.choices[0].message.content, status: "success" };
  }
}
export const mistralEngine = new MistralLargeEngine();
