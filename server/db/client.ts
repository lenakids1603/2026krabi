import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { config } from "../config";

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) {
    return db;
  }

  fs.mkdirSync(path.dirname(config.databasePath), { recursive: true });
  db = new Database(config.databasePath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  return db;
}

export function initDatabase() {
  const schemaPath = path.join(config.rootDir, "server/db/schema.sql");
  if (!fs.existsSync(schemaPath)) {
    throw new Error(`SQLite schema file not found: ${schemaPath}`);
  }

  getDb().exec(fs.readFileSync(schemaPath, "utf8"));
}
