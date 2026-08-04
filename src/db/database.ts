import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import path from "path";

let dbPromise: Promise<Database> | null = null;

/**
 * Lazily opens (and migrates) the app's SQLite database.
 * Safe to call from multiple routes — the connection is memoized.
 */
export function getDb(): Promise<Database> {
  if (!dbPromise) {
    dbPromise = open({
      filename: path.join(process.cwd(), "core_brain_app.sqlite"),
      driver: sqlite3.Database,
    }).then(async (db) => {
      await db.exec("PRAGMA foreign_keys = ON;");
      await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password_hash TEXT,
          password_salt TEXT,
          provider TEXT NOT NULL DEFAULT 'local',
          provider_id TEXT,
          avatar_url TEXT,
          created_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS conversations (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          title TEXT NOT NULL,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS messages (
          id TEXT PRIMARY KEY,
          conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
          role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
          content TEXT NOT NULL,
          created_at TEXT NOT NULL
        );

        CREATE INDEX IF NOT EXISTS idx_conversations_user ON conversations(user_id);
        CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);
        CREATE UNIQUE INDEX IF NOT EXISTS idx_users_provider ON users(provider, provider_id);
      `);
      return db;
    });
  }
  return dbPromise;
}
