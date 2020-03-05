import {
  getSlug, env,
} from 'api/helper';
import logger from 'api/logger';
import Mappings from 'api/infrastructure/mapit/mappings';

export default class Place {
  constructor(place) {
    this.place = place;
    this.baseurl = '/place/';
    // this.baseurl = (place.legislature) ? `/place/${(place.legislature).toLowerCase().trim()}/` : '/place/';
  }

  area() {
    try {
      const mappings = new Mappings(this.place).areaFromMapitId();
      return Object.freeze(mappings);
    } catch (error) {
      logger(error);
    }
  }

  parentArea() {
    try {
      const area = this.area();
      if (area && Object.keys(area).length) {
        return new Mappings({
          legislature: this.place.legislature,
          id: area.parent_area,
        }).areaFromMapitParentId() || {};
      }

      return null;
    } catch (error) {
      logger(error);
    }
  }

  stateArea() {
    try {
      const mappings = new Mappings({
        legislature: 'Governors',
        name: this.place.name,
      }).areaFromMapitName();
      return mappings || {};
    } catch (error) {
      logger(error);
    }
  }

  get slug() {
    const area = this.area();
    return area && Object.keys(area).length ? getSlug(area.name) : '';
  }

  thumbnailImage() {
    try {
      if (['governor', 'governors'].includes((this.place.legislature || '').toLowerCase())) {
        return `${env.imageUrl}/${env.localImageThumbnailUrl}/${this.slug}.jpg`;
      }

      return `${env.imageUrl}/${env.localImageUrl}/place-250x250.png`;
    } catch (error) {
      logger(error);
    }
  }


  toJSON() {
    return {
      place: this.area(),
      place_url: this.slug,
      url: `${this.baseurl}${this.slug}`,
      image: {
        url: this.thumbnailImage(),
      },
      parent_place: this.parentArea(),
      state_place: this.stateArea(),
    };
  }
}
