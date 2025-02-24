'use client'

import { useState, useEffect } from 'react'
import GamesGrid from '@/components/Games/GamesGrid'
import { supabase } from '@/lib/supabase'
import Pagination from '@/components/Pagination'

type Props = {
  searchParams?: {
    q?: string
    category?: string
    platform?: string
  }
}

export default function SearchPage({ searchParams }: Props) {
  const [games, setGames] = useState([])
  const { q, category, platform } = searchParams || {}

  useEffect(() => {
    async function searchGames() {
      try {
        let query = supabase
          .from('games')
          .select('*')

        if (q) {
          query = query.ilike('title', `%${q}%`)
        }
        if (category) {
          query = query.eq('category', category)
        }
        if (platform) {
          query = query.eq('platform', platform)
        }

        const { data } = await query
        setGames(data || [])
      } catch (error) {
        console.error('Error searching games:', error)
      }
    }

    searchGames()
  }, [q, category, platform])

  return <GamesGrid games={games} />
}
