/* eslint-disable import/no-unresolved */
import isInt from 'validator/lib/isInt';
import isNumeric from 'validator/lib/isNumeric';
import isIn from 'validator/lib/isIn';
import {
  truncate, dateLocalization, postType, paginate, compareDateTime,
} from 'api/helper';
import DocumentController from 'api/controller/document.controller';
import logger from 'api/logger';

class EventController extends DocumentController {
  constructor(baseurl = '/events/') {
    super(baseurl);
  }

  all(req, res) {
    try {
      const limit = req.query.limit || 10;
      const page = req.query.page || 1;
      const sort = (req.query.sort || '').toLowerCase() || 'desc';
      const status = (req.query.status || '').toLowerCase() || 'all';
      let posts = [];

      let postsAll = this.finder(this.filePath.eventsPattern).findAll;
      const pagination = paginate(postsAll.length, page, limit);

      if (!isInt(String(page), { min: 1, max: pagination.totalPages, allow_leading_zeroes: false })
      || !isNumeric(String(limit), { no_symbols: true })
      || !isIn(String(sort).toLowerCase(), ['asc', 'desc'])
      || !isIn(String(status).toLowerCase(), ['future', 'past', 'all'])) {
        req.err.error.message = 'Sorry, no content matched your criteria.';
        req.err.error.code = 400;
        req.err.error.details = req.query;

        res.status(400);
        return res.json(req.err);
      }

      // handle event order sorting here
      if (sort === 'desc') {
        postsAll = [...postsAll.reverse()];
      }

      // handle event status filtering here
      if (status === 'future') {
        postsAll = [...postsAll.filter((post) => compareDateTime(JSON.stringify(post).eventDate) === true)];
      } else if (status === 'past') {
        postsAll = [...postsAll.filter((post) => compareDateTime(JSON.stringify(post).eventDate) === false)];
      }

      if (postsAll.length < 1) {
        req.err.error.message = 'Sorry, no content matched your criteria.';
        req.err.error.code = 400;
        req.err.error.details = req.query;

        res.status(400);
        return res.json(req.err);
      }
      postsAll = [...postsAll.slice((page - 1) * limit, (page * limit))];

      posts = postsAll
        .map((post) => {
          const p = { ...JSON.stringify(DocumentController) };
          p.title = post.title;
          p.slug = post.slug;
          p.published = post.published;
          p.featured = post.featured;
          p.event_date = dateLocalization(post.eventDate, 'F');
          p.date = dateLocalization(post.date, 'DAFM');
          p.url = post.url;
          p.author = post.author;
          p.excerpt = truncate(post.body, 18);
          p.body = post.body;
          p.type = postType(p.excerpt);
          p.is_active = compareDateTime(post.eventDate);

          return p;
        });

      res.status(200);
      return res.json({
        success: true,
        message: 'data found',
        data: {
          sort, status, posts, pagination,
        },
      });
    } catch (error) {
      logger(error);
      res.status(500);
      return res.json(req.err);
    }
  }

  find(req, res) {
    try {
      const finder = this.finder(this.filePath.eventPattern(req.params.slug.trim()));

      if (finder && finder.none === false) {
        const post = { ...this.document };
        post.title = finder.findSingle.title;
        post.slug = finder.findSingle.slug;
        post.published = finder.findSingle.published;
        post.featured = finder.findSingle.featured;
        post.event_date = dateLocalization(finder.findSingle.eventDate, 'F');
        post.date = dateLocalization(finder.findSingle.date, 'DAFM');
        post.url = finder.findSingle.url;
        post.author = finder.findSingle.author;
        post.excerpt = truncate(finder.findSingle.body, 18);
        post.body = finder.findSingle.body;
        post.type = postType(post.excerpt);
        post.is_active = compareDateTime(finder.findSingle.eventDate);

        res.status(200);
        return res.json({
          success: true,
          message: 'data found',
          data: { post },
        });
      }

      req.err.error.message = `No post matched ${req.params.slug}`;
      req.err.error.code = 400;
      req.err.error.details = req.params;

      res.status(400);
      return res.json(req.err);
    } catch (error) {
      logger(error);
      res.status(500);
      return res.json(req.err);
    }
  }
}

export default new EventController();
