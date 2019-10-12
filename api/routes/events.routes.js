import { Router } from 'express';
import EventController from 'api/controller/event.controller';

const router = Router();

router.get('/', (req, res) => EventController.all(req, res));
router.get('/:slug', (req, res) => EventController.find(req, res));

export default router;
