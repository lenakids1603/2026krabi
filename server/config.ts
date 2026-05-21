import dotenv from "dotenv";
import path from "path";

dotenv.config();

const rootDir = process.cwd();

function resolveRuntimePath(value: string | undefined, fallback: string): string {
  const selected = value && value.trim() ? value.trim() : fallback;
  return path.isAbsolute(selected) ? selected : path.join(rootDir, selected);
}

function readNumber(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export const config = {
  rootDir,
  nodeEnv: process.env.NODE_ENV || "development",
  port: readNumber(process.env.PORT, 5188),
  databasePath: resolveRuntimePath(process.env.DATABASE_PATH, "server/db/data/krabi.sqlite"),
  uploadDir: resolveRuntimePath(process.env.UPLOAD_DIR, "server/uploads"),
  adminPassword: process.env.ADMIN_PASSWORD || process.env.GALLERY_ADMIN_PASSWORD || "krabi2026",
  sessionSecret: process.env.SESSION_SECRET || process.env.ADMIN_SESSION_SECRET || "default_krabi_2026_salt_secret",
  ownerTokenSecret:
    process.env.OWNER_TOKEN_SECRET ||
    process.env.SESSION_SECRET ||
    process.env.ADMIN_SESSION_SECRET ||
    "default_krabi_2026_owner_secret",
  weatherApiKey: process.env.WEATHER_API_KEY || "",
  tideApiKey: process.env.TIDE_API_KEY || "",
};

if (config.nodeEnv === "production") {
  const missingRequired = [
    !process.env.ADMIN_PASSWORD && !process.env.GALLERY_ADMIN_PASSWORD ? "ADMIN_PASSWORD" : "",
    !process.env.SESSION_SECRET && !process.env.ADMIN_SESSION_SECRET ? "SESSION_SECRET" : "",
    !process.env.OWNER_TOKEN_SECRET ? "OWNER_TOKEN_SECRET" : "",
  ].filter(Boolean);

  if (missingRequired.length > 0) {
    console.warn(
      `[config] Production is using development fallback values. Set these environment variables: ${missingRequired.join(", ")}`
    );
  }
}
