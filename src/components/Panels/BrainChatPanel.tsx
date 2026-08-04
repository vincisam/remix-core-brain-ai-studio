import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {  Folder,  Send,  Mic,  MicOff,  Sparkles,  Check,  Copy,  Bot,  Paperclip,  ArrowRight,  ShieldCheck,  Zap,  FileText,  Code2,  Music,  Image as ImageIcon,  Video,  Download, Edit2, RefreshCw, Search, Save, ArrowUp, ArrowDown } from "lucide-react";
import { ChatMessage, CodeFile } from "../../types";
import { TypewriterMarkdown } from "../Chat/TypewriterMarkdown";
import { ChatInputForm } from "../Chat/ChatInputForm";
import { handleDownloadSvg, handleDownloadPng, handleDownloadJpg, handleDownloadMedia, handleDownloadPdf, handleSaveTxt } from "../Chat/chatUtils";

interface BrainChatPanelProps {
  thinkingSteps?: {step: string}[];
  streamingText?: string;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onApplyCodeToEditor: (code: string) => void,
  onUploadFiles?: (files: FileList | File[]) => void;
  activeFile: CodeFile;
  onOpenArtifact?: (id: string) => void;
  isAiProcessing: boolean;
  onRegenerate?: (msgId: string) => void;
  onEditMessage?: (msgId: string, newText: string) => void;
}

export const BrainChatPanel: React.FC<BrainChatPanelProps> = ({
  thinkingSteps,
  streamingText,
  messages,
  onSendMessage,
  onApplyCodeToEditor,
  onUploadFiles,
  activeFile,
  onOpenArtifact,
  isAiProcessing,
  onRegenerate,
  onEditMessage,
}) => {
  const [inputText, setInputText] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editMessageText, setEditMessageText] = useState("");
  const [selectedEngineId, setSelectedEngineId] = useState<string>("comp-core-brain");
  const [attachedFileNames, setAttachedFileNames] = useState<string[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      setShowScrollTop(scrollTop > 100);
      setShowScrollBottom(scrollHeight - scrollTop - clientHeight > 100);
    }
  };

  const scrollToTop = () => {
    chatContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAiProcessing]);

  const engines = [
    { id: "comp-core-brain", name: "CORE_BRAIN Universal Synthesis" },
    { id: "comp-anthropic-claude", name: "Claude 3.5 Sonnet" },
    { id: "comp-openai-gpt4o", name: "GPT-4o Omnimodel" },
    { id: "comp-meta-llama3", name: "Llama 3.3 70B" },
    { id: "comp-mistral-large", name: "Mistral Large 2" },
    { id: "comp-qwen25-max", name: "Qwen 2.5 Max" },
    { id: "comp-cohere-command", name: "Cohere Command R+" },
    { id: "comp-perplexity-sonar", name: "Perplexity Sonar Search" },
    { id: "comp-groq-lpu", name: "Groq LPU Acceleration" },
    { id: "comp-nano-banana", name: "Nano Banana Engine" },
  ];

  
  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isAiProcessing) return;

    const selectedEngine = engines.find((e) => e.id === selectedEngineId)?.name || "CORE_BRAIN";
    let textToSend = inputText.trim();
    if (selectedEngineId !== "comp-core-brain") {
      textToSend = `[Target Engine: ${selectedEngine}]
${textToSend}`;
    }
    if (attachedFileNames.length > 0) {
      textToSend += `
[Attached Files: ${attachedFileNames.join(", ")}]`;
    }

    onSendMessage(textToSend);
    setInputText("");
    setAttachedFileNames([]);
  };

  const extractCode = (content: string): { language: string; code: string } | null => {
    const match = content.match(/```(\w*)\n([\s\S]*?)```/);
    if (match) {
      return { language: match[1] || "typescript", code: match[2].trim() };
    }
    return null;
  };

  const quickPromptCards = [
    {
      icon: Code2,
      title: "Generate Web App",
      actionText: "Generate a web app about ",
    },
    {
      icon: Music,
      title: "Compose Ambient Track",
      actionText: "Compose an ambient track about ",
    },
    {
      icon: ImageIcon,
      title: "Design Logo Image",
      actionText: "Design a logo image for ",
    },
    {
      icon: Video,
      title: "Create Explainer Video",
      actionText: "Create an explainer video about ",
    },
  ];
return (
    <div className="w-full flex-1 min-h-0 bg-app-bg flex flex-col font-sans relative">
      
      {messages.length > 1 && (
        <div className="absolute top-4 right-6 z-20">
          <button
            onClick={() => handleDownloadPdf('chat-messages-container')}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-panel-bg hover:bg-card-bg border border-border-color/50 rounded-lg shadow-sm text-xs font-medium text-text-muted hover:text-text-main transition-colors"
            title="Download Session as PDF"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      )}
      {/* Chat Area */}
      <div 
        ref={chatContainerRef}
        onScroll={handleScroll}
        className="flex-1 min-h-0 overflow-y-auto px-4 pb-6 scrollbar-thin">
        <div id="chat-messages-container" className="w-full max-w-3xl mx-auto flex flex-col space-y-6 pt-12 flex-shrink-0">

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

          {messages.length <= 1 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-20 mt-10">
              <div className="w-16 h-16 rounded-full bg-accent-glow flex items-center justify-center text-accent-color mb-2 shadow-lg">
                <Bot className="w-8 h-8" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-xl">
                {quickPromptCards.map((card, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInputText(card.actionText);
                      setTimeout(() => document.querySelector('textarea')?.focus(), 0);
                    }}
                    disabled={isAiProcessing}
                    className="p-4 bg-card-bg hover:bg-border-color border border-border-color rounded-2xl text-left transition flex items-center space-x-3 cursor-pointer shadow-sm group"
                  >
                    <card.icon className="w-5 h-5 text-accent-color shrink-0 opacity-80 group-hover:opacity-100 transition" />
                    <span className="text-sm font-medium text-text-main opacity-90 group-hover:opacity-100 transition">{card.title}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg) => {
              const isUser = msg.role === "user";

              return (
                <div key={msg.id} className={`flex w-full ${isUser ? "justify-end" : "justify-start"} mb-4`}>
                  {!isUser && (
                    <div className="w-8 h-8 rounded-full bg-accent-color/10 border border-accent-color/20 flex items-center justify-center text-accent-color mr-4 shrink-0 mt-1">
                      <Bot className="w-5 h-5" />
                    </div>
                  )}
                  <div
                    id={`msg-${msg.id}`}
                    className={`max-w-[85%] rounded-2xl p-4 text-[15px] leading-relaxed shadow-sm relative group ${
                      isUser
                        ? "bg-accent-color text-white rounded-tr-sm"
                        : "bg-transparent text-text-main"
                    }`}
                  >
                    {isUser && editingMessageId !== msg.id && (
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
                        <button onClick={() => {
                          setEditingMessageId(msg.id);
                          setEditMessageText(msg.content);
                        }} className="p-1.5 bg-app-bg rounded-md text-text-muted hover:text-text-main border border-border-color shadow-sm">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                    <div className="prose prose-invert max-w-none text-[15px] leading-relaxed prose-pre:p-0 prose-pre:bg-transparent prose-p:my-2 prose-headings:mb-2 prose-headings:mt-4">
                      {isUser ? (
                        editingMessageId === msg.id ? (
                          <div className="flex flex-col space-y-2">
                            <textarea
                              value={editMessageText}
                              onChange={(e) => setEditMessageText(e.target.value)}
                              className="w-full bg-app-bg text-text-main p-2 rounded border border-border-color focus:border-accent-color outline-none min-h-[80px]"
                            />
                            <div className="flex justify-end space-x-2">
                              <button onClick={() => setEditingMessageId(null)} className="px-3 py-1.5 text-xs text-text-muted hover:text-text-main rounded transition">Cancel</button>
                              <button onClick={() => {
                                if (onEditMessage) onEditMessage(msg.id, editMessageText);
                                setEditingMessageId(null);
                              }} className="px-3 py-1.5 text-xs bg-accent-color text-white rounded hover:bg-accent-color/90 transition">Save & Submit</button>
                            </div>
                          </div>
                        ) : (
                          <div className="whitespace-pre-wrap">{msg.content}</div>
                        )
                      ) : (
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
                                const isAudio = (language === 'html' || language === 'xml') && codeString.trim().startsWith('<audio');
                                const isVideo = (language === 'html' || language === 'xml') && codeString.trim().startsWith('<video');
                                const isImage = (language === 'html' || language === 'xml') && codeString.trim().startsWith('<img');
                                const isMedia = isAudio || isVideo || isImage;
                                
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
                                            <button
                                              onClick={() => handleDownloadJpg(codeString)}
                                              className="flex items-center space-x-1.5 text-xs text-text-muted hover:text-text-main transition px-2 py-1 rounded cursor-pointer hover:bg-border-color"
                                            >
                                              <Download className="w-3.5 h-3.5" />
                                              <span>JPG</span>
                                            </button>
                                          </div>
                                        </div>
                                      )}
                                      {isMedia && (
                                        <div className="bg-panel-bg px-4 py-2 border-b border-border-color flex justify-between items-center">
                                          <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
                                            Media Asset
                                          </span>
                                          <div className="flex space-x-1">
                                            {isAudio && (
                                              <button
                                                onClick={() => handleDownloadMedia(codeString, 'audio', 'mp3')}
                                                className="flex items-center space-x-1.5 text-xs text-text-muted hover:text-text-main transition px-2 py-1 rounded cursor-pointer hover:bg-border-color"
                                              >
                                                <Download className="w-3.5 h-3.5" />
                                                <span>MP3</span>
                                              </button>
                                            )}
                                            {isVideo && (
                                              <button
                                                onClick={() => handleDownloadMedia(codeString, 'video', 'mp4')}
                                                className="flex items-center space-x-1.5 text-xs text-text-muted hover:text-text-main transition px-2 py-1 rounded cursor-pointer hover:bg-border-color"
                                              >
                                                <Download className="w-3.5 h-3.5" />
                                                <span>MP4</span>
                                              </button>
                                            )}
                                            {isImage && (
                                              <>
                                                <button
                                                  onClick={() => handleDownloadMedia(codeString, 'image', 'png')}
                                                  className="flex items-center space-x-1.5 text-xs text-text-muted hover:text-text-main transition px-2 py-1 rounded cursor-pointer hover:bg-border-color"
                                                >
                                                  <Download className="w-3.5 h-3.5" />
                                                  <span>PNG</span>
                                                </button>
                                                <button
                                                  onClick={() => handleDownloadMedia(codeString, 'image', 'jpg')}
                                                  className="flex items-center space-x-1.5 text-xs text-text-muted hover:text-text-main transition px-2 py-1 rounded cursor-pointer hover:bg-border-color"
                                                >
                                                  <Download className="w-3.5 h-3.5" />
                                                  <span>JPG</span>
                                                </button>
                                              </>
                                            )}
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
                                          onClick={() => handleCopy(msg.id + codeString.substring(0, 10), codeString)}
                                          className="flex items-center space-x-1.5 text-xs text-text-muted hover:text-text-main transition px-2 py-1 rounded cursor-pointer hover:bg-border-color"
                                        >
                                          {copiedId === (msg.id + codeString.substring(0, 10)) ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                          <span>{copiedId === (msg.id + codeString.substring(0, 10)) ? "Copied" : "Copy"}</span>
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
                          {msg.content || "Generating response..."}
                        </ReactMarkdown>
                      )}
                    </div>
                    <div className="mt-2 flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition" data-html2canvas-ignore="true">
                        <button
                          onClick={() => handleSaveTxt(msg.content, `message-${msg.id}.md`)}
                          className="flex items-center space-x-1.5 text-xs text-text-muted hover:text-text-main transition px-2 py-1 rounded cursor-pointer hover:bg-border-color"
                          title="Save as TXT/MD"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline-block">Save</span>
                        </button>
                        <button
                          onClick={() => handleDownloadPdf(`msg-${msg.id}`)}
                          className="flex items-center space-x-1.5 text-xs text-text-muted hover:text-text-main transition px-2 py-1 rounded cursor-pointer hover:bg-border-color"
                          title="Download as PDF"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline-block">Download</span>
                        </button>
                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className="flex items-center space-x-1.5 text-xs text-text-muted hover:text-text-main transition px-2 py-1 rounded cursor-pointer hover:bg-border-color"
                          title="Copy text"
                        >
                          {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span className="hidden sm:inline-block">{copiedId === msg.id ? "Copied" : "Copy"}</span>
                        </button>
                        {!isUser && onRegenerate && (
                          <button
                            onClick={() => onRegenerate(msg.id)}
                            className="flex items-center space-x-1.5 text-xs text-text-muted hover:text-text-main transition px-2 py-1 rounded cursor-pointer hover:bg-border-color"
                            title="Regenerate response"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline-block">Regenerate</span>
                          </button>
                        )}
                      </div>
                  </div>
                </div>
              );
            })
          )}
          
          {streamingText && streamingText.length > 0 && (
            <div className="flex justify-start opacity-90 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="w-8 h-8 rounded-full bg-panel-bg flex items-center justify-center text-accent-color mr-3 flex-shrink-0 shadow-sm border border-border-color">
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex flex-col items-start max-w-[85%]">
                <div className="bg-panel-bg text-text-main px-4 py-3 rounded-2xl rounded-tl-sm text-sm border border-border-color shadow-sm w-full group relative overflow-hidden">
                  <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-[#09090b] prose-pre:border prose-pre:border-border-color/50 markdown-body"><ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {streamingText}
                  </ReactMarkdown></div>
                </div>
              </div>
            </div>
          )}
{isAiProcessing && !streamingText && (
            <div className="flex items-center space-x-3 text-sm text-text-muted pl-4">
              <Sparkles className="w-4 h-4 animate-spin text-accent-color" />
              <span>CORE_BRAIN is thinking...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

            {/* Floating Scroll Buttons */}
      <div className="absolute right-4 bottom-32 flex flex-col space-y-2 z-20 transition-opacity">
        {showScrollTop && (
          <button 
            onClick={scrollToTop}
            className="p-2 bg-panel-bg border border-border-color/50 rounded-full shadow-lg text-text-muted hover:text-text-main hover:bg-card-bg transition-all"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
        {showScrollBottom && (
          <button 
            onClick={scrollToBottom}
            className="p-2 bg-panel-bg border border-border-color/50 rounded-full shadow-lg text-text-muted hover:text-text-main hover:bg-card-bg transition-all"
            title="Scroll to bottom"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Input Box Area (Fixed at bottom center) */}
      <div className="w-full flex flex-col items-center justify-center px-4 bg-app-bg pb-6 pt-2 shrink-0 border-t border-border-color/30 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)]">
        <ChatInputForm 
          inputText={inputText}
          setInputText={setInputText}
          handleSubmit={handleSubmit}
          isAiProcessing={isAiProcessing}
          attachedFileNames={attachedFileNames}
          setAttachedFileNames={setAttachedFileNames}
          onUploadFiles={onUploadFiles}
        />
      </div>
    </div>
  );
};