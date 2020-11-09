import bodyParser from 'body-parser';
import cors from 'cors';
import routes from 'api/routes';
import logger from 'api/logger';

// CORS Configuration
const whitelist = ['https://shineyoureye.org', 'http://shineyoureye.org'];
const corsOptions = {
  methods: ['GET', 'OPTIONS', 'POST', 'HEAD'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Access to Request has been blocked by CORS policy').message);
    }
  },
};

export default (app) => {
  app.use(cors(corsOptions));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    try {
    // eslint-disable-next-line no-param-reassign
      req.err = {
        error: {
          message: 'internal server error',
          code: 500,
          details: [],
          target: req.path,
        },
      };

      next();
    } catch (error) {
      logger(error);
    }
  });

  app.use('/api/posts', routes.post);
  app.use('/api/events', routes.event);
  app.use('/api/info', routes.info);
  app.use('/api/people', routes.people);
  app.use('/api/places', routes.places);
  app.use('/api/cache', routes.cache);
  app.use('/api/test', routes.test);
};
