import history from 'connect-history-api-fallback';
import express from 'express';
import config from 'api/configure';
import env from 'home/env';

const app = express();
const PORT = (process.env.NODE_ENV === 'production') ? 80 : 3000;

// API
config(app);

// UI
app.use(express.static('public'));
if (process.env.NODE_ENV === 'production') {
  const staticConf = { maxAge: '1y', etag: false };
  app.use(express.static(env.dist, staticConf));
  app.use(history());
  app.get(/.*/, (req, res) => {
    res.sendFile(`${env.dist}/index.html`);
  });
}

// GO
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on Port:', PORT);
});

export default app;
