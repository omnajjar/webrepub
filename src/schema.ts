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
      accounts: {
        Row: {
          created_at: string;
          first_name: string | null;
          id: string;
          last_name: string | null;
          onboarded: boolean;
          updated_at: string | null;
          username: string;
        };
        Insert: {
          created_at?: string;
          first_name?: string | null;
          id: string;
          last_name?: string | null;
          onboarded?: boolean;
          updated_at?: string | null;
          username?: string;
        };
        Update: {
          created_at?: string;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          onboarded?: boolean;
          updated_at?: string | null;
          username?: string;
        };
      };
      projects: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: string;
          name: string;
          owner: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name: string;
          owner: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name?: string;
          owner?: string;
          updated_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
