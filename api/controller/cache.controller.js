/* eslint-disable class-methods-use-this */
import CacheService from 'api/infrastructure/services/cache';
import logger from 'api/logger';

const cache = CacheService;
class CacheController {
  getKey(req, res) {
    try {
      const data = cache.getKey(req.params.key);

      res.status(200);
      return res.json({
        data,
      });
    } catch (error) {
      logger(error);
      res.status(500);
      return res.json(req.err);
    }
  }

  takeKey(req, res) {
    try {
      const data = cache.takeKey(req.params.key);

      res.status(200);
      return res.json({
        data,
      });
    } catch (error) {
      logger(error);
      res.status(500);
      return res.json(req.err);
    }
  }

  listAllKeys(req, res) {
    try {
      const data = cache.listKeys();

      res.status(200);
      return res.json({
        size: data.length,
        data,
      });
    } catch (error) {
      logger(error);
      res.status(500);
      return res.json(req.err);
    }
  }

  listAllStats(req, res) {
    try {
      const data = cache.getStats();

      res.status(200);
      return res.json({
        data,
      });
    } catch (error) {
      logger(error);
      res.status(500);
      return res.json(req.err);
    }
  }

  flushAllStats(req, res) {
    try {
      const data = cache.flushStats();

      res.status(200);
      return res.json({
        data,
      });
    } catch (error) {
      logger(error);
      res.status(500);
      return res.json(req.err);
    }
  }

  flushAllKeys(req, res) {
    try {
      const data = cache.flush();

      res.status(200);
      return res.json({
        data,
      });
    } catch (error) {
      logger(error);
      res.status(500);
      return res.json(req.err);
    }
  }

  closeCache(req, res) {
    try {
      const data = cache.close();

      res.status(200);
      return res.json({
        data,
      });
    } catch (error) {
      logger(error);
      res.status(500);
      return res.json(req.err);
    }
  }
}

export default new CacheController();
