import { supabase } from "../lib/supabase";
import type { Appointment } from "../types";

export const appointmentService = {
  create: async (
    payload: Omit<Appointment, "id" | "created_at" | "updated_at" | "status">,
  ) => {
    const { data, error } = await supabase
      .from("appointments")
      .insert(payload)
      .single();
    if (error) {
      throw error;
    }
    return data as Appointment;
  },

  getAll: async (filters?: {
    status?: string;
    type?: string;
    search?: string;
  }) => {
    let query = supabase.from("appointments").select(
      `id, full_name, email, phone, service_id,  date, time, type, status, created_at, updated_at, services (
      id,
      title
    )`,
    );

    if (filters?.status) {
      query = query.eq("status", filters.status);
    }
    if (filters?.type) {
      query = query.eq("type", filters.type);
    }
    if (filters?.search) {
      query = query.ilike("full_name", `%${filters.search}%`);
    }

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });
    if (error) {
      throw error;
    }
    return data as Appointment[];
  },

  update: async (id: string, payload: Partial<Appointment>) => {
    const { data, error } = await supabase
      .from("appointments")
      .update(payload)
      .eq("id", id)
      .single();
    if (error) {
      throw error;
    }
    return data as Appointment;
  },

  delete: async (id: string) => {
    const { error } = await supabase.from("appointments").delete().eq("id", id);
    if (error) {
      throw error;
    }
  },

  getStats: async () => {
    const [{ count, error: countError }, { data, error: recentError }] =
      await Promise.all([
        supabase
          .from("appointments")
          .select("id", { count: "exact", head: true }),
        supabase
          .from("appointments")
          .select(
            `id, full_name, service_id, status, created_at, services (id, title)`,
          )
          .order("created_at", { ascending: false })
          .limit(5),
      ]);

    if (countError) {
      throw countError;
    }
    if (recentError) {
      throw recentError;
    }

    const pending = await supabase
      .from("appointments")
      .select("id", { count: "exact", head: true })
      .eq("status", "Pending");

    const contacted = await supabase
      .from("appointments")
      .select("id", { count: "exact", head: true })
      .eq("status", "Contacted");

    const completed = await supabase
      .from("appointments")
      .select("id", { count: "exact", head: true })
      .eq("status", "Completed");

    if (pending.error || contacted.error || completed.error) {
      throw pending.error || contacted.error || completed.error;
    }

    return {
      total: count || 0,
      pending: pending.count || 0,
      contacted: contacted.count || 0,
      completed: completed.count || 0,
      recent: (data || []) as Appointment[],
    };
  },
};
