import fs from "fs";
import path from "path";

// A tiny file-backed store used for auth + chat history. Deliberately avoids
// native modules (like sqlite3) so it works out of the box on every OS with
// zero build tools required — good enough for a single-instance app; swap
// for a real database if you need multi-instance/horizontal scaling.

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  password_hash: string | null;
  password_salt: string | null;
  provider: "local" | "google" | "github";
  provider_id: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface ConversationRecord {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface MessageRecord {
  id: string;
  conversation_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

interface StoreData {
  users: UserRecord[];
  conversations: ConversationRecord[];
  messages: MessageRecord[];
}

const DB_FILE = path.join(process.cwd(), "core_brain_app.json");

let data: StoreData | null = null;
let writeQueue: Promise<void> = Promise.resolve();

function load(): StoreData {
  if (data) return data;
  try {
    const raw = fs.readFileSync(DB_FILE, "utf8");
    data = JSON.parse(raw) as StoreData;
  } catch {
    data = { users: [], conversations: [], messages: [] };
  }
  if (!data.users) data.users = [];
  if (!data.conversations) data.conversations = [];
  if (!data.messages) data.messages = [];
  return data;
}

function persist(): Promise<void> {
  // Serialize writes so concurrent requests can't interleave and corrupt the file.
  writeQueue = writeQueue.then(
    () =>
      new Promise<void>((resolve, reject) => {
        fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), "utf8", (err) => {
          if (err) reject(err);
          else resolve();
        });
      })
  );
  return writeQueue;
}

export const store = {
  // --- Users ---------------------------------------------------------------
  async findUserByEmail(email: string): Promise<UserRecord | null> {
    return load().users.find((u) => u.email === email) || null;
  },
  async findUserById(id: string): Promise<UserRecord | null> {
    return load().users.find((u) => u.id === id) || null;
  },
  async findUserByProvider(provider: string, providerId: string): Promise<UserRecord | null> {
    return load().users.find((u) => u.provider === provider && u.provider_id === providerId) || null;
  },
  async insertUser(user: UserRecord): Promise<UserRecord> {
    load().users.push(user);
    await persist();
    return user;
  },

  // --- Conversations ---------------------------------------------------------
  async listConversations(userId: string): Promise<ConversationRecord[]> {
    return load()
      .conversations.filter((c) => c.user_id === userId)
      .sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1));
  },
  async findConversation(id: string, userId: string): Promise<ConversationRecord | null> {
    return load().conversations.find((c) => c.id === id && c.user_id === userId) || null;
  },
  async insertConversation(conv: ConversationRecord): Promise<ConversationRecord> {
    load().conversations.push(conv);
    await persist();
    return conv;
  },
  async touchConversation(id: string, updatedAt: string): Promise<void> {
    const c = load().conversations.find((c) => c.id === id);
    if (c) c.updated_at = updatedAt;
    await persist();
  },
  async renameConversation(id: string, title: string): Promise<void> {
    const c = load().conversations.find((c) => c.id === id);
    if (c) c.title = title;
    await persist();
  },
  async deleteConversation(id: string): Promise<void> {
    const d = load();
    d.conversations = d.conversations.filter((c) => c.id !== id);
    d.messages = d.messages.filter((m) => m.conversation_id !== id);
    await persist();
  },

  // --- Messages ---------------------------------------------------------------
  async listMessages(conversationId: string): Promise<MessageRecord[]> {
    return load()
      .messages.filter((m) => m.conversation_id === conversationId)
      .sort((a, b) => (a.created_at < b.created_at ? -1 : 1));
  },
  async insertMessage(msg: MessageRecord): Promise<MessageRecord> {
    load().messages.push(msg);
    await persist();
    return msg;
  },
};
