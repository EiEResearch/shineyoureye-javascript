import bodyParser from 'body-parser';
import cors from 'cors';
import routes from 'api/routes';

// CORS Configuration
const whitelist = ['http://example1.com', 'http://example2.com'];
const corsOptions = {
  methods: ['GET', 'OPTIONS'],
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
  });

  app.use('/api/posts', routes.post);
  app.use('/api/events', routes.event);
  app.use('/api/info', routes.info);
};
