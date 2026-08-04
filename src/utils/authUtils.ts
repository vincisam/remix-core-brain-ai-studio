import crypto from "crypto";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// NOTE: this must match the secret used in src/controllers/brain.controller.ts
// so tokens issued here also unlock tiered engine access on /api/v1/brain/dispatch.
const JWT_SECRET = process.env.JWT_SECRET || "super_secret_core_brain_key";
const JWT_EXPIRY = "7d";

export interface JwtPayload {
  sub: string; // user id
  email: string;
}

export interface AuthedRequest extends Request {
  userId?: string;
  userEmail?: string;
}

/** Hash a plaintext password with a random salt using scrypt (no extra deps required). */
export function hashPassword(password: string): { salt: string; hash: string } {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return { salt, hash };
}

/** Constant-time comparison of a plaintext password against a stored salt+hash. */
export function verifyPassword(password: string, salt: string, hash: string): boolean {
  try {
    const candidate = crypto.scryptSync(password, salt, 64).toString("hex");
    const candidateBuf = Buffer.from(candidate, "hex");
    const hashBuf = Buffer.from(hash, "hex");
    if (candidateBuf.length !== hashBuf.length) return false;
    return crypto.timingSafeEqual(candidateBuf, hashBuf);
  } catch {
    return false;
  }
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}

/** Express middleware — requires a valid `Authorization: Bearer <token>` header. */
export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, error: "Authentication required." });
  }
  try {
    const payload = verifyToken(authHeader.slice("Bearer ".length));
    req.userId = payload.sub;
    req.userEmail = payload.email;
    next();
  } catch {
    return res.status(401).json({ success: false, error: "Invalid or expired session." });
  }
}
