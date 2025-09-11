
import { createClient } from '@supabase/supabase-js';

// FIX: Define Database types to provide type safety for Supabase client.
export interface Database {
  public: {
    Tables: {
      onboarding: {
        Row: {
          user_id: string;
          email: string;
          full_name: string;
          phone: string;
          firm_name: string | null;
          enrolment_number: string;
          status: 'pending' | 'verified' | 'rejected';
        };
        Insert: {
          user_id: string;
          email: string;
          full_name: string;
          phone: string;
          // FIX: Allow firm_name to be null to match the database schema and resolve type inference issues.
          firm_name?: string | null;
          enrolment_number: string;
          status: 'pending' | 'verified' | 'rejected';
        };
        Update: {
          status?: 'pending' | 'verified' | 'rejected';
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          display_name: string;
          status: 'verified' | 'pending_verification' | 'rejected';
          role: 'admin' | 'lawyer';
        };
        Insert: {
          id: string;
          email: string;
          display_name: string;
          status: 'verified' | 'pending_verification' | 'rejected';
          role: 'admin' | 'lawyer';
        };
        Update: {
          status?: 'verified' | 'pending_verification' | 'rejected';
          role?: 'admin' | 'lawyer';
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      // FIX: Define the handle_onboarding RPC function to match its usage in OnboardingPage.tsx.
      // This resolves the "not assignable to parameter of type 'never'" error for this RPC
      // and for other database operations that were failing due to an incomplete type definition.
      handle_onboarding: {
        Args: {
          p_full_name: string
          p_phone: string
          p_firm_name: string | null
          p_enrolment_number: string
        }
        Returns: void
      }
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// --- IMPORTANT ---
// The Supabase configuration below is now populated with your project details.
const supabaseUrl = 'https://phmywmbqvaforkjohoza.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBobXl3bWJxdmFmb3Jram9ob3phIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzNDIxMTcsImV4cCI6MjA3MDkxODExN30.zgLnKWW2i1dLO8VfPuaYOw0RmIBe4iK6juHcTapUE6Q';

// A check to see if the config is still using placeholder values
const isConfigured = supabaseUrl && !supabaseUrl.startsWith("PASTE_");

// FIX: Add Database generic to createClient for type safety.
let supabase: ReturnType<typeof createClient<Database>> | null = null;

if (isConfigured) {
  try {
    // FIX: Add Database generic to createClient for type safety.
    supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
  } catch (e) {
    console.error("Supabase initialization error:", e);
  }
} else {
    // This warning will appear in the browser console if Supabase keys are not set.
    console.warn("Supabase is not configured. Please add your project credentials to `supabase.ts` to enable login and other features.");
}

export { supabase };