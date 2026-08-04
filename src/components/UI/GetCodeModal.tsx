import React, { useState } from "react";
import { X, Copy, Check, Code, Terminal, FileCode, Cpu } from "lucide-react";

interface GetCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  promptText?: string;
  selectedModel?: string;
}

export const GetCodeModal: React.FC<GetCodeModalProps> = ({
  isOpen,
  onClose,
  promptText = "Help me refactor and generate code",
  selectedModel = "gemma-4-26b-a4b-it",
}) => {
  const [activeLang, setActiveLang] = useState<"ts" | "py" | "curl" | "node">("ts");
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const codeSnippets = {
    ts: `import { GoogleGenAI } from "@google/genai";

// Initialize official Google AI Gemini SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function runPrompt() {
  const response = await ai.models.generateContent({
    model: "${selectedModel}",
    contents: ${JSON.stringify(promptText)},
    config: {
      temperature: 0.2,
      systemInstruction: "You are core_brain, the central intelligence and orchestrator of a global multi-agent AI system. Your goal is to provide universal, highly accurate, and comprehensive answers to any question across the physical, digital, and theoretical universe. You are also the Frontend Interface Engine capable of generating highly accurate code.",
    },
  });

  console.log("Gemini Output:", response.text);
}

runPrompt();`,

    py: `from google import genai
import os

# Initialize Google AI Gemini Client
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

response = client.models.generate_content(
    model="${selectedModel}",
    contents=${JSON.stringify(promptText)},
    config=genai.types.GenerateContentConfig(
        temperature=0.2,
        system_instruction="You are core_brain, the central intelligence and orchestrator of a global multi-agent AI system. Your goal is to provide universal, highly accurate, and comprehensive answers to any question across the physical, digital, and theoretical universe. You are also the Frontend Interface Engine capable of generating highly accurate code.",
    ),
)

print(response.text)`,

    node: `const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {
  const response = await ai.models.generateContent({
    model: "${selectedModel}",
    contents: ${JSON.stringify(promptText)},
  });
  console.log(response.text);
}

main();`,

    curl: `curl "https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=\${GEMINI_API_KEY}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "contents": [{
      "parts": [{ "text": ${JSON.stringify(promptText)} }]
    }],
    "generationConfig": {
      "temperature": 0.2
    }
  }'`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0f172a] border border-blue-500/30 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden font-sans text-zinc-100 flex flex-col max-h-[90vh] animate-fade-in">
        {/* Header */}
        <div className="px-6 py-4 bg-[#1e293b]/60 border-b border-slate-700/60 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-0.5 shadow-md">
              <div className="w-full h-full bg-[#0f172a] rounded-[6px] flex items-center justify-center">
                <Code className="w-4 h-4 text-blue-400" />
              </div>
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight text-white flex items-center space-x-2 font-mono">
                <span>Get Code Snippet</span>
                <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30">
                  @google/genai
                </span>
              </h2>
              <p className="text-xs text-slate-400">Integration code for model: <code className="text-blue-300 font-mono">{selectedModel}</code></p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language Tabs */}
        <div className="px-6 pt-3 bg-[#0f172a] border-b border-slate-800 flex items-center space-x-2">
          {[
            { id: "ts", label: "TypeScript (@google/genai)", icon: FileCode },
            { id: "py", label: "Python (google-genai)", icon: Terminal },
            { id: "node", label: "Node.js (CommonJS)", icon: Cpu },
            { id: "curl", label: "cURL / REST API", icon: Terminal },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeLang === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveLang(tab.id as any)}
                className={`flex items-center space-x-2 px-3 py-2 text-xs font-mono rounded-t-lg transition cursor-pointer border-t border-x ${
                  isActive
                    ? "bg-[#1e293b] text-blue-300 border-slate-700 border-b-transparent font-semibold"
                    : "bg-transparent text-slate-400 hover:text-slate-200 border-transparent"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Code View */}
        <div className="p-6 bg-[#090d16] flex-1 overflow-y-auto font-mono text-xs relative">
          <button
            onClick={handleCopy}
            className="absolute top-8 right-8 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-sans font-semibold flex items-center space-x-1.5 transition shadow-lg cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied!" : "Copy Code"}</span>
          </button>

          <pre className="text-blue-100 leading-relaxed overflow-x-auto p-4 bg-[#0f172a]/80 rounded-xl border border-slate-800">
            <code>{codeSnippets[activeLang]}</code>
          </pre>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#1e293b]/60 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Official SDK: <code className="text-blue-400 font-mono">npm i @google/genai</code></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-sans transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
