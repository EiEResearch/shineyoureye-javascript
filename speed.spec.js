import { foo, bar } from './speed';

describe('Speed Test', () => {
  test('should output foo', () => {
    expect(foo).toBe('foo');
  });

  test('should output bar', () => {
    expect(bar).toBe('bar');
  });
});
