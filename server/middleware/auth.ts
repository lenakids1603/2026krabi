import type { Request } from "express";

export function getOwnerToken(req: Request): string {
  const rawHeader = req.header("X-Owner-Token");
  if (!rawHeader) {
    return "";
  }
  return rawHeader.trim();
}
