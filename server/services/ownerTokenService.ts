import crypto from "crypto";
import { config } from "../config";

export function hashOwnerToken(ownerToken: string): string {
  return crypto
    .createHmac("sha256", config.ownerTokenSecret)
    .update(ownerToken)
    .digest("hex");
}

export function timingSafeEqualHex(left: string, right: string): boolean {
  try {
    const leftBuffer = Buffer.from(left, "hex");
    const rightBuffer = Buffer.from(right, "hex");
    return leftBuffer.length === rightBuffer.length && crypto.timingSafeEqual(leftBuffer, rightBuffer);
  } catch {
    return false;
  }
}
