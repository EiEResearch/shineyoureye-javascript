import {
  truncate, dateLocalization, postType,
} from 'api/helper';
import DocumentController from 'api/controller/document.controller';

class InfoController extends DocumentController {
  constructor(baseurl = '/info/') {
    super(baseurl);
  }

  find(req, res) {
    const finder = this.finder(this.filePath.infoPattern(req.params.slug.trim()));

    if (finder && finder.none === false) {
      const post = { ...this.document };
      post.title = finder.findSingle.title;
      post.slug = finder.findSingle.slug;
      post.published = finder.findSingle.published;
      post.featured = finder.findSingle.featured;
      post.eventDate = dateLocalization(finder.findSingle.eventDate, 'DAFM');
      post.date = dateLocalization(finder.findSingle.date, 'DAFM');
      post.url = finder.findSingle.url;
      post.author = finder.findSingle.author;
      post.excerpt = truncate(finder.findSingle.body, 6);
      post.body = finder.findSingle.body;
      post.type = postType(post.excerpt);

      res.status(200);
      return res.json({
        success: true,
        message: 'data found',
        data: { post },
      });
    }

    req.err.error.message = `No document matched ${req.params.slug}`;
    req.err.error.code = 404;
    req.err.error.details = req.params;

    res.status(404);
    return res.json(req.err);
  }
}

export default new InfoController();
