/* eslint-disable import/no-unresolved */
import isInt from 'validator/lib/isInt';
import isNumeric from 'validator/lib/isNumeric';
import isIn from 'validator/lib/isIn';
import {
  truncate, dateLocalization, postType, paginate,
} from 'api/helper';
import DocumentControoler from 'api/controller/document.controller';

class PostController extends DocumentControoler {
  constructor(baseurl = '/blog/') {
    super(baseurl);
  }

  all(req, res) {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const sort = req.query.sort || 'desc';
    let posts = [];

    let postsAll = this.finder(this.filePath.postsPattern).findAll;
    const pagination = paginate(postsAll.length, page, limit);

    if (!isInt(String(page), { min: 1, max: pagination.totalPages, allow_leading_zeroes: false })
    || !isNumeric(String(limit), { no_symbols: true })
    || !isIn(String(sort).toLowerCase(), ['asc', 'desc'])) {
      req.err.error.message = 'Sorry, no content matched your criteria.';
      req.err.error.code = 404;
      req.err.error.details = req.query;

      res.status(404);
      return res.json(req.err);
    }

    if (sort === 'desc') {
      postsAll = [...postsAll.reverse()];
    }

    postsAll = [...postsAll.slice((page - 1) * limit, (page * limit))];

    posts = postsAll
      .map((post) => {
        const p = { ...PostController.postObj };
        p.title = post.title;
        p.slug = post.slug;
        p.published = post.published;
        p.featured = post.featured;
        p.eventDate = dateLocalization(post.eventDate, 'DAFM');
        p.date = dateLocalization(post.date, 'DAFM');
        p.url = post.url;
        p.author = post.author;
        p.excerpt = truncate(post.body, 18);
        p.body = post.body;
        p.type = postType(post.title, ['week', 'review']);

        return p;
      });

    res.status(200);
    return res.json({
      success: true,
      message: 'data found',
      data: {
        sort, posts, pagination,
      },
    });
  }

  single(req, res) {
    const finder = this.finder(this.filePath.postPattern(req.params.slug.trim()));

    if (finder && finder.none === false) {
      const post = { ...PostController.postObj };
      post.title = finder.findSingle.title;
      post.slug = finder.findSingle.slug;
      post.published = finder.findSingle.published;
      post.featured = finder.findSingle.featured;
      post.eventDate = dateLocalization(finder.findSingle.eventDate, 'DAFM');
      post.date = dateLocalization(finder.findSingle.date, 'DAFM');
      post.url = finder.findSingle.url;
      post.author = finder.findSingle.author;
      post.excerpt = truncate(finder.findSingle.body, 18);
      post.body = finder.findSingle.body;
      post.type = postType(finder.findSingle.title, ['week', 'review']);

      res.status(200);
      return res.json({
        success: true,
        message: 'data found',
        data: { post },
      });
    }

    req.err.error.message = `No post matched ${req.params.slug}`;
    req.err.error.code = 404;
    req.err.error.details = req.params;

    res.status(404);
    return res.json(req.err);
  }

  static postObj = {
    title: '',
    slug: '',
    published: '',
    featured: '',
    eventDate: '',
    date: '',
    url: '',
    excerpt: '',
    author: '',
    body: '',
    type: '',
  }
}

export default new PostController();