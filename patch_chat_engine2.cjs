const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboards/ChatEngineDashboard.tsx', 'utf-8');

const importRegex = /import React, \{ useState, useEffect, useRef \} from 'react';/;
const importReplacement = `import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';`;

const renderRegex = /\{msg\.content\.split\([\s\S]*?\}\)/m;

const renderReplacement = `<div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-[#09090b] prose-pre:border prose-pre:border-border-color/50 markdown-body">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>`;

if (content.match(renderRegex)) {
  if (content.match(importRegex) && !content.includes('react-markdown')) {
      content = content.replace(importRegex, importReplacement);
  }
  content = content.replace(renderRegex, renderReplacement);
  fs.writeFileSync('src/components/Dashboards/ChatEngineDashboard.tsx', content);
  console.log("Patched ChatEngineDashboard with ReactMarkdown");
} else {
  console.log("Could not find the render target code.");
}
