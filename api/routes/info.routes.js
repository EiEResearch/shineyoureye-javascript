import { Router } from 'express';
import InfoController from 'api/controller/info.controller';

const router = Router();

router.get('/:slug', (req, res) => InfoController.find(req, res));

export default router;
