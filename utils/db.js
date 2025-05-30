import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const db = new Database(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../data/bot.db'));

db.prepare(`
  CREATE TABLE IF NOT EXISTS activity_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player TEXT NOT NULL,
    date TEXT NOT NULL,
    details TEXT NOT NULL,
    text TEXT NOT NULL,
    type TEXT NOT NULL,
    fetched_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
  `).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS profile_fetches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
    response_time_s TEXT,
    profiles_received INTEGER,
    profile_errors INTEGER
  )`).run();

export default db;