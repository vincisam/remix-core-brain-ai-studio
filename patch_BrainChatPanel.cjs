const fs = require('fs');
let code = fs.readFileSync('src/components/Panels/BrainChatPanel.tsx', 'utf8');

// Interface update
code = code.replace("interface BrainChatPanelProps {", "interface BrainChatPanelProps {\n  thinkingSteps?: {step: string}[];");

// Component props update
code = code.replace("export const BrainChatPanel: React.FC<BrainChatPanelProps> = ({", "export const BrainChatPanel: React.FC<BrainChatPanelProps> = ({\n  thinkingSteps,");

// Find chat Area and inject thinking state
const uiElement = `
      {/* Thinking State */}
      {thinkingSteps && thinkingSteps.length > 0 && (
        <div className="w-full max-w-3xl mx-auto flex flex-col space-y-2 mt-4 mb-2 px-4">
          <div className="flex items-center space-x-2 text-xs font-medium text-text-muted/80">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>AI Brain is thinking...</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {thinkingSteps.map((s, i) => (
              <div key={i} className="flex items-center space-x-1.5 bg-panel-bg border border-border-color/50 px-2.5 py-1 rounded-full shadow-sm text-xs text-text-main opacity-80">
                <Check className="w-3 h-3 text-accent-color" />
                <span>{s.step}</span>
              </div>
            ))}
          </div>
        </div>
      )}
`;

// Insert after `{/* Chat Area */}` or before `<div className="flex-1 min-h-0 overflow-y-auto px-4 pb-6 scrollbar-thin">`
// Wait, the chat messages container is inside the scrollbar.
const insertionPoint = `          {messages.length <= 1 ? (`;
code = code.replace(insertionPoint, uiElement + "\n" + insertionPoint);

fs.writeFileSync('src/components/Panels/BrainChatPanel.tsx', code);
console.log("Patched BrainChatPanel.tsx successfully");
