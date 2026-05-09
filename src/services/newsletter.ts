import { supabase } from "../lib/supabase";
import type { NewsletterSubscription } from "../types";

export const newsletterService = {
  subscribe: async (email: string) => {
    const { data, error } = await supabase
      .from("newsletter_subscriptions")
      .insert({ email })
      .single();

    if (error) {
      throw error;
    }
    return data as NewsletterSubscription;
  },
};
