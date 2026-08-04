import { Router } from "express";
import crypto from "crypto";
import { getDb } from "../db/database";
import { requireAuth, AuthedRequest } from "../utils/authUtils";
import { coreBrainRouter } from "../services/core_brain_router";
import { engineDispatcher } from "../services/engine_dispatcher";

const router = Router();
router.use(requireAuth);

// List a user's conversations, most recently active first.
router.get("/conversations", async (req: AuthedRequest, res) => {
  try {
    const db = await getDb();
    const conversations = await db.all(
      "SELECT id, title, created_at, updated_at FROM conversations WHERE user_id = ? ORDER BY updated_at DESC",
      req.userId
    );
    res.json({ success: true, conversations });
  } catch (err: any) {
    console.error("List conversations error:", err);
    res.status(500).json({ success: false, error: "Failed to load conversations." });
  }
});

// Fetch the message history for one conversation (only if it belongs to the caller).
router.get("/conversations/:id/messages", async (req: AuthedRequest, res) => {
  try {
    const db = await getDb();
    const convo = await db.get(
      "SELECT id FROM conversations WHERE id = ? AND user_id = ?",
      req.params.id,
      req.userId
    );
    if (!convo) return res.status(404).json({ success: false, error: "Conversation not found." });

    const messages = await db.all(
      "SELECT id, role, content, created_at FROM messages WHERE conversation_id = ? ORDER BY created_at ASC",
      req.params.id
    );
    res.json({ success: true, messages });
  } catch (err: any) {
    console.error("Load messages error:", err);
    res.status(500).json({ success: false, error: "Failed to load messages." });
  }
});

// Rename a conversation.
router.patch("/conversations/:id", async (req: AuthedRequest, res) => {
  try {
    const { title } = req.body || {};
    if (!title || !String(title).trim()) {
      return res.status(400).json({ success: false, error: "Title is required." });
    }
    const db = await getDb();
    const convo = await db.get(
      "SELECT id FROM conversations WHERE id = ? AND user_id = ?",
      req.params.id,
      req.userId
    );
    if (!convo) return res.status(404).json({ success: false, error: "Conversation not found." });

    await db.run("UPDATE conversations SET title = ? WHERE id = ?", String(title).trim().slice(0, 120), req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    console.error("Rename conversation error:", err);
    res.status(500).json({ success: false, error: "Failed to rename conversation." });
  }
});

// Delete a conversation and its messages.
router.delete("/conversations/:id", async (req: AuthedRequest, res) => {
  try {
    const db = await getDb();
    const convo = await db.get(
      "SELECT id FROM conversations WHERE id = ? AND user_id = ?",
      req.params.id,
      req.userId
    );
    if (!convo) return res.status(404).json({ success: false, error: "Conversation not found." });

    await db.run("DELETE FROM messages WHERE conversation_id = ?", req.params.id);
    await db.run("DELETE FROM conversations WHERE id = ?", req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    console.error("Delete conversation error:", err);
    res.status(500).json({ success: false, error: "Failed to delete conversation." });
  }
});

// Send a message. Creates a conversation on first message if none is given,
// routes the prompt through the Core Brain router + engine dispatcher, and
// persists both the user message and the assistant reply.
router.post("/messages", async (req: AuthedRequest, res) => {
  try {
    const { content } = req.body || {};
    let conversationId: string | undefined = req.body?.conversationId;

    if (!content || !String(content).trim()) {
      return res.status(400).json({ success: false, error: "Message content is required." });
    }

    const db = await getDb();
    const now = new Date().toISOString();

    if (!conversationId) {
      conversationId = crypto.randomUUID();
      const title = String(content).trim().slice(0, 60);
      await db.run(
        "INSERT INTO conversations (id, user_id, title, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
        conversationId,
        req.userId,
        title,
        now,
        now
      );
    } else {
      const convo = await db.get(
        "SELECT id FROM conversations WHERE id = ? AND user_id = ?",
        conversationId,
        req.userId
      );
      if (!convo) return res.status(404).json({ success: false, error: "Conversation not found." });
    }

    const userMessageId = crypto.randomUUID();
    await db.run(
      "INSERT INTO messages (id, conversation_id, role, content, created_at) VALUES (?, ?, 'user', ?, ?)",
      userMessageId,
      conversationId,
      content,
      now
    );

    // Route through Core Brain: intent detection -> specialized engine dispatch.
    const decisions = await coreBrainRouter.determineIntent(content);
    const engineOutputs = await engineDispatcher.dispatch(decisions);
    const replyText =
      engineOutputs
        .map((o: any) => o?.data)
        .filter(Boolean)
        .join("\n\n") || "I wasn't able to generate a response just now — please try again.";

    const assistantMessageId = crypto.randomUUID();
    const repliedAt = new Date().toISOString();
    await db.run(
      "INSERT INTO messages (id, conversation_id, role, content, created_at) VALUES (?, ?, 'assistant', ?, ?)",
      assistantMessageId,
      conversationId,
      replyText,
      repliedAt
    );
    await db.run("UPDATE conversations SET updated_at = ? WHERE id = ?", repliedAt, conversationId);

    res.json({
      success: true,
      conversationId,
      userMessage: { id: userMessageId, role: "user", content, created_at: now },
      assistantMessage: {
        id: assistantMessageId,
        role: "assistant",
        content: replyText,
        created_at: repliedAt,
        engines: decisions.map((d: any) => d.engine_id),
      },
    });
  } catch (err: any) {
    console.error("Send message error:", err);
    res.status(500).json({ success: false, error: "Core Brain couldn't process that message. Please try again." });
  }
});

export default router;
