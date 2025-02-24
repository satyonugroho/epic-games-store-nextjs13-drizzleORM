import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/types/supabase'

export const usePlatfroms = async () => {
    const supabase = createClientComponentClient<Database>()

    try {
        const { data, error } = await supabase
            .from('platforms')
            .select('*')

        if (error) throw error
        return { data }
    } catch (e) {
        console.error('Error fetching platforms:', e)
        return { data: [] }
    }
}
