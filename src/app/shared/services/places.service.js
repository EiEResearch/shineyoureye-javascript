import ApiService from '@/app/shared/services/api.service';

export default class PlaceService {
  constructor() {
    this.baseUrl = '/places';
    this.client = new ApiService();
    this.mapit = new ApiService('http://nigeria.mapit.mysociety.org/area/');
  }

  findPlacesPeopleBySlug(slug) {
    return this.client.get(`${this.baseUrl}/${slug}`);
  }

  findPlacesPeopleByLegislature(params) {
    return this.client.get(`${this.baseUrl}/${params.legislature}/${params.slug}`);
  }

  getGeometryGeoJson(id) {
    return this.mapit.get(`${id}.geojson`);
  }

  getGeometry(id) {
    return this.mapit.get(`${id}/geometry`);
  }
}
