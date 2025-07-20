import { Router } from 'express';

const router = Router();

export const AUTH_TOKEN = "ghost-token-123";

export function isAuthorized(req: any): boolean {
  const token = req.headers['authorization'];
  return token === `Bearer ${AUTH_TOKEN}`;
}

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin123') {
    return res.json({ token: 'ghost-token-123' });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
});

export default router;