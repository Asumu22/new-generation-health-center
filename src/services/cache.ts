type CacheEntry<T> = {
  expiresAt: number;
  data: T;
};

const cache = new Map<string, CacheEntry<unknown>>();
const DEFAULT_TTL_MS = 1000 * 60 * 2; // 2 minutes

export const cacheService = {
  get<T>(key: string): T | null {
    const entry = cache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      cache.delete(key);
      return null;
    }
    return entry.data as T;
  },

  set<T>(key: string, data: T, ttlMs = DEFAULT_TTL_MS) {
    cache.set(key, {
      data,
      expiresAt: Date.now() + ttlMs,
    });
  },

  invalidate(key: string) {
    cache.delete(key);
  },

  clear() {
    cache.clear();
  },
};
