import Person from 'api/infrastructure/membership/person';

const personData = {
  id: 'gov:victor-okezie-ikpeazu',
  honorific_prefix: 'Dr',
  name: 'Victor Okezie Ikpeazu',
  state: 'Abia',
  mapit_id: 2,
  party: 'Peoples Democratic Party',
  email: 'info@abiastate.gov.ng',
  phone: '2348053387018',
  identifier_shineyoureye: 'okezie-ikpeazu',
  image_url: 'http://www.shineyoureye.org/media_root/images/Abia_-_Okezie_Ikpeazu.jpg',
  postal_address: '',
  district: '',
  gender: 'Male',
  birth_date: '1964-10-18',
  other_names: 'Okezie Ikpeazu',
  twitter: 'GovernorIkpeazu',
  instagram: 'okezie-ikpeazu',
  facebook_url: 'https://www.facebook.com/OyoStateGovernment;http://www.facebook.com/AbiolaAjimobi',
  wikipedia_url: undefined,
  website_url: 'http://ekitistate.gov.ng/',
  official_position: undefined,
  official_postiton_order: undefined,
};

const personEmpty = () => {
  const obj = Object.assign({}, personData);
  Object.keys(obj).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      obj[key] = null;
    }
  });

  return obj;
};
describe('Membership::Person', () => {
  describe('person proxy images', () => {
    let person = new Person(personData, 'Governors');

    test('should have a thumbnail image', () => {
      expect(person.thumbnailImageUrl).toEqual(expect.stringContaining('100x100.jpeg'));
    });

    test('should have a URL for a medium-sized-image', () => {
      expect(person.mediumImageUrl).toEqual(expect.stringContaining('250x250.jpeg'));
    });

    test('should have a URL for the original-sized image', () => {
      expect(person.originalImageUrl).toEqual(expect.stringContaining('original.jpeg'));
    });

    test('uses the legislature slug in the proxy image url', () => {
      expect(person.thumbnailImageUrl).toEqual(expect.stringContaining('Governors'));
    });

    test('uses the person id in the proxy image url', () => {
      expect(person.thumbnailImageUrl).toEqual(expect.stringContaining('gov:victor-okezie-ikpeazu'));
    });

    test('throws an exception if the image size does not exist', () => {
      expect(() => person.proxyImageVariant('tiny')).toThrowError();
      expect(() => person.proxyImageVariant('tiny')).toThrowError('tiny');
    });

    test('should return nil if there is no image', () => {
      person = new Person(personEmpty(), 'Governors');
      expect(person.thumbnailImageUrl).toEqual(expect.stringContaining('/person-250x250.png'));
      expect(person.mediumImageUrl).toEqual(expect.stringContaining('/person-250x250.png'));
      expect(person.originalImageUrl).toEqual(expect.stringContaining('/person-250x250.png'));
    });
  });

  describe('when person is not empty', () => {
    let person = new Person(personData, 'Governors').toJSON();

    test('has a twitter display', () => {
      expect(person.contact.twitter.value).toEqual(expect.stringContaining('@GovernorIkpeazu'));
    });

    test('should have a twitter url', () => {
      expect(person.contact.twitter.note).toEqual(expect.stringContaining('https://twitter.com/GovernorIkpeazu'));
    });

    test('has an instagram display', () => {
      expect(person.contact.instagram.value).toEqual(expect.stringContaining('okezie-ikpeazu'));
    });

    test('should have an instagram url', () => {
      expect(person.contact.instagram.note).toEqual(expect.stringContaining('https://instagram.com/okezie-ikpeazu'));
    });    

    test('has a facebook display', () => {
      expect(person.contact.facebook.value).toEqual(expect.stringContaining('AbiolaAjimobi'));
    });

    test('should have a facebook url', () => {
      expect(person.contact.facebook.note).toEqual(expect.stringContaining('http://www.facebook.com/AbiolaAjimobi'));
    });

    test('has an email display', () => {
      expect(person.contact.email.value).toEqual(expect.stringContaining('info@abiastate.gov.ng'));
    });

    test('has an email url', () => {
      expect(person.contact.email.note).toEqual(expect.stringContaining('mailto:info@abiastate.gov.ng'));
    });

    test('should have an id', () => {
      expect(person.id).toBe('gov:victor-okezie-ikpeazu');
    });

    test('should have a full name', () => {
      expect(person.name).toBe('Victor Okezie Ikpeazu');
    });

    test('should have an official name', () => {
      expect(person.official_name).toBe('Victor Ikpeazu');
    });

    test('should have a date of birth', () => {
      expect(person.birth_date).toBe('1964-10-18');
    });

    test('should have a phone number', () => {
      expect(person.contact.phone.value).toBe('2348053387018');
    });

    test('should not have a wikipedia url', () => {
      expect(person.links.wikipedia.url).toBe('');
    });

    test('should know its mapit area id', () => {
      expect(person.area.place.id).toBe(2);
    });

    test('should know its title if given', () => {
      expect(person.title).toBe('Dr');
    });

    test('should know its state', () => {
      expect(person.state).toBe('Abia');
    });

    test('should know its gender', () => {
      expect(person.gender).toBe('Male');
    });

    test('should know its party name', () => {
      expect(person.party).toBe('Peoples Democratic Party');
    });

    test('should know its slug', () => {
      expect(person.slug).toBe('okezie-ikpeazu');
    });

    test('should have an image', () => {
      expect(person.images.url).toEqual('http://www.shineyoureye.org/media_root/images/Abia_-_Okezie_Ikpeazu.jpg');
    });

    test('should know its url if slug is given', () => {
      expect(person.url).toBe('/person/okezie-ikpeazu');
    });

    test('should know its slug if not given', () => {
      personData.identifier_shineyoureye = '';
      person = new Person(personData, 'Governors').toJSON();
      expect(person.slug).toBe('victor-okezie-ikpeazu');
    });

    test('should know its url if slug is not given', () => {
      personData.identifier_shineyoureye = '';
      person = new Person(personData, 'Governors').toJSON();
      expect(person.url).toBe('/person/victor-okezie-ikpeazu');
    });
  });

  describe('when person is empty', () => {
    const person = new Person(personEmpty(), 'Governors').toJSON();

    test('should return nil for display if not twitter', () => {
      expect(person.contact.twitter.value).toEqual('');
    });

    test('should return nil for url if not twitter', () => {
      expect(person.contact.twitter.note).toEqual('');
    });

    test('should return nil for display if not instagram', () => {
      expect(person.contact.instagram.value).toEqual('');
    });

    test('should return nil for url if not instagram', () => {
      expect(person.contact.instagram.note).toEqual('');
    });    

    test('should return nil for display if not facebook', () => {
      expect(person.contact.facebook.value).toEqual('');
    });

    test('should return nil for url if not facebook', () => {
      expect(person.contact.facebook.note).toEqual('');
    });

    test('should return nil for display if not email', () => {
      expect(person.contact.email.value).toEqual('');
    });

    test('should return nil for url if not email', () => {
      expect(person.contact.email.note).toEqual('');
    });

    test('should return nil if no image', () => {
      expect(person.images.url).toEqual('');
    });

    test('should return nil if no date of birth', () => {
      expect(person.birth_date).toBe('');
    });

    test('should return nil if no phone', () => {
      expect(person.contact.phone.value).toBe('');
    });

    test('should return nil if no party', () => {
      expect(person.party).toBe('');
    });

    test('should return nil if no slug', () => {
      expect(person.slug).toBe('');
    });

    test('should return nil if no title', () => {
      expect(person.title).toBe('');
    });

    test('should return nil if no state', () => {
      expect(person.state).toBe('');
    });

    test('should return nil if no gender', () => {
      expect(person.gender).toBe('');
    });
  });
});
