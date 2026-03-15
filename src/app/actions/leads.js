"use server";

import { createClient } from "@supabase/supabase-js";

export async function submitLead(email) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    if (!supabaseUrl || !supabaseServiceKey) {
      return { success: false, error: "Database configuration missing." };
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabase
      .from('leads')
      .insert([{ email }]);

    if (error) {
      console.error("Supabase insert error:", error);
      return { success: false, error: "Failed to save email. Please try again." };
    }

    return { success: true };
  } catch (error) {
    console.error("Action error:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
