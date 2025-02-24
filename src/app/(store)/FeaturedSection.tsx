'use client'

import { useState, useEffect } from 'react'
import FeaturedGames from '@/components/FeaturedGames'
import { Game } from '@/types'

export default function FeaturedSection() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    async function fetchFeaturedGames() {
      try {
        const { data } = await supabase
          .from('games')
          .select('*')
          .limit(5)
        setGames(data || [])
      } catch (error) {
        console.error('Error fetching featured games:', error)
      }
    }

    fetchFeaturedGames()
  }, [])

  return (
    <section>
      <FeaturedGames games={games} />
    </section>
  )
}
