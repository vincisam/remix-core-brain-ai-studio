import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Check, Copy, ArrowRight, Download, Sparkles } from 'lucide-react';
import { handleDownloadSvg, handleDownloadPng } from './chatUtils';

export const TypewriterMarkdown = ({ 
  content, 
  onComplete,
  handleCopy,
  copiedId,
  msgId,
  onApplyCodeToEditor,
  onOpenArtifact,
}: {
  content: string, 
  onComplete?: () => void,
  handleCopy: (id: string, text: string) => void,
  copiedId: string | null,
  msgId: string,
  onApplyCodeToEditor: (code: string) => void;
  onOpenArtifact?: (id: string) => void;
}) => {
  const [displayedContent, setDisplayedContent] = React.useState(content);
  const [isTyping, setIsTyping] = React.useState(true);

  React.useEffect(() => {
    // Check if this is a newly added message
    const isNew = Date.now() - parseInt(msgId.replace('msg-', '')) < 2000;
    
    if (!isNew) {
      setDisplayedContent(content);
      setIsTyping(false);
      return;
    }

    let index = 0;
    setDisplayedContent("");
    
    const interval = setInterval(() => {
      setDisplayedContent((prev) => {
        const nextContent = content.substring(0, index + 3);
        index += 3;
        if (index >= content.length) {
          clearInterval(interval);
          setIsTyping(false);
          if (onComplete) onComplete();
          return content;
        }
        return nextContent;
      });
    }, 10);
    return () => clearInterval(interval);
  }, [content, msgId]);

  return (
    <ReactMarkdown 
      remarkPlugins={[remarkGfm]} 
      rehypePlugins={[rehypeRaw]}
      components={{
// @ts-ignore
        artifact({ node, id, ...props }: any) {
          if (id === "self-build") {
            return (
              <div className="mt-4 mb-2 p-4 border border-border-color rounded-2xl bg-card-bg shadow-sm cursor-pointer hover:border-emerald-500/50 transition group flex items-center justify-between" onClick={() => onOpenArtifact && onOpenArtifact("self-build")}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 group-hover:scale-105 transition-transform">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-zinc-100">All-Time Self-Build Daemon</div>
                    <div className="text-xs text-zinc-400">Click to view artifact</div>
                  </div>
                </div>
                <div className="px-3 py-1.5 bg-panel-bg rounded border border-border-color text-xs font-mono text-zinc-400 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition">
                  Open
                </div>
              </div>
            );
          }
          return null;
        },
        code({node, inline, className, children, ...props}: any) {
          const match = /language-(\w+)/.exec(className || '')
          const language = match ? match[1] : 'plaintext'
          const codeString = String(children).replace(/\n$/, '')
          
          if (!inline && match) {
            const isSvg = (language === 'xml' || language === 'html' || language === 'svg') && codeString.trim().startsWith('<svg');
            const isMedia = (language === 'html' || language === 'xml') && (codeString.trim().startsWith('<audio') || codeString.trim().startsWith('<video'));
            
            if (isSvg || isMedia) {
              return (
                <div className="mt-4 mb-4 border border-border-color rounded-xl overflow-hidden shadow-sm bg-app-bg not-prose flex flex-col">
                  {isSvg && (
                    <div className="bg-panel-bg px-4 py-2 border-b border-border-color flex justify-between items-center">
                      <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
                        Vector Graphic
                      </span>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleDownloadSvg(codeString)}
                          className="flex items-center space-x-1.5 text-xs text-text-muted hover:text-text-main transition px-2 py-1 rounded cursor-pointer hover:bg-border-color"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>SVG</span>
                        </button>
                        <button
                          onClick={() => handleDownloadPng(codeString)}
                          className="flex items-center space-x-1.5 text-xs text-text-muted hover:text-text-main transition px-2 py-1 rounded cursor-pointer hover:bg-border-color"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>PNG</span>
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="p-4 flex justify-center items-center">
                    <div dangerouslySetInnerHTML={{ __html: codeString }} className="w-full max-w-[500px]" />
                  </div>
                </div>
              );
            }
            return (
              <div className="mt-4 mb-4 border border-border-color rounded-xl overflow-hidden shadow-sm bg-card-bg not-prose">
                <div className="bg-panel-bg px-4 py-2 border-b border-border-color flex justify-between items-center">
                  <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
                    {language}
                  </span>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleCopy(msgId + codeString.substring(0, 10), codeString)}
                      className="flex items-center space-x-1.5 text-xs text-text-muted hover:text-text-main transition px-2 py-1 rounded cursor-pointer hover:bg-border-color"
                    >
                      {copiedId === (msgId + codeString.substring(0, 10)) ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === (msgId + codeString.substring(0, 10)) ? "Copied" : "Copy"}</span>
                    </button>
                    <button
                      onClick={() => onApplyCodeToEditor(codeString)}
                      className="flex items-center space-x-1.5 text-xs text-accent-color hover:bg-accent-glow px-2 py-1 rounded transition font-medium cursor-pointer"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                      <span>Apply Code</span>
                    </button>
                  </div>
                </div>
                <pre className="p-4 overflow-x-auto text-sm font-mono text-text-main leading-relaxed bg-card-bg m-0">
                  <code>{children}</code>
                </pre>
              </div>
            )
          }
          return (
            <code className="bg-panel-bg px-1.5 py-0.5 rounded text-sm text-accent-color border border-border-color/50 font-mono" {...props}>
              {children}
            </code>
          )
        }
      }}
    >
      {displayedContent}
    </ReactMarkdown>
  );
};
