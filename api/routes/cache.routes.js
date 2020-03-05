import { Router } from 'express';
import CacheController from 'api/controller/cache.controller';

const router = Router();

/**
 * cache/list-keys
 * cache/list-stats
 * cache/flush-keys
 * cache/flush-stats
 * cache/close-cache
*/
router.get('/list-keys', (req, res) => CacheController.listAllKeys(req, res));
router.get('/list-stats', (req, res) => CacheController.listAllStats(req, res));
router.post('/flush-keys', (req, res) => CacheController.flushAllKeys(req, res));
router.post('/flush-stats', (req, res) => CacheController.flushAllStats(req, res));
router.post('/close-cache', (req, res) => CacheController.closeCache(req, res));

export default router;
