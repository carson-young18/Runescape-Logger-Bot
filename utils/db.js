import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.resolve(__dirname, '../data/bot.db'));

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

module.exports = db;