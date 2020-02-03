import { Router } from 'express';
import TestController from 'api/controller/test.controller';

const router = Router();

/**
 * test/mappings
*/
router.get('/mappings', (req, res) => TestController.mappings(req, res));

export default router;
