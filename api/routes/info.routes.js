import { Router } from 'express';
import InfoController from 'api/controller/info.controller';

const router = Router();

/**
 * info/foo-bar
*/
router.get('/:slug', (req, res) => InfoController.find(req, res));

export default router;
