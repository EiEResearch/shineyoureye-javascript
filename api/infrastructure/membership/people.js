import Sheets from 'api/infrastructure/services/sheets';
import CacheService from 'api/infrastructure/services/cache';
import Person from 'api/infrastructure/membership/person';
import Legislature from 'api/factory/legislature';
import logger from 'api/logger';

const cache = CacheService;
export default class People {
  constructor(legislature) {
    this.legislature = legislature;
  }

  async allPeople() {
    try {
      return cache.get(`${this.legislature}_allPeople`, async () => {
        const data = await cache.get(`${this.legislature}_allPeople_callback`, () => Sheets.get(this.legislature));
        const response = [];

        if (data.valueRanges === undefined) return response;

        data.valueRanges.map((res, index) => {
          const range = res.range.substring(0, res.range.indexOf('_')).toLowerCase().trim();
          const legislature = new Legislature(range).toJSON();

          response.push({
            organization: legislature.name,
            legislative_period: legislature.term,
            start_date: legislature.start_date,
            end_date: legislature.end_date,
            position: legislature.position,
            persons: [],
          });

          const { values } = res;

          for (let val = 1; val < values.length; val += 1) {
            const element = values[val];
            const identifier = values[0];
            const person = {
              [identifier[0]]: element[0],
              [identifier[1]]: element[1],
              [identifier[2]]: element[2],
              [identifier[3]]: element[3],
              [identifier[4]]: element[4],
              [identifier[5]]: element[5],
              [identifier[6]]: element[6],
              [identifier[7]]: element[7],
              [identifier[8]]: element[8],
              [identifier[9]]: element[9],
              [identifier[10]]: element[10],
              [identifier[11]]: element[11],
              [identifier[12]]: element[12],
              [identifier[13]]: element[13],
              [identifier[14]]: element[14],
              [identifier[15]]: element[15],
              [identifier[16]]: element[16],
              [identifier[17]]: element[17],
              [identifier[18]]: element[18],
              [identifier[19]]: element[19],
              [identifier[20]]: element[20],
            };

            const row = this.createPerson(person, legislature.slug);
            response[index].persons.push(row);
          }

          return response;
        });

        return response;
      });
    } catch (error) {
      logger(error);
    }
  }

  async allPeopleWithValidArea() {
    try {
      return cache.get(`${this.legislature}_allPeopleWithValidArea`, async () => {
        const data = await this.allPeople();
        let res = [];

        if (Array.isArray(data) && data.length < 1) return res;
        res = data.map((val) => {
          const filter = val.persons.filter(item => item.area && item.state);
          val.persons = filter;
          return val;
        });

        return res;
      });
    } catch (error) {
      logger(error);
    }
  }

  async allPeopleWithValidImage(size) {
    try {
      return cache.get(`${this.legislature}_allPeopleWithValidImage_${size}`, async () => {
        const data = await this.allPeopleWithValidArea();
        const res = [];

        if (Array.isArray(data) && data.length < 1) return res;

        for (let key = 0; key < data.length; key += 1) {
          const val = Object.assign({}, data[key]);
          const l = (size) ? parseInt(size, 10) : (val.persons).length;
          const people = val.persons.filter(item => item.images.url && item.party).slice(0, l);
          val.persons = [...cache.get(`${val.position}_allPeopleWithValidImage_${l}`, people)];
          res.push(val);
        }

        return res;
      });
    } catch (error) {
      logger(error);
    }
  }

  async allPeopleGroupedByState() {
    try {
      return cache.get(`${this.legislature}_allPeopleGroupedByState`, async () => {
        const data = await this.allPeopleWithValidArea();
        const res = [];

        if (Array.isArray(data) && data.length < 1) return res;

        for (let key = 0; key < data.length; key += 1) {
          const val = Object.assign({}, data[key]);
          // const people = val.persons.reduce((r, a) => {
          //   r[a.state] = [...r[a.state] || [], a];
          //   return r;
          // }, {});
          // val.persons = people;
          val.persons = cache.get(`${val.position}__allPeopleGroupedByState`, val.persons.reduce((r, a) => {
            r[a.state] = [...r[a.state] || [], a];
            return r;
          }, {}));

          res.push(val);
        }

        return res;
      });
    } catch (error) {
      logger(error);
    }
  }

  async allPeopleByState(state) {
    try {
      return cache.get(`${this.legislature}_allPeopleByState_${state}`, async () => {
        const data = await this.allPeopleWithValidArea();
        const res = [];

        if (Array.isArray(data) && data.length < 1) return res;

        for (let key = 0; key < data.length; key += 1) {
          const val = Object.assign({}, data[key]);
          // const people = val.persons
          //   .filter(s => (s.state || {}).toLowerCase().trim() === (state || '').toLowerCase().trim())
          //   .reduce((r, a) => {
          //   /**
          //    * r[a.state] = [...r[a.state]] || []
          //    * r[a.state].push(a)
          //    */
          //     r[a.state] = [...r[a.state] || [], a];
          //     return r;
          //   }, {});

          // val.persons = people;
          val.persons = cache.get(`${val.position}__allPeopleByState_${state}`, val.persons
            .filter(s => (s.state).toLowerCase().trim() === (state || '').toLowerCase().trim())
            .reduce((r, a) => {
              /**
           * r[a.state] = [...r[a.state]] || []
           * r[a.state].push(a)
           */
              r[a.state] = [...r[a.state] || [], a];
              return r;
            }, {}));

          res.push(val);
        }

        return res;
      });
    } catch (error) {
      logger(error);
    }
  }

  async allPeopleGroupedByMapitArea() {
    try {
      return cache.get(`${this.legislature}_allPeopleGroupedByMapitArea`, async () => {
        const data = await this.allPeopleWithValidArea();
        const res = [];

        if (Array.isArray(data) && data.length < 1) return res;

        for (let key = 0; key < data.length; key += 1) {
          const val = Object.assign({}, data[key]);
          // const people = val.persons.reduce((r, a) => {
          //   r[a.area.place.id] = [...r[a.area.place.id] || [], a];
          //   return r;
          // }, {});
          // val.persons = people;
          val.persons = cache.get(`${val.position}__allPeopleGroupedByMapitArea`, val.persons.reduce((r, a) => {
            r[a.area.place.id] = [...r[a.area.place.id] || [], a];
            return r;
          }, {}));

          res.push(val);
        }

        return res;
      });
    } catch (error) {
      logger(error);
    }
  }

  async allPeopleByMapitArea(mapitId) {
    try {
      return cache.get(`${this.legislature}_allPeopleByMapitArea_${mapitId}`, async () => {
        const data = await this.allPeopleWithValidArea();
        const res = [];

        if (Array.isArray(data) && data.length < 1) return res;

        for (let key = 0; key < data.length; key += 1) {
          const val = Object.assign({}, data[key]);
          // const people = val.persons
          //   .filter(s => (s.area.place.id.toString() || 0) === (mapitId.toString() || 0))
          //   .reduce((r, a) => {
          //   /**
          //    * r[a.area.place.id] = [...r[a.area.place.id]] || []
          //    * r[a.area.place.id].push(a)
          //    */
          //     r[a.area.place.id] = [...r[a.area.place.id] || [], a];
          //     return r;
          //   }, {});

          // val.persons = people;
          val.persons = cache.get(`${val.position}__allPeopleByMapitArea_${mapitId}`, val.persons
            .filter(s => (s.area.place.id) === (mapitId || 0))
            .reduce((r, a) => {
              /**
           * r[a.area] = [...r[a.area]] || []
           * r[a.area].push(a)
           */
              r[a.area.place.id] = [...r[a.area.place.id] || [], a];
              return r;
            }, {}));

          res.push(val);
        }

        return res;
      });
    } catch (error) {
      logger(error);
    }
  }

  async allPeopleGroupedByParty() {
    try {
      return cache.get(`${this.legislature}_allPeopleGroupedByParty`, async () => {
        const data = await this.allPeopleWithValidArea();
        const res = [];

        if (Array.isArray(data) && data.length < 1) return res;

        for (let key = 0; key < data.length; key += 1) {
          const val = Object.assign({}, data[key]);
          // const people = val.persons.reduce((r, a) => {
          //   r[a.party] = [...r[a.party] || [], a];
          //   return r;
          // }, {});
          // val.persons = people;
          val.persons = cache.get(`${val.position}__allPeopleGroupedByParty`, val.persons.reduce((r, a) => {
            r[a.party] = [...r[a.party] || [], a];
            return r;
          }, {}));

          res.push(val);
        }

        return res;
      });
    } catch (error) {
      logger(error);
    }
  }

  async singlePersonBySlug(slug) {
    try {
      return cache.get(`politician_${slug}`, async () => {
        const data = await this.allPeopleWithValidArea();
        const res = [];

        if (Array.isArray(data) && data.length < 1) return res;

        for (let key = 0; key < data.length; key += 1) {
          const val = Object.assign({}, data[key]);
          const people = val.persons.filter(item => (item.slug).toLowerCase().trim() === (slug || '').toLowerCase().trim());
          if (people && people.length) {
            val.persons = [...people];
            res.push(val);
            break;
          }
        }

        return res;
      });
    } catch (error) {
      logger(error);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  createPerson(row, slug) {
    return (new Person(row, slug)).toJSON();
  }
}
