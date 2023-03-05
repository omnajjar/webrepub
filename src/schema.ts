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
          updated_at: string;
          username: string;
        };
        Insert: {
          created_at?: string;
          first_name?: string | null;
          id: string;
          last_name?: string | null;
          onboarded?: boolean;
          updated_at?: string;
          username?: string;
        };
        Update: {
          created_at?: string;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          onboarded?: boolean;
          updated_at?: string;
          username?: string;
        };
      };
      project_tokens: {
        Row: {
          created_at: string;
          id: string;
          project_id: string;
          token: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          project_id: string;
          token: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          project_id?: string;
          token?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          content: string;
          created_at: string | null;
          description: string | null;
          id: string;
          name: string;
          owner: string;
          updated_at: string;
        };
        Insert: {
          content?: string;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name: string;
          owner: string;
          updated_at?: string;
        };
        Update: {
          content?: string;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name?: string;
          owner?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      create_token: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      get_projects_secret: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      get_secret: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      hello_world:
        | {
            Args: Record<PropertyKey, never>;
            Returns: string;
          }
        | {
            Args: {
              name: string;
            };
            Returns: string;
          };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
