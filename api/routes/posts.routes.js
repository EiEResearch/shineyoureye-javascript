import { Router } from 'express';
import PostController from 'api/controller/post.controller';

const router = Router();

/**
 * posts/
 * posts/foo-bar
 * posts?sort=asc&page=2&limit=4
*/

router.get('/', (req, res) => PostController.all(req, res));
router.get('/:slug', (req, res) => PostController.find(req, res));

export default router;
