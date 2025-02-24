import { supabase } from '../lib/supabase'

export async function queryDatabase<T>(query: string, values?: any[]): Promise<T[]> {
    const { data, error } = await supabase
        .from('your_table_name')
        .select()
    // Add more Supabase query builders as needed

    if (error) throw error
    return data as T[]
}

export { supabase }
