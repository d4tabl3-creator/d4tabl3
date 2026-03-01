export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      add_ons: {
        Row: {
          active: boolean | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          price_mxn: number
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          price_mxn?: number
        }
        Update: {
          active?: boolean | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          price_mxn?: number
        }
        Relationships: []
      }
      blueprint_codes: {
        Row: {
          blueprint_data: Json
          claimed_at: string | null
          claimed_by: string | null
          code: string
          created_at: string
          id: string
        }
        Insert: {
          blueprint_data: Json
          claimed_at?: string | null
          claimed_by?: string | null
          code: string
          created_at?: string
          id?: string
        }
        Update: {
          blueprint_data?: Json
          claimed_at?: string | null
          claimed_by?: string | null
          code?: string
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      client_referrals: {
        Row: {
          completed_analysis: boolean | null
          created_at: string
          id: string
          referred_email: string | null
          referred_user_id: string | null
          referrer_user_id: string
          reward_granted: boolean | null
          status: string
          subscribed: boolean | null
        }
        Insert: {
          completed_analysis?: boolean | null
          created_at?: string
          id?: string
          referred_email?: string | null
          referred_user_id?: string | null
          referrer_user_id: string
          reward_granted?: boolean | null
          status?: string
          subscribed?: boolean | null
        }
        Update: {
          completed_analysis?: boolean | null
          created_at?: string
          id?: string
          referred_email?: string | null
          referred_user_id?: string | null
          referrer_user_id?: string
          reward_granted?: boolean | null
          status?: string
          subscribed?: boolean | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          blueprint_data: Json | null
          business_name: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          preview_used_at: string | null
          stripe_customer_id: string | null
          subscription_status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          blueprint_data?: Json | null
          business_name?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          preview_used_at?: string | null
          stripe_customer_id?: string | null
          subscription_status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          blueprint_data?: Json | null
          business_name?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          preview_used_at?: string | null
          stripe_customer_id?: string | null
          subscription_status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      referrals: {
        Row: {
          agent_id: string
          client_business: string | null
          client_name: string | null
          client_user_id: string | null
          created_at: string
          first_month_paid: boolean | null
          id: string
          recurring_commission_rate: number | null
          status: string
          subscribed_at: string | null
          total_earned: number | null
        }
        Insert: {
          agent_id: string
          client_business?: string | null
          client_name?: string | null
          client_user_id?: string | null
          created_at?: string
          first_month_paid?: boolean | null
          id?: string
          recurring_commission_rate?: number | null
          status?: string
          subscribed_at?: string | null
          total_earned?: number | null
        }
        Update: {
          agent_id?: string
          client_business?: string | null
          client_name?: string | null
          client_user_id?: string | null
          created_at?: string
          first_month_paid?: boolean | null
          id?: string
          recurring_commission_rate?: number | null
          status?: string
          subscribed_at?: string | null
          total_earned?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "referrals_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "sales_agents"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_agents: {
        Row: {
          active: boolean | null
          commission_rate: number | null
          created_at: string
          display_name: string | null
          id: string
          phone: string | null
          ref_code: string
          user_id: string
        }
        Insert: {
          active?: boolean | null
          commission_rate?: number | null
          created_at?: string
          display_name?: string | null
          id?: string
          phone?: string | null
          ref_code: string
          user_id: string
        }
        Update: {
          active?: boolean | null
          commission_rate?: number | null
          created_at?: string
          display_name?: string | null
          id?: string
          phone?: string | null
          ref_code?: string
          user_id?: string
        }
        Relationships: []
      }
      user_add_ons: {
        Row: {
          active: boolean | null
          add_on_id: string
          id: string
          purchased_at: string
          user_id: string
        }
        Insert: {
          active?: boolean | null
          add_on_id: string
          id?: string
          purchased_at?: string
          user_id: string
        }
        Update: {
          active?: boolean | null
          add_on_id?: string
          id?: string
          purchased_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_add_ons_add_on_id_fkey"
            columns: ["add_on_id"]
            isOneToOne: false
            referencedRelation: "add_ons"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
