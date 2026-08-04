import { Router } from "express";
import crypto from "crypto";
import { store } from "../db/store";
import { requireAuth, AuthedRequest } from "../utils/authUtils";
import { coreBrainRouter } from "../services/core_brain_router";
import { engineDispatcher } from "../services/engine_dispatcher";

const router = Router();
router.use(requireAuth);

// List a user's conversations, most recently active first.
router.get("/conversations", async (req: AuthedRequest, res) => {
  try {
    const conversations = await store.listConversations(req.userId!);
    res.json({ success: true, conversations });
  } catch (err: any) {
    console.error("List conversations error:", err);
    res.status(500).json({ success: false, error: "Failed to load conversations." });
  }
});

// Fetch the message history for one conversation (only if it belongs to the caller).
router.get("/conversations/:id/messages", async (req: AuthedRequest, res) => {
  try {
    const convo = await store.findConversation(req.params.id, req.userId!);
    if (!convo) return res.status(404).json({ success: false, error: "Conversation not found." });

    const messages = await store.listMessages(req.params.id);
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
    const convo = await store.findConversation(req.params.id, req.userId!);
    if (!convo) return res.status(404).json({ success: false, error: "Conversation not found." });

    await store.renameConversation(req.params.id, String(title).trim().slice(0, 120));
    res.json({ success: true });
  } catch (err: any) {
    console.error("Rename conversation error:", err);
    res.status(500).json({ success: false, error: "Failed to rename conversation." });
  }
});

// Delete a conversation and its messages.
router.delete("/conversations/:id", async (req: AuthedRequest, res) => {
  try {
    const convo = await store.findConversation(req.params.id, req.userId!);
    if (!convo) return res.status(404).json({ success: false, error: "Conversation not found." });

    await store.deleteConversation(req.params.id);
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

    const now = new Date().toISOString();

    if (!conversationId) {
      conversationId = crypto.randomUUID();
      const title = String(content).trim().slice(0, 60);
      await store.insertConversation({
        id: conversationId,
        user_id: req.userId!,
        title,
        created_at: now,
        updated_at: now,
      });
    } else {
      const convo = await store.findConversation(conversationId, req.userId!);
      if (!convo) return res.status(404).json({ success: false, error: "Conversation not found." });
    }

    const userMessageId = crypto.randomUUID();
    await store.insertMessage({
      id: userMessageId,
      conversation_id: conversationId,
      role: "user",
      content,
      created_at: now,
    });

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
    await store.insertMessage({
      id: assistantMessageId,
      conversation_id: conversationId,
      role: "assistant",
      content: replyText,
      created_at: repliedAt,
    });
    await store.touchConversation(conversationId, repliedAt);

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
