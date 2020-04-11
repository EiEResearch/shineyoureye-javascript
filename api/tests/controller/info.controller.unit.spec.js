import InfoController from 'api/controller/info.controller';

const req = {
  query: {
    limit: '',
    page: '',
    sort: '',
    status: '',
  },
  params: {
    slug: '',
  },
  err: {
    error: {
      message: 'internal server error',
      code: 500,
      details: [],
      target: '',
    },
  },
};

const res = {
  json: obj => obj,
  send: obj => obj,
  status: code => code,
};

describe('InfoController', () => {
  req.params.slug = 'democracy-resources';

  const finder = (InfoController.find(req, res));

  test('should find a single info', () => {
    expect(finder.success).toBe(true);
    expect(Object.keys(finder.data).length).toEqual(1);
  });

  test('should find an info with the right url', () => {
    expect(finder.data.post.url).toEqual('/info/democracy-resources');
  });

  test('should find an info with the right title', () => {
    expect(finder.data.post.title).toEqual('Democracy Resources');
  });

  test('should find an info with a published status ', () => {
    expect(finder.data.post.published).toBe(true);
  });

  test('should find a post with a not featured status', () => {
    expect(finder.data.post.featured).toBe(false);
  });
});

describe('when it fails to find an info', () => {
  test('should raise an error when slug is invalid', () => {
    req.params.slug = 'about-nigeria';
    const finder = (InfoController.find(req, res));
    expect(finder.error.code).toBe(400);
    expect(finder.error.message).toEqual(`No document matched ${req.params.slug}`);
    expect(finder.data).not.toBeDefined();
  });

  test('should raise an error when slug is undefined', () => {
    req.params.slug = undefined;
    const finder = (InfoController.find(req, res));
    expect(finder.error.code).toBe(400);
    expect(finder.error.message).toEqual(`No document matched ${req.params.slug}`);
    expect(finder.data).not.toBeDefined();
  });
});

describe('post object definition', () => {
  test('should return a predefined post object', () => {
    req.query = { limit: '', page: '', sort: '' };
    req.params.slug = 'democracy-resources';
    const finder = (InfoController.find(req, res));

    const okObject = {
      message: () => 'Ok',
      pass: true,
    };
    expect.extend({
      toBeTypeOrNull(received, argument) {
        if (received === null) return okObject;
        if (expect(received).toEqual(expect.any(argument))) {
          return okObject;
        }
        return {
          message: () => `expected ${received} to be ${argument} type or null`,
          pass: false,
        };
      },
    });
    expect(finder.data.post).toEqual(expect.objectContaining({
      title: expect.any(String),
      slug: expect.any(String),
      published: expect.any(Boolean),
      featured: expect.any(Boolean),
      event_date: expect.toBeTypeOrNull(String),
      date: expect.toBeTypeOrNull(String),
      url: expect.any(String),
      excerpt: expect.any(String),
      body: expect.any(String),
      author: expect.any(String),
      type: expect.any(String),
    }));
  });
});

describe('info methods should log error correctly', () => {
  test('should log error to the log when find() is called', () => {
    console.log = jest.fn();
    InfoController.find(req.err, res);
    expect(console.log.mock.calls[0][0]).toBe('Error');
    expect(console.log.mock.calls[0][1]).toBe("Cannot read property 'slug' of undefined");
  });
});
