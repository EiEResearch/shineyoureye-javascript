/* eslint-disable no-unused-expressions */
import CacheController from 'api/controller/cache.controller';
import CacheService from 'api/infrastructure/services/cache';

jest.mock('api/infrastructure/services/cache', () => ({
  listKeys: jest.fn(() => (['governors_allPeople_callback', 'mapit_2_Governors',
    'mapit_3_Governors', 'mapit_4_Governors', 'mapit_5_Governors',
    'mapit_6_Governors', 'mapit_7_Governors', 'mapit_8_Governors'])),
  takeKey: jest.fn(() => (['governors_allPeople_callback', 'mapit_2_Governors',
    'mapit_3_Governors', 'mapit_4_Governors', 'mapit_5_Governors',
    'mapit_6_Governors', 'mapit_7_Governors', 'mapit_8_Governors'])),
  getKey: jest.fn(() => (['governors_allPeople_callback', 'mapit_2_Governors',
    'mapit_3_Governors', 'mapit_4_Governors', 'mapit_5_Governors',
    'mapit_6_Governors', 'mapit_7_Governors', 'mapit_8_Governors'])),
  getStats: jest.fn(() => ({
    hits: 2, misses: 12, keys: 12, ksize: 26, vsize: 65,
  })),
  flushStats: jest.fn(() => ({
    hits: 0, misses: 0, keys: 0, ksize: 0, vsize: 0,
  })),
  flush: jest.fn(() => ({})),
  close: jest.fn(() => ({})),
}));

const req = {
  params: {
    slug: '',
    key: 'mapit_3_Governors',
  },
  err: {
    error: {
      message: 'internal server error',
      code: 500,
      details: [],
      target: '',
    },
  },
};

const res = {
  json: obj => obj,
  send: obj => obj,
  status: code => code,
};

describe('CacheController', () => {
  test('should check for a valid cache key', () => {
    CacheService.getKey;
    const d = CacheController.getKey(req, res);
    expect(CacheService.getKey).toHaveBeenCalled;
    expect(d.data).toContain('mapit_3_Governors');
    expect(d.size).toBeUndefined();
  });

  test('should check for valid cache keys', () => {
    CacheService.takeKey;
    const d = CacheController.takeKey(req, res);
    expect(CacheService.takeKey).toHaveBeenCalled;
    expect(d.data).toContain('mapit_3_Governors');
    expect(d.size).toBeUndefined();
  });

  test('should check for valid cache keys', () => {
    CacheService.listKeys;
    const d = CacheController.listAllKeys(req, res);
    expect(CacheService.listKeys).toHaveBeenCalled;
    expect(d.data).toContain('mapit_3_Governors');
    expect(d.size).toBe(8);
  });

  test('should check for valid cached keys stats', () => {
    CacheService.getStats;
    const d = CacheController.listAllStats(req, res);
    expect(CacheService.getStats).toHaveBeenCalled;
    expect(d.data).toEqual(expect.objectContaining({
      hits: expect.any(Number),
      misses: expect.any(Number),
      keys: expect.any(Number),
      ksize: expect.any(Number),
      vsize: expect.any(Number),
    }));
  });

  test('should reset cache stats to zero', () => {
    CacheService.flushStats;
    const d = CacheController.flushAllStats(req, res);
    expect(CacheService.flushStats).toHaveBeenCalled;
    expect(d.data).toEqual(expect.objectContaining({
      hits: 0,
      misses: 0,
      keys: 0,
      ksize: 0,
      vsize: 0,
    }));
  });

  test('should rest cache keys to an empty object', () => {
    CacheService.flush;
    const d = CacheController.flushAllKeys(req, res);
    expect(CacheService.flush).toHaveBeenCalled;
    expect(d.data).not.toContain('mapit_3_Governors');
    expect(d.size).not.toBeDefined;
    expect(d.data).toEqual({});
  });

  test('should close the cache service by reseting all values', () => {
    CacheService.close;
    const d = CacheController.closeCache(req, res);
    expect(CacheService.close).toHaveBeenCalled;
    expect(d.data).not.toContain('mapit_3_Governors');
    expect(d.size).not.toBeDefined;
    expect(d.data).toEqual({});
  });
});

describe('CacheController::Logger', () => {
  test('should log error when getKey method encounters an error', () => {
    console.log = jest.fn();
    CacheController.getKey();
    expect(console.log.mock.calls[0][0]).toBe('Error');
    expect(console.log.mock.calls[0][1]).toBe("Cannot read property 'params' of undefined");
  });

  test('should log error when takeKey method encounters an error', () => {
    console.log = jest.fn();
    CacheController.takeKey();
    expect(console.log.mock.calls[0][0]).toBe('Error');
    expect(console.log.mock.calls[0][1]).toBe("Cannot read property 'params' of undefined");
  });

  test('should log error when listAllKeys method encounters an error', () => {
    console.log = jest.fn();
    CacheController.listAllKeys();
    expect(console.log.mock.calls[0][0]).toBe('Error');
    expect(console.log.mock.calls[0][1]).toBe("Cannot read property 'status' of undefined");
  });

  test('should log error when listAllStats method encounters an error', () => {
    console.log = jest.fn();
    CacheController.listAllStats();
    expect(console.log.mock.calls[0][0]).toBe('Error');
    expect(console.log.mock.calls[0][1]).toBe("Cannot read property 'status' of undefined");
  });

  test('should log error when flushAllStats method encounters an error', () => {
    console.log = jest.fn();
    CacheController.flushAllStats();
    expect(console.log.mock.calls[0][0]).toBe('Error');
    expect(console.log.mock.calls[0][1]).toBe("Cannot read property 'status' of undefined");
  });

  test('should log error when flushAllKeys method encounters an error', () => {
    console.log = jest.fn();
    CacheController.flushAllKeys();
    expect(console.log.mock.calls[0][0]).toBe('Error');
    expect(console.log.mock.calls[0][1]).toBe("Cannot read property 'status' of undefined");
  });

  test('should log error when closeCache method encounters an error', () => {
    console.log = jest.fn();
    CacheController.closeCache();
    expect(console.log.mock.calls[0][0]).toBe('Error');
    expect(console.log.mock.calls[0][1]).toBe("Cannot read property 'status' of undefined");
  });
});
