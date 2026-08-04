import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { coreBrainRouter } from '../services/core_brain_router';
import { engineDispatcher } from '../services/engine_dispatcher';

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_core_brain_key";

export const handleBrainRequest = async (req: Request, res: Response) => {
  try {
    const { input, userId, context } = req.body;

    if (!input) {
      return res.status(400).json({ success: false, error: "Missing input parameter" });
    }

    const startTime = Date.now();
    
    // 1. Route the intent
    const decisions = await coreBrainRouter.determineIntent(input);

    // 2. Dispatch to specialized engines
    // Tier checking for restricted engines
    const restrictedEngines = ["engine_04", "engine_07"];
    const requestedRestricted = decisions.filter(d => restrictedEngines.includes(d.engine_id));
    
    if (requestedRestricted.length > 0) {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, error: "Bearer token required for tiered access to Engines 04 and 07." });
      }
      const token = authHeader.split(" ")[1];
      try {
        jwt.verify(token, JWT_SECRET);
      } catch (err) {
        return res.status(403).json({ success: false, error: "Invalid or expired token for tiered access." });
      }
    }

    const engineOutputs = await engineDispatcher.dispatch(decisions);

    const latencyMs = Date.now() - startTime;
    
    // 3. Return the unified response
    res.status(200).json({
      brain_id: `req_${Date.now()}`,
      intent: decisions.map(d => d.engine_id).join("_"),
      engines_triggered: decisions.map(d => d.engine_id),
      responses: engineOutputs,
      metadata: { 
        tokens_used: Math.floor(Math.random() * 500) + 100, // mock metrics 
        latency: `${(latencyMs / 1000).toFixed(2)}s` 
      }
    });
  } catch (error: any) {
    console.error("Brain API Error", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
