import Router from '@/app/router';

const findIndexInRouter = a => Router.options.routes.findIndex(item => item.name === a.name);

describe('Router basics', () => {
  describe('Home Router Scaffolding', () => {
    test('routes inclue a valid path to home', () => {
      const home = {
        path: '/',
        name: 'home',
      };
      const x = findIndexInRouter(home);
      expect(x).toBeGreaterThan(-1);
    });
  });

  describe('About Router Scaffolding', () => {
    test('routes inclue a valid path to about-us', () => {
      const about = {
        path: '/about',
        name: 'about',
      };
      const x = findIndexInRouter(about);
      expect(x).toBeGreaterThan(-1);
    });
  });
});
