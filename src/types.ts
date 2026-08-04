/**
 * Types & Interfaces for Universal AI Code Editor
 */

export type UiTheme = "sleek" | "high-contrast" | "cyberpunk" | "light";

export type SupportedLanguage =
  | "typescript"
  | "javascript"
  | "python"
  | "go"
  | "rust"
  | "cpp"
  | "java"
  | "dockerfile"
  | "json"
  | "html"
  | "css"
  | "markdown"
  | "sql"
  | "shell";

export interface CodeFile {
  id: string;
  name: string;
  path: string;
  content: string;
  language: SupportedLanguage;
  isModified?: boolean;
  isReadOnly?: boolean;
}

export interface LSPDiagnostic {
  id: string;
  line: number;
  column?: number;
  severity: "error" | "warning" | "info" | "hint";
  message: string;
  rule?: string;
  quickFix?: string;
  sourceFile: string;
}

export interface LSPSymbol {
  name: string;
  kind: "function" | "class" | "interface" | "variable" | "type" | "method";
  line: number;
  signature: string;
  sourceFile: string;
}

export interface RefactorDiff {
  originalCode: string;
  refactoredCode: string;
  explanation: string;
  tags: string[];
  diffSummary: string[];
  filename: string;
}

export interface UnitTestItem {
  id: string;
  name: string;
  type: "positive" | "edge_case" | "error_handling";
  status: "idle" | "running" | "passed" | "failed";
  durationMs?: number;
  errorMessage?: string;
  expectedCoverage?: string;
}

export interface UnitTestSuite {
  filename: string;
  testCode: string;
  framework: string;
  testCases: UnitTestItem[];
  lastRunAt?: string;
  coveragePercentage?: number;
}

export interface EditorPlugin {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  enabled: boolean;
  eventTrigger: "onSave" | "onType" | "onCommand" | "manual";
  handlerCode: string;
  permissions: string[];
  builtIn?: boolean;
}

export interface AsyncTask {
  id: string;
  name: string;
  category: "lsp" | "refactor" | "test" | "container" | "security" | "plugin";
  status: "queued" | "running" | "completed" | "failed";
  progressPercentage: number;
  startTime: string;
  endTime?: string;
  logs: string[];
}

export interface ExplicableReport {
  architectureOverview: string;
  algorithmicComplexity: {
    timeComplexity: string;
    spaceComplexity: string;
    explanation: string;
  };
  dataPrivacyAudit: {
    localWorkflowBoundaries: string;
    networkDataExfiltrationRisk: string;
    sanitizationRecommendations: string[];
  };
  executionTrace: {
    step: number;
    component: string;
    behavior: string;
  }[];
}

export interface ContainerConfig {
  dockerfileName: string;
  baseImage: string;
  environmentVars: Record<string, string>;
  exposePort: number;
  buildStatus: "idle" | "building" | "success" | "failed";
  containerStatus: "stopped" | "running" | "restarting";
  imageSizeMb: number;
  resourceUsage: {
    cpuPercentage: number;
    memoryMb: number;
  };
  logs: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  pinned?: boolean;
  routedComponent?: GlobalAiComponent;
  suggestedAction?: {
    type: "apply_code" | "run_tests" | "open_diff" | "run_lsp";
    payload?: any;
  };
}

export interface UploadPolicyStatus {
  fileSizeOk: boolean;
  typeSupported: boolean;
  securityClean: boolean;
  policyNotes: string[];
}

export interface UploadedMediaAsset {
  id: string;
  name: string;
  relativePath?: string;
  sizeBytes: number;
  type: "image" | "video" | "audio" | "code" | "document" | "archive" | "other";
  mimeType: string;
  previewUrl?: string;
  textContent?: string;
  uploadedAt: string;
  policyStatus: UploadPolicyStatus;
}

export interface GlobalAiComponent {
  id: string;
  name: string;
  category: "LLM Orchestration" | "AST Transformation" | "LSP Diagnostics" | "Swarm Intelligence" | "UI Generation" | "Container Sandbox" | "Vector Synthesis" | "Edge & Ultra-Fast AI" | "Global Frontier LLM" | "Reasoning & Math AI" | "Open Source & Weights" | "Long-horizon Reasoning LLM" | "Image Generation" | "Video Generation" | "3D Model Generation";
  description: string;
  status: "active" | "optimizing" | "ready";
  latencyMs: number;
  accuracyScore: number;
  sourceCodeSnippet: string;
  targetFilename: string;
  globalNodesCount: number;
  capabilities: string[];
}

export interface SelfDevelopmentReport {
  timestamp: string;
  pinned?: boolean;
  systemIntegrityScore: number;
  activeAiComponentsCount: number;
  optimizationsApplied: string[];
  recommendations: string[];
}

export type AiModelMode =
  | "gemma-4-26b-a4b-it"
  | "gemini-3.1-pro-preview"
  | "gemini-3.1-flash-live-preview"
  | "deepseek-r1-reasoning"
  | "code-ultra-synthesizer"
  | "agent-swarm-orchestrator";

export interface SwarmAgent {
  id: string;
  name: string;
  role: string;
  status: "idle" | "working" | "completed" | "error";
  currentTask?: string;
  icon: string;
  logs: string[];
}

export interface ReasoningStep {
  stepNumber: number;
  title: string;
  reasoning: string;
  codeSnippet?: string;
  confidenceScore: number;
}


export interface ChatSession {
  id: string;
  title: string;
  timestamp: string;
  pinned?: boolean;
  messages: ChatMessage[];
}
