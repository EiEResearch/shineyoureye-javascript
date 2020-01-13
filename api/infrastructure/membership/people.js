import Sheets from 'api/infrastructure/helpers/sheets';
import Person from 'api/infrastructure/membership/person';
import Legislature from 'api/factory/legislature';
import logger from 'api/logger';

export default class People {
  constructor(legislature) {
    this.legislature = legislature;
  }

  async allPeople() {
    try {
      const data = await Sheets.get(this.legislature);
      const response = [];

      if (data.valueRanges === undefined) return response;

      data.valueRanges.map((res, index) => {
        const range = res.range.substring(0, res.range.indexOf('_')).toLowerCase();
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
    } catch (error) {
      logger(error);
    }
  }

  async allPeopleWithValidArea() {
    try {
      const data = await this.allPeople();
      let res = [];

      if (!data) return res;
      res = data.map((val) => {
        const people = val.persons.filter(item => item.area && item.state);
        val.persons = [...people];
        return val;
      });

      return res;
    } catch (error) {
      logger(error);
    }
  }

  async allPeopleWithValidImage(size) {
    try {
      const data = await this.allPeopleWithValidArea();
      let res = [];

      if (!data) return res;

      res = data.map((val) => {
        const l = (size) ? parseInt(size, 10) : (val.persons || {}).length;
        const people = val.persons.filter(item => item.images.image_url).slice(0, l);
        val.persons = [...people];
        return val;
      });

      return res;
    } catch (error) {
      logger(error);
    }
  }

  async allPeopleGroupedByState() {
    try {
      const data = await this.allPeopleWithValidArea();
      let res = [];

      if (!data) return res;
      res = data.map((val) => {
        const people = val.persons.reduce((r, a) => {
          r[a.state] = [...r[a.state] || [], a];
          return r;
        }, {});
        val.persons = people;
        return val;
      });

      return res;
    } catch (error) {
      logger(error);
    }
  }

  async allPeopleByState(state) {
    try {
      const data = await this.allPeopleWithValidArea();
      let res = [];

      if (!data) return res;
      res = data.map((val) => {
        const people = val.persons
          .filter(s => (s.state || {}).toLowerCase() === (state || '').toLowerCase())
          .reduce((r, a) => {
          /**
           * r[a.state] = [...r[a.state]] || []
           * r[a.state].push(a)
           */
            r[a.state] = [...r[a.state] || [], a];
            return r;
          }, {});

        val.persons = people;
        return val;
      });

      return res;
    } catch (error) {
      logger(error);
    }
  }

  async allPeopleGroupedByMapitArea() {
    try {
      const data = await this.allPeopleWithValidArea();
      let res = [];

      if (!data) return res;
      res = data.map((val) => {
        const people = val.persons.reduce((r, a) => {
          r[a.area] = [...r[a.area] || [], a];
          return r;
        }, {});
        val.persons = people;
        return val;
      });

      return res;
    } catch (error) {
      logger(error);
    }
  }

  async allPeopleByMapitArea(mapitId) {
    try {
      const data = await this.allPeopleWithValidArea();
      let res = [];

      if (!data) return res;
      res = data.map((val) => {
        const people = val.persons
          .filter(s => (s.area.toString() || 0) === (mapitId.toString() || 0))
          .reduce((r, a) => {
          /**
           * r[a.area] = [...r[a.area]] || []
           * r[a.area].push(a)
           */
            r[a.area] = [...r[a.area] || [], a];
            return r;
          }, {});

        val.persons = people;
        return val;
      });

      return res;
    } catch (error) {
      logger(error);
    }
  }

  async allPeopleGroupedByParty() {
    try {
      const data = await this.allPeopleWithValidArea();
      let res = [];

      if (!data) return res;
      res = data.map((val) => {
        const people = val.persons.reduce((r, a) => {
          r[a.party] = [...r[a.party] || [], a];
          return r;
        }, {});
        val.persons = people;
        return val;
      });

      return res;
    } catch (error) {
      logger(error);
    }
  }

  async singlePersonBySlug(slug) {
    try {
      const data = await this.allPeopleWithValidArea();
      const res = [];

      if (!data) return res;

      for (let key = 0; key < data.length; key += 1) {
        const val = data[key];
        const people = val.persons.filter(item => (item.slug || '').toLowerCase() === (slug || '').toLowerCase());
        if (people && people.length) {
          val.persons = [...people];
          res.push(val);
          break;
        }
      }

      return res;
    } catch (error) {
      logger(error);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  createPerson(row, slug) {
    return (new Person(row, slug)).toJSON();
  }
}
