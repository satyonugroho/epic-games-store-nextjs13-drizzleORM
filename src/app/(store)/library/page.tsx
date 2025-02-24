'use client'

import { useState, useEffect } from 'react'
import { GamesGrid } from '@/components/Games'
import { useAuth } from '@/components/providers/supabase-provider'
import { supabase } from '@/lib/supabase'

export default function LibraryPage() {
  const { user } = useAuth()
  const [games, setGames] = useState([])

  useEffect(() => {
    async function fetchUserGames() {
      if (!user) return

      try {
        const { data } = await supabase
          .from('user_games')
          .select('*, games(*)')
          .eq('user_id', user.id)

        setGames(data?.map(ug => ug.games) || [])
      } catch (error) {
        console.error('Error fetching library games:', error)
      }
    }

    fetchUserGames()
  }, [user])

  if (!user) {
    return <div>Please sign in to view your library</div>
  }

  return <GamesGrid games={games} />
}
