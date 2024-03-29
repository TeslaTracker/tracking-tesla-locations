export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      tesla_locations: {
        Row: {
          address: string | null
          baidu_lat: string | null
          baidu_lng: string | null
          chargers: string | null
          city: string | null
          country: string | null
          created_at: string | null
          data: Json | null
          geocode: string | null
          id: number
          is_gallery: boolean | null
          latitude: string | null
          location_id: string | null
          longitude: string | null
          open_soon: number | null
          region: string | null
          sub_region: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          baidu_lat?: string | null
          baidu_lng?: string | null
          chargers?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          data?: Json | null
          geocode?: string | null
          id?: number
          is_gallery?: boolean | null
          latitude?: string | null
          location_id?: string | null
          longitude?: string | null
          open_soon?: number | null
          region?: string | null
          sub_region?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          baidu_lat?: string | null
          baidu_lng?: string | null
          chargers?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          data?: Json | null
          geocode?: string | null
          id?: number
          is_gallery?: boolean | null
          latitude?: string | null
          location_id?: string | null
          longitude?: string | null
          open_soon?: number | null
          region?: string | null
          sub_region?: string | null
          updated_at?: string | null
        }
      }
      tesla_locations_changes: {
        Row: {
          created_at: string | null
          diff: Json | null
          id: number
          location_id: string | null
        }
        Insert: {
          created_at?: string | null
          diff?: Json | null
          id?: number
          location_id?: string | null
        }
        Update: {
          created_at?: string | null
          diff?: Json | null
          id?: number
          location_id?: string | null
        }
      }
      vehicle_delivery_infos: {
        Row: {
          country_code: string | null
          created_at: string | null
          effective_date: string | null
          end_date: string | null
          id: number
          lang: string | null
          option_codes: string[] | null
          start_date: string | null
          vehicle_model: string | null
        }
        Insert: {
          country_code?: string | null
          created_at?: string | null
          effective_date?: string | null
          end_date?: string | null
          id?: number
          lang?: string | null
          option_codes?: string[] | null
          start_date?: string | null
          vehicle_model?: string | null
        }
        Update: {
          country_code?: string | null
          created_at?: string | null
          effective_date?: string | null
          end_date?: string | null
          id?: number
          lang?: string | null
          option_codes?: string[] | null
          start_date?: string | null
          vehicle_model?: string | null
        }
      }
      vehicle_options: {
        Row: {
          code: string | null
          created_at: string | null
          currency: string | null
          data: Json | null
          description: string | null
          effective_date: string | null
          id: number
          is_available: boolean | null
          lang: string | null
          long_name: string | null
          name: string | null
          price: number | null
          updated_at: string | null
          vehicle_model: string | null
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          currency?: string | null
          data?: Json | null
          description?: string | null
          effective_date?: string | null
          id?: number
          is_available?: boolean | null
          lang?: string | null
          long_name?: string | null
          name?: string | null
          price?: number | null
          updated_at?: string | null
          vehicle_model?: string | null
        }
        Update: {
          code?: string | null
          created_at?: string | null
          currency?: string | null
          data?: Json | null
          description?: string | null
          effective_date?: string | null
          id?: number
          is_available?: boolean | null
          lang?: string | null
          long_name?: string | null
          name?: string | null
          price?: number | null
          updated_at?: string | null
          vehicle_model?: string | null
        }
      }
      vehicle_options_changes: {
        Row: {
          created_at: string | null
          diff: Json | null
          id: number
          lang: string | null
          option_code: string | null
          vehicle_model: string | null
        }
        Insert: {
          created_at?: string | null
          diff?: Json | null
          id?: number
          lang?: string | null
          option_code?: string | null
          vehicle_model?: string | null
        }
        Update: {
          created_at?: string | null
          diff?: Json | null
          id?: number
          lang?: string | null
          option_code?: string | null
          vehicle_model?: string | null
        }
      }
      vehicle_specs: {
        Row: {
          acceleration_unit: string | null
          created_at: string | null
          data: Json | null
          id: number
          lang: string | null
          option_code: string | null
          range_unit: string | null
          top_speed_unit: string | null
          updated_at: string | null
          vehicle_model: string | null
        }
        Insert: {
          acceleration_unit?: string | null
          created_at?: string | null
          data?: Json | null
          id?: number
          lang?: string | null
          option_code?: string | null
          range_unit?: string | null
          top_speed_unit?: string | null
          updated_at?: string | null
          vehicle_model?: string | null
        }
        Update: {
          acceleration_unit?: string | null
          created_at?: string | null
          data?: Json | null
          id?: number
          lang?: string | null
          option_code?: string | null
          range_unit?: string | null
          top_speed_unit?: string | null
          updated_at?: string | null
          vehicle_model?: string | null
        }
      }
      vehicle_specs_changes: {
        Row: {
          created_at: string | null
          diff: Json | null
          id: number
          lang: string | null
          option_code: string | null
          vehicle_model: string | null
        }
        Insert: {
          created_at?: string | null
          diff?: Json | null
          id?: number
          lang?: string | null
          option_code?: string | null
          vehicle_model?: string | null
        }
        Update: {
          created_at?: string | null
          diff?: Json | null
          id?: number
          lang?: string | null
          option_code?: string | null
          vehicle_model?: string | null
        }
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
