import { DateTime } from 'luxon';
import { env } from 'api/helper';

export default class Legislature {
  constructor(slug) {
    switch ((slug || '').toLowerCase()) {
      case 'senator':
      case 'senators':
      case 'senate':
        return this.senators();
      case 'representative':
      case 'representatives':
        return this.representatives();
      case 'governor':
      case 'governors':
        return this.governor();
      case 'honorables':
      case 'honorable':
        return this.honorables();
      case 'localgovernment':
      case 'localgovernments':
        return this.localGovernment();
      case 'local-government':
      case 'local-governments':
        return this.localGovernment();
      default:
        return this;
    }
  }

  TENURE_TERM = env.legislatureTenureTerm;

  TENURE_DATE = env.legislatureStartDate;

  governor() {
    this.slug = 'Governors';
    this.name = 'Governors';
    this.position = 'Governor';
    this.term = 'Executive';
  }

  representatives() {
    this.slug = 'Representatives';
    this.name = 'House of Representatives';
    this.position = 'Federal Representative';
    this.term = this.TENURE_TERM;
  }

  senators() {
    this.slug = 'Senate';
    this.name = 'Senate';
    this.position = 'Senator';
    this.term = this.TENURE_TERM;
  }

  honorables() {
    this.slug = 'Honorables';
    this.name = 'State Houses of Assembly';
    this.position = 'State Representative';
    this.term = 'State Legislature';
  }

  localGovernment() {
    this.slug = 'LocalGovernment';
    this.name = 'Local Government';
    this.position = 'Local Government';
    this.term = 'Local Government Council';
  }

  toJSON() {
    return {
      slug: this.slug || '',
      name: this.name || '',
      start_date: DateTime.fromISO(this.TENURE_DATE).toISODate(),
      end_date: DateTime.fromISO(this.TENURE_DATE).plus({ years: 4 }).toISODate(),
      term: this.term || '',
      position: this.position || '',
    };
  }
}
