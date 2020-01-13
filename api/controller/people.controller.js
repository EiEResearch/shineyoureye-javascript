/* eslint-disable class-methods-use-this */
import isIn from 'validator/lib/isIn';
import isEmpty from 'validator/lib/isEmpty';
import People from 'api/infrastructure/membership/people';
import logger from 'api/logger';

class PeopleController {
  GLOBAL_LEGISLATURE = 'all';

  async getSingleLegislatureByState(req, res) {
    try {
      const { state, legislature } = req.params;

      if (!isIn(String(legislature).toLowerCase(), ['honorables', 'representatives', 'senate', 'governors'])) {
        req.err.error.message = 'Sorry, no content matched your legislature type.';
        req.err.error.code = 404;
        req.err.error.details = req.query;

        res.status(404);
        return res.json(req.err);
      }

      let people = [];

      if (state === undefined) {
        people = await new People(legislature).allPeopleGroupedByState();
      } else {
        people = await new People(legislature).allPeopleByState(state);
      }

      res.status(200);
      return res.json({
        success: true,
        message: 'data found',
        data: { people },
      });
    } catch (error) {
      logger(error);
    }
  }

  async getAllLegislaturesByState(req, res) {
    try {
      const { state } = req.params;

      let people = [];

      if (state === undefined) {
        people = await new People(this.GLOBAL_LEGISLATURE).allPeopleGroupedByState();
      } else {
        people = await new People(this.GLOBAL_LEGISLATURE).allPeopleByState(state);
      }

      res.status(200);
      return res.json({
        success: true,
        message: 'data found',
        data: { people },
      });
    } catch (error) {
      logger(error);
    }
  }

  async getSingleLegislatureByMapitArea(req, res) {
    try {
      const { code, legislature } = req.params;

      if (!isIn(String(legislature).toLowerCase(), ['honorables', 'representatives', 'senate', 'governors'])) {
        req.err.error.message = 'Sorry, no content matched your legislature type.';
        req.err.error.code = 404;
        req.err.error.details = req.query;

        res.status(404);
        return res.json(req.err);
      }

      let people = [];

      if (code === undefined) {
        people = await new People(legislature).allPeopleGroupedByMapitArea();
      } else {
        people = await new People(legislature).allPeopleByMapitArea(code);
      }

      res.status(200);
      return res.json({
        success: true,
        message: 'data found',
        data: { people },
      });
    } catch (error) {
      logger(error);
    }
  }

  async getAllLegislaturesByMapitArea(req, res) {
    try {
      const { code } = req.params;

      let people = [];

      if (code === undefined) {
        people = await new People(this.GLOBAL_LEGISLATURE).allPeopleGroupedByMapitArea();
      } else {
        people = await new People(this.GLOBAL_LEGISLATURE).allPeopleByMapitArea(code);
      }

      res.status(200);
      return res.json({
        success: true,
        message: 'data found',
        data: { people },
      });
    } catch (error) {
      logger(error);
    }
  }

  async getSingleLegislatureByParty(req, res) {
    try {
      const { legislature } = req.params;

      if (!isIn(String(legislature).toLowerCase(), ['honorables', 'representatives', 'senate', 'governors'])) {
        req.err.error.message = 'Sorry, no content matched your legislature type.';
        req.err.error.code = 404;
        req.err.error.details = req.query;

        res.status(404);
        return res.json(req.err);
      }

      const people = await new People(legislature).allPeopleGroupedByParty();

      res.status(200);
      return res.json({
        success: true,
        message: 'data found',
        data: { people },
      });
    } catch (error) {
      logger(error);
    }
  }

  async getAllLegislaturesByParty(req, res) {
    try {
      const people = await new People(this.GLOBAL_LEGISLATURE).allPeopleGroupedByParty();

      res.status(200);
      return res.json({
        success: true,
        message: 'data found',
        data: { people },
      });
    } catch (error) {
      logger(error);
    }
  }

  async getAllLegislatures(req, res) {
    try {
      const people = await new People(this.GLOBAL_LEGISLATURE).allPeopleWithValidArea();

      res.status(200);
      return res.json({
        success: true,
        message: 'data found',
        data: { people },
      });
    } catch (error) {
      logger(error);
    }
  }

  async getSingleLegislatures(req, res) {
    try {
      const legislature = (req.path || '').replace(/\//g, '');

      if (!isIn(String(legislature).toLowerCase(), ['honorables', 'representatives', 'senate', 'governors'])) {
        req.err.error.message = 'Sorry, no content matched your legislature type.';
        req.err.error.code = 404;
        req.err.error.details = req.query;

        res.status(404);
        return res.json(req.err);
      }

      const people = await new People(legislature).allPeopleWithValidArea();

      res.status(200);
      return res.json({
        success: true,
        message: 'data found',
        data: { people },
      });
    } catch (error) {
      logger(error);
    }
  }

  async getSinglePoliticianPerLegislature(req, res) {
    try {
      const { slug } = req.params;

      if (isEmpty(String(slug || '').toLowerCase())) {
        req.err.error.message = 'Sorry, no content matched your politician type.';
        req.err.error.code = 404;
        req.err.error.details = req.query;

        res.status(404);
        return res.json(req.err);
      }

      const people = await new People(this.GLOBAL_LEGISLATURE).singlePersonBySlug(slug);

      res.status(200);
      return res.json({
        success: true,
        message: 'data found',
        data: { people },
      });
    } catch (error) {
      logger(error);
    }
  }
}

export default new PeopleController();
