import EventController from 'api/controller/event.controller';

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

describe('EventController', () => {
  req.params.slug = 'ordinary-citizens-doing-extraordinary-things';

  const finder = (EventController.find(req, res));

  test('should find a single event', () => {
    expect(finder.success).toBe(true);
    expect(Object.keys(finder.data).length).toEqual(1);
  });

  test('should find an event with the right url', () => {
    expect(finder.data.post.url).toEqual('/events/ordinary-citizens-doing-extraordinary-things');
  });

  test('should find an event with the right title', () => {
    expect(finder.data.post.title).toEqual('Ordinary Citizens Doing Extraordinary Things');
  });

  test('should find an event with a published status ', () => {
    expect(finder.data.post.published).toBe(true);
  });

  test('should find a post with a not featured status', () => {
    expect(finder.data.post.featured).toBe(false);
  });
});

describe('when it fails to find an event', () => {
  req.params.slug = 'budget-tracking-and-citizens-engagement';
  const finder = (EventController.find(req, res));
  test('should raise an error', () => {
    expect(finder.error.code).toBe(404);
    expect(finder.error.message).toEqual(`No post matched ${req.params.slug}`);
    expect(finder.data).not.toBeDefined();
  });
});

describe('when finding all events', () => {
  const finder = (EventController.all(req, res));

  test('should get valid response when quering all events', () => {
    expect(finder.success).toBe(true);
    expect(Object.keys(finder.data).length).toEqual(4);
  });

  test('should find one or more events', () => {
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
    const finder = (EventController.all(req, res));
    expect(finder.data.sort).toBe('asc');
  });

  test('should return page number that matches page query if it is valid', () => {
    req.query.page = 1;
    const finder = (EventController.all(req, res));
    expect(finder.data.pagination.currentPage).toBe(1);
  });

  test('should return limit number that matches limit query if it is valid', () => {
    req.query.limit = 20;
    const finder = (EventController.all(req, res));
    expect(finder.data.pagination.perPage).toBe(20);
  });

  test('should return error when the page number is greater than number of available pages', () => {
    req.query.page = 200;
    const finder = (EventController.all(req, res));
    expect(finder.data).toBeUndefined();
    expect(finder.error).toBeDefined();
  });

  test('should return error object when a wrong sort query is given', () => {
    req.query.sort = 'foo';
    req.query.page = 1;
    const finder = (EventController.all(req, res));
    expect(finder.data).toBeUndefined();
    expect(finder.error.message).toBe('Sorry, no content matched your criteria.');
  });
});

describe('post object definition', () => {
  test('should return a predefined post object', () => {
    req.query = { limit: '', page: '', sort: '' };
    req.params.slug = 'ordinary-citizens-doing-extraordinary-things';
    const finder = (EventController.find(req, res));

    expect(finder.data.post).toEqual(expect.objectContaining({
      title: expect.any(String),
      slug: expect.any(String),
      published: expect.any(Boolean),
      featured: expect.any(Boolean),
      event_date: expect.any(String),
      date: expect.any(String),
      url: expect.any(String),
      excerpt: expect.any(String),
      body: expect.any(String),
      author: expect.any(String),
      type: expect.any(String),
      is_active: expect.any(Boolean),
    }));
  });
});

describe('events having a status parameter', () => {
  test('should accept "past" parameter as valid input when searching for past events', () => {
    req.query.status = 'past';
    const finder = (EventController.all(req, res));

    expect(finder.data.status).toBe('past');
  });
  test('should accept "future" parameter as valid input when searching for future events', () => {
    // currently hitting prose directly to fetch future events, need to move this to interface level
    // wont find results for future events if this passes.

    req.query.status = 'future';
    const finder = (EventController.all(req, res));

    expect(finder.error.details.status).toEqual('future');
    expect(finder.error.message).toEqual('Sorry, no content matched your criteria.');
    expect(finder.error.code).toEqual(404);
  });
});

describe('events methods should log error correctly', () => {
  test('should log error to the log when all() is called', () => {
    console.log = jest.fn();
    EventController.all();
    expect(console.log.mock.calls[0][0]).toBe('Error');
    expect(console.log.mock.calls[0][1]).toBe("Cannot read property 'query' of undefined");
  });

  test('should log error to the log when find() is called', () => {
    console.log = jest.fn();
    EventController.find();
    expect(console.log.mock.calls[0][0]).toBe('Error');
    expect(console.log.mock.calls[0][1]).toBe("Cannot read property 'params' of undefined");
  });
});
