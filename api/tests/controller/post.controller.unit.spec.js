import PostController from 'api/controller/post.controller';

const req = {
  query: {
    limit: '',
    page: '',
    sort: '',
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

describe('PostController', () => {
  req.params.slug = 'nigerian-senators-and-the-n5-5-billion-official-cars-matters-arising';

  const finder = (PostController.single(req, res));

  test('should find a single post', () => {
    expect(finder.success).toBe(true);
    expect(Object.keys(finder.data).length).toEqual(1);
  });

  test('should find a post with the right url', () => {
    expect(finder.data.post.url).toEqual('/blog/nigerian-senators-and-the-n5-5-billion-official-cars-matters-arising');
  });

  test('should find a post with the right title', () => {
    expect(finder.data.post.title).toEqual('Nigerian Senators and the N5.5 Billion Official Cars: Matters Arising!');
  });

  test('should find a post with a published status ', () => {
    expect(finder.data.post.url).toBeDefined();
  });
});

describe('when it fails to find a post', () => {
  req.params.slug = 'budget-tracking-and-citizens-engagement';
  const finder = (PostController.single(req, res));
  test('should raise an error', () => {
    expect(finder.error.code).toBe(404);
    expect(finder.error.message).toEqual(`No post matched ${req.params.slug}`);
    expect(finder.data).not.toBeDefined();
  });
});

describe('when finding all posts', () => {
  const finder = (PostController.all(req, res));

  test('should get valid response when quering all posts', () => {
    expect(finder.success).toBe(true);
    expect(Object.keys(finder.data).length).toEqual(3);
  });

  test('should find one or more post', () => {
    expect(finder.data.posts).toBeDefined();
    expect(finder.data.posts.length).toBeGreaterThan(0);
  });

  test('should return the first page when no page query is given', () => {
    expect(finder.data.pagination.currentPage).toBe(1);
  });

  test('should return the limit when no limit query is given', () => {
    expect(finder.data.pagination.perPage).toBe(10);
  });

  test('should return the default sort type when no sort query is given', () => {
    expect(finder.data.sort).toBe('desc');
  });
});

describe('when query parameters are appended to the url', () => {
  test('should return sort value that matches sort query if it is vlaid', () => {
    req.query.sort = 'asc';
    const finder = (PostController.all(req, res));
    expect(finder.data.sort).toBe('asc');
  });

  test('should return page number that matches page query if it is valid', () => {
    req.query.page = 2;
    const finder = (PostController.all(req, res));
    expect(finder.data.pagination.currentPage).toBe(2);
  });

  test('should return limit number that matches limit query if it is valid', () => {
    req.query.limit = 20;
    const finder = (PostController.all(req, res));
    expect(finder.data.pagination.perPage).toBe(20);
  });

  test('should return error when the page number is greater than number of available pages', () => {
    req.query.page = 200;
    const finder = (PostController.all(req, res));
    expect(finder.data).toBeUndefined();
    expect(finder.error).toBeDefined();
  });

  test('should return error object when a wrong sort query is given', () => {
    req.query.sort = 'foo';
    req.query.page = 1;
    const finder = (PostController.all(req, res));
    expect(finder.data).toBeUndefined();
    expect(finder.error.message).toBe('Sorry, no content matched your criteria.');
  });
});

describe('post object definition', () => {
  test('should return a predefined post object', () => {
    req.query = { limit: '', page: '', sort: '' };
    req.params.slug = 'nigerian-senators-and-the-n5-5-billion-official-cars-matters-arising';
    const finder = (PostController.single(req, res));

    expect(finder.data.post).toEqual(expect.objectContaining({
      title: expect.any(String),
      slug: expect.any(String),
      published: expect.any(Boolean),
      featured: expect.any(Boolean),
      eventDate: expect.any(Object),
      date: expect.any(String),
      url: expect.any(String),
      excerpt: expect.any(String),
      body: expect.any(String),
      type: expect.any(String),
    }));
  });
});
