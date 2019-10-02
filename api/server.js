import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from 'api/routes';

const app = express();
const PORT = 3000;

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
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on Port:', PORT);
});

export default app;
