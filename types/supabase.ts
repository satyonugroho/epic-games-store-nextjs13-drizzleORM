export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            games: {
                Row: {
                    id: string
                    title: string
                    description: string
                    image: string
                    created_at: string
                    category?: string
                    platform?: string
                }
                Insert: Omit<Database['public']['Tables']['games']['Row'], 'id' | 'created_at'>
            }
            user_games: {
                Row: {
                    id: string
                    user_id: string
                    game_id: string
                    acquired_at: string
                }
                Insert: Omit<Database['public']['Tables']['user_games']['Row'], 'id'>
            }
            platforms: {
                Row: {
                    id: string
                    name: string
                    slug: string
                    created_at?: string
                }
                Insert: Omit<Database['public']['Tables']['platforms']['Row'], 'id' | 'created_at'>
            }
        }
    }
}

export type Platform = Database['public']['Tables']['platforms']['Row']
