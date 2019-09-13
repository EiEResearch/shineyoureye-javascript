import Router from '@/app/about/about-router';

const findIndexInRouter = a => Router.findIndex(item => item.name === a.name);

describe('About Router Basics', () => {
  test('routes inclue a valid path to "/about"', () => {
    const about = {
      path: '/about',
      name: 'about',
    };
    const x = findIndexInRouter(about);
    expect(x).toBeGreaterThan(-1);
  });
});
