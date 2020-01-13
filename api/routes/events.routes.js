import { Router } from 'express';
import EventController from 'api/controller/event.controller';

const router = Router();

/**
 * events/
 * events/foo-bar
 * events?sort=asc&page=2&status=past&limit=4
*/
router.get('/', (req, res) => EventController.all(req, res));
router.get('/:slug', (req, res) => EventController.find(req, res));

export default router;
