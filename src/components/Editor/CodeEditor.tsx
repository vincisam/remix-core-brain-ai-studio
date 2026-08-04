import React, { useRef, useState, useEffect } from "react";
import Editor, { Monaco, OnMount, loader } from "@monaco-editor/react";
import { CodeFile } from "../../types";
import { Sparkles, Terminal, FileCode, CheckCircle2, Zap, AlertCircle, UploadCloud } from "lucide-react";

// Configure CDN loader safely
loader.config({
  paths: {
    vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs",
  },
});

interface CodeEditorProps {
  activeFile: CodeFile;
  onChangeContent: (newContent: string) => void;
  inlineGhostText?: string;
  onRequestInlineSuggestion: () => void;
  onTriggerRefactorSelection: (selectedCode: string) => void;
  onUploadFiles?: (files: FileList | File[]) => void;
  isAiProcessing: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  activeFile,
  onChangeContent,
  inlineGhostText,
  onRequestInlineSuggestion,
  onTriggerRefactorSelection,
  onUploadFiles,
  isAiProcessing,
}) => {
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const [cursorPos, setCursorPos] = useState({ line: 1, column: 1 });
  const [selectionText, setSelectionText] = useState("");
  const [popoverPos, setPopoverPos] = useState<{ top: number; left: number } | null>(null);
  const [hasEditorError, setHasEditorError] = useState(false);
  const [isDragOverCanvas, setIsDragOverCanvas] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onUploadFiles) {
      setIsDragOverCanvas(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOverCanvas(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOverCanvas(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0 && onUploadFiles) {
      onUploadFiles(e.dataTransfer.files);
    }
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Track cursor movement
    editor.onDidChangeCursorPosition((e) => {
      setCursorPos({ line: e.position.lineNumber, column: e.position.column });
    });

    // Track selection changes for inline popover
    editor.onDidChangeCursorSelection((e) => {
      const selection = editor.getSelection();
      if (selection && !selection.isEmpty()) {
        const text = editor.getModel()?.getValueInRange(selection);
        setSelectionText(text || "");

        const scrolledPosition = editor.getScrolledVisiblePosition(selection.getEndPosition());
        if (scrolledPosition) {
          setPopoverPos({
            top: scrolledPosition.top + 30,
            left: Math.min(scrolledPosition.left + 50, 450),
          });
        }
      } else {
        setSelectionText("");
        setPopoverPos(null);
      }
    });

    // Register Keybindings
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyI, () => {
      onRequestInlineSuggestion();
    });

    // Sleek interface dark theme tweaks
    monaco.editor.defineTheme("sleek-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "71717a", fontStyle: "italic" },
        { token: "keyword", foreground: "60a5fa", fontStyle: "bold" },
        { token: "string", foreground: "34d399" },
        { token: "number", foreground: "fbbf24" },
        { token: "identifier", foreground: "e4e4e7" },
      ],
      colors: {
        "editor.background": "#09090b",
        "editor.foreground": "#e4e4e7",
        "editor.lineHighlightBackground": "#18181b",
        "editorCursor.foreground": "#2563eb",
        "editor.selectionBackground": "#27272a",
        "editorLineNumber.foreground": "#52525b",
        "editorLineNumber.activeForeground": "#3b82f6",
      },
    });

    monaco.editor.setTheme("sleek-dark");
  };

  const getMonacoLanguage = (lang: string) => {
    switch (lang) {
      case "typescript":
      case "javascript":
        return "typescript";
      case "python":
        return "python";
      case "rust":
        return "rust";
      case "go":
        return "go";
      case "dockerfile":
        return "dockerfile";
      case "json":
        return "json";
      case "markdown":
        return "markdown";
      case "html":
        return "html";
      case "css":
        return "css";
      case "sql":
        return "sql";
      default:
        return "plaintext";
    }
  };

  const lines = activeFile.content.split("\n");

  return (
    <div
      id="code-editor-container"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="flex-1 flex flex-col bg-[#09090b] relative overflow-hidden font-mono"
    >
      {/* Drag and Drop Overlay */}
      {isDragOverCanvas && (
        <div className="absolute inset-0 bg-blue-900/60 border-2 border-dashed border-blue-400 z-50 flex flex-col items-center justify-center text-white backdrop-blur-sm animate-fade-in pointer-events-none">
          <UploadCloud className="w-12 h-12 text-blue-300 animate-bounce mb-2" />
          <div className="text-base font-bold font-sans">Drop code files to upload</div>
          <div className="text-xs text-blue-200 font-mono mt-1">
            Files will be imported directly into your active workspace
          </div>
        </div>
      )}
      {/* Tab Header bar removed */}
      <div className="flex-1 relative flex flex-col min-h-0">
        {!hasEditorError ? (
          <Editor
            height="100%"
            language={getMonacoLanguage(activeFile.language)}
            theme="sleek-dark"
            value={activeFile.content}
            onChange={(value) => onChangeContent(value || "")}
            onMount={handleEditorDidMount}
            loading={
              <div className="flex items-center space-x-2 text-zinc-400 font-mono text-sm h-full justify-center">
                <Sparkles className="w-4 h-4 text-blue-500 animate-spin" />
                <span>Loading Sleek Monaco Engine...</span>
              </div>
            }
            options={{
              fontSize: 13,
              fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
              minimap: { enabled: true },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              lineNumbers: "on",
              padding: { top: 12, bottom: 12 },
              renderLineHighlight: "all",
              smoothScrolling: true,
              cursorBlinking: "phase",
              cursorSmoothCaretAnimation: "on",
              bracketPairColorization: { enabled: true },
            }}
          />
        ) : (
          /* Fallback Native Editor with Line Numbers if Monaco script error occurs */
          <div className="flex h-full w-full bg-[#09090b] text-zinc-200 text-xs font-mono overflow-auto p-2">
            <div className="select-none text-zinc-600 text-right pr-4 border-r border-[#27272a] space-y-1">
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <textarea
              value={activeFile.content}
              onChange={(e) => onChangeContent(e.target.value)}
              className="flex-1 bg-transparent text-zinc-200 p-0 pl-4 focus:outline-none resize-none leading-relaxed font-mono"
              spellCheck={false}
            />
          </div>
        )}
        {/* Real-time Inline Ghost Overlay notification */}
        {inlineGhostText && (
          <div className="absolute top-4 right-6 bg-[#121214]/90 border border-blue-500/40 text-blue-300 text-xs px-3.5 py-2 rounded-lg shadow-2xl flex items-center space-x-2 backdrop-blur animate-fade-in z-20 font-sans">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span className="font-mono">{inlineGhostText}</span>
          </div>
        )}
        {/* Selection Popover for quick AI actions */}
        {popoverPos && selectionText.trim().length > 0 && (
          <div
            style={{ top: `${popoverPos.top}px`, left: `${popoverPos.left}px` }}
            className="absolute z-30 bg-[#121214] border border-[#27272a] rounded-lg p-1.5 shadow-2xl flex items-center space-x-2 animate-scale-in font-sans"
          >
            <button
              onClick={() => onTriggerRefactorSelection(selectionText)}
              className="flex items-center space-x-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded text-[11px] transition"
            >
              <Zap className="w-3 h-3 text-amber-400" />
              <span>Refactor</span>
            </button>
            <button
              onClick={() => {}}
              className="flex items-center space-x-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded text-[11px] transition"
            >
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Explain</span>
            </button>
          </div>
        )}
      </div>
      
      {/* Footer Status Bar removed as part of cleanup */}
    </div>
  );
};
