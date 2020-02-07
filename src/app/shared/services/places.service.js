import ApiService from '@/app/shared/services/api.service';

export default class PlaceService {
  constructor() {
    this.baseUrl = '/places';
    this.client = new ApiService();
    this.mapit = new ApiService(process.env.VUE_APP_MAPIT_URL);
  }

  findPlacesPeopleBySlug(slug) {
    return this.client.get(`${this.baseUrl}/${slug}`);
  }

  findPlacesPeopleByLegislature(params) {
    return this.client.get(`${this.baseUrl}/${params.legislature}/${params.slug}`);
  }

  getGeometryGeoJson(id) {
    return this.mapit.get(`/area/${id}.geojson`);
  }

  getGeometry(id) {
    return this.mapit.get(`/area/${id}/geometry`);
  }
}
