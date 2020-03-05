/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
/* eslint-disable class-methods-use-this */
import Mappings from 'api/infrastructure/mapit/mappings';
import People from 'api/infrastructure/membership/people';
import Place from 'api/infrastructure/mapit/place';
import logger from 'api/logger';
import Legislature from 'api/factory/legislature';
import CacheService from 'api/infrastructure/services/cache';
import ApiService from 'api/infrastructure/services/api.service';
import { env } from 'api/helper';

const cache = CacheService;
class PlaceController {
  constructor() {
    this.GLOBAL_LEGISLATURE = 'all';
  }

  findAllMapitAreasByLegistureOrArea(params) {
    try {
      const { legislature, slug } = params;
      const mapit = new Mappings({ legislature });
      return mapit.linkedAreasFromMapitSlug(slug);
    } catch (error) {
      logger(error);
    }
  }

  findPeopleByAreaId(people, keys, legislature) {
    try {
      const obj = [];

      if (!people) return obj;
      keys.map((item) => {
        const a = people.find(i => i.position === legislature.position).persons.filter(el => el.area.place.id === item);
        a.forEach((element) => {
          if (a) obj.push(element);
        });
        return a;
      });

      return obj;
    } catch (error) {
      logger(error);
    }
  }

  async getPeopleFromAllMapitAreas(mapit) {
    try {
      const self = this;
      const data = {
        place: {},
        people: {
          honorables: '',
          representatives: '',
          senate: '',
          governor: '',
        },
      };

      const { id, ...places } = mapit;
      data.place = new Mappings({ id }).areaFromMapitId();
      const politicians = await new People(this.GLOBAL_LEGISLATURE).allPeopleWithValidArea();
      Object.keys(places).map((key) => {
        switch ((key || '').toUpperCase()) {
          case 'STA':
            const govLegislature = new Legislature('governor').toJSON();
            data.people.governor = self.findPeopleByAreaId(politicians, places[key], govLegislature);
            break;
          case 'SEN':
            const senLegislature = new Legislature('senate').toJSON();
            data.people.senate = self.findPeopleByAreaId(politicians, places[key], senLegislature);

            break;
          case 'FED':
            const fedLegislature = new Legislature('representatives').toJSON();
            data.people.representatives = self.findPeopleByAreaId(politicians, places[key], fedLegislature);

            break;
          case 'LGA':
            const honLegislature = new Legislature('honorables').toJSON();
            data.people.honorables = self.findPeopleByAreaId(politicians, places[key], honLegislature);

            break;
        }

        return key;
      });

      return data;
    } catch (error) {
      logger(error);
    }
  }

  async getPeopleFromMapitAreas(req, res) {
    try {
      const { legislature, slug } = req.params;
      const mapit = this.findAllMapitAreasByLegistureOrArea({ legislature, slug });

      if (!mapit) {
        req.err.error.message = 'Sorry, no area matches the given query';
        req.err.error.code = 404;
        req.err.error.details = req.query;
        res.status(404);
        return res.json(req.err);
      }

      const data = await this.getPeopleFromAllMapitAreas(mapit, legislature) || {};

      res.status(200);
      return res.json({
        success: true,
        message: 'data found',
        data,
      });
    } catch (error) {
      logger(error);
    }
  }

  async getPollingUnitData(unit) {
    try {
      const result = await cache.get(`${unit}_getPollingUnitData`, async () => {
        const client = new ApiService(env.pollingUnitUrl);
        const { data } = await client.get(`?lookup=${unit}`);
        return data;
      });

      return result;
    } catch (error) {
      logger(error);
    }
  }

  async getAreaFromMapitId(req, res) {
    try {
      let data;
      const pollingUnit = req.query.lookup;

      const puLookup = await this.getPollingUnitData(pollingUnit);

      if (puLookup) data = new Place({ id: puLookup.area.id }).toJSON();
      if (!data || !puLookup) {
        req.err.error.message = 'Sorry, no area matches the given query';
        req.err.error.code = 404;
        req.err.error.details = req.query;
        res.status(404);
        return res.json(req.err);
      }

      res.status(200);
      return res.json({
        success: true,
        message: 'data found',
        data,
      });
    } catch (error) {
      logger(error);
    }
  }

  async getGeometryGeoJson(req, res) {
    try {
      const { placeId } = req.params;

      const result = await cache.get(`${placeId}_getGeometryGeoJson`, async () => {
        const client = new ApiService(env.mapitUrl);
        const { data } = await client.get(`/area/${placeId}.geojson`);
        return data;
      });

      res.status(200);
      return res.json({
        success: true,
        message: 'data found',
        data: result,
      });
    } catch (error) {
      logger(error);
      req.err.error.message = 'Sorry, no area matches the given query';
      req.err.error.code = 404;
      req.err.error.details = req.query;

      res.status(404);
      return res.json(req.err);
    }
  }

  async getGeometryData(req, res) {
    try {
      const { placeId } = req.params;

      const result = await cache.get(`${placeId}_getGeometryData`, async () => {
        const client = new ApiService(env.mapitUrl);
        const { data } = await client.get(`/area/${placeId}/geometry`);
        return data;
      });

      res.status(200);
      return res.json({
        success: true,
        message: 'data found',
        data: result,
      });
    } catch (error) {
      logger(error);
      req.err.error.message = 'Sorry, no area matches the given query';
      req.err.error.code = 404;
      req.err.error.details = req.query;

      res.status(404);
      return res.json(req.err);
    }
  }
}

export default new PlaceController();
