export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      carts: {
        Row: {
          id: string
          name: string
          specialty_item: string
          image_url: string | null
          location: unknown // Geography point (Longitude, Latitude)
          owner_id: string | null
          created_at: string
          category: string | null
          address: string | null
          google_map_url: string | null
          timings: string | null
          operating_days: string | null
          phone: string | null
          description: string | null
          active_weeks: number | null
          is_open: boolean | null
          images: string[] | null
          menu: Json | null
        }
        Insert: {
          id?: string
          name: string
          specialty_item: string
          image_url?: string | null
          location?: unknown
          owner_id?: string | null
          created_at?: string
          category?: string | null
          address?: string | null
          google_map_url?: string | null
          timings?: string | null
          operating_days?: string | null
          phone?: string | null
          description?: string | null
          active_weeks?: number | null
          is_open?: boolean | null
          images?: string[] | null
          menu?: Json | null
        }
        Update: {
          id?: string
          name?: string
          specialty_item?: string
          image_url?: string | null
          location?: unknown
          owner_id?: string | null
          created_at?: string
          category?: string | null
          address?: string | null
          google_map_url?: string | null
          timings?: string | null
          operating_days?: string | null
          phone?: string | null
          description?: string | null
          active_weeks?: number | null
          is_open?: boolean | null
          images?: string[] | null
          menu?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "carts_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      messages: {
        Row: {
          id: string
          cart_id: string
          sender_id: string
          text: string
          created_at: string
        }
        Insert: {
          id?: string
          cart_id: string
          sender_id: string
          text: string
          created_at?: string
        }
        Update: {
          id?: string
          cart_id?: string
          sender_id?: string
          text?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "carts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          id: string
          username: string
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id: string
          username: string
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          username?: string
          avatar_url?: string | null
          created_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          id: string
          cart_id: string
          user_id: string
          rating: number | null
          comment: string | null
          parent_review_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          cart_id: string
          user_id: string
          rating?: number | null
          comment?: string | null
          parent_review_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          cart_id?: string
          user_id?: string
          rating?: number | null
          comment?: string | null
          parent_review_id?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "carts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_parent_review_id_fkey"
            columns: ["parent_review_id"]
            isOneToOne: false
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Convenience Types
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Cart = Database['public']['Tables']['carts']['Row'];
export type Review = Database['public']['Tables']['reviews']['Row'];
export type Message = Database['public']['Tables']['messages']['Row'];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never
