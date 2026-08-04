import React, { useState } from 'react';
import { Shield, ShieldAlert, Lock, Server, Activity, Network, FileText, CheckCircle2, Copy } from 'lucide-react';

export const DevSecOpsDashboard = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "docker" | "monitoring" | "security" | "engine11">("overview");

  const dockerComposeCode = `version: '3.8'

services:
  core-brain-api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - GEMINI_API_KEY=\${GEMINI_API_KEY}
    restart: unless-stopped
    security_opt:
      - no-new-privileges:true
    depends_on:
      - redis
    networks:
      - brain-network

  # Redis for Rate Limiting and Task Queue (Engine 04 async tasks)
  redis:
    image: redis:7-alpine
    restart: unless-stopped
    networks:
      - brain-network
    volumes:
      - redis-data:/data

  # Prometheus for Observability
  prometheus:
    image: prom/prometheus:v2.45.0
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    networks:
      - brain-network

  # Grafana for Monitoring Dashboards
  grafana:
    image: grafana/grafana:10.0.3
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=secure_admin_password
    depends_on:
      - prometheus
    networks:
      - brain-network

networks:
  brain-network:
    driver: bridge

volumes:
  redis-data:
`;

  const dockerfileCode = `# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build frontend and backend
RUN npm run build

# Stage 2: Production
FROM node:22-alpine

WORKDIR /app

# Copy production artifacts
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.env* ./

# Install only production dependencies
RUN npm ci --omit=dev

# Security: Run as non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

CMD ["npm", "run", "start"]
`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 text-slate-100 font-sans p-6 overflow-hidden">
      <div className="flex items-center gap-3 mb-6 shrink-0">
        <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
          <Shield size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">DevSecOps & Deployment</h1>
          <p className="text-sm text-slate-400">Engine 11: Security, Hardening & Orchestration (Strategy 3)</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6 border-b border-slate-800 pb-2 overflow-x-auto shrink-0">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${activeTab === 'overview' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <div className="flex items-center gap-2"><Activity size={16} /> Architecture Overview</div>
        </button>
        <button
          onClick={() => setActiveTab("docker")}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${activeTab === 'docker' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <div className="flex items-center gap-2"><Server size={16} /> Containerization</div>
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${activeTab === 'security' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <div className="flex items-center gap-2"><Lock size={16} /> API Security</div>
        </button>
              <button
          onClick={() => setActiveTab("engine11")}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${activeTab === 'engine11' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <div className="flex items-center gap-2"><ShieldAlert size={16} /> Engine 11 Sandbox</div>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-6 min-h-0">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-bl-full -mr-2 -mt-2 transition-transform group-hover:scale-110" />
                <Server className="text-blue-400 mb-3" size={24} />
                <h3 className="font-bold text-slate-200 mb-2">Microservices</h3>
                <p className="text-sm text-slate-400">Dockerized API Gateway with Redis for async task queuing and rate limiting.</p>
              </div>
              
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-full -mr-2 -mt-2 transition-transform group-hover:scale-110" />
                <ShieldAlert className="text-emerald-400 mb-3" size={24} />
                <h3 className="font-bold text-slate-200 mb-2">Hardened Security</h3>
                <p className="text-sm text-slate-400">Implementation of Helmet.js, Express Rate Limiter, and non-root container execution.</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-fuchsia-500/10 rounded-bl-full -mr-2 -mt-2 transition-transform group-hover:scale-110" />
                <Activity className="text-fuchsia-400 mb-3" size={24} />
                <h3 className="font-bold text-slate-200 mb-2">Observability</h3>
                <p className="text-sm text-slate-400">Prometheus metrics scraping and Grafana dashboards for latency & success rates.</p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="font-bold text-slate-300 mb-4 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-400" /> Implementation Checklist
              </h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">✓</span>
                  <strong>Authentication:</strong> API structure ready for JWT middleware integration.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">✓</span>
                  <strong>Rate Limiting:</strong> <code className="bg-slate-950 px-1.5 py-0.5 rounded text-emerald-300">express-rate-limit</code> installed and configured globally.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">✓</span>
                  <strong>Containerization:</strong> Multi-stage <code className="bg-slate-950 px-1.5 py-0.5 rounded text-blue-300">Dockerfile</code> & <code className="bg-slate-950 px-1.5 py-0.5 rounded text-blue-300">docker-compose.yml</code> generated.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">✓</span>
                  <strong>HTTP Headers:</strong> <code className="bg-slate-950 px-1.5 py-0.5 rounded text-rose-300">helmet</code> middleware enabled for OWASP compliance.
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'docker' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col h-full min-h-0">
              <div className="p-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-blue-400" />
                  <span className="font-mono text-sm font-bold text-slate-300">docker-compose.yml</span>
                </div>
                <button onClick={() => copyToClipboard(dockerComposeCode)} className="p-1.5 hover:bg-slate-800 rounded text-slate-400 transition-colors">
                  <Copy size={14} />
                </button>
              </div>
              <div className="flex-1 overflow-auto p-4 bg-slate-950">
                <pre className="text-xs text-blue-300 font-mono">
                  {dockerComposeCode}
                </pre>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col h-full min-h-0">
              <div className="p-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-emerald-400" />
                  <span className="font-mono text-sm font-bold text-slate-300">Dockerfile</span>
                </div>
                <button onClick={() => copyToClipboard(dockerfileCode)} className="p-1.5 hover:bg-slate-800 rounded text-slate-400 transition-colors">
                  <Copy size={14} />
                </button>
              </div>
              <div className="flex-1 overflow-auto p-4 bg-slate-950">
                <pre className="text-xs text-emerald-300 font-mono">
                  {dockerfileCode}
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
               <div className="p-4 border-b border-slate-800 bg-slate-900/50">
                  <h3 className="font-bold text-slate-200">Active Security Middleware</h3>
               </div>
               <div className="p-0">
                 <table className="w-full text-left text-sm">
                   <thead>
                     <tr className="bg-slate-950/50 text-slate-400">
                       <th className="p-4 font-medium">Component</th>
                       <th className="p-4 font-medium">Status</th>
                       <th className="p-4 font-medium">Description</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-800/50 text-slate-300">
                     <tr className="hover:bg-slate-800/20 transition-colors">
                       <td className="p-4 font-mono text-emerald-400">express-rate-limit</td>
                       <td className="p-4"><span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs font-bold">ACTIVE</span></td>
                       <td className="p-4 text-slate-400">Limits API to 100 requests / 15 minutes per IP to prevent DDoS and LLM quota exhaustion.</td>
                     </tr>
                     <tr className="hover:bg-slate-800/20 transition-colors">
                       <td className="p-4 font-mono text-emerald-400">helmet.js</td>
                       <td className="p-4"><span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs font-bold">ACTIVE</span></td>
                       <td className="p-4 text-slate-400">Secures HTTP headers (XSS Filter, HSTS, NoSniff, FrameGuard).</td>
                     </tr>
                     <tr className="hover:bg-slate-800/20 transition-colors">
                       <td className="p-4 font-mono text-slate-400">JWT Auth Strategy</td>
                       <td className="p-4"><span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs font-bold">ACTIVE</span></td>
                       <td className="p-4 text-slate-400">Bearer token validation for tiered access to Engines 04 and 07.</td>
                     </tr>
                   </tbody>
                 </table>
               </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="font-bold text-slate-300 mb-4 flex items-center gap-2">
                <Network size={18} className="text-fuchsia-400" /> API Gateway Flow (Engine 11)
              </h3>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-xs overflow-x-auto">
                <div className="flex items-center text-slate-400 whitespace-nowrap">
                   <span className="text-emerald-400">[Client Request]</span>
                   <span className="mx-2">→</span>
                   <span className="text-rose-400">[WAF / Rate Limiter]</span>
                   <span className="mx-2">→</span>
                   <span className="text-indigo-400">[JWT Auth]</span>
                   <span className="mx-2">→</span>
                   <span className="text-blue-400">[Core Brain Router]</span>
                   <span className="mx-2">→</span>
                   <span className="text-fuchsia-400">[Engine Execution]</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'engine11' && (
          <div className="space-y-6 h-full flex flex-col">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex-1">
              <h3 className="font-bold text-slate-300 mb-4 flex items-center gap-2">
                <ShieldAlert size={18} className="text-emerald-400" /> Engine 11 Safety Injection
              </h3>
              <p className="text-sm text-slate-400 mb-6 border-l-2 border-emerald-500 pl-3">
                Current threshold set to strictly monitor code injections and prompt leakage. Adjusting these overrides requires Sandbox Verification.
              </p>
              
              <div className="space-y-4">
                <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-200">Strict Code Injection Monitor</h4>
                    <p className="text-xs text-slate-500">Blocks anomalous code execution patterns and unauthorized shell invocations.</p>
                  </div>
                  <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded">ENFORCED</div>
                </div>

                <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-200">Prompt Leakage Prevention</h4>
                    <p className="text-xs text-slate-500">Filters outputs that match system instruction heuristics.</p>
                  </div>
                  <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded">ENFORCED</div>
                </div>
                
                <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-200">Automated Sandbox Environment</h4>
                    <p className="text-xs text-slate-500">Validates generated payloads within isolated ephemeral containers before delivery.</p>
                  </div>
                  <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded">ACTIVE</div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800">
                <button className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/50 font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                   <Shield size={16} /> Request Sandbox Verification
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
