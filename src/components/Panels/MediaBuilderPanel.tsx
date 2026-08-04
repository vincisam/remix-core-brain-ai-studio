import React, { useState } from "react";
import { Image as ImageIcon, Video, Music, Wand2, Download, Play, Square, Loader2, Sparkles, Layers } from "lucide-react";
import { handleDownloadMedia } from "../Chat/chatUtils";

export const MediaBuilderPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"image" | "video" | "audio">("image");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMedia, setGeneratedMedia] = useState<{ type: string; url: string; prompt: string; engine: string } | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setGeneratedMedia(null);
    try {
      // Mock generation delay
      await new Promise((resolve) => setTimeout(resolve, 3000));
      
      let url = "";
      let engine = "";
      if (activeTab === "image") {
        engine = "Stable Image Ultra / Leonardo.ai";
        url = "https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=1024&auto=format&fit=crop"; // Placeholder AI generated looking image
      } else if (activeTab === "video") {
        engine = "Google Flow & Gemini Omni Flash AI Video";
        url = "https://cdn.pixabay.com/video/2023/10/22/186082-876805876_large.mp4"; // Placeholder video
      } else if (activeTab === "audio") {
        engine = "Suno v3 / Udio";
        url = "https://cdn.pixabay.com/download/audio/2022/11/22/audio_febc508520.mp3"; // Placeholder audio
      }

      setGeneratedMedia({ type: activeTab, url, prompt, engine });
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex-1 bg-app-bg flex flex-col h-full overflow-hidden text-zinc-300 font-sans">
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-[#121214] via-[#1a1a24] to-[#121214] border-b border-border-color">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 shadow-lg shadow-purple-500/20">
            <div className="w-full h-full bg-card-bg rounded-[10px] flex items-center justify-center text-purple-400">
              <Wand2 className="w-5 h-5 animate-pulse" />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-zinc-100 font-mono tracking-tight flex items-center">
              AI Professional Media Studio
            </h2>
            <p className="text-xs text-zinc-400">
              Generate broadcast-quality images, cinematic videos, and studio-grade music loops.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Toolbar */}
        <div className="w-64 border-r border-border-color bg-panel-bg p-4 flex flex-col space-y-2">
          <div className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-2">
            Media Modalities
          </div>
          <button
            onClick={() => setActiveTab("image")}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
              activeTab === "image" ? "bg-purple-500/10 text-purple-400 border border-purple-500/30 font-medium shadow-sm" : "text-zinc-400 hover:bg-card-bg border border-transparent"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Image Generator</span>
          </button>
          <button
            onClick={() => setActiveTab("video")}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
              activeTab === "video" ? "bg-amber-500/10 text-amber-400 border border-amber-500/30 font-medium shadow-sm" : "text-zinc-400 hover:bg-card-bg border border-transparent"
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Video Generator</span>
          </button>
          <button
            onClick={() => setActiveTab("audio")}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
              activeTab === "audio" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium shadow-sm" : "text-zinc-400 hover:bg-card-bg border border-transparent"
            }`}
          >
            <Music className="w-4 h-4" />
            <span>Music & Audio</span>
          </button>
        </div>

        {/* Main Canvas area */}
        <div className="flex-1 flex flex-col bg-card-bg/50 relative">
          <div className="flex-1 p-6 overflow-y-auto">
            {!generatedMedia && !isGenerating && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                {activeTab === "image" && <ImageIcon className="w-16 h-16 text-zinc-500" />}
                {activeTab === "video" && <Video className="w-16 h-16 text-zinc-500" />}
                {activeTab === "audio" && <Music className="w-16 h-16 text-zinc-500" />}
                <p className="text-sm font-mono max-w-sm">
                  Awaiting {activeTab} generation prompt. The studio is ready.
                </p>
              </div>
            )}
            
            {isGenerating && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <Loader2 className="w-12 h-12 text-purple-400 animate-spin" />
                <p className="text-sm font-mono text-purple-300 animate-pulse">
                  Synthesizing professional {activeTab}...
                </p>
              </div>
            )}

            {generatedMedia && !isGenerating && (
              <div className="h-full flex flex-col items-center justify-center relative">
                <div className="w-full max-w-3xl bg-panel-bg border border-border-color rounded-2xl shadow-2xl overflow-hidden group">
                  <div className="p-3 bg-header-bg border-b border-border-color flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-accent-color" />
                      <span className="text-xs font-mono text-zinc-300">Generated by {generatedMedia.engine}</span>
                    </div>
                    <button
                      onClick={() => handleDownloadMedia(generatedMedia.url, generatedMedia.type as any)}
                      className="p-1.5 hover:bg-card-bg text-text-muted hover:text-white rounded-lg transition"
                      title="Download Asset"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="w-full aspect-video flex items-center justify-center bg-black relative">
                    {generatedMedia.type === "image" && (
                      <img src={generatedMedia.url} alt="Generated" className="w-full h-full object-contain" />
                    )}
                    {generatedMedia.type === "video" && (
                      <video src={generatedMedia.url} controls autoPlay loop className="w-full h-full object-contain" />
                    )}
                    {generatedMedia.type === "audio" && (
                      <div className="w-full p-8 flex flex-col items-center justify-center space-y-6 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 h-full">
                        <div className="w-24 h-24 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center animate-pulse">
                          <Music className="w-10 h-10 text-emerald-400" />
                        </div>
                        <audio src={generatedMedia.url} controls className="w-full max-w-md shadow-lg" autoPlay />
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-header-bg border-t border-border-color">
                    <p className="text-xs text-zinc-400 italic">"{generatedMedia.prompt}"</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Input Area */}
          <div className="p-6 bg-[#09090b] border-t border-border-color shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
            <div className="max-w-4xl mx-auto flex flex-col space-y-3">
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex justify-between">
                <span>Prompt Formulation</span>
                <span>{activeTab.toUpperCase()} STUDIO</span>
              </label>
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={`Describe the ${activeTab} you want to generate in extreme detail...`}
                  className="w-full bg-[#121214] border border-[#27272a] rounded-xl px-4 py-4 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/60 min-h-[100px] resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleGenerate();
                    }
                  }}
                />
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="absolute bottom-4 right-4 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-mono font-bold rounded-lg shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-all"
                >
                  {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                  <span>Synthesize</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
