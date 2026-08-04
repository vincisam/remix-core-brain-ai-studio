import React, { useState } from "react";
import { Box, Play, Square, RefreshCw, Cpu, HardDrive, Terminal, FileText, Download, CheckCircle2 } from "lucide-react";
import { ContainerConfig } from "../../types";

interface ContainerPanelProps {
  containerConfig: ContainerConfig;
  onRestartContainer: () => void;
  onRebuildContainer: () => void;
  isAiProcessing: boolean;
}

export const ContainerPanel: React.FC<ContainerPanelProps> = ({
  containerConfig,
  onRestartContainer,
  onRebuildContainer,
  isAiProcessing,
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "dockerfile" | "logs">("overview");

  const exportDockerCompose = () => {
    const yaml = `version: '3.8'
services:
  universal-editor-app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "${containerConfig.exposePort}:${containerConfig.exposePort}"
    environment:
      - NODE_ENV=${containerConfig.environmentVars.NODE_ENV || "production"}
      - PORT=${containerConfig.exposePort}
    restart: always
`;
    const blob = new Blob([yaml], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "docker-compose.yml";
    a.click();
  };

  return (
    <div id="container-panel" className="flex-1 bg-slate-950 p-6 overflow-y-auto font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-sky-500/10 border border-sky-500/20 rounded-xl text-sky-400">
              <Box className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
                <span>Docker Sandbox System & Container Engine</span>
                <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-normal">
                  Status: {containerConfig.containerStatus.toUpperCase()}
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Self-contained, reproducible Linux container environment for isolated code execution and local workflow parity.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={exportDockerCompose}
              className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs px-3 py-2 rounded-lg font-mono transition"
            >
              <Download className="w-3.5 h-3.5 text-sky-400" />
              <span>Export docker-compose.yml</span>
            </button>
            <button
              onClick={onRestartContainer}
              disabled={isAiProcessing}
              className="flex items-center space-x-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs px-3.5 py-2 rounded-lg font-medium shadow transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isAiProcessing ? "animate-spin" : ""}`} />
              <span>Restart Sandbox</span>
            </button>
          </div>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="flex space-x-2 border-b border-slate-800 text-xs font-mono">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-2 border-b-2 font-medium transition ${
              activeTab === "overview"
                ? "border-sky-500 text-sky-400 bg-slate-900/50"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            Container Resources & Runtime
          </button>
          <button
            onClick={() => setActiveTab("dockerfile")}
            className={`px-3 py-2 border-b-2 font-medium transition ${
              activeTab === "dockerfile"
                ? "border-sky-500 text-sky-400 bg-slate-900/50"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            Dockerfile Multi-Stage Manifest
          </button>
          <button
            onClick={() => setActiveTab("logs")}
            className={`px-3 py-2 border-b-2 font-medium transition ${
              activeTab === "logs"
                ? "border-sky-500 text-sky-400 bg-slate-900/50"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            Container Build & Stdout Logs
          </button>
        </div>

        {/* Tab 1: Overview & Resource Gauges */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center space-x-3">
                <Cpu className="w-8 h-8 text-sky-400 shrink-0" />
                <div>
                  <div className="text-[11px] text-slate-400 uppercase font-mono">CPU Utilization</div>
                  <div className="text-lg font-bold text-slate-100 font-mono">
                    {containerConfig.resourceUsage.cpuPercentage}%
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center space-x-3">
                <HardDrive className="w-8 h-8 text-indigo-400 shrink-0" />
                <div>
                  <div className="text-[11px] text-slate-400 uppercase font-mono">RAM Memory Allocated</div>
                  <div className="text-lg font-bold text-slate-100 font-mono">
                    {containerConfig.resourceUsage.memoryMb} MB
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center space-x-3">
                <Box className="w-8 h-8 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-[11px] text-slate-400 uppercase font-mono">Image Layer Size</div>
                  <div className="text-lg font-bold text-slate-100 font-mono">
                    {containerConfig.imageSizeMb} MB ({containerConfig.baseImage})
                  </div>
                </div>
              </div>
            </div>

            {/* Container Environment Variables Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 shadow-md">
              <div className="text-xs font-semibold text-slate-200 font-mono flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-sky-400" />
                <span>Sandbox Environment Variables (Isolated Scope):</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs divide-y divide-slate-800/80 space-y-1">
                {Object.entries(containerConfig.environmentVars).map(([k, v]) => (
                  <div key={k} className="flex justify-between py-1.5 text-slate-300">
                    <span className="text-sky-400">{k}</span>
                    <span className="text-slate-400">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Dockerfile View */}
        {activeTab === "dockerfile" && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 shadow-md animate-fade-in">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-200 font-mono">
              <span className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-sky-400" />
                <span>{containerConfig.dockerfileName}</span>
              </span>
              <span className="text-slate-500 font-normal">Multi-stage Alpine Linux Container</span>
            </div>
            <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
              {`FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=${containerConfig.exposePort}
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE ${containerConfig.exposePort}
CMD ["node", "dist/server.cjs"]`}
            </pre>
          </div>
        )}

        {/* Tab 3: Container Logs */}
        {activeTab === "logs" && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 shadow-md animate-fade-in">
            <div className="text-xs font-mono font-semibold text-slate-200 flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Live Stdout Container Logs:</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5 max-h-80 overflow-y-auto">
              {containerConfig.logs.map((log, index) => (
                <div key={index} className="leading-relaxed">
                  <span className="text-slate-600 mr-2">[{index + 1}]</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
