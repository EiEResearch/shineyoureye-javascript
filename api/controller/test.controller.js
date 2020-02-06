/* eslint-disable class-methods-use-this */
import Mappings from 'api/infrastructure/mapit/mappings';
import People from 'api/infrastructure/membership/people';
import Legislature from '../factory/legislature';

require('dotenv').config({ path: '../.env' });

class TestController {
  // eslint-disable-next-line class-methods-use-this
  async single(req, res) {
    const data = new People('all');
    const people = await data.singlePersonBySlug('ossy-chinedu-prestige');
    const x = new Legislature();

    return res.json({
      data: { people, x },
    });
  }

  mappings(req, res) {
    const data = new Mappings({ id: 3 });

    return res.json({
      data: {
        return: data.linkedAreasFromMapitSlug('agege'),
      },
    });
  }
}


export default new TestController();
