'use client'

import { GamesGrid } from '@/components/Games'
import Pagination from '@/components/Pagination'
import FeaturedSection from './FeaturedSection'
import { useState, useEffect } from 'react'

type Props = {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function Home({ params, searchParams }: Props) {
  const page = Number(searchParams?.page) || 1
  const games = useGames(page)

  return (
    <main>
      <>
        <FeaturedSection />
        <h2 className=" font-medium text-2xl my-6 mt-16">Featured games</h2>
        <GamesGrid games={games} />
        <Pagination
          page={page}
          hasNextPage={hasNextPage}
          searchParams={searchParams}
        />
      </>
    </main>
  )
}

function useGames(page: number) {
  const [games, setGames] = useState([])
  const [hasNextPage, setHasNextPage] = useState(false)

  useEffect(() => {
    async function fetchGames() {
      // Your fetch logic here
    }
    fetchGames()
  }, [page])

  return { games, hasNextPage }
}
