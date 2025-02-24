import { Game } from '@/types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const useGames = async <T = Game>(
  page: number,
  searchParams?: { [key: string]: string | string[] | undefined },
  endpoint?: string,
  pageSize: number = 12
): Promise<{ data: T[]; hasNextPage: boolean }> => {
  const supabase = createClientComponentClient()
  const start = (page - 1) * pageSize
  const end = start + pageSize

  try {
    let query = supabase
      .from('games')
      .select('*', { count: 'exact' })
      .range(start, end)

    // Add filters based on searchParams
    if (searchParams?.category) {
      query = query.eq('category', searchParams.category)
    }
    if (searchParams?.platform) {
      query = query.eq('platform', searchParams.platform)
    }
    if (searchParams?.q) {
      query = query.ilike('title', `%${searchParams.q}%`)
    }

    const { data, count, error } = await query

    if (error) throw error

    // Check if there are more items after the current page
    const hasNextPage = (count || 0) > (page * pageSize)

    return {
      data: (data || []) as T[],
      hasNextPage
    }
  } catch (error) {
    console.error('Error fetching games:', error)
    return {
      data: [],
      hasNextPage: false
    }
  }
}