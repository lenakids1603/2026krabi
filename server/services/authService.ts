import crypto from "crypto";
import { config } from "../config";
import { getDb } from "../db/client";
import { timingSafeEqualHex } from "./ownerTokenService";

const sessionMaxAgeMs = 7 * 24 * 60 * 60 * 1000;

function hashSessionToken(token: string): string {
  return crypto.createHmac("sha256", config.sessionSecret).update(token).digest("hex");
}

export function isAdminPasswordValid(password: string): boolean {
  const expected = config.adminPassword;
  if (!password || !expected) {
    return false;
  }

  const passwordBuffer = Buffer.from(password);
  const expectedBuffer = Buffer.from(expected);
  return passwordBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(passwordBuffer, expectedBuffer);
}

export function createAdminSession() {
  const token = crypto.randomBytes(32).toString("hex");
  const now = new Date();
  const expiresAt = new Date(now.getTime() + sessionMaxAgeMs);

  getDb()
    .prepare(
      `
      INSERT INTO admin_sessions (id, session_token_hash, created_at, expires_at)
      VALUES (?, ?, ?, ?)
    `
    )
    .run(crypto.randomUUID(), hashSessionToken(token), now.toISOString(), expiresAt.toISOString());

  return {
    token,
    maxAgeMs: sessionMaxAgeMs,
  };
}

export function isAdminSessionValid(token: string | undefined): boolean {
  if (!token) {
    return false;
  }

  const tokenHash = hashSessionToken(token);
  const row = getDb()
    .prepare(
      `
      SELECT session_token_hash FROM admin_sessions
      WHERE session_token_hash = ?
        AND revoked_at IS NULL
        AND datetime(expires_at) > datetime('now')
      LIMIT 1
    `
    )
    .get(tokenHash) as { session_token_hash: string } | undefined;

  return !!row && timingSafeEqualHex(row.session_token_hash, tokenHash);
}

export function revokeAdminSession(token: string | undefined) {
  if (!token) {
    return;
  }

  getDb()
    .prepare(
      `
      UPDATE admin_sessions
      SET revoked_at = ?
      WHERE session_token_hash = ? AND revoked_at IS NULL
    `
    )
    .run(new Date().toISOString(), hashSessionToken(token));
}
