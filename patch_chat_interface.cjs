const fs = require('fs');
let content = fs.readFileSync('src/components/Chat/ChatInterface.tsx', 'utf-8');

const importRegex = /import React, \{ useState, useEffect, useRef \} from 'react';/;
const importReplacement = `import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';`;

const renderRegex = /<div className="whitespace-pre-wrap text-sm md:text-base break-words">\{m\.content\}<\/div>/m;

const renderReplacement = `<div className="prose prose-invert prose-sm md:prose-base max-w-none prose-p:leading-relaxed prose-pre:bg-[#09090b] prose-pre:border prose-pre:border-border-color/50 markdown-body">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {m.content}
                  </ReactMarkdown>
                </div>`;

if (content.match(renderRegex)) {
  if (content.match(importRegex) && !content.includes('react-markdown')) {
      content = content.replace(importRegex, importReplacement);
  }
  content = content.replace(renderRegex, renderReplacement);
  fs.writeFileSync('src/components/Chat/ChatInterface.tsx', content);
  console.log("Patched ChatInterface with ReactMarkdown");
} else {
  console.log("Could not find the render target code.");
}
