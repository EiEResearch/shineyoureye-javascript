import { DateTime } from 'luxon';
import {
  uuidv4, truncate, dateLocalization, postType, paginate,
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
  });

  describe('when postType is called', () => {
    test('should return article if no title and params are passed', () => {
      expect(postType('', [])).toBe('article');
    });

    test('should return article type if title is passed but no params', () => {
      expect(postType('SYE Week in Review', [])).toBe('article');
    });

    test('should return article type if title is passed and no matching words in params is passed', () => {
      const params = ['nigeria', 'sale'];
      expect(postType('SYE Week in Review', params)).toBe('article');
    });

    test('should return image type if params includes words from title', () => {
      const params = ['week', 'review'];
      expect(postType('SYE Week in Review', params)).toBe('image');
    });

    test('should return passed type if params includes words from title', () => {
      const params = ['week', 'review'];
      const output = 'blog';
      expect(postType('SYE Week in Review', params, output)).toBe(output);
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
});
