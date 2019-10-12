import bodyParser from 'body-parser';
import cors from 'cors';
import routes from 'api/routes';

export default (app) => {
  app.use(cors());
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
