import React, { useState } from 'react';
import { Sparkles, Image as ImageIcon, BookOpen, Video, Loader2, Copy, Check } from 'lucide-react';
import { API_BASE } from '../../utils/api';

export const CreativeSynthesisPanel = () => {
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState<"image" | "video" | "literature">("image");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setResult(null);

    const systemPrompt = `You are an expert prompt engineer. You are NOT generating an image or video. You are generating TEXT. The user wants you to write a text prompt that they will later use in an image or video generator. \n\nTask: Write a detailed, highly structured, and aesthetically formatted markdown text prompt for ${mode === 'image' ? 'a high-end image generator (like Leonardo.ai)' : mode === 'video' ? 'Google Flow & Gemini Omni Flash AI Video' : 'high-end narrative content'}. \nUser Request: ${prompt}. \n\nCRITICAL RULE: DO NOT apologize. DO NOT say you cannot generate images. You are only writing TEXT. Output the markdown text prompt directly.`;

    try {
      const response = await fetch(`${API_BASE}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: "user", content: systemPrompt }
          ],
          model: "gemma-4-26b-a4b-it"
        })
      });

      if (!response.ok) throw new Error("Failed to generate");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (reader) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.text) {
                fullText = data.text;
                setResult(fullText);
              }
            } catch (e) {}
          }
        }
      }
    } catch (e) {
      setResult("Error generating synthesis. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 text-slate-100 font-sans">
      {/* Header */}
      <div className="p-6 border-b border-slate-800 bg-slate-900/50 shrink-0">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-fuchsia-500/20 text-fuchsia-400 rounded-lg">
            <Sparkles size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold">Engine 09: Creative Synthesis</h1>
            <p className="text-sm text-slate-400">High-end narrative, literature, and prompt engineering.</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col md:flex-row gap-6">
        {/* Input Column */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Synthesis Mode</h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setMode('image')}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${mode === 'image' ? 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30' : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 border border-transparent'}`}
              >
                <ImageIcon size={18} /> Image Prompt
              </button>
              <button
                onClick={() => setMode('video')}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${mode === 'video' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 border border-transparent'}`}
              >
                <Video size={18} /> Video Prompt
              </button>
              <button
                onClick={() => setMode('literature')}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${mode === 'literature' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 border border-transparent'}`}
              >
                <BookOpen size={18} /> Literature & Narrative
              </button>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex-1 flex flex-col min-h-[300px]">
            <h3 className="text-sm font-semibold text-slate-300 mb-2 uppercase tracking-wider">Base Concept</h3>
            <textarea
              className="flex-1 w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/50 resize-none placeholder-slate-600"
              placeholder={`Describe the core concept for the ${mode} synthesis...`}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="mt-4 w-full bg-slate-100 hover:bg-white text-slate-900 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
              {isGenerating ? "Synthesizing..." : "Initiate Synthesis"}
            </button>
          </div>
        </div>

        {/* Output Column */}
        <div className="w-full md:w-2/3 bg-slate-900 border border-slate-800 rounded-xl flex flex-col relative overflow-hidden">
          <div className="p-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur flex justify-between items-center sticky top-0">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Output Stream</h3>
            {result && (
              <button onClick={handleCopy} className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-xs">
                {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied" : "Copy"}
              </button>
            )}
          </div>
          <div className="flex-1 p-6 overflow-y-auto">
            {isGenerating && !result ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-4">
                <Loader2 size={32} className="animate-spin text-fuchsia-500/50" />
                <p className="font-mono text-sm">Engine 09 processing conceptual lattice...</p>
              </div>
            ) : result ? (
              <div className="prose prose-invert max-w-none prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800">
                {/* We'll just render it as text for now, but preserving whitespace */}
                <pre className="bg-transparent border-0 p-0 text-sm font-sans whitespace-pre-wrap font-medium leading-relaxed text-slate-200">
                  {result}
                </pre>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-600 font-mono text-sm border-2 border-dashed border-slate-800 rounded-xl m-4">
                Awaiting conceptual input...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
