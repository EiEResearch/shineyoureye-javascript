import { Router } from 'express';
import PostController from 'api/controller/post.controller';
import PersonController from 'api/controller/person.controller';

const router = Router();

/**
 * posts/
 * posts/foo-bar
 * posts?sort=asc&page=2&limit=4
*/

router.get('/', (req, res) => PostController.all(req, res));
router.get('/:slug', (req, res) => PostController.find(req, res));

router.get('/p/person', (req, res) => PersonController.single(req, res));
export default router;
