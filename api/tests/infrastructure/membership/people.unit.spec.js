// /* eslint-disable no-unused-expressions */
import Sheets from 'api/infrastructure/services/sheets';
import People from 'api/infrastructure/membership/people';
import logger from 'api/logger';

jest.mock('api/infrastructure/services/sheets');
jest.mock('api/logger');

const mockFn = jest.fn((error) => {
  console.log(error);
});
logger(mockFn);

describe('People::Membership', () => {
  beforeEach(() => {
    Sheets.get.mockResolvedValue({
      valueRanges: [
        {
          range: 'Governors_2019!A1:Z1000',
          majorDimension: 'ROWS',
          values: [
            [
              'id',
              'honorific_prefix',
              'name',
              'state',
              'mapit_id',
              'party',
              'email',
              'phone',
              'identifier_shineyoureye',
              'image_url',
              'postal_address',
              'district',
              'gender',
              'birth_date',
              'other_names',
              'twitter',
              'facebook_url',
              'wikipedia_url',
              'website_url',
              'official_position',
              'official_postiton_order',
            ],
            [
              'gov:victor-okezie-ikpeazu',
              'Dr',
              'Okezie Ikpeazu',
              'Abia',
              2,
              'Peoples Democratic Party',
              'info@abiastate.gov.ng',
              '2348053387018',
              'okezie-ikpeazu',
              'http://www.shineyoureye.org/media_root/images/Abia_-_Okezie_Ikpeazu.jpg',
              '',
              '',
              'Male',
              '1964-10-18',
              'Okezie Ikpeazu',
              'GovernorIkpeazu',
            ],
            [
              'gov-ahmadu-umaru-finitiri',
              '',
              'Ahmadu Umaru Finitiri',
              'Adamawa',
              3,
              'Peoples Democratic Party',
              '',
              '',
              'ahmadu-umaru-finitiri',
              'https://theyworkforyou.github.io/shineyoureye-images/Governors/gov-ahmadu-umaru-finitiri/original.jpeg',
              '',
              '',
              'Male',
              '1967-10-27',
              '',
              'AhmaduFinitiri',
            ],
            [
              'gov:emmanuel-udom',
              '',
              'Udom Emmanuel',
              'Akwa Ibom',
              4,
              'Peoples Democratic Party',
              'udom@udomemmanuel.ng',
              '2348022243064',
              'udom-emmanuel',
              'http://www.shineyoureye.org/media_root/images/Akwa_Ibom_-_Emmanuel_Udom.jpg',
              '',
              '',
              'Male',
              '1966-07-11',
              '',
              'MrUdomEmmanuel',
            ],
            [
              'gov:willie-obiano',
              '',
              'Willie Obiano',
              'Anambra',
              5,
              'All Progressives Grand Alliance',
              '',
              '2347030008855',
              'willie-obiano',
              'http://www.shineyoureye.org/media_root/images/obiano-2.jpg',
              '',
              '',
              'Male',
              '1957-08-08',
              'Willie Maduabuchukwu Obiano',
              'WillieMObiano',
              'https://www.facebook.com/WillieObiano',
            ],
            [
              'gov-bala-mohammed',
              '',
              'Bala Mohammed',
              'Bauchi',
              6,
              'Peoples Democratic Party',
              '',
              '',
              'bala-mohammed',
              'https://theyworkforyou.github.io/shineyoureye-images/Governors/gov-bala-mohammed/original.jpeg',
              '',
              '',
              'Male',
            ],

          ],
        },
      ],
    });
  });


  test('calls sheets service to get all governors data and return mapped response', async () => {
    const people = await new People('governors').allPeople();

    expect(people.length).toBe(1);
    expect(people[0].start_date).toBeNull();
    expect(people[0].end_date).toBeNull();
    expect(people[0].persons).toBeDefined();
    expect(people[0].persons.length).toBe(5);

    expect(people[0].persons[0]).toEqual(expect.objectContaining({
      id: 'gov:victor-okezie-ikpeazu',
      title: 'Dr',
      name: 'Okezie Ikpeazu',
      official_name: 'Okezie Ikpeazu',
      state: 'Abia',
      party: 'Peoples Democratic Party',
      birth_date: '1964-10-18',
      gender: 'Male',
      slug: 'okezie-ikpeazu',
      url: '/person/okezie-ikpeazu',
    }));

    expect(people[0]).toEqual(expect.objectContaining({
      organization: 'Governors',
      legislative_period: 'Executive',
      position: 'Governor',
      persons: expect.any(Object),
    }));
  });

  test('calls all people method and returns only people with valid area', async () => {
    const people = await new People('governors').allPeopleWithValidArea();

    expect(people.length).toBe(1);
    expect(people[0].start_date).toBeNull();
    expect(people[0].end_date).toBeNull();
    expect(people[0].persons).toBeDefined();
    expect(people[0].persons.length).toBe(5);

    expect(people[0].persons[1]).toEqual(expect.objectContaining({
      id: 'gov-ahmadu-umaru-finitiri',
      title: '',
      name: 'Ahmadu Umaru Finitiri',
      official_name: 'Ahmadu Finitiri',
      state: 'Adamawa',
      party: 'Peoples Democratic Party',
      birth_date: '1967-10-27',
      gender: 'Male',
      slug: 'ahmadu-umaru-finitiri',
      url: '/person/ahmadu-umaru-finitiri',
    }));

    expect(people[0]).toEqual(expect.objectContaining({
      organization: 'Governors',
      legislative_period: 'Executive',
      position: 'Governor',
      persons: expect.any(Object),
    }));
  });

  test(`calls all people method and returns people with valid
   image for a given size`, async () => {
    const people = await new People('governors').allPeopleWithValidImage(2);

    expect(people.length).toBe(1);
    expect(people[0].start_date).toBeNull();
    expect(people[0].end_date).toBeNull();
    expect(people[0].persons).toBeDefined();
    expect(people[0].persons.length).toBe(2);

    expect(people[0].persons[1]).toEqual(expect.objectContaining({
      id: 'gov-ahmadu-umaru-finitiri',
      title: '',
      name: 'Ahmadu Umaru Finitiri',
      official_name: 'Ahmadu Finitiri',
      state: 'Adamawa',
      party: 'Peoples Democratic Party',
      birth_date: '1967-10-27',
      gender: 'Male',
      slug: 'ahmadu-umaru-finitiri',
      url: '/person/ahmadu-umaru-finitiri',
    }));

    expect(people[0]).toEqual(expect.objectContaining({
      organization: 'Governors',
      legislative_period: 'Executive',
      position: 'Governor',
      persons: expect.any(Object),
    }));
  });

  test(`calls all people method and returns a max of 10 people with valid
   image if no size is given`, async () => {
    const people = await new People('governors').allPeopleWithValidImage();

    expect(people.length).toBe(1);
    expect(people[0].start_date).toBeNull();
    expect(people[0].end_date).toBeNull();
    expect(people[0].persons).toBeDefined();
    expect(people[0].persons.length).toBe(5);

    expect(people[0].persons[1]).toEqual(expect.objectContaining({
      id: 'gov-ahmadu-umaru-finitiri',
      title: '',
      name: 'Ahmadu Umaru Finitiri',
      official_name: 'Ahmadu Finitiri',
      state: 'Adamawa',
      party: 'Peoples Democratic Party',
      birth_date: '1967-10-27',
      gender: 'Male',
      slug: 'ahmadu-umaru-finitiri',
      url: '/person/ahmadu-umaru-finitiri',
    }));

    expect(people[0]).toEqual(expect.objectContaining({
      organization: 'Governors',
      legislative_period: 'Executive',
      position: 'Governor',
      persons: expect.any(Object),
    }));
  });

  test('calls all people method and returns people grouped by states', async () => {
    const people = await new People('governors').allPeopleGroupedByState();

    expect(people.length).toBe(1);
    expect(people[0].start_date).toBeNull();
    expect(people[0].end_date).toBeNull();
    expect(people[0].persons).toBeDefined();
    expect(Object.keys(people[0].persons).length).toBe(5);

    expect(people[0].persons['Akwa Ibom'][0]).toEqual(expect.objectContaining({
      id: 'gov:emmanuel-udom',
      title: '',
      name: 'Udom Emmanuel',
      official_name: 'Udom Emmanuel',
      state: 'Akwa Ibom',
      party: 'Peoples Democratic Party',
      birth_date: '1966-07-11',
      gender: 'Male',
      slug: 'udom-emmanuel',
      url: '/person/udom-emmanuel',
    }));

    expect(people[0]).toEqual(expect.objectContaining({
      organization: 'Governors',
      legislative_period: 'Executive',
      position: 'Governor',
      persons: expect.any(Object),
    }));
  });

  test(`when grouping people by a single state
  return matched result if state parameter is not empty`, async () => {
    const people = await new People('governors').allPeopleByState('akwa ibom');

    expect(people.length).toBe(1);
    expect(people[0].start_date).toBeNull();
    expect(people[0].end_date).toBeNull();
    expect(people[0].persons).toBeDefined();
    expect(Object.keys(people[0].persons).length).toBe(1);

    expect(people[0].persons['Akwa Ibom'][0]).toEqual(expect.objectContaining({
      id: 'gov:emmanuel-udom',
      title: '',
      name: 'Udom Emmanuel',
      official_name: 'Udom Emmanuel',
      state: 'Akwa Ibom',
      party: 'Peoples Democratic Party',
      birth_date: '1966-07-11',
      gender: 'Male',
      slug: 'udom-emmanuel',
      url: '/person/udom-emmanuel',
    }));

    expect(people[0]).toEqual(expect.objectContaining({
      organization: 'Governors',
      legislative_period: 'Executive',
      position: 'Governor',
      persons: expect.any(Object),
    }));
  });

  test(`when grouping people by a single state
   return no result if state parameter is empty or not found`, async () => {
    const people = await new People('governors').allPeopleByState();

    expect(people.length).toBe(1);
    expect(people[0].start_date).toBeNull();
    expect(people[0].end_date).toBeNull();
    expect(people[0].persons).toBeDefined();
    expect(Object.keys(people[0].persons).length).not.toBe(1);

    expect(people[0]).toEqual(expect.objectContaining({
      organization: 'Governors',
      legislative_period: 'Executive',
      position: 'Governor',
      persons: expect.any(Object),
    }));
  });

  test('calls all people method and returns people grouped by political party', async () => {
    const people = await new People('governors').allPeopleGroupedByParty();

    expect(people.length).toBe(1);
    expect(people[0].start_date).toBeNull();
    expect(people[0].end_date).toBeNull();
    expect(people[0].persons).toBeDefined();
    expect(Object.keys(people[0].persons).length).toBe(2);

    expect(people[0].persons['All Progressives Grand Alliance'][0]).toEqual(expect.objectContaining({
      id: 'gov:willie-obiano',
      title: '',
      name: 'Willie Obiano',
      official_name: 'Willie Obiano',
      state: 'Anambra',
      party: 'All Progressives Grand Alliance',
      birth_date: '1957-08-08',
      gender: 'Male',
      slug: 'willie-obiano',
      url: '/person/willie-obiano',
    }));

    expect(people[0]).toEqual(expect.objectContaining({
      organization: 'Governors',
      legislative_period: 'Executive',
      position: 'Governor',
      persons: expect.any(Object),
    }));
  });

  test(`call all people for a legislature type and return match for politician
  that matches given slug`, async () => {
    const people = await new People('governors').singlePersonBySlug('willie-obiano');

    expect(people.length).toBe(1);
    expect(people[0].start_date).toBeNull();
    expect(people[0].end_date).toBeNull();
    expect(people[0].persons).toBeDefined();
    expect(Object.keys(people[0].persons).length).toBe(1);

    expect(people[0].persons[0]).toEqual(expect.objectContaining({
      id: 'gov:willie-obiano',
      title: '',
      name: 'Willie Obiano',
      official_name: 'Willie Obiano',
      state: 'Anambra',
      party: 'All Progressives Grand Alliance',
      birth_date: '1957-08-08',
      gender: 'Male',
      slug: 'willie-obiano',
      url: '/person/willie-obiano',
    }));

    expect(people[0]).toEqual(expect.objectContaining({
      organization: 'Governors',
      legislative_period: 'Executive',
      position: 'Governor',
      persons: expect.any(Object),
    }));
  });

  test(`call all people for a legislature type and return no match for politician 
  who has no slug`, async () => {
    const people = await new People('governors').singlePersonBySlug();

    expect(people.length).not.toBe(1);
    expect(people).toEqual([]);
  });
});


describe('Name of the group', () => {
  beforeEach(() => {
    Sheets.get.mockResolvedValue({
      valueRanges: [
        {
          range: 'Honorables_2019!A1:Z1000',
          majorDimension: 'ROWS',
          values: [
            [
              'id',
              'honorific_prefix',
              'name',
              'state',
              'mapit_id',
              'party',
              'email',
              'phone',
              'identifier_shineyoureye',
              'image_url',
              'postal_address',
              'district',
              'gender',
              'birth_date',
              'other_names',
              'twitter',
              'facebook_url',
              'wikipedia_url',
              'website_url',
              'official_position',
              'official_postiton_order',
            ],
            [
              '953a8bd2-61d7-4b7d-befb-5aa3b6c869ff',
              '',
              'Mudashiru Ajayi Obasa',
              'Lagos',
              '566',
              '',
              'honobasa1@yahoo.com',
              '08033014094',
              'mudashiru-ajayi-obasa',
              'https://theyworkforyou.github.io/shineyoureye-images/Honorables/953a8bd2-61d7-4b7d-befb-5aa3b6c869ff/original.jpeg',
              '33, Oluwole Olaniyan Street, Iyana Ipaja',
              'Agege I',
              'Male',
            ],
            [
              'c45de7af-af04-43c4-a2eb-56c06f3aeec4',
              '',
              'Oluyinka Ogundimu',
              'Lagos',
              '566',
              '',
              'ybiventures@yahoo.com',
              '08033061594',
              'oluyinka-ogundimu',
              'https://theyworkforyou.github.io/shineyoureye-images/Honorables/c45de7af-af04-43c4-a2eb-56c06f3aeec4/original.jpeg',
              '',
              'Agege II',
              'Male',
            ],
            [
              '8d36c6ca-2cf3-4e18-a8c5-dd16c41aa3cb',
              '',
              'Aluebhosele Ephraim Otaigbe Sele',
              'Edo',
              '317',
              'All Progressives Congress',
              '',
              '',
              '',
              '',
              '',
              'Igueben',
            ],
            [
              'c321bf63-d46e-4b5a-a999-b3f59e13f849',
              '',
              'Uyiosasere Ekhosuehi',
              'Edo',
              '319',
              'All Progressives Congress',
              '',
              '',
              '',
              '',
              '',
              'Oredo East',
            ],
            [
              '98c2f91e-f473-4808-95ca-11b7d923590a',
              '',
              'Okagben Ewere Christopher',
              'Edo',
              '319',
              'All Progressives Congress',
              '',
              '',
              '',
              '',
              '',
              'Oredo West',
            ],
            [
              '95ab610f-4338-4760-bb45-649a0a2447c8',
              '',
              'Odefa Obasi Odefa',
              'Ebonyi',
              '307',
              '',
              '',
              '',
              'odefa-obasi-odefa',
              '',
              '',
              'Onicha East',
            ],
          ],
        },
      ],
    });
  });

  test('calls all people method and returns people grouped by mapit ids', async () => {
    const people = await new People('honorables').allPeopleGroupedByMapitArea();

    expect(people.length).toBe(1);
    expect(people[0].start_date).toBeNull();
    expect(people[0].end_date).toBeNull();
    expect(people[0].persons).toBeDefined();

    expect(Object.keys(people[0].persons).length).toBe(4);
    expect(Object.keys(people[0].persons)).toEqual(['307', '317', '319', '566']);

    expect(people[0].persons[566].length).toBe(2);

    expect(people[0]).toEqual(expect.objectContaining({
      organization: 'State Houses of Assembly',
      legislative_period: 'State Legislature',
      position: 'State Representative',
      persons: expect.any(Object),
    }));
  });

  test(`when grouping people by a mapit id
  return matched result if mapitId parameter is not empty`, async () => {
    const people = await new People('honorables').allPeopleByMapitArea(566);

    expect(people.length).toBe(1);
    expect(people[0].start_date).toBeNull();
    expect(people[0].end_date).toBeNull();
    expect(people[0].persons).toBeDefined();

    expect(Object.keys(people[0].persons).length).toBe(1);

    expect(people[0].persons[566][1]).toEqual(expect.objectContaining({
      id: 'c45de7af-af04-43c4-a2eb-56c06f3aeec4',
      title: '',
      name: 'Oluyinka Ogundimu',
      official_name: 'Oluyinka Ogundimu',
      state: 'Lagos',
      party: '',
      birth_date: '',
      gender: 'Male',
      slug: 'oluyinka-ogundimu',
      url: '/person/oluyinka-ogundimu',
    }));

    expect(people[0]).toEqual(expect.objectContaining({
      organization: 'State Houses of Assembly',
      legislative_period: 'State Legislature',
      position: 'State Representative',
      persons: expect.any(Object),
    }));
  });

  test('should ', async () => {
    const people = await new People('honorables').allPeopleByMapitArea();

    expect(people.length).toBe(1);
    expect(people[0].start_date).toBeNull();
    expect(people[0].end_date).toBeNull();
    expect(people[0].persons).toBeDefined();

    expect(Object.keys(people[0].persons).length).toBe(0);
    expect(people[0]).toEqual(expect.objectContaining({
      organization: 'State Houses of Assembly',
      legislative_period: 'State Legislature',
      position: 'State Representative',
      persons: expect.any(Object),
    }));
  });
});

describe('Name of the group', () => {
  beforeEach(() => {
    Sheets.get.mockResolvedValue({
      valueRange: [
        {
          range: 'Senate_2019!A1:Z1000',
          majorDimension: 'ROWS',
          values: [],
        },
      ],
    });
  });

  test('should ', async () => {
    const people = await new People('senate').allPeople();
    expect(people).toEqual([]);
  });

  test('should ', async () => {
    const people = await new People('senate').allPeopleWithValidArea();
    expect(people).toEqual([]);
  });

  test('should ', async () => {
    const people = await new People('senate').allPeopleWithValidImage();
    expect(people).toEqual([]);
  });

  test('should ', async () => {
    const people = await new People('senate').allPeopleGroupedByState();
    expect(people).toEqual([]);
  });

  test('should ', async () => {
    const people = await new People('senate').allPeopleByState();
    expect(people).toEqual([]);
  });

  test('should ', async () => {
    const people = await new People('senate').allPeopleGroupedByMapitArea();
    expect(people).toEqual([]);
  });

  test('should ', async () => {
    const people = await new People('senate').allPeopleByMapitArea();
    expect(people).toEqual([]);
  });

  test('should ', async () => {
    const people = await new People('senate').allPeopleGroupedByParty();
    expect(people).toEqual([]);
  });

  test('should ', async () => {
    const people = await new People('senate').singlePersonBySlug();
    expect(people).toEqual([]);
  });
});

describe('Name of the group', () => {
  beforeEach(() => {
    Sheets.get.mockResolvedValue({
      valueRanges: [
        {
          ranges: 'Representative_2019!A1:Z1000',
          majorDimensions: 'ROWS',
          value: [],
        },
      ],
    });
  });

  test('should ', async () => {
    let error;
    try {
      await new People('representatives').allPeople();
    } catch (e) {
      error = e;
    }
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("Cannot read property 'substring' of undefined");
  });

  // test('should ', async () => {
  //   const people = await new People('representatives').allPeopleWithValidArea();
  //   expect(people).toThrow(Error);
  // });
});
