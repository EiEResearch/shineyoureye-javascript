import ApiService from '@/app/shared/services/api.service';

export default class PlaceService {
  constructor() {
    this.baseUrl = '/places';
    this.client = new ApiService();
  }

  findPlacesPeopleBySlug(slug) {
    return this.client.get(`${this.baseUrl}/${slug}`);
  }

  findPlacesPeopleByLegislature(params) {
    return this.client.get(`${this.baseUrl}/${params.legislature}/${params.slug}`);
  }

  getGeometryGeoJson(id) {
    return this.client.get(`${this.baseUrl}/${id}/geojson`);
  }

  getGeometry(id) {
    return this.client.get(`${this.baseUrl}/${id}/geometry`);
  }
}
