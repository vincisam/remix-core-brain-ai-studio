const fs = require('fs');
let code = fs.readFileSync('src/components/Panels/BrainChatPanel.tsx', 'utf8');

// Replace the invalid ReactMarkdown className
const badMd = '<ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-[#09090b] prose-pre:border prose-pre:border-border-color/50 markdown-body">';
const goodMd = '<div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-[#09090b] prose-pre:border prose-pre:border-border-color/50 markdown-body"><ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>';

code = code.replace(badMd, goodMd);
code = code.replace('</ReactMarkdown>\\n                </div>', '</ReactMarkdown></div>\\n                </div>'); // Close the div

// Actually the existing replacement in patch_BrainChatPanel_stream.cjs had:
// <ReactMarkdown ... className="...">
//   {streamingText}
// </ReactMarkdown>
// We need to replace it with <div>...</div>

const regex = /<ReactMarkdown remarkPlugins={\[remarkGfm\]} rehypePlugins={\[rehypeRaw\]} className="prose([^"]*)">([\s\S]*?)<\/ReactMarkdown>/g;
code = code.replace(regex, (match, p1, p2) => {
    return `<div className="prose${p1}"><ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>${p2}</ReactMarkdown></div>`;
});

fs.writeFileSync('src/components/Panels/BrainChatPanel.tsx', code);
