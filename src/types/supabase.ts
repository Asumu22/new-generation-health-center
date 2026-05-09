export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          role: "admin";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name?: string | null;
          role?: "admin";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          email?: string;
          name?: string | null;
          role?: "admin";
          updated_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          description?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          description?: string | null;
          image_url?: string | null;
          updated_at?: string;
        };
      };
      doctors: {
        Row: {
          id: string;
          name: string;
          title: string | null;
          experience: string | null;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          title?: string | null;
          experience?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          title?: string | null;
          experience?: string | null;
          image_url?: string | null;
          updated_at?: string;
        };
      };
      appointments: {
        Row: {
          id: string;
          full_name: string;
          email: string | null;
          phone: string;
          service_id: string | null;
          date: string | null;
          time: string | null;
          message: string | null;
          type: "consultation" | "quote";
          status: "Pending" | "Contacted" | "Completed";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          full_name: string;
          email?: string | null;
          phone: string;
          service_id?: string | null;
          date?: string | null;
          time?: string | null;
          message?: string | null;
          type?: "consultation" | "quote";
          status?: "Pending" | "Contacted" | "Completed";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          full_name?: string;
          email?: string | null;
          phone?: string;
          service_id?: string | null;
          date?: string | null;
          time?: string | null;
          message?: string | null;
          type?: "consultation" | "quote";
          status?: "Pending" | "Contacted" | "Completed";
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string | null;
          subject: string | null;
          message: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          full_name: string;
          email: string;
          phone?: string | null;
          subject?: string | null;
          message: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          full_name?: string;
          email?: string;
          phone?: string | null;
          subject?: string | null;
          message?: string;
          updated_at?: string;
        };
      };
      newsletter_subscriptions: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          email: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          email?: string;
          updated_at?: string;
        };
      };
      site_content: {
        Row: {
          key: string;
          content: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          key: string;
          content?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          content?: Json;
          updated_at?: string;
        };
      };
    };
  };
}
