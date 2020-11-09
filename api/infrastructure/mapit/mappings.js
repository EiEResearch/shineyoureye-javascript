/* eslint-disable import/no-dynamic-require */
/* eslint-disable default-case */
import { env, getSlug } from 'api/helper';
import logger from 'api/logger';


const lga = require(`${env.mapit}/LGA.json`);
const sta = require(`${env.mapit}/STA.json`);
const fed = require(`${env.mapit}/FED.json`);
const sen = require(`${env.mapit}/SEN.json`);
const mapitPlaces = require(`${env.mapit}/mapit.json`);

export default class Mappings {
  constructor(place) {
    this.legislature = place.legislature || '';
    this.placeId = place.id || '';
    this.placeName = place.name || '';
  }

  areaFromMapitId() {
    try {
      const mapit = this.placesTypeData();
      const id = this.placeId;

      if (id) return mapit[id];
      return null;
    } catch (error) {
      logger(error);
    }
  }

  linkedAreasFromMapitId() {
    const area = this.areaFromMapitId();
    if (area) return mapitPlaces[area.type].find(mapit => String(mapit.id) === String(area.id));
    return null;
  }

  areaFromMapitParentId() {
    try {
      const mapit = this.placesParentTypeData();
      const id = this.placeId;

      if (id) return mapit[id];
      return null;
    } catch (error) {
      logger(error);
    }
  }

  linkedAreasFromMapitParentId() {
    const area = this.areaFromMapitParentId();
    if (area) return mapitPlaces[area.type].find(mapit => String(mapit.id) === String(area.id));
    return null;
  }

  areaFromMapitName() {
    try {
      const mapit = this.placesTypeData();
      const name = this.placeName || '';
      const match = Object.keys(mapit).filter(key => (mapit[key].name || '').toLowerCase().trim() === name.toLowerCase().trim());

      if (match) return mapit[match];
      return null;
    } catch (error) {
      logger(error);
    }
  }

  linkedAreasFromMapitName() {
    const area = this.areaFromMapitName();
    if (area) return mapitPlaces[area.type].find(mapit => String(mapit.id) === String(area.id));
    return null;
  }

  otherAreas() {
    const a = this.areaFromMapitName();
    return mapitPlaces[a.type].find(i => i.id === a.id);
  }

  areaFromMapitSlug(slug) {
    try {
      const mapit = this.placesTypeData();
      const match = Object.keys(mapit).filter(key => (getSlug(mapit[key].name) || '').toLowerCase().trim() === (slug || '').toLowerCase().trim());

      if (match) return mapit[match];
      return null;
    } catch (error) {
      logger(error);
    }
  }

  linkedAreasFromMapitSlug(slug) {
    const area = this.areaFromMapitSlug(slug);
    if (area) return mapitPlaces[area.type].find(mapit => String(mapit.id) === String(area.id));
    return null;
  }

  placesTypeData() {
    try {
      switch ((this.legislature || '').toLowerCase().trim()) {
        case 'governor':
        case 'governors':
          return sta;
        case 'representative':
        case 'representatives':
          return fed;
        case 'senator':
        case 'senators':
        case 'senate':
          return sen;
        case 'localgovernment':
        case 'localgovernments':
        case 'honorables':
        case 'honorable': 
          return lga;
        default:
          return {
            ...sta, ...fed, ...sen, ...lga,
          };
      }
    } catch (error) {
      logger(error);
    }
  }

  placesParentTypeData() {
    try {
      switch ((this.legislature || '').toLowerCase().trim()) {
        case 'senator':
        case 'senators':
        case 'senate':
          return sta;
        case 'localgovernment':
        case 'localgovernments':
        case 'honorables':
        case 'honorable':
          return sen;
        default:
          return {};
      }
    } catch (error) {
      logger(error);
    }
  }
}
