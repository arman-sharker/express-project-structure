import request from 'supertest';
import { app } from '../app.js';

describe('Health Controller', () => {
  describe('GET /api/health', () => {
    it('should return 200 with ok status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('ok');
    });

    it('should return env and timestamp in response', async () => {
      const res = await request(app).get('/api/health');
      expect(res.body).toHaveProperty('env');
      expect(res.body).toHaveProperty('timestamp');
      expect(res.body).toHaveProperty('uptime');
    });

    it('should have valid ISO timestamp', async () => {
      const res = await request(app).get('/api/health');
      expect(() => new Date(res.body.timestamp)).not.toThrow();
    });

    it('should have positive uptime', async () => {
      const res = await request(app).get('/api/health');
      expect(res.body.uptime).toBeGreaterThan(0);
    });
  });
});
