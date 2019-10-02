import { Router } from 'express';
import PostController from 'api/controller/post.controller';

const router = Router();

router.get('/', (req, res) => PostController.all(req, res));
router.get('/:slug', (req, res) => PostController.single(req, res));

export default router;
