import { GlobalAiComponent, CodeFile } from "../types";
import { GLOBAL_AI_COMPONENTS } from "./GlobalComponents";

export interface SelectedComponentResult {
  component: GlobalAiComponent;
  confidenceScore: number;
  reasoning: string;
  routingTag: string;
}

/**
 * Intelligent AI Component Auto-Selector
 * 
 * Automatically analyzes prompt requirements and routes to the best AI component
 * (Core Brain, AST Transformer, LSP Diagnostics, Swarm Orchestrator, Test Generator, 
 * UI Repairer, Container Sandbox, Vector Graphics Engine, Brain Chat Engine).
 */
export class ComponentSelector {
  static selectForPrompt(prompt: string, activeFile?: CodeFile): SelectedComponentResult {
    const p = prompt.toLowerCase();

    // 0. Nano Banana AI Engine (Ultra-Fast Edge Code & Image Synthesis)
    if (
      p.includes("nano banana") ||
      p.includes("nanobanana") ||
      p.includes("banana") ||
      p.includes("nano") ||
      p.includes("fast pass") ||
      p.includes("sub-10ms") ||
      p.includes("edge ai")
    ) {
      const comp = GLOBAL_AI_COMPONENTS.find((c) => c.id === "comp-nano-banana") || GLOBAL_AI_COMPONENTS[0];
      return {
        component: comp,
        confidenceScore: 99.9,
        reasoning: `Prompt requirement detected Nano Banana ultra-fast edge AI synthesis & vector rendering keywords.`,
        routingTag: `🍌 **Auto-Routed AI Component:** \`${comp.name}\` (Category: ${comp.category} | Target: \`${comp.targetFilename}\` | Accuracy: ${comp.accuracyScore}% | Latency: ${comp.latencyMs}ms)`,
      };
    }

    // Global Frontier & Reasoning AI Engines Routing
    if (p.includes("deepseek") || p.includes("reasoning") || p.includes("r1") || p.includes("moe")) {
      const comp = GLOBAL_AI_COMPONENTS.find((c) => c.id === "comp-deepseek-r1") || GLOBAL_AI_COMPONENTS[0];
      return {
        component: comp,
        confidenceScore: 99.9,
        reasoning: "Prompt requirement routed to DeepSeek-R1 (DeepSeek AI, China/Global) 671B MoE reasoning engine.",
        routingTag: `🤖 **Auto-Routed AI Component:** \`${comp.name}\` (Category: ${comp.category} | Target: \`${comp.targetFilename}\` | Accuracy: ${comp.accuracyScore}% | Latency: ${comp.latencyMs}ms)`,
      };
    }

    if (p.includes("gpt") || p.includes("openai") || p.includes("gpt-4o")) {
      const comp = GLOBAL_AI_COMPONENTS.find((c) => c.id === "comp-openai-gpt4o") || GLOBAL_AI_COMPONENTS[0];
      return {
        component: comp,
        confidenceScore: 99.5,
        reasoning: "Prompt requirement routed to OpenAI GPT-4o omni multimodal engine.",
        routingTag: `⚡ **Auto-Routed AI Component:** \`${comp.name}\` (Category: ${comp.category} | Target: \`${comp.targetFilename}\` | Accuracy: ${comp.accuracyScore}% | Latency: ${comp.latencyMs}ms)`,
      };
    }

    if (p.includes("claude") || p.includes("anthropic") || p.includes("sonnet")) {
      const comp = GLOBAL_AI_COMPONENTS.find((c) => c.id === "comp-anthropic-claude") || GLOBAL_AI_COMPONENTS[0];
      return {
        component: comp,
        confidenceScore: 99.6,
        reasoning: "Prompt requirement routed to Anthropic Claude 3.5 Sonnet engine.",
        routingTag: `⚡ **Auto-Routed AI Component:** \`${comp.name}\` (Category: ${comp.category} | Target: \`${comp.targetFilename}\` | Accuracy: ${comp.accuracyScore}% | Latency: ${comp.latencyMs}ms)`,
      };
    }

    if (p.includes("llama") || p.includes("meta ai") || p.includes("open weights")) {
      const comp = GLOBAL_AI_COMPONENTS.find((c) => c.id === "comp-meta-llama3") || GLOBAL_AI_COMPONENTS[0];
      return {
        component: comp,
        confidenceScore: 99.1,
        reasoning: "Prompt requirement routed to Meta Llama 3.3 70B open weights model.",
        routingTag: `⚡ **Auto-Routed AI Component:** \`${comp.name}\` (Category: ${comp.category} | Target: \`${comp.targetFilename}\` | Accuracy: ${comp.accuracyScore}% | Latency: ${comp.latencyMs}ms)`,
      };
    }

    if (p.includes("mistral") || p.includes("codestral") || p.includes("france") || p.includes("eu ai")) {
      const comp = GLOBAL_AI_COMPONENTS.find((c) => c.id === "comp-mistral-large") || GLOBAL_AI_COMPONENTS[0];
      return {
        component: comp,
        confidenceScore: 99.2,
        reasoning: "Prompt requirement routed to Mistral Large 2 & Codestral European AI engine.",
        routingTag: `⚡ **Auto-Routed AI Component:** \`${comp.name}\` (Category: ${comp.category} | Target: \`${comp.targetFilename}\` | Accuracy: ${comp.accuracyScore}% | Latency: ${comp.latencyMs}ms)`,
      };
    }

    if (p.includes("qwen") || p.includes("alibaba") || p.includes("coder 32b")) {
      const comp = GLOBAL_AI_COMPONENTS.find((c) => c.id === "comp-qwen25-max") || GLOBAL_AI_COMPONENTS[0];
      return {
        component: comp,
        confidenceScore: 99.3,
        reasoning: "Prompt requirement routed to Alibaba Qwen 2.5 Max coding engine.",
        routingTag: `⚡ **Auto-Routed AI Component:** \`${comp.name}\` (Category: ${comp.category} | Target: \`${comp.targetFilename}\` | Accuracy: ${comp.accuracyScore}% | Latency: ${comp.latencyMs}ms)`,
      };
    }

    if (p.includes("perplexity") || p.includes("sonar") || p.includes("search grounding")) {
      const comp = GLOBAL_AI_COMPONENTS.find((c) => c.id === "comp-perplexity-sonar") || GLOBAL_AI_COMPONENTS[0];
      return {
        component: comp,
        confidenceScore: 99.4,
        reasoning: "Prompt requirement routed to Perplexity Sonar search engine.",
        routingTag: `⚡ **Auto-Routed AI Component:** \`${comp.name}\` (Category: ${comp.category} | Target: \`${comp.targetFilename}\` | Accuracy: ${comp.accuracyScore}% | Latency: ${comp.latencyMs}ms)`,
      };
    }

    
    // 0. Figma AI
    if (p.includes("engine 01") || p.includes("engine 01")) {
      const comp = GLOBAL_AI_COMPONENTS.find((c) => c.id === "comp-engine-01") || GLOBAL_AI_COMPONENTS[0];
      return {
        component: comp,
        confidenceScore: 99.9,
        reasoning: "Prompt requirement routed to Engine 01 (Web & Real-Time Intelligence).",
        routingTag: `⚡ **Auto-Routed AI Component:** \`${comp.name}\` (Category: ${comp.category} | Target: \`${comp.targetFilename}\` | Accuracy: ${comp.accuracyScore}% | Latency: ${comp.latencyMs}ms)`,
      };
    }
    if (p.includes("engine 02") || p.includes("engine 02")) {
      const comp = GLOBAL_AI_COMPONENTS.find((c) => c.id === "comp-engine-02") || GLOBAL_AI_COMPONENTS[0];
      return {
        component: comp,
        confidenceScore: 99.9,
        reasoning: "Prompt requirement routed to Engine 02 (Deep Reasoning & Symbolic Logic).",
        routingTag: `⚡ **Auto-Routed AI Component:** \`${comp.name}\` (Category: ${comp.category} | Target: \`${comp.targetFilename}\` | Accuracy: ${comp.accuracyScore}% | Latency: ${comp.latencyMs}ms)`,
      };
    }
    if (p.includes("engine 03") || p.includes("engine 03")) {
      const comp = GLOBAL_AI_COMPONENTS.find((c) => c.id === "comp-engine-03") || GLOBAL_AI_COMPONENTS[0];
      return {
        component: comp,
        confidenceScore: 99.9,
        reasoning: "Prompt requirement routed to Engine 03 (Code & Systems Engineering).",
        routingTag: `⚡ **Auto-Routed AI Component:** \`${comp.name}\` (Category: ${comp.category} | Target: \`${comp.targetFilename}\` | Accuracy: ${comp.accuracyScore}% | Latency: ${comp.latencyMs}ms)`,
      };
    }
    if (p.includes("engine 04") || p.includes("engine 04")) {
      const comp = GLOBAL_AI_COMPONENTS.find((c) => c.id === "comp-engine-04") || GLOBAL_AI_COMPONENTS[0];
      return {
        component: comp,
        confidenceScore: 99.9,
        reasoning: "Prompt requirement routed to Engine 04 (Mathematical & Computational).",
        routingTag: `⚡ **Auto-Routed AI Component:** \`${comp.name}\` (Category: ${comp.category} | Target: \`${comp.targetFilename}\` | Accuracy: ${comp.accuracyScore}% | Latency: ${comp.latencyMs}ms)`,
      };
    }
    if (p.includes("engine 05") || p.includes("engine 05")) {
      const comp = GLOBAL_AI_COMPONENTS.find((c) => c.id === "comp-engine-05") || GLOBAL_AI_COMPONENTS[0];
      return {
        component: comp,
        confidenceScore: 99.9,
        reasoning: "Prompt requirement routed to Engine 05 (Multimodal & Computer Vision).",
        routingTag: `⚡ **Auto-Routed AI Component:** \`${comp.name}\` (Category: ${comp.category} | Target: \`${comp.targetFilename}\` | Accuracy: ${comp.accuracyScore}% | Latency: ${comp.latencyMs}ms)`,
      };
    }
    if (p.includes("engine 06") || p.includes("engine 06")) {
      const comp = GLOBAL_AI_COMPONENTS.find((c) => c.id === "comp-engine-06") || GLOBAL_AI_COMPONENTS[0];
      return {
        component: comp,
        confidenceScore: 99.9,
        reasoning: "Prompt requirement routed to Engine 06 (Scientific & Medical).",
        routingTag: `⚡ **Auto-Routed AI Component:** \`${comp.name}\` (Category: ${comp.category} | Target: \`${comp.targetFilename}\` | Accuracy: ${comp.accuracyScore}% | Latency: ${comp.latencyMs}ms)`,
      };
    }
    if (p.includes("engine 07") || p.includes("engine 07")) {
      const comp = GLOBAL_AI_COMPONENTS.find((c) => c.id === "comp-engine-07") || GLOBAL_AI_COMPONENTS[0];
      return {
        component: comp,
        confidenceScore: 99.9,
        reasoning: "Prompt requirement routed to Engine 07 (Financial & Economic Modeling).",
        routingTag: `⚡ **Auto-Routed AI Component:** \`${comp.name}\` (Category: ${comp.category} | Target: \`${comp.targetFilename}\` | Accuracy: ${comp.accuracyScore}% | Latency: ${comp.latencyMs}ms)`,
      };
    }
    if (p.includes("engine 08") || p.includes("engine 08")) {
      const comp = GLOBAL_AI_COMPONENTS.find((c) => c.id === "comp-engine-08") || GLOBAL_AI_COMPONENTS[0];
      return {
        component: comp,
        confidenceScore: 99.9,
        reasoning: "Prompt requirement routed to Engine 08 (Language, Translation & Linguistics).",
        routingTag: `⚡ **Auto-Routed AI Component:** \`${comp.name}\` (Category: ${comp.category} | Target: \`${comp.targetFilename}\` | Accuracy: ${comp.accuracyScore}% | Latency: ${comp.latencyMs}ms)`,
      };
    }
    if (p.includes("engine 09") || p.includes("engine 09")) {
      const comp = GLOBAL_AI_COMPONENTS.find((c) => c.id === "comp-engine-09") || GLOBAL_AI_COMPONENTS[0];
      return {
        component: comp,
        confidenceScore: 99.9,
        reasoning: "Prompt requirement routed to Engine 09 (Creative & Narrative Synthesis).",
        routingTag: `⚡ **Auto-Routed AI Component:** \`${comp.name}\` (Category: ${comp.category} | Target: \`${comp.targetFilename}\` | Accuracy: ${comp.accuracyScore}% | Latency: ${comp.latencyMs}ms)`,
      };
    }
    if (p.includes("engine 10") || p.includes("engine 10")) {
      const comp = GLOBAL_AI_COMPONENTS.find((c) => c.id === "comp-engine-10") || GLOBAL_AI_COMPONENTS[0];
      return {
        component: comp,
        confidenceScore: 99.9,
        reasoning: "Prompt requirement routed to Engine 10 (System Operations & Shell).",
        routingTag: `⚡ **Auto-Routed AI Component:** \`${comp.name}\` (Category: ${comp.category} | Target: \`${comp.targetFilename}\` | Accuracy: ${comp.accuracyScore}% | Latency: ${comp.latencyMs}ms)`,
      };
    }
    if (p.includes("engine 11") || p.includes("engine 11")) {
      const comp = GLOBAL_AI_COMPONENTS.find((c) => c.id === "comp-engine-11") || GLOBAL_AI_COMPONENTS[0];
      return {
        component: comp,
        confidenceScore: 99.9,
        reasoning: "Prompt requirement routed to Engine 11 (Safety, Verification & Bias Audit).",
        routingTag: `⚡ **Auto-Routed AI Component:** \`${comp.name}\` (Category: ${comp.category} | Target: \`${comp.targetFilename}\` | Accuracy: ${comp.accuracyScore}% | Latency: ${comp.latencyMs}ms)`,
      };
    }

    if (p.includes("figma") || p.includes("design system") || p.includes("wireframe") || p.includes("auto-layout") || p.includes("design token")) {
      const comp = GLOBAL_AI_COMPONENTS.find((c) => c.id === "comp-figma-ai") || GLOBAL_AI_COMPONENTS[0];
      return {
        component: comp,
        confidenceScore: 99.5,
        reasoning: "Prompt requirement requested Figma AI UI component generation or design system sync.",
        routingTag: `⚡ **Auto-Routed AI Component:** \`${comp.name}\` (Category: ${comp.category} | Target: \`${comp.targetFilename}\` | Accuracy: ${comp.accuracyScore}% | Latency: ${comp.latencyMs}ms)`,
      };
    }

    if (p.includes("grok") || p.includes("xai") || p.includes("twitter") || p.includes("unfiltered")) {
      const comp = GLOBAL_AI_COMPONENTS.find((c) => c.id === "comp-xai-grok") || GLOBAL_AI_COMPONENTS[0];
      return {
        component: comp,
        confidenceScore: 99.7,
        reasoning: "Prompt requirement routed to xAI Grok for real-time synthesis.",
        routingTag: `⚡ **Auto-Routed AI Component:** \`${comp.name}\` (Category: ${comp.category} | Target: \`${comp.targetFilename}\` | Accuracy: ${comp.accuracyScore}% | Latency: ${comp.latencyMs}ms)`,
      };
    }
    if (p.includes("groq") || p.includes("lpu") || p.includes("tokens/sec")) {
      const comp = GLOBAL_AI_COMPONENTS.find((c) => c.id === "comp-groq-lpu") || GLOBAL_AI_COMPONENTS[0];
      return {
        component: comp,
        confidenceScore: 99.8,
        reasoning: "Prompt requirement routed to Groq LPU hardware acceleration engine.",
        routingTag: `⚡ **Auto-Routed AI Component:** \`${comp.name}\` (Category: ${comp.category} | Target: \`${comp.targetFilename}\` | Accuracy: ${comp.accuracyScore}% | Latency: ${comp.latencyMs}ms)`,
      };
    }

    // 1. AST Refactoring Transformer
    if (
      p.includes("refactor") ||
      p.includes("modernize") ||
      p.includes("clean code") ||
      p.includes("es6") ||
      p.includes("arrow function") ||
      p.includes("const let") ||
      p.includes("optimize syntax")
    ) {
      const comp = GLOBAL_AI_COMPONENTS.find((c) => c.id === "comp-ast-refactor") || GLOBAL_AI_COMPONENTS[1];
      return {
        component: comp,
        confidenceScore: 99.2,
        reasoning: `Prompt requirement detected code optimization and ES6 AST modernization keywords for '${activeFile?.name || "workspace"}'.`,
        routingTag: `⚡ **Auto-Routed AI Component:** \`${comp.name}\` (Category: ${comp.category} | Target: \`${comp.targetFilename}\` | Accuracy: ${comp.accuracyScore}% | Latency: ${comp.latencyMs}ms)`,
      };
    }

    // 2. LSP Diagnostics & Security Core
    if (
      p.includes("security") ||
      p.includes("owasp") ||
      p.includes("audit") ||
      p.includes("vulnerability") ||
      p.includes("scan") ||
      p.includes("complexity") ||
      p.includes("big-o") ||
      p.includes("big o") ||
      p.includes("lsp") ||
      p.includes("diagnostic") ||
      p.includes("leak")
    ) {
      const comp = GLOBAL_AI_COMPONENTS.find((c) => c.id === "comp-lsp-diagnostics") || GLOBAL_AI_COMPONENTS[2];
      return {
        component: comp,
        confidenceScore: 99.8,
        reasoning: "Prompt requirement matched security auditing, OWASP vulnerability scanning, and line-by-line LSP analysis.",
        routingTag: `⚡ **Auto-Routed AI Component:** \`${comp.name}\` (Category: ${comp.category} | Target: \`${comp.targetFilename}\` | Accuracy: ${comp.accuracyScore}% | Latency: ${comp.latencyMs}ms)`,
      };
    }

    // 3. Swarm Multi-Agent Orchestrator
    if (
      p.includes("swarm") ||
      p.includes("multi-agent") ||
      p.includes("multi agent") ||
      p.includes("consensus") ||
      p.includes("planner") ||
      p.includes("auditor") ||
      p.includes("parallel agent") ||
      p.includes("team of agents")
    ) {
      const comp = GLOBAL_AI_COMPONENTS.find((c) => c.id === "comp-swarm-orchestrator") || GLOBAL_AI_COMPONENTS[3];
      return {
        component: comp,
        confidenceScore: 99.4,
        reasoning: "Prompt requirement requested parallel multi-agent execution across Architect, Synthesizer, Auditor, and QA Tester nodes.",
        routingTag: `⚡ **Auto-Routed AI Component:** \`${comp.name}\` (Category: ${comp.category} | Target: \`${comp.targetFilename}\` | Accuracy: ${comp.accuracyScore}% | Latency: ${comp.latencyMs}ms)`,
      };
    }

    // 4. Automated Unit Test Generator
    if (
      p.includes("unit test") ||
      p.includes("test suite") ||
      p.includes("vitest") ||
      p.includes("jest") ||
      p.includes("edge case") ||
      p.includes("assertion") ||
      p.includes("coverage") ||
      p.includes("generate test")
    ) {
      const comp = GLOBAL_AI_COMPONENTS.find((c) => c.id === "comp-unit-test-gen") || GLOBAL_AI_COMPONENTS[4];
      return {
        component: comp,
        confidenceScore: 98.9,
        reasoning: "Prompt requirement identified unit test suite generation and edge-case boundary assertion synthesis.",
        routingTag: `⚡ **Auto-Routed AI Component:** \`${comp.name}\` (Category: ${comp.category} | Target: \`${comp.targetFilename}\` | Accuracy: ${comp.accuracyScore}% | Latency: ${comp.latencyMs}ms)`,
      };
    }

    // 5. Self-Repairing UI Generator
    if (
      p.includes("repair ui") ||
      p.includes("ui repair") ||
      p.includes("layout collision") ||
      p.includes("css overflow") ||
      p.includes("truncate") ||
      p.includes("wcag") ||
      p.includes("accessibility") ||
      p.includes("responsive fix") ||
      p.includes("flexbox") ||
      p.includes("grid layout")
    ) {
      const comp = GLOBAL_AI_COMPONENTS.find((c) => c.id === "comp-self-repairing-ui") || GLOBAL_AI_COMPONENTS[5];
      return {
        component: comp,
        confidenceScore: 99.7,
        reasoning: "Prompt requirement requested adaptive UI layout auto-healing, DOM collision containment, and WCAG AA compliance.",
        routingTag: `⚡ **Auto-Routed AI Component:** \`${comp.name}\` (Category: ${comp.category} | Target: \`${comp.targetFilename}\` | Accuracy: ${comp.accuracyScore}% | Latency: ${comp.latencyMs}ms)`,
      };
    }

    // 6. Sandbox Container Engine
    if (
      p.includes("sandbox") ||
      p.includes("container") ||
      p.includes("docker") ||
      p.includes("cloud run") ||
      p.includes("runtime status") ||
      p.includes("memory usage") ||
      p.includes("uptime") ||
      p.includes("port 3000") ||
      p.includes("express server")
    ) {
      const comp = GLOBAL_AI_COMPONENTS.find((c) => c.id === "comp-container-sandbox") || GLOBAL_AI_COMPONENTS[6];
      return {
        component: comp,
        confidenceScore: 100.0,
        reasoning: "Prompt requirement queried isolated Cloud Run / Docker sandbox process container telemetry and port 3000 routes.",
        routingTag: `⚡ **Auto-Routed AI Component:** \`${comp.name}\` (Category: ${comp.category} | Target: \`${comp.targetFilename}\` | Accuracy: ${comp.accuracyScore}% | Latency: ${comp.latencyMs}ms)`,
      };
    }

    // 7. Vector Graphics AI Studio
    if (
      p.includes("svg") ||
      p.includes("vector") ||
      p.includes("ring") ||
      p.includes("rose gold") ||
      p.includes("blueprint") ||
      p.includes("diagram") ||
      p.includes("canvas rendering")
    ) {
      const comp = GLOBAL_AI_COMPONENTS.find((c) => c.id === "comp-vector-graphics") || GLOBAL_AI_COMPONENTS[7];
      return {
        component: comp,
        confidenceScore: 99.5,
        reasoning: "Prompt requirement requested standalone SVG visual vector draft rendering for live canvas preview.",
        routingTag: `⚡ **Auto-Routed AI Component:** \`${comp.name}\` (Category: ${comp.category} | Target: \`${comp.targetFilename}\` | Accuracy: ${comp.accuracyScore}% | Latency: ${comp.latencyMs}ms)`,
      };
    }

    // 8. Universal Brain Chat Engine
    if (
      p.includes("chat") ||
      p.includes("dialogue") ||
      p.includes("conversation") ||
      p.includes("multimodal") ||
      p.includes("stream")
    ) {
      const comp = GLOBAL_AI_COMPONENTS.find((c) => c.id === "comp-brain-chat") || GLOBAL_AI_COMPONENTS[1];
      return {
        component: comp,
        confidenceScore: 98.6,
        reasoning: "Prompt requirement requested multi-turn conversational dialogue and context-aware workspace explanation.",
        routingTag: `⚡ **Auto-Routed AI Component:** \`${comp.name}\` (Category: ${comp.category} | Target: \`${comp.targetFilename}\` | Accuracy: ${comp.accuracyScore}% | Latency: ${comp.latencyMs}ms)`,
      };
    }

    // 9. Default: Google AI Studio Core Brain Engine
    const coreComp = GLOBAL_AI_COMPONENTS.find((c) => c.id === "comp-core-brain") || GLOBAL_AI_COMPONENTS[0];
    return {
      component: coreComp,
      confidenceScore: 99.9,
      reasoning: "Defaulted to Google AI Studio Core Brain for full-stack code synthesis, architecture reasoning, and Gemini 3.6 Flash execution.",
      routingTag: `⚡ **Auto-Routed AI Component:** \`${coreBrainName(coreComp)}\` (Category: ${coreComp.category} | Target: \`${coreComp.targetFilename}\` | Accuracy: ${coreComp.accuracyScore}% | Latency: ${coreComp.latencyMs}ms)`,
    };
  }
}

function coreBrainName(comp: GlobalAiComponent) {
  return comp.name || "Google AI Studio Core Brain";
}
