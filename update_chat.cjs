const fs = require('fs');
const content = `import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Cpu, Code, Globe, ShieldCheck, Paperclip, Send, X, UploadCloud, File } from 'lucide-react';

export const ChatInterface = () => {
  const [messages, setMessages] = useState<any[]>([
    { role: "assistant", content: "System status: **Operational**.\\n\\nAll 11 specialized engines are online, synchronized, and awaiting instruction. \\n\\n**Ready for input.**" }
  ]);
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState([
    { id: 1, engine: 'core_brain', msg: 'System initialized and online.', type: 'info' }
  ]);
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, logs]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() && files.length === 0) return;
    
    // Add user message locally
    let userContent = input;
    if (files.length > 0) {
      userContent += "\\n\\n[Attached Files: " + files.map(f => f.name).join(", ") + "]";
    }
    
    const userMsg = { role: "user", content: userContent };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setFiles([]);
    
    const newLogId = Date.now();
    setLogs(prev => [...prev, { id: newLogId, engine: 'core_brain', msg: 'Analyzing intent...', type: 'info' }]);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg], model: "gemma-4-26b-a4b-it" })
      });
      
      if (!response.ok) { 
         setMessages(prev => [...prev, { role: "assistant", content: \`Error: \${response.statusText}\` }]);
         setLogs(prev => [...prev, { id: Date.now(), engine: 'core_brain', msg: \`Error: \${response.statusText}\`, type: 'error' }]);
         return;
      }
      
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      let aiResponseText = "";
      setMessages(prev => [...prev, { role: "assistant", content: "" }]);
      
      while (reader) {
         const { value, done } = await reader.read();
         if (done) break;
         
         const chunk = decoder.decode(value);
         const lines = chunk.split('\\n');
         for (const line of lines) {
             if (line.startsWith('data: ')) {
                 try {
                     const data = JSON.parse(line.slice(6));
                     if (data.step) {
                         setLogs(prev => [...prev, { id: Date.now() + Math.random(), engine: 'core_brain', msg: data.step, type: 'process' }]);
                     }
                     if (data.text) {
                         aiResponseText = data.text;
                         setMessages(prev => {
                             const updated = [...prev];
                             updated[updated.length - 1].content = aiResponseText;
                             return updated;
                         });
                     }
                 } catch(e) {}
             }
         }
      }
    } catch (e: any) {
        setMessages(prev => [...prev, { role: "assistant", content: \`Error: \${e.message}\` }]);
        setLogs(prev => [...prev, { id: Date.now(), engine: 'core_brain', msg: \`Error: \${e.message}\`, type: 'error' }]);
    }
  };

  return (
    <div className="flex-1 h-full min-h-0 bg-slate-950 text-slate-100 p-4 md:p-6 font-mono flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-4 mb-4 md:mb-6 shrink-0 gap-2">
        <h1 className="text-lg md:text-xl font-bold flex items-center gap-2">
          <Cpu className="text-blue-500" /> CORE_BRAIN OS v1.0
        </h1>
        <div className="flex flex-wrap gap-4 text-xs">
          <span className="flex items-center gap-1"><ShieldCheck className="text-emerald-500 w-4"/> System Stable</span>
          <span className="flex items-center gap-1"><Globe className="text-blue-500 w-4"/> Multi-Engine Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 flex-1 min-h-0">
        {/* Main Chat/Output Area */}
        <div 
          className={\`lg:col-span-8 bg-slate-900 rounded-xl border \${isDragging ? 'border-blue-500' : 'border-slate-800'} flex flex-col min-h-0 relative transition-colors duration-200\`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {isDragging && (
            <div className="absolute inset-0 bg-blue-500/10 backdrop-blur-sm z-20 flex flex-col items-center justify-center rounded-xl border-2 border-blue-500 border-dashed">
              <UploadCloud className="w-16 h-16 text-blue-400 mb-4" />
              <p className="text-blue-300 font-bold text-lg">Drop files here to upload</p>
            </div>
          )}

          <div className="p-3 md:p-4 border-b border-slate-800 text-xs md:text-sm text-slate-400 shrink-0">Output Stream</div>
          <div className="flex-1 p-3 md:p-4 overflow-y-auto space-y-4 relative">
            {messages.map((m, idx) => (
              <div key={idx} className={\`p-3 md:p-4 rounded-lg border \${m.role === 'user' ? 'bg-slate-800 border-slate-700 ml-4 md:ml-12' : 'bg-blue-900/20 border-blue-500/30 mr-4 md:mr-12'}\`}>
                <p className={\`text-xs md:text-sm font-bold mb-2 \${m.role === 'user' ? 'text-slate-400' : 'text-blue-300'}\`}>
                  {m.role === 'user' ? 'USER INPUT:' : 'SYSTEM RESPONSE:'}
                </p>
                <div className="whitespace-pre-wrap text-sm md:text-base break-words">{m.content}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-3 md:p-4 bg-slate-950 rounded-b-xl shrink-0 flex flex-col gap-2">
            {files.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {files.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-md px-3 py-1.5 text-xs">
                    <File size={14} className="text-blue-400" />
                    <span className="truncate max-w-[150px]">{file.name}</span>
                    <button onClick={() => removeFile(idx)} className="text-slate-400 hover:text-rose-400">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-end gap-2">
              <input 
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 transition-colors shrink-0 flex items-center justify-center border border-slate-700 h-[46px] w-[46px]"
                title="Attach Files"
              >
                <Paperclip size={20} />
              </button>
              <textarea 
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none h-[46px] min-h-[46px] max-h-[150px] text-sm md:text-base leading-tight"
                placeholder="Command core_brain..."
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = '46px';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                    e.currentTarget.style.height = '46px';
                  }
                }}
              />
              <button 
                onClick={() => {
                  sendMessage();
                  if (document.querySelector('textarea')) {
                    (document.querySelector('textarea') as HTMLTextAreaElement).style.height = '46px';
                  }
                }}
                disabled={!input.trim() && files.length === 0}
                className="p-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center h-[46px] w-[46px]"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* System Logs / Routing Monitor */}
        <div className="lg:col-span-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col min-h-[200px] lg:min-h-0">
          <div className="p-3 md:p-4 border-b border-slate-800 text-xs md:text-sm text-slate-400 flex items-center gap-2 shrink-0">
            <Terminal size={16}/> Engine Routing Logs
          </div>
          <div className="flex-1 p-3 md:p-4 overflow-y-auto text-[10px] sm:text-xs space-y-2">
            {logs.map(log => (
              <div key={log.id} className="border-l-2 border-blue-500 pl-2 py-1 break-words">
                <span className="text-blue-400 font-bold">[{log.engine}]</span> <span className="text-slate-300">{log.msg}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
};
`
fs.writeFileSync('src/components/ChatInterface.tsx', content);
