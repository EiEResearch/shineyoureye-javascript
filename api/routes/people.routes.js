import { Router } from 'express';
import PeopleController from 'api/controller/people.controller';

const router = Router();

/**
 * people/
 * people/states|parties|area
 * people/states/abia
 * people/parties
 * people/area/3
 * people/senate
 * people/senate?groupBy=party|state|area
 * people/senate?filterBy=party|state|area
 * people/senate/john-doe
*/

router.get('/', (req, res) => PeopleController.getAllLegislatures(req, res));

router.get('/states', (req, res) => PeopleController.getAllLegislaturesByState(req, res));
router.get('/states/:state', (req, res) => PeopleController.getAllLegislaturesByState(req, res));
router.get('/areas', (req, res) => PeopleController.getAllLegislaturesByMapitArea(req, res));
router.get('/areas/:code', (req, res) => PeopleController.getAllLegislaturesByMapitArea(req, res));
router.get('/parties', (req, res) => PeopleController.getAllLegislaturesByParty(req, res));
router.get('/politicians/:slug', (req, res) => PeopleController.getSinglePoliticianPerLegislature(req, res));

router.get('/:legislature/states', (req, res) => PeopleController.getSingleLegislatureByState(req, res));
router.get('/:legislature/states/:state', (req, res) => PeopleController.getSingleLegislatureByState(req, res));
router.get('/:legislature/areas', (req, res) => PeopleController.getSingleLegislatureByMapitArea(req, res));
router.get('/:legislature/areas/:code', (req, res) => PeopleController.getSingleLegislatureByMapitArea(req, res));
router.get('/:legislature/parties', (req, res) => PeopleController.getSingleLegislatureByParty(req, res));

router.get('/honorables', (req, res) => PeopleController.getSingleLegislatures(req, res));
// router.get('/honorables/:slug', (req, res) => PeopleController.all(req, res));

router.get('/representatives', (req, res) => PeopleController.getSingleLegislatures(req, res));
// router.get('/representatives/:slug', (req, res) => PeopleController.all(req, res));

router.get('/senate', (req, res) => PeopleController.getSingleLegislatures(req, res));
router.get('/senators', (req, res) => PeopleController.getSingleLegislatures(req, res));
// router.get('/senate/:slug', (req, res) => PeopleController.all(req, res));

router.get('/governors', (req, res) => PeopleController.getSingleLegislatures(req, res));
// router.get('/governors/:slug', (req, res) => PeopleController.all(req, res));

router.get('/images', (req, res) => PeopleController.getAllPeopleWithValidImage(req, res));
export default router;
