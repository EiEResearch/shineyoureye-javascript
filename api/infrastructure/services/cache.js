/* eslint-disable no-restricted-syntax */
import NodeCache from 'node-cache';

class Cache {
  constructor(ttlSeconds = (60 * 60 * 24 * 30)) {
    this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
  }

  getKey(k) {
    const key = k || '';
    const value = this.cache.get(key);

    if (value !== undefined) {
      return value;
    }

    return undefined;
  }

  takeKey(k) {
    const key = k || '';
    const value = this.cache.take(key);

    if (value !== undefined) {
      return value;
    }

    return undefined;
  }

  get(key, storeFunction) {
    const value = this.getKey(key);
    if (value === undefined) {
      switch (typeof storeFunction) {
        case 'function':
          return this.setFunction(key, storeFunction);
        default:
          return this.setObject(key, storeFunction);
      }
    }

    return value;
  }

  setFunction(key, func) {
    return func().then((result) => {
      this.cache.set(key, result);
      return result;
    });
  }

  setObject(key, obj) {
    const success = this.cache.set(key, obj);
    if (success) return obj;
    return undefined;
  }

  del(keys) {
    this.cache.del(keys);
  }

  delStartWith(startStr = '') {
    if (!startStr) {
      return;
    }

    const keys = this.cache.keys();
    for (const key of keys) {
      if (key.indexOf(startStr) === 0) {
        this.del(key);
      }
    }
  }

  flush() {
    return this.cache.flushAll();
  }

  flushStats() {
    return this.cache.flushStats();
  }

  getStats() {
    return this.cache.getStats();
  }

  listKeys() {
    return this.cache.keys();
  }

  close() {
    return this.cache.close();
  }
}


export default new Cache();
