import { Router } from 'express';
import PlaceController from 'api/controller/place.controller';

const router = Router();

/**
 * places/any-valid-area
 * places/legislature/any-valid-area
*/
router.get('/:slug', (req, res) => PlaceController.getPeopleFromAllMapitAreas(req, res));
router.get('/:legislature/:slug', (req, res) => PlaceController.getPeopleFromAllMapitAreas(req, res));

export default router;
