import { supabase } from "../lib/supabase";
import { cacheService } from "./cache";
import type { ContentSectionKey, SiteContent } from "../types/content";

const CONTENT_CACHE_KEY = "site_content_all";
const FETCH_TIMEOUT_MS = 15000; // 15 second timeout for production

// Helper to add timeout to a promise
const withTimeout = <T>(promise: Promise<T>, timeoutMs: number): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(
        () => reject(new Error(`Request timeout after ${timeoutMs}ms`)),
        timeoutMs,
      ),
    ),
  ]);
};

export const contentService = {
  getAll: async (): Promise<SiteContent> => {
    const cached = cacheService.get<SiteContent>(CONTENT_CACHE_KEY);
    if (cached) return cached;

    try {
      const { data, error } = await withTimeout(
        supabase.from("site_content").select("key, content"),
        FETCH_TIMEOUT_MS,
      );

      if (error) {
        throw error;
      }

      const result = (data || []).reduce((acc, row) => {
        return {
          ...acc,
          [row.key]: row.content,
        };
      }, {} as SiteContent);

      cacheService.set(CONTENT_CACHE_KEY, result);
      return result;
    } catch (err) {
      console.error("contentService.getAll error:", err);
      throw err;
    }
  },

  getByKey: async (key: ContentSectionKey) => {
    const cached = cacheService.get<SiteContent>(CONTENT_CACHE_KEY);
    if (cached && key in cached) {
      return cached[key] as unknown;
    }

    try {
      const { data, error } = await withTimeout(
        supabase.from("site_content").select("content").eq("key", key).single(),
        FETCH_TIMEOUT_MS,
      );

      if (error) {
        throw error;
      }

      return data?.content ?? null;
    } catch (err) {
      console.error(`contentService.getByKey(${key}) error:`, err);
      throw err;
    }
  },

  upsert: async (key: ContentSectionKey, content: object) => {
    const { error } = await supabase.from("site_content").upsert(
      {
        key,
        content,
      },
      { onConflict: ["key"] },
    );

    if (error) {
      throw error;
    }

    cacheService.invalidate(CONTENT_CACHE_KEY);
  },
};
