const fs = require('fs');
let code = fs.readFileSync('src/components/Panels/BrainChatPanel.tsx', 'utf8');

// Interface update
code = code.replace("thinkingSteps?: {step: string}[];", "thinkingSteps?: {step: string}[];\n  streamingText?: string;");

// Component props update
code = code.replace("thinkingSteps,", "thinkingSteps,\n  streamingText,");

// Find `isAiProcessing && (` and replace the content. Wait, let's grep for `isAiProcessing &&`
const lines = code.split('\\n');
let replaced = false;

// We will inject the streaming text right above the AI is processing indicator
const streamBubble = `
          {streamingText && streamingText.length > 0 && (
            <div className="flex justify-start opacity-90 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="w-8 h-8 rounded-full bg-panel-bg flex items-center justify-center text-accent-color mr-3 flex-shrink-0 shadow-sm border border-border-color">
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex flex-col items-start max-w-[85%]">
                <div className="bg-panel-bg text-text-main px-4 py-3 rounded-2xl rounded-tl-sm text-sm border border-border-color shadow-sm w-full group relative overflow-hidden">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-[#09090b] prose-pre:border prose-pre:border-border-color/50 markdown-body">
                    {streamingText}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          )}
`;

code = code.replace('{isAiProcessing && (', streamBubble + '{isAiProcessing && !streamingText && (');

fs.writeFileSync('src/components/Panels/BrainChatPanel.tsx', code);
console.log("Patched BrainChatPanel stream");
