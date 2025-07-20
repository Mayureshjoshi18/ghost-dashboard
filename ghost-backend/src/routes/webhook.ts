import express from 'express';
import { WebhookPayload } from '../types';
import { insertSaaSRecord } from '../db/database';
import { getAllRecords } from '../db/database';

const router = express.Router();

router.post('/new-saas', (req, res) => {
  const payload: WebhookPayload = req.body;

  if (!payload.timestamp || !payload.employee_email || !payload.service_detected || !payload.risk_level) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  try {
    insertSaaSRecord(payload);
    res.status(200).json({ status: 'received' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process payload' });
  }
});

router.get('/all', (_, res) => {
  const records = getAllRecords();
  res.json(records);
});

export default router;
