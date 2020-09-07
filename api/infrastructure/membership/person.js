import {
  getSlug, first, last, env,
} from 'api/helper';
import FilePathsHelper from 'api/infrastructure/helpers/file-path';
import Finder from 'api/infrastructure/document/finder';
import Place from 'api/infrastructure/mapit/place';
import CacheService from 'api/infrastructure/services/cache';

import logger from 'api/logger';

const cache = CacheService;

export default class Person {
    SIZE = ['thumbnail', 'medium', 'original'];

    TWITTER_URL = 'https://twitter.com/';
    INSTAGRAM_URL = 'https://instagram.com/';

    ALLOWED_IMAGE_SIZES = {
      thumbnail: '100x100',
      medium: '250x250',
      original: 'original',
    };

    constructor(person, slug, baseurl = '/person/') {
      this.person = person;
      this.legislature_slug = slug;
      this.baseurl = baseurl;

      Object.freeze(this.ALLOWED_IMAGE_SIZES);
      Object.freeze(this.SIZE);
    }

    get thumbnailImageUrl() {
      return this.proxyImageVariant(this.SIZE[0]);
    }

    get mediumImageUrl() {
      return this.proxyImageVariant(this.SIZE[1]);
    }

    get originalImageUrl() {
      return this.proxyImageVariant(this.SIZE[2]);
    }

    proxyImageVariant(size) {
      if (!this.person.image_url) {
        return `${env.imageUrl}/${env.localImageUrl}/person-250x250.png`;
      }

      this.raiseUnlessImageSizeAvailable(size);
      const proxyImageBaseUrl = `${env.imageUrl}/${this.legislature_slug}/${this.person.id}/`;
      return `${proxyImageBaseUrl + this.ALLOWED_IMAGE_SIZES[size]}.jpeg`;
    }

    raiseUnlessImageSizeAvailable(size) {
      const errorMessage = `Size ${size} is not known to be available`;
      if (!this.ALLOWED_IMAGE_SIZES[size]) {
        throw new Error(errorMessage);
      }
    }

    summaryFinder() {
      try {
        const path = new FilePathsHelper();
        const baseurl = '';
        return new Finder(path.summaryPattern(this.person.id), baseurl).findOrEmpty;
      } catch (error) {
        logger(eror);
      }
    }

    mapit() {
      const place = { legislature: this.legislature_slug, id: this.person.mapit_id, name: this.person.state };
      return cache.get(`mapit_${place.id}_${place.legislature}`, (new Place(place).toJSON()));
    }

    // Person Attribute
    toJSON() {
      const summary = this.summaryFinder();
      const mapit = this.mapit();

      return {
        id: this.person.id,
        title: this.person.honorific_prefix || '',
        name: this.person.name,
        official_name: (this.person.name || '').toString().split(/(\s).+\s/).join(''),
        state: this.person.state || '',
        area: mapit,
        party: this.person.party || '',
        birth_date: this.person.birth_date || '',
        gender: this.person.gender || '',
        slug: (this.person.identifier_shineyoureye) ? this.person.identifier_shineyoureye : getSlug(this.person.name || ''),
        url: (this.person.identifier_shineyoureye) ? this.baseurl + this.person.identifier_shineyoureye : this.baseurl + getSlug(this.person.name || ''),
        summary_doc: {
          title: summary.title || '',
          slug: summary.title || '',
          published: summary.published || '',
          featured: summary.featured || '',
          url: summary.url || '',
          author: summary.author || '',
          body: summary.body || '',
        },
        address: {
          postal_address: {
            type: 'postal address',
            value: this.person.postal_address || '',
          },
          district: {
            type: 'district',
            value: this.person.district || '',
          },
        },
        other_names: (this.person.other_names) ? (this.person.other_names.toString().split(';')) : [],
        // Section deals with a Person's contact attributes
        contact: {
          phone: {
            type: 'phone',
            value: (this.person.phone) ? (this.person.phone.toString().split(';').join(', ')) : '',
            note: '',
          },
          email: {
            type: 'email',
            value: first(this.person.email),
            note: (this.person.email) ? `mailto:${this.person.email}` : '',
          },
          facebook: {
            type: 'facebook',
            value: last(this.person.facebook_url, '/'),
            note: last(this.person.facebook_url),
          },
          twitter: {
            type: 'twitter',
            value: (this.person.twitter) ? `@${first(this.person.twitter)}` : '',
            note: (this.person.twitter) ? this.TWITTER_URL + first(this.person.twitter) : '',
          },
          instagram: {
            type: 'instagram',
            value: (this.person.instagram) ? `${first(this.person.instagram)}` : '',
            note: (this.person.instagram) ? this.INSTAGRAM_URL + first(this.person.instagram) : '',
          },
        },
        // Section deals with a Person's image
        images: {
          thumbnail: {
            url: this.thumbnailImageUrl,
          },
          medium: {
            url: this.mediumImageUrl,
          },
          original: {
            url: this.originalImageUrl,
          },
          url: this.person.image_url || '',
        },
        // Section deals with a Person's external links
        links: {
          wikipedia: {
            note: 'wikipedia',
            url: this.person.wikipedia_url || '',
          },
          website: {
            note: 'website',
            url: this.person.website_url || '',
          },
        },
        // Section deals with other attributes
        identifiers: {
          official_position: {
            identifier: 'official_position',
            value: this.person.official_position || '',
          },
          official_position_order: {
            identifier: 'official_position_order',
            value: this.person.official_postiton_order || '',
          },
        },
      };
    }
}
