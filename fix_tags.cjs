const fs = require('fs');
let code = fs.readFileSync('src/components/Panels/BrainChatPanel.tsx', 'utf8');

const oldStr = `                  <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-[#09090b] prose-pre:border prose-pre:border-border-color/50 markdown-body"><ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {streamingText}
                  </ReactMarkdown>
                </div>
              </div>
            </div>`;

const newStr = `                  <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-[#09090b] prose-pre:border prose-pre:border-border-color/50 markdown-body"><ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {streamingText}
                  </ReactMarkdown></div>
                </div>
              </div>
            </div>`;

code = code.replace(oldStr, newStr);
fs.writeFileSync('src/components/Panels/BrainChatPanel.tsx', code);
