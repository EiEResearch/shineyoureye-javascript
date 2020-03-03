import { Router } from 'express';
import PlaceController from 'api/controller/place.controller';

const router = Router();

/**
 * places/any-valid-area
 * places/legislature/any-valid-area
 * places/24/geojson
 * places/24/geometry
*/
router.get('/:placeId/geojson', (req, res) => PlaceController.getGeometryGeoJson(req, res));
router.get('/:placeId/geometry', (req, res) => PlaceController.getGeometryData(req, res));
router.get('/:slug', (req, res) => PlaceController.getPeopleFromAllMapitAreas(req, res));
router.get('/:legislature/:slug', (req, res) => PlaceController.getPeopleFromAllMapitAreas(req, res));

export default router;
