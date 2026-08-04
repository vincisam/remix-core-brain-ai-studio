import dotenv from "dotenv";
import path from "path";

// This project's AI Studio deployment target auto-injects secrets straight
// into process.env, so nothing in the original code ever called dotenv.
// Locally there's no such injection — .env.local just sits there unread
// unless something loads it. This file does that, and MUST be imported
// before any other module (engines read process.env.* at construction time,
// i.e. at import time, not per-request).
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") }); // fallback; won't override .env.local values