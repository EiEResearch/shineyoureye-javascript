import Store from '@/app/store';

describe('Store Basics', () => {
  test('store contains an actions object', () => {
    expect(Store).toHaveProperty('_actions');
  });
});
