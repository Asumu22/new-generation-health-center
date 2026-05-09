import { supabase } from "../lib/supabase";
import { cacheService } from "./cache";
import type { Doctor } from "../types";

const DOCTORS_CACHE_KEY = "doctors_all";

export const doctorService = {
  getAll: async () => {
    const cached = cacheService.get<Doctor[]>(DOCTORS_CACHE_KEY);
    if (cached) return cached;

    const { data, error } = await supabase
      .from("doctors")
      .select("id, name, title, experience, image_url, created_at, updated_at");

    if (error) {
      throw error;
    }

    const doctors = data as Doctor[];
    cacheService.set(DOCTORS_CACHE_KEY, doctors);
    return doctors;
  },

  create: async (payload: Omit<Doctor, "id" | "created_at" | "updated_at">) => {
    const { data, error } = await supabase
      .from("doctors")
      .insert(payload)
      .single();
    if (error) {
      throw error;
    }
    cacheService.invalidate(DOCTORS_CACHE_KEY);
    return data as Doctor;
  },

  update: async (id: string, payload: Partial<Doctor>) => {
    const { data, error } = await supabase
      .from("doctors")
      .update(payload)
      .eq("id", id)
      .single();
    if (error) {
      throw error;
    }
    cacheService.invalidate(DOCTORS_CACHE_KEY);
    return data as Doctor;
  },

  delete: async (id: string) => {
    const { error } = await supabase.from("doctors").delete().eq("id", id);
    if (error) {
      throw error;
    }
    cacheService.invalidate(DOCTORS_CACHE_KEY);
  },

  getCount: async () => {
    const { count, error } = await supabase
      .from("doctors")
      .select("id", { count: "exact", head: true });

    if (error) {
      throw error;
    }

    return count || 0;
  },
};
