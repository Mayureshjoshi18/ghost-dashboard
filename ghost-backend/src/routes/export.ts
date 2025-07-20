import express from 'express';
import { getAllRecords } from '../db/database';
import { Parser } from 'json2csv';

const router = express.Router();

const AUTH_TOKEN = 'hardcoded-secret-token';

function isAuthorized(req: express.Request): boolean {
  const token = req.headers['authorization'];
  return token === `Bearer ${AUTH_TOKEN}`;
}

router.get('/export/csv', (req, res) => {
  if (!isAuthorized(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const records = getAllRecords();

  try {
    const parser = new Parser();
    const csv = parser.parse(records);

    res.setHeader('Content-Disposition', 'attachment; filename="saas_export.csv"');
    res.setHeader('Content-Type', 'text/csv');
    res.send(csv);
  } catch (err) {
    console.error('CSV export error:', err);
    res.status(500).json({ error: 'Failed to generate CSV.' });
  }
});

router.get('/export/json', (req, res) => {
  if (!isAuthorized(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const records = getAllRecords();

  res.setHeader('Content-Disposition', 'attachment; filename="saas_export.json"');
  res.setHeader('Content-Type', 'application/json');
  res.json(records);
});

export default router;