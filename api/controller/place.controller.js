/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
/* eslint-disable class-methods-use-this */
import Mappings from 'api/infrastructure/mapit/mappings';
import People from 'api/infrastructure/membership/people';
import logger from 'api/logger';
import Legislature from 'api/factory/legislature';

class PlaceController {
  GLOBAL_LEGISLATURE = 'all';

  getAllMapitAreasByLegistureOrArea(params) {
    try {
      const { legislature, slug } = params;
      const mapit = new Mappings({ legislature });
      return mapit.linkedAreasFromMapitSlug(slug);
    } catch (error) {
      logger(error);
    }
  }

  getPeopleByAreaId(people, keys, legislature) {
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

  async getPeopleFromAllMapitAreas(req, res) {
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

      const { legislature, slug } = req.params;
      const mapit = self.getAllMapitAreasByLegistureOrArea({ legislature, slug });

      if (mapit) {
        const { id, ...places } = mapit;
        data.place = new Mappings({ legislature, id }).areaFromMapitId();
        const politicians = await new People(this.GLOBAL_LEGISLATURE).allPeopleWithValidArea();
        Object.keys(places).map((key) => {
          switch ((key || '').toUpperCase()) {
            case 'STA':
              const govLegislature = new Legislature('governor').toJSON();
              data.people.governor = self.getPeopleByAreaId(politicians, places[key], govLegislature);
              break;
            case 'SEN':
              const senLegislature = new Legislature('senate').toJSON();
              data.people.senate = self.getPeopleByAreaId(politicians, places[key], senLegislature);

              break;
            case 'FED':
              const fedLegislature = new Legislature('representatives').toJSON();
              data.people.representatives = self.getPeopleByAreaId(politicians, places[key], fedLegislature);

              break;
            case 'LGA':
              const honLegislature = new Legislature('honorables').toJSON();
              data.people.honorables = self.getPeopleByAreaId(politicians, places[key], honLegislature);

              break;
          }

          return key;
        });
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
}

export default new PlaceController();
