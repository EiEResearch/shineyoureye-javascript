import Legislature from 'api/factory/legislature';

describe('Factory::Legislature', () => {
  test.each([
    ['senator'], ['senators'], ['senate']])(
    'should return a defined legislature object for %s ',
    (input) => {
      const legislature = new Legislature(input);
      legislature.TENURE_TERM = '9th National Assembly';
      legislature.term = '9th National Assembly';
      legislature.TENURE_DATE = '2019-06-11';
      expect(legislature.TENURE_TERM).toBe('9th National Assembly');
      expect(legislature.TENURE_DATE).toBe('2019-06-11');
      expect(legislature.slug).toBe('Senate');
      expect(legislature.name).toBe('Senate');
      expect(legislature.position).toBe('Senator');
      expect(legislature.term).toEqual(legislature.TENURE_TERM);
    },
  );

  test.each([
    ['representative'], ['representatives']])(
    'should return a defined legislature object for %s ',
    (input) => {
      const legislature = new Legislature(input);
      legislature.TENURE_TERM = '9th National Assembly';
      legislature.term = '9th National Assembly';
      legislature.TENURE_DATE = '2019-06-11';
      expect(legislature.TENURE_TERM).toBe('9th National Assembly');
      expect(legislature.TENURE_DATE).toBe('2019-06-11');
      expect(legislature.slug).toBe('Representatives');
      expect(legislature.name).toBe('House of Representatives');
      expect(legislature.position).toBe('Federal Representative');
      expect(legislature.term).toEqual(legislature.TENURE_TERM);
    },
  );

  test.each([
    ['governor'], ['governors']])(
    'should return a defined legislature object for %s ',
    (input) => {
      const legislature = new Legislature(input);
      legislature.TENURE_TERM = '9th National Assembly';
      legislature.TENURE_DATE = '2019-06-11';
      expect(legislature.TENURE_TERM).toBe('9th National Assembly');
      expect(legislature.TENURE_DATE).toBe('2019-06-11');
      expect(legislature.slug).toBe('Governors');
      expect(legislature.name).toBe('Governors');
      expect(legislature.position).toBe('Governor');
      expect(legislature.term).not.toEqual(legislature.TENURE_TERM);
      expect(legislature.term).toEqual('Executive');
    },
  );

  test.each([
    ['honorables'], ['honorable']])(
    'should return a defined legislature object for %s ',
    (input) => {
      const legislature = new Legislature(input);
      legislature.TENURE_TERM = '9th National Assembly';
      legislature.TENURE_DATE = '2019-06-11';
      expect(legislature.TENURE_TERM).toBe('9th National Assembly');
      expect(legislature.TENURE_DATE).toBe('2019-06-11');
      expect(legislature.slug).toBe('Honorables');
      expect(legislature.name).toBe('State Houses of Assembly');
      expect(legislature.position).toBe('State Representative');
      expect(legislature.term).not.toEqual(legislature.TENURE_TERM);
      expect(legislature.term).toEqual('State Legislature');
    },
  );

  test('should return an empty object if constructor argument is empty', () => {
    const legislature = new Legislature();
    legislature.TENURE_TERM = '9th National Assembly';
    legislature.TENURE_DATE = '2019-06-11';

    expect(legislature.TENURE_TERM).toBe('9th National Assembly');
    expect(legislature.TENURE_DATE).toBe('2019-06-11');
    expect(legislature.slug).toBeUndefined();
    expect(legislature.name).toBeUndefined();
    expect(legislature.position).toBeUndefined();
    expect(legislature.term).toBeUndefined();
  });

  test.each([
    ['senatorial'], ['upper chamber'], ['upper_house'],
    ['federal representatives'], ['federal representatives'],
    ['executive'], ['executives'],
    ['state representatives'], ['state representatives'],
    ['']])(
    'should return an empty object if constructor argument (%s) is invalid',
    (input) => {
      const legislature = new Legislature(input);
      legislature.TENURE_TERM = '9th National Assembly';
      legislature.TENURE_DATE = '2019-06-11';
      expect(legislature.TENURE_TERM).toBe('9th National Assembly');
      expect(legislature.TENURE_DATE).toBe('2019-06-11');
      expect(legislature.slug).toBeUndefined();
      expect(legislature.name).toBeUndefined();
      expect(legislature.position).toBeUndefined();
      expect(legislature.term).toBeUndefined();
    },
  );
});

describe('When Legislature is Stringified', () => {
  test.each([
    ['senator'], ['senators'], ['senate'],
    ['representative'], ['representatives'],
    ['governor'], ['governors'],
    ['honorables'], ['honorable']])(
    'should return a stringified legislature object for %s ',
    (input) => {
      const legislature = new Legislature(input);
      legislature.TENURE_DATE = '2019-02-18';
      expect(legislature.toJSON()).toEqual(expect.objectContaining({
        slug: expect.any(String),
        name: expect.any(String),
        start_date: expect.any(String),
        end_date: expect.any(String),
        term: expect.any(String),
        position: expect.any(String),
      }));
    },
  );

  test.each([
    ['senatorial'], ['upper chamber'], ['upper_house'],
    ['federal representatives'], ['federal representatives'],
    ['executive'], ['executives'],
    ['state representatives'], ['state representatives'],
    ['']])(
    'should return throw error if constructor argument (%s) is invalid when returning stringified object',
    (input) => {
      const legislature = new Legislature(input);
      legislature.TENURE_DATE = '2019-06-11';
      expect(legislature.toJSON()).toEqual(expect.objectContaining({
        slug: expect.any(String),
        name: expect.any(String),
        start_date: expect.any(String),
        end_date: expect.any(String),
        term: expect.any(String),
        position: expect.any(String),
      }));
    },
  );
});
