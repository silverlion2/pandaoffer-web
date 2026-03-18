"use server";

import { createClient } from "@supabase/supabase-js";

export async function submitLead(email) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    // Always unlock — lead storage is best-effort, not a gate
    if (!supabaseUrl || !supabaseServiceKey) {
      console.warn("Lead storage skipped — database not configured");
      return { success: true };
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Try to insert, but don't block unlock on failure
    const { error } = await supabase
      .from('leads')
      .insert([{ email }]);

    if (error) {
      // Table might not exist yet — still unlock
      console.error("Lead insert error (non-blocking):", error.message);
    }

    return { success: true };
  } catch (error) {
    console.error("Lead action error (non-blocking):", error);
    // Still unlock even if storage fails
    return { success: true };
  }
}
