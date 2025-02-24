import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/types/supabase'

export const useCategories = async () => {
  const supabase = createClientComponentClient<Database>()

  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')

    if (error) {
      console.error('Error fetching categories:', error)
      return { data: [] }
    }

    return { data }
  } catch (e) {
    console.error('Error:', e)
    return { data: [] }
  }
}
