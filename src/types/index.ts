export * from "./content";
export * from "./supabase";

export interface Doctor {
  id: string;
  name: string;
  title?: string | null;
  experience?: string | null;
  image_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description?: string | null;
  image_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  full_name: string;
  email?: string | null;
  phone: string;
  service_id?: string | null;
  services?: {
    id: string;
    title?: string;
  } | null;
  date?: string | null;
  time?: string | null;
  message?: string | null;
  type: "consultation" | "quote";
  status: "Pending" | "Contacted" | "Completed";
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  full_name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
  created_at: string;
  updated_at: string;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}
