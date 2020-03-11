import { DateTime } from 'luxon';
import {
  uuidv4, truncate, dateLocalization, postType, paginate,
  compareDateTime, getSlug, first, last, findDuplicates,
} from 'api/helper';

describe('when utilities are loaded onto a file', () => {
  describe('when the uuidv4 method is called', () => {
    test('should return a valid UUID', () => {
      const data = uuidv4();
      const uuidMock = jest.fn().mockImplementation(() => '16f44adf-2bc8-469d-aef1-5d04bfc3a6b9');

      expect.assertions(2);
      expect(data).toHaveLength(36);
      expect(data).toHaveLength(uuidMock().length);
    });
  });

  describe('when truncate method is called', () => {
    test('should strip tags from html to 10 words if no length given', () => {
      const expected = 'Few weeks back, news broke out that the Nigerian Senators...';
      const content = `<p>Few weeks back, news broke out that the Nigerian Senators are reportedly going to 
spend N5.5 billion to acquire Toyota Land Cruiser Sports Utility Vehicles (SUVs) and by estimation, there are 109 senators in the 
red chambers and each of them will get N50 million each.</p>`;
      expect(truncate(content)).toEqual(expected);
    });

    test('should strip tags and return words that equal length given', () => {
      const expected = 'Few weeks back, news broke out that the Nigerian Senators are reportedly going to spend N5.5 billion to...';
      const content = `<p>Few weeks back, news broke out that the Nigerian Senators are reportedly going to spend N5.5 billion to 
acquire Toyota Land Cruiser Sports Utility Vehicles (SUVs) and by estimation, there are 109 senators in the red chambers and 
each of them will get N50 million each.</p>`;
      expect(truncate(content, 18)).toEqual(expected);
    });

    test('should return empty excerpt if only tags are present in content', () => {
      const content = '<p><img alt="SYE weekly review Mar 1 (1).jpg" src="/media/prose-images/SYE weekly review Mar 1 (1).jpg" width="100%" /></p>';
      const expected = '';
      expect(truncate(content)).toEqual(expected);
    });

    test('should return undefined when no content is passed in', () => {
      expect(truncate()).toBeUndefined();
    });

    test('should return empty when an empty content is passed', () => {
      expect(truncate('')).toBe('');
    });
  });

  describe('when dateLocalization is called', () => {
    test('should return passed date if no type is passed in', () => {
      const date = new Date('2019-06-29');
      expect(dateLocalization(date)).toEqual(date);
    });

    test('should return a luxon date if a luxon date is passed', () => {
      const date = DateTime.fromISO('2019-06-29');
      expect(dateLocalization(date)).toEqual(date);
    });

    test('should return a formatted date if DAFM type and luxon date object is passed', () => {
      const date = DateTime.fromISO('2019-06-29');
      expect(dateLocalization(date, 'DAFM')).toBe('June 29, 2019');
    });

    test('should return undefined when no date and type is passed', () => {
      expect(dateLocalization()).toBeUndefined();
    });

    test('should return empty string when empty string instead of date is passed', () => {
      expect(dateLocalization('')).toBe('');
    });

    test('should return a full date if F type and luxon date object is passed', () => {
      const date = DateTime.fromISO('2019-06-27T16:30:00.000Z');
      expect(dateLocalization(date, 'F')).toEqual(expect.stringContaining('Thursday, June 27, 2019'));
    });
  });

  describe('whn compareDateTime is called', () => {
    test('should return false if no dates are provided to be compared', () => {
      expect(compareDateTime(undefined)).toBe(false);
      expect(compareDateTime('', DateTime.local())).toBe(false);
      expect(compareDateTime({}, DateTime.local())).toBe(false);
      expect(compareDateTime(undefined, DateTime.local())).toBe(false);
      expect(compareDateTime()).toBe(false);
    });

    test('should return false if date1 is less than date2', () => {
      const date1 = DateTime.fromISO('2019-06-27T16:30:00.000Z');
      const date2 = DateTime.local();
      expect(compareDateTime(date1, date2)).toBe(false);
    });

    test('should return false if date1 is less than current date', () => {
      const date1 = DateTime.fromISO('2019-06-27');
      expect(compareDateTime(date1)).toBe(false);
    });

    test('should return true if date1 is greater than date2', () => {
      const date1 = DateTime.local();
      const date2 = DateTime.fromISO('2019-06-27T16:30:00.000Z');
      expect(compareDateTime(date1, date2)).toBe(true);
    });

    test('should return true if date1 is in the future', () => {
      const date1 = DateTime.local().plus({ months: 1 });
      expect(compareDateTime(date1)).toBe(true);
    });

    test('should return true if date1 is in the future, and date2 is today', () => {
      const date1 = DateTime.local().plus({ months: 1 });
      const date2 = DateTime.local();
      expect(compareDateTime(date1, date2)).toBe(true);
    });
  });

  describe('when postType is called', () => {
    test('should return image if no content is passed', () => {
      expect(postType('')).toBe('image');
    });

    test('should return article type if content is passed', () => {
      expect(postType('SYE Week in Review')).toBe('article');
    });

    test('should return article type if no args are passed', () => {
      expect(postType()).toBe('article');
    });
  });

  describe('when paginate is called', () => {
    const tE = 150;
    const pP = 15;
    const tP = Math.ceil(tE / pP);

    const links = {
      perPage: '',
      totalPages: '',
      previousPage: '',
      nextPage: '',
      currentPage: '',
      totalEntries: '',
    };

    test('should return empty paginate object if no args are passed', () => {
      expect(paginate()).toMatchObject(links);
    });

    test('should return a valid paginate object', () => {
      const content = paginate(tE, 1, pP);
      expect.assertions(5);
      expect(content.perPage).toBe(pP);
      expect(content.totalPages).toBe(tP);
      expect(content.totalEntries).toBe(tE);
      expect(content.previousPage).toBe(0);
      expect(content.nextPage).toBe(2);
    });

    test('should return a valid paginate object with an out of range page', () => {
      const content = paginate(tE, -50, pP);
      expect.assertions(5);
      expect(content.perPage).toBe(pP);
      expect(content.totalPages).toBe(tP);
      expect(content.totalEntries).toBe(tE);
      expect(content.previousPage).toBe(0);
      expect(content.nextPage).toBe(2);
    });
  });

  describe('when getSlug is called', () => {
    test.each([['Okafor Nonso Peter', 'okafor-nonso-peter'],
      ['Chukwuemeka Ihedioha', 'chukwuemeka-ihedioha'],
      ['Biobarakuma Degi-Eremienyo', 'biobarakuma-degi-eremienyo'],
      ['Beverly Ikpeazu-Nkemdiche', 'beverly-ikpeazu-nkemdiche'],
      ['', ''],
      ['%Name', 'name']])(
      'should return valid slug for (%s)',
      (input, expected) => {
        expect(getSlug(input)).toBe(expected);
      },
    );
  });

  describe('when first() is called', () => {
    test.each([['1,2,3,4,5,6,7', ',', '1'],
      ['foo;bar;baz', ';', 'foo'],
      ['1;2;3;4;5;6;7', undefined, '1'],
      ['foo,bar,baz', undefined, 'foo,bar,baz']])(
      'should return the first value before the seperator',
      (input, seperator, expected) => {
        expect(first(input, seperator)).toBe(expected);
      },
    );
    test.each([['', ',', '7'],
      ['', ';', 'baz'],
      ['', undefined, '7'],
      ['', undefined, 'foo,bar,baz']])(
      'should not return any value before the seperator',
      (input, seperator, expected) => {
        expect(first(input, seperator)).not.toBe(expected);
      },
    );
  });

  describe('when last() is called', () => {
    test.each([['1,2,3,4,5,6,7', ',', '7'],
      ['foo;bar;baz', ';', 'baz'],
      ['1;2;3;4;5;6;7', undefined, '7'],
      ['foo,bar,baz', undefined, 'foo,bar,baz']])(
      'should return the last value before the seperator',
      (input, seperator, expected) => {
        expect(last(input, seperator)).toBe(expected);
      },
    );
    test.each([['', ',', '7'],
      ['', ';', 'baz'],
      ['', undefined, '7'],
      ['', undefined, 'foo,bar,baz']])(
      'should not return any value before the seperator',
      (input, seperator, expected) => {
        expect(last(input, seperator)).not.toBe(expected);
      },
    );
  });

  describe('when findDuplicates() is called', () => {
    test.each([[[1, 2, 3, 4, 5, 6, 2, 3], [2, 3]],
      [[12, 14, 16, 18, 12, 20, 22, 14], [12, 14]],
      [['Anambra', 'Lagos', 'Abia', 'Lagos'], ['Lagos']],
      [['foo', 'bar', 'bar'], ['bar']]])(
      'should return duplicate values if found',
      (input, expected) => {
        expect(findDuplicates(input)).toEqual(expected);
      },
    );
  });

  describe('when Environment is in production', () => {
    const OLD_ENV = process.env;
    beforeEach(() => {
      jest.resetModules(); // this is important - it clears the cache
      process.env = { ...OLD_ENV };
      process.env.NODE_ENV = 'production';
    });

    afterEach(() => {
      process.env = OLD_ENV;
    });

    test('should set NODE_ENV to production', () => {
      expect(process.env.NODE_ENV).toBe('production');
    });
  });
});
