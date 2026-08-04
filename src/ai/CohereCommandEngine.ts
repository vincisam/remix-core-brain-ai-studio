export class CohereCommandEngine {
  private apiKey: string;

  constructor() {
    this.apiKey = (typeof process !== "undefined" ? process.env.COHERE_API_KEY : "") || "";
  }

  public async ragQuery(query: string) {
    if (!this.apiKey) {
      return { answer: `[Simulated Cohere] ${query}`, status: "simulated" };
    }
    const response = await fetch("https://api.cohere.ai/v1/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: "command-r-plus",
        message: query
      })
    });
    if (!response.ok) throw new Error(`Cohere API error: ${response.statusText}`);
    const data = await response.json();
    return { answer: data.text, status: "success" };
  }
}
export const cohereEngine = new CohereCommandEngine();
