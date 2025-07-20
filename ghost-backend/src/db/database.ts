import Database from 'better-sqlite3';
import path from 'path';
import { WebhookPayload } from '../types';

const db = new Database(path.resolve('data/ghost.sqlite'));

db.prepare(`
  CREATE TABLE IF NOT EXISTS detected_services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT NOT NULL,
    employee_email TEXT NOT NULL,
    service_detected TEXT NOT NULL,
    risk_level TEXT NOT NULL
  );
`).run();

export function insertSaaSRecord(payload: WebhookPayload) {
  const stmt = db.prepare(`
    INSERT INTO detected_services (timestamp, employee_email, service_detected, risk_level)
    VALUES (?, ?, ?, ?)
  `);

  stmt.run(
    payload.timestamp,
    payload.employee_email,
    payload.service_detected,
    payload.risk_level
  );
}

export function getAllRecords() {
  return db.prepare(`SELECT * FROM detected_services ORDER BY timestamp DESC`).all();
}
