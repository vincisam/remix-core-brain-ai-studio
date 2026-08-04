import React, { useEffect, useState } from "react";
import { Home, FolderTree, Plus, FileText, MessageSquare, Pin, Trash2, Image as ImageIcon, Download } from "lucide-react";
import { extractMediaFromSessions } from "../../utils/mediaExtractor";
import { handleDownloadMedia } from "../Chat/chatUtils";
import { CodeFile, ChatSession } from "../../types";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  files: CodeFile[];
  activeFileId: string;
  onSelectFile: (id: string) => void;
  chatSessions: ChatSession[];
  activeSessionId: string;
  onSelectSession: (id: string) => void;
  onNewSession: () => void;
  onTogglePinSession: (id: string) => void;
  onDeleteSession: (id: string) => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab,
  files,
  activeFileId,
  onSelectFile,
  chatSessions,
  activeSessionId,
  onSelectSession,
  onNewSession,
  onTogglePinSession,
  onDeleteSession,
  isMobileOpen,
  onCloseMobile
}) => {
  const [viewMode, setViewMode] = useState<"home" | "code" | "media">("code");

  // Sync viewMode if activeTab changes externally
  useEffect(() => {
    if (activeTab === "explorer" && viewMode !== "code") {
      setViewMode("code");
    } else if (activeTab === "ai-hub" && viewMode !== "home") {
      setViewMode("home");
    }
  }, [activeTab]);

  return (
    <>
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={onCloseMobile} />
      )}
      <div className={`
        fixed md:relative inset-y-0 left-0 z-50 md:z-20 transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        w-64 bg-header-bg border-r border-border-color flex flex-col h-full text-text-muted font-sans shrink-0 transition-colors
      `}>
      {/* Top Toggle */}
      <div className="p-3 pb-4">
        <div className="flex bg-panel-bg rounded-lg p-0.5 shadow-inner border border-border-color/50">
          <button
            onClick={() => {
              setViewMode("home");
              setActiveTab("ai-hub");
            }}
            className={`flex-1 flex items-center justify-center space-x-1.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
              viewMode === "home" ? "bg-card-bg text-text-main shadow border border-border-color/30" : "text-text-muted hover:text-text-main"
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Chat</span>
          </button>
          
          <button
            onClick={() => {
              setViewMode("code");
              setActiveTab("explorer");
            }}
            className={`flex-1 flex items-center justify-center space-x-1.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
              viewMode === "code" ? "bg-card-bg text-text-main shadow border border-border-color/30" : "text-text-muted hover:text-text-main"
            }`}
          >
            <FolderTree className="w-3.5 h-3.5" />
            <span>Code</span>
          </button>

          <button
            onClick={() => {
              setViewMode("media");
              setActiveTab("media-builder");
            }}
            className={`flex-1 flex items-center justify-center space-x-1.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
              viewMode === "media" ? "bg-card-bg text-text-main shadow border border-border-color/30" : "text-text-muted hover:text-text-main"
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Media</span>
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto px-3 space-y-0.5">
        {viewMode === "media" ? (
          <div className="flex flex-col space-y-1 h-full">
            <div className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-2 px-2 flex justify-between items-center">
              <span>Media Library</span>
              <span className="text-accent-color">{extractMediaFromSessions(chatSessions).length}</span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 pb-6">
              {extractMediaFromSessions(chatSessions).map((media) => (
                <div key={media.id} className="group relative bg-card-bg rounded-lg border border-border-color/50 overflow-hidden shadow-sm hover:border-accent-color/30 transition-colors">
                  {media.type === 'image' && (
                    <div className="aspect-square bg-panel-bg w-full relative">
                      <img src={media.url} alt="Generated Media" className="w-full h-full object-cover" />
                    </div>
                  )}
                  {media.type === 'video' && (
                    <div className="aspect-video bg-panel-bg w-full relative flex items-center justify-center">
                      <video src={media.url} className="w-full h-full object-cover" muted />
                    </div>
                  )}
                  {media.type === 'audio' && (
                    <div className="p-3 bg-panel-bg w-full flex items-center justify-center text-accent-color">
                      <div className="text-xs">Audio File</div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3 backdrop-blur-[2px]">
                    <button
                      onClick={() => handleDownloadMedia(media.url, media.type)}
                      className="p-2 bg-app-bg text-text-main rounded-full hover:bg-accent-color hover:text-white transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => window.open(media.url, '_blank')}
                      className="p-2 bg-app-bg text-text-main rounded-full hover:bg-emerald-500 hover:text-white transition-colors"
                      title="Open in new tab"
                    >
                      <ImageIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {extractMediaFromSessions(chatSessions).length === 0 && (
                <div className="text-center text-text-muted text-xs py-8 px-4 flex flex-col items-center">
                  <ImageIcon className="w-8 h-8 opacity-20 mb-2" />
                  <span>No media generated yet. Ask CORE_BRAIN to generate an image or video!</span>
                </div>
              )}
            </div>
          </div>
        ) : viewMode === "home" ? (
          <>
            <button
              onClick={() => {
                onNewSession();
                setActiveTab("ai-hub");
                if (onCloseMobile) onCloseMobile();
              }}
              className={`w-full flex items-center space-x-3 px-2 py-2 rounded-lg transition-colors text-sm ${
                activeTab === "ai-hub" && activeSessionId === "" ? "bg-card-bg text-text-main" : "hover:bg-card-bg/50 hover:text-text-main text-text-main"
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>New Chat</span>
            </button>
            
            {/* Pinned Chats Section */}
            {chatSessions.filter(s => s.pinned).length > 0 && (
              <div className="mt-6 px-2">
                <div className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-2">
                  Pinned Chats
                </div>
                <div className="space-y-0.5">
                  {chatSessions.filter(s => s.pinned).map((session) => (
                    <div
                      key={session.id}
                      className={`group w-full flex items-center justify-between px-2 py-2 rounded-lg transition-colors text-sm ${
                        activeTab === "ai-hub" && activeSessionId === session.id ? "bg-card-bg text-text-main" : "hover:bg-card-bg/50 hover:text-text-main text-text-muted"
                      }`}
                    >
                      <button
                        className="flex items-center space-x-3 flex-1 overflow-hidden"
                        onClick={() => {
                          onSelectSession(session.id);
                          setActiveTab("ai-hub");
                          if (onCloseMobile) onCloseMobile();
                        }}
                      >
                        <MessageSquare className="w-4 h-4 shrink-0" />
                        <span className="truncate">{session.title}</span>
                      </button>
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => { e.stopPropagation(); onTogglePinSession(session.id); }}
                          className="p-1 hover:text-accent-color text-text-muted transition"
                          title="Unpin"
                        >
                          <Pin className="w-3.5 h-3.5 fill-current" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); onDeleteSession(session.id); }}
                          className="p-1 hover:text-red-500 text-text-muted transition"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Chat History Section */}
            <div className="mt-6 px-2">
              <div className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-2">
                Chat History
              </div>
              <div className="space-y-0.5">
                {chatSessions.filter(s => !s.pinned).map((session) => (
                  <div
                    key={session.id}
                    className={`group w-full flex items-center justify-between px-2 py-2 rounded-lg transition-colors text-sm ${
                      activeTab === "ai-hub" && activeSessionId === session.id ? "bg-card-bg text-text-main" : "hover:bg-card-bg/50 hover:text-text-main text-text-muted"
                    }`}
                  >
                    <button
                      className="flex items-center space-x-3 flex-1 overflow-hidden"
                      onClick={() => {
                        onSelectSession(session.id);
                          setActiveTab("ai-hub");
                          if (onCloseMobile) onCloseMobile();
                      }}
                    >
                      <MessageSquare className="w-4 h-4 shrink-0" />
                      <span className="truncate">{session.title}</span>
                    </button>
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => { e.stopPropagation(); onTogglePinSession(session.id); }}
                        className="p-1 hover:text-accent-color text-text-muted transition"
                        title="Pin"
                      >
                        <Pin className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); onDeleteSession(session.id); }}
                        className="p-1 hover:text-red-500 text-text-muted transition"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            
          </>
        ) : (
          <div className="flex flex-col space-y-1">
            <div className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-2 px-2">
              Workspace Explorer
            </div>
            {files.map((file) => (
              <button
                key={file.id}
                onClick={() => {
                  onSelectFile(file.id);
                  setActiveTab("explorer");
                }}
                className={`w-full flex items-center space-x-3 px-2 py-2 rounded-lg transition-colors text-sm ${
                  activeFileId === file.id && activeTab === "explorer"
                    ? "bg-accent-color/10 text-accent-color font-medium"
                    : "hover:bg-card-bg/50 text-text-main"
                }`}
              >
                <FileText className={`w-4 h-4 ${activeFileId === file.id && activeTab === "explorer" ? "text-accent-color" : "text-text-muted"}`} />
                <span className="truncate">{file.name}</span>
                {file.isModified && <span className="w-1.5 h-1.5 rounded-full bg-accent-color ml-auto"></span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
};
