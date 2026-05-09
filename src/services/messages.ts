import { supabase } from "../lib/supabase";
import type { Message } from "../types";

export const messageService = {
  create: async (
    payload: Omit<Message, "id" | "created_at" | "updated_at">,
  ) => {
    const { data, error } = await supabase
      .from("messages")
      .insert(payload)
      .single();
    if (error) {
      throw error;
    }
    return data as Message;
  },

  getAll: async () => {
    const { data, error } = await supabase
      .from("messages")
      .select(
        "id, full_name, email, phone, subject, message, created_at, updated_at",
      );
    if (error) {
      throw error;
    }
    return data as Message[];
  },

  delete: async (id: string) => {
    const { error } = await supabase.from("messages").delete().eq("id", id);
    if (error) {
      throw error;
    }
  },

  getStats: async () => {
    const [{ count, error: countError }, { data, error: recentError }] =
      await Promise.all([
        supabase.from("messages").select("id", { count: "exact", head: true }),
        supabase
          .from("messages")
          .select("id, full_name, subject, message, created_at")
          .order("created_at", { ascending: false })
          .limit(5),
      ]);

    if (countError) {
      throw countError;
    }
    if (recentError) {
      throw recentError;
    }

    return {
      total: count || 0,
      recent: (data || []) as Message[],
    };
  },
};
