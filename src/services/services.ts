import { supabase } from "../lib/supabase";
import { cacheService } from "./cache";
import type { ServiceItem } from "../types";

const SERVICES_CACHE_KEY = "services_all";
const FETCH_TIMEOUT_MS = 5000;

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

export const serviceService = {
  getAll: async () => {
    const cached = cacheService.get<ServiceItem[]>(SERVICES_CACHE_KEY);
    if (cached) return cached;

    try {
      const { data, error } = await withTimeout(
        supabase
          .from("services")
          .select("id, title, description, image_url, created_at, updated_at"),
        FETCH_TIMEOUT_MS,
      );

      if (error) {
        throw error;
      }

      const services = data as ServiceItem[];
      cacheService.set(SERVICES_CACHE_KEY, services);
      return services;
    } catch (err) {
      console.error("serviceService.getAll error:", err);
      throw err;
    }
  },

  create: async (
    payload: Omit<ServiceItem, "id" | "created_at" | "updated_at">,
  ) => {
    const { data, error } = await supabase
      .from("services")
      .insert(payload)
      .single();
    if (error) {
      throw error;
    }
    cacheService.invalidate(SERVICES_CACHE_KEY);
    return data as ServiceItem;
  },

  update: async (id: string, payload: Partial<ServiceItem>) => {
    const { data, error } = await supabase
      .from("services")
      .update(payload)
      .eq("id", id)
      .single();
    if (error) {
      throw error;
    }
    cacheService.invalidate(SERVICES_CACHE_KEY);
    return data as ServiceItem;
  },

  delete: async (id: string) => {
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) {
      throw error;
    }
    cacheService.invalidate(SERVICES_CACHE_KEY);
  },
};
