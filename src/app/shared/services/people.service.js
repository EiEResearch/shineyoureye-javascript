import ApiService from '@/app/shared/services/api.service';

export default class PeopleService {
  constructor(legislature) {
    this.legislature = legislature;
    this.baseUrl = '/people/';
    this.client = ApiService;
  }

  findAll() {
    const path = `${this.baseUrl + this.legislature}`;
    return this.client.get(path);
  }

  findAllByParty() {
    const path = `${this.baseUrl + this.legislature}/parties`;
    return this.client.get(path);
  }

  findAllByStates(state) {
    const path = `${this.baseUrl + this.legislature}/${state !== undefined ? `states/${state}` : 'states'}`;
    return this.client.get(path);
  }

  findPoliticianBySlug(slug) {
    const path = `${`${this.baseUrl}politicians`}/${slug}`;
    return this.client.get(path);
  }
}
