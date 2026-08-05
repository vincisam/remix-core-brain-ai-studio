import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Send, Plus, LogOut, MessageSquare, Trash2, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { CoreBrainLogo } from "../components/UI/CoreBrainLogo";
import { API_BASE } from "../utils/api";

interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
  engines?: string[];
}

export default function ChatPage() {
  const { user, token, logout } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const authHeaders = useCallback(
    (): Record<string, string> => ({ "Content-Type": "application/json", Authorization: `Bearer ${token}` }),
    [token]
  );

  const loadConversations = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/chat/conversations`, { headers: authHeaders() });
      const data = await res.json();
      if (data.success) setConversations(data.conversations);
    } catch {
      // Silently ignore — sidebar just stays as-is.
    }
  }, [authHeaders]);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  useEffect(() => {
    if (!activeId) {
      setMessages([]);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/chat/conversations/${activeId}/messages`, { headers: authHeaders() });
        const data = await res.json();
        if (!cancelled && data.success) setMessages(data.messages);
      } catch {
        // ignore
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [activeId, authHeaders]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isSending]);

  const handleNewChat = () => {
    setActiveId(null);
    setMessages([]);
    setIsSidebarOpen(false);
  };

  const handleSelectConversation = (id: string) => {
    setActiveId(id);
    setIsSidebarOpen(false);
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeId === id) handleNewChat();
    try {
      await fetch(`${API_BASE}/api/chat/conversations/${id}`, { method: "DELETE", headers: authHeaders() });
    } catch {
      loadConversations();
    }
  };

  const handleSend = async () => {
    const content = input.trim();
    if (!content || isSending) return;
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setIsSending(true);

    const optimisticId = `tmp-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: optimisticId, role: "user", content, created_at: new Date().toISOString() },
    ]);

    try {
      const res = await fetch(`${API_BASE}/api/chat/messages`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ conversationId: activeId, content }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to send message.");

      if (!activeId) {
        setActiveId(data.conversationId);
      }
      setMessages((prev) => [...prev.filter((m) => m.id !== optimisticId), data.userMessage, data.assistantMessage]);
      loadConversations();
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          content: `⚠️ ${err.message || "Something went wrong reaching Core Brain."}`,
          created_at: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const autoGrow = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
  };

  return (
    <div className="flex h-screen bg-app-bg text-text-main overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed md:static z-30 inset-y-0 left-0 w-72 bg-panel-bg border-r border-border-color flex flex-col transition-transform duration-200 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center gap-2 px-4 py-4 border-b border-border-color">
          <CoreBrainLogo size="sm" showText={true} showSubtitle={false} />
          <button className="ml-auto md:hidden text-text-muted" onClick={() => setIsSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="p-3">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-border-color px-3 py-2.5 text-sm font-medium hover:bg-card-bg transition"
          >
            <Plus size={16} /> New chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 space-y-0.5 pb-2">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => handleSelectConversation(c.id)}
              className={`w-full group flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-left truncate transition ${
                activeId === c.id ? "bg-card-bg text-text-main" : "text-text-muted hover:bg-card-bg/60"
              }`}
            >
              <MessageSquare size={14} className="shrink-0" />
              <span className="truncate flex-1">{c.title || "New chat"}</span>
              <Trash2
                size={14}
                className="shrink-0 opacity-0 group-hover:opacity-100 hover:text-red-400 transition"
                onClick={(e) => handleDelete(c.id, e)}
              />
            </button>
          ))}
          {conversations.length === 0 && <p className="text-xs text-text-muted px-3 py-2">No conversations yet.</p>}
        </div>

        <div className="border-t border-border-color p-3 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-accent-color/20 text-accent-color flex items-center justify-center text-sm font-semibold shrink-0">
            {(user?.name || user?.email || "?").charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm truncate">{user?.name}</p>
            <p className="text-xs text-text-muted truncate">{user?.email}</p>
          </div>
          <button onClick={logout} title="Log out" className="text-text-muted hover:text-red-400 transition shrink-0">
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Main chat */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center gap-2 px-4 py-3 border-b border-border-color">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu size={20} />
          </button>
          <CoreBrainLogo size="sm" showText={true} showSubtitle={false} />
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <div className="mb-4">
                <CoreBrainLogo size="lg" showText={false} showSubtitle={false} />
              </div>
              <h2 className="text-lg font-semibold">How can Core Brain help you today?</h2>
              <p className="text-sm text-text-muted mt-1 max-w-sm">
                Ask anything — Core Brain routes your request across specialized reasoning, coding, search, and
                creative engines automatically.
              </p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-accent-color text-white"
                        : "bg-panel-bg border border-border-color text-text-main"
                    }`}
                  >
                    {m.role === "assistant" ? (
                      <div className="prose prose-invert prose-sm max-w-none prose-p:my-2 prose-pre:bg-app-bg">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{m.content}</p>
                    )}
                  </div>
                </div>
              ))}
              {isSending && (
                <div className="flex justify-start">
                  <div className="rounded-2xl px-4 py-2.5 bg-panel-bg border border-border-color text-text-muted text-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-color animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-color animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-color animate-bounce" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="border-t border-border-color p-4">
          <div className="max-w-3xl mx-auto flex items-end gap-2 rounded-2xl border border-border-color bg-panel-bg px-3 py-2 focus-within:border-accent-color/50 transition">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={autoGrow}
              onKeyDown={handleKeyDown}
              placeholder="Message Core Brain…"
              rows={1}
              className="flex-1 resize-none bg-transparent outline-none text-sm py-1.5 max-h-40 text-text-main placeholder:text-text-muted"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isSending}
              className="rounded-lg bg-accent-color text-white p-2 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition shrink-0"
            >
              <Send size={16} />
            </button>
          </div>
          <p className="text-center text-xs text-text-muted mt-2">
            Core Brain can make mistakes. Verify important information.
          </p>
        </div>
      </main>
    </div>
  );
}
