export interface McpResource {
  uri: string;
  name: string;
  description?: string;
  mimeType?: string;
}

export interface McpTool {
  name: string;
  description?: string;
  inputSchema: {
    type: "object";
    properties: Record<string, any>;
    required?: string[];
  };
}

export interface McpPrompt {
  name: string;
  description?: string;
  arguments?: {
    name: string;
    description?: string;
    required?: boolean;
  }[];
}

export class McpServerRegistry {
  public resources: Map<string, McpResource & { readHandler: () => Promise<string> }> = new Map();
  public tools: Map<string, McpTool & { handler: (args: any) => Promise<any> }> = new Map();
  public prompts: Map<string, McpPrompt & { handler: (args: any) => Promise<string> }> = new Map();

  registerResource(resource: McpResource, readHandler: () => Promise<string>) {
    this.resources.set(resource.uri, { ...resource, readHandler });
  }

  registerTool(tool: McpTool, handler: (args: any) => Promise<any>) {
    this.tools.set(tool.name, { ...tool, handler });
  }

  registerPrompt(prompt: McpPrompt, handler: (args: any) => Promise<string>) {
    this.prompts.set(prompt.name, { ...prompt, handler });
  }

  async handleRpcRequest(req: any) {
    const { method, params, id } = req;
    try {
      let result: any = null;
      switch (method) {
        case "resources/list":
          result = { resources: Array.from(this.resources.values()).map(r => ({ uri: r.uri, name: r.name, description: r.description, mimeType: r.mimeType })) };
          break;
        case "resources/read":
          const resource = this.resources.get(params?.uri);
          if (!resource) throw new Error("Resource not found");
          result = { contents: [{ uri: resource.uri, mimeType: resource.mimeType, text: await resource.readHandler() }] };
          break;
        case "tools/list":
          result = { tools: Array.from(this.tools.values()).map(t => ({ name: t.name, description: t.description, inputSchema: t.inputSchema })) };
          break;
        case "tools/call":
          const tool = this.tools.get(params?.name);
          if (!tool) throw new Error("Tool not found");
          const toolResult = await tool.handler(params?.arguments || {});
          result = { content: [{ type: "text", text: typeof toolResult === 'string' ? toolResult : JSON.stringify(toolResult) }] };
          break;
        case "prompts/list":
          result = { prompts: Array.from(this.prompts.values()).map(p => ({ name: p.name, description: p.description, arguments: p.arguments })) };
          break;
        case "prompts/get":
          const prompt = this.prompts.get(params?.name);
          if (!prompt) throw new Error("Prompt not found");
          result = { description: prompt.description, messages: [{ role: "user", content: { type: "text", text: await prompt.handler(params?.arguments || {}) } }] };
          break;
        default:
          throw new Error("Method not found");
      }
      return { jsonrpc: "2.0", id, result };
    } catch (error: any) {
      return { jsonrpc: "2.0", id, error: { code: -32601, message: error.message } };
    }
  }
}

export const mcpRegistry = new McpServerRegistry();
