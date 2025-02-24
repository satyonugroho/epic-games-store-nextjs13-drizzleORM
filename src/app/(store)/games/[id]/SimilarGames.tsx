'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { GamesGrid } from '@/components/Games'

export default function SimilarGames({ gameId }: { gameId: string }) {
  const [games, setGames] = useState([])

  useEffect(() => {
    async function fetchSimilarGames() {
      try {
        const { data } = await supabase
          .from('games')
          .select('*')
          .neq('id', gameId)
          .limit(4)

        setGames(data || [])
      } catch (error) {
        console.error('Error fetching similar games:', error)
      }
    }

    fetchSimilarGames()
  }, [gameId])

  return <GamesGrid games={games} />
}

export function SimilarGamesSkeleton() {
  return (
    <div className=" animate-pulse grid grid-cols-2 gap-8 lg:grid-cols-4 ">
      <div className="bg-neutral-800 rounded-md mb-6 h-28"></div>
      <div className="bg-neutral-800 rounded-md mb-6 h-28"></div>
      <div className="bg-neutral-800 rounded-md mb-6 h-28"></div>
      <div className="bg-neutral-800 rounded-md mb-6 h-28"></div>
    </div>
  )
}
