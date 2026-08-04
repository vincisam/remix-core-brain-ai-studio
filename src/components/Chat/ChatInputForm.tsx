import React, { useRef, useState, useEffect } from 'react';
import { Send, Mic, MicOff, Paperclip, FileText, Image as ImageIcon, Music, Video, Folder, Search, Code2 } from "lucide-react";

interface ChatInputFormProps {
  inputText: string;
  setInputText: (text: string) => void;
  handleSubmit: (e?: React.FormEvent) => void;
  isAiProcessing: boolean;
  attachedFileNames: string[];
  setAttachedFileNames: React.Dispatch<React.SetStateAction<string[]>>;
  onUploadFiles?: (files: FileList | File[]) => void;
}

export const ChatInputForm: React.FC<ChatInputFormProps> = ({
  inputText,
  setInputText,
  handleSubmit,
  isAiProcessing,
  attachedFileNames,
  setAttachedFileNames,
  onUploadFiles
}) => {
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [fileInputAccept, setFileInputAccept] = useState<string | undefined>(undefined);
  const chatFileInputRef = useRef<HTMLInputElement>(null);
  const attachMenuRef = useRef<HTMLDivElement>(null);
  const [isListening, setIsListening] = useState(false);
  const [speechLang, setSpeechLang] = useState("en-US");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (attachMenuRef.current && !attachMenuRef.current.contains(event.target as Node)) {
        setShowAttachMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChatFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const names = Array.from(e.target.files).map((f: File) => f.name);
      setAttachedFileNames((prev) => [...prev, ...names]);
      if (onUploadFiles) {
        onUploadFiles(e.target.files);
      }
      e.target.value = "";
    }
  };

  const triggerFileInput = (accept?: string, directory: boolean = false) => {
    setFileInputAccept(accept);
    setShowAttachMenu(false);
    setTimeout(() => {
      if (chatFileInputRef.current) {
        if (directory) {
          chatFileInputRef.current.setAttribute("webkitdirectory", "true");
        } else {
          chatFileInputRef.current.removeAttribute("webkitdirectory");
        }
        chatFileInputRef.current.click();
      }
    }, 0);
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = speechLang;
    recognition.continuous = true;
    recognition.interimResults = true;

    let finalTranscript = inputText;

    recognition.onresult = (event: any) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setInputText(finalTranscript + interimTranscript);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  };

  return (
    <div className="w-full max-w-3xl bg-card-bg border border-border-color rounded-2xl shadow-xl p-2 focus-within:border-accent-color/50 focus-within:shadow-2xl transition-all duration-300">
      {attachedFileNames.length > 0 && (
        <div className="px-2 pb-2 flex flex-wrap gap-1.5 pt-1">
          {attachedFileNames.map((name, i) => (
            <span
              key={i}
              className="text-xs font-mono bg-accent-glow text-accent-color px-2 py-1 rounded-md flex items-center space-x-1"
            >
              <FileText className="w-3 h-3" />
              <span className="truncate max-w-[150px]">{name}</span>
            </span>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input type="file" ref={chatFileInputRef} onChange={handleChatFileUpload} multiple accept={fileInputAccept} className="hidden" />
        
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder={`Ask CORE_BRAIN to code, create music, generate images, or edit video...`}
          rows={1}
          style={{ minHeight: '44px', maxHeight: '200px' }}
          className="w-full bg-transparent text-text-main placeholder-text-muted focus:outline-none resize-none px-3 py-3 text-[15px] font-sans leading-relaxed"
        />

        <div className="flex items-center justify-between px-2 pb-1 pt-2 mt-2 border-t border-border-color/30">
          <div className="flex items-center space-x-1">
            <div className="relative" ref={attachMenuRef}>
              <button
                type="button"
                onClick={() => setShowAttachMenu(!showAttachMenu)}
                className="p-2 text-text-muted hover:text-accent-color transition rounded-lg hover:bg-border-color cursor-pointer"
                title="Attach"
              >
                <Paperclip className="w-4.5 h-4.5" />
              </button>
              {showAttachMenu && (
                <div className="absolute bottom-full mb-2 left-0 w-48 bg-card-bg border border-border-color rounded-xl shadow-lg flex flex-col py-2 z-50">
                  <button type="button" onClick={() => triggerFileInput()} className="px-4 py-2 text-left text-sm hover:bg-border-color text-text-main flex items-center space-x-3">
                    <FileText className="w-4 h-4 opacity-70" />
                    <span>All Files</span>
                  </button>
                  <button type="button" onClick={() => triggerFileInput(undefined, true)} className="px-4 py-2 text-left text-sm hover:bg-border-color text-text-main flex items-center space-x-3">
                    <Folder className="w-4 h-4 opacity-70" />
                    <span>Folder</span>
                  </button>
                  <button type="button" onClick={() => triggerFileInput('image/*')} className="px-4 py-2 text-left text-sm hover:bg-border-color text-text-main flex items-center space-x-3">
                    <ImageIcon className="w-4 h-4 opacity-70" />
                    <span>Image</span>
                  </button>
                  <button type="button" onClick={() => triggerFileInput('video/*')} className="px-4 py-2 text-left text-sm hover:bg-border-color text-text-main flex items-center space-x-3">
                    <Video className="w-4 h-4 opacity-70" />
                    <span>Video</span>
                  </button>
                  <button type="button" onClick={() => triggerFileInput('audio/*')} className="px-4 py-2 text-left text-sm hover:bg-border-color text-text-main flex items-center space-x-3">
                    <Music className="w-4 h-4 opacity-70" />
                    <span>Music</span>
                  </button>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                setInputText("Search the web and build ");
                setTimeout(() => chatFileInputRef.current?.parentElement?.querySelector('textarea')?.focus(), 0);
              }}
              className="p-2 text-text-muted hover:text-accent-color transition rounded-lg hover:bg-border-color cursor-pointer"
              title="Search & Build Anything"
            >
              <Search className="w-4.5 h-4.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                setInputText("Generate a web app about ");
                setTimeout(() => chatFileInputRef.current?.parentElement?.querySelector('textarea')?.focus(), 0);
              }}
              className="p-2 text-text-muted hover:text-accent-color transition rounded-lg hover:bg-border-color cursor-pointer"
              title="Generate Web App"
            >
              <Code2 className="w-4.5 h-4.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                setInputText("Design a logo image for ");
                setTimeout(() => chatFileInputRef.current?.parentElement?.querySelector('textarea')?.focus(), 0);
              }}
              className="p-2 text-text-muted hover:text-accent-color transition rounded-lg hover:bg-border-color cursor-pointer"
              title="Design Logo Image"
            >
              <ImageIcon className="w-4.5 h-4.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                setInputText("Compose an ambient track about ");
                setTimeout(() => chatFileInputRef.current?.parentElement?.querySelector('textarea')?.focus(), 0);
              }}
              className="p-2 text-text-muted hover:text-accent-color transition rounded-lg hover:bg-border-color cursor-pointer"
              title="Compose Ambient Track"
            >
              <Music className="w-4.5 h-4.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                setInputText("Create an explainer video about ");
                setTimeout(() => chatFileInputRef.current?.parentElement?.querySelector('textarea')?.focus(), 0);
              }}
              className="p-2 text-text-muted hover:text-accent-color transition rounded-lg hover:bg-border-color cursor-pointer"
              title="Create Explainer Video"
            >
              <Video className="w-4.5 h-4.5" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={speechLang}
              onChange={(e) => setSpeechLang(e.target.value)}
              disabled={isListening}
              className="bg-transparent text-text-muted text-xs border border-border-color rounded px-1 outline-none cursor-pointer hover:text-text-main mr-1"
              title="Voice Language"
            >
              <option value="en-US">English (US)</option>
              <option value="en-GB">English (UK)</option>
              <option value="es-ES">Español</option>
              <option value="fr-FR">Français</option>
              <option value="de-DE">Deutsch</option>
              <option value="zh-CN">中文 (简体)</option>
              <option value="ja-JP">日本語</option>
              <option value="ko-KR">한국어</option>
              <option value="ru-RU">Русский</option>
            </select>
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2 transition-all rounded-xl shadow-sm border ${
                isListening 
                  ? "bg-red-500/20 text-red-400 border-red-500/30 animate-pulse" 
                  : "bg-panel-bg text-text-muted hover:text-text-main border-border-color hover:border-text-muted/30"
              }`}
              title={isListening ? "Stop Listening" : "Start Voice Input"}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
            <button
              type="submit"
              disabled={!inputText.trim() || isAiProcessing}
              className={`p-2 transition-all rounded-xl shadow-sm border ${
                inputText.trim() && !isAiProcessing
                  ? "bg-accent-color text-white border-accent-color hover:bg-accent-color/90 hover:shadow-accent-glow cursor-pointer"
                  : "bg-panel-bg text-text-muted border-border-color opacity-50 cursor-not-allowed"
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
