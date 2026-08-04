export class Qwen25MaxEngine {
  private apiKey: string;
  private model: string;

  constructor() {
    this.apiKey = (typeof process !== "undefined" ? process.env.DASHSCOPE_API_KEY : "") || "";
    this.model = "qwen-max";
  }

  public async synthesizeCode(prompt: string) {
    if (!this.apiKey) {
      return { output: `[Simulated Qwen] ${prompt}`, status: "simulated" };
    }
    const response = await fetch("https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions", {
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
    if (!response.ok) throw new Error(`Qwen API error: ${response.statusText}`);
    const data = await response.json();
    return { output: data.choices[0].message.content, status: "success" };
  }
}
export const qwenEngine = new Qwen25MaxEngine();
