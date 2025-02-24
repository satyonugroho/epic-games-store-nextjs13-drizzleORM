import GameDetails from '@/components/Games/GameDetails'
import GameMedia from '@/components/Games/GameMedia'
import { Category, Game } from '@/db/game/schema'
import { Media, media } from '@/db/media/schema'
import { Platform } from '@/db/platforms/schema'
import { auth } from '@clerk/nextjs/server'
import { getCategoryNames } from '@/utils/helpers/Games'

import Image from 'next/image'
import React from 'react'
import SimilarGames from './SimilarGames'

type Props = {
  params: { id: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

async function GameDetailsPage({ params, searchParams }: Props) {
  const { id } = params
  const activeImage = Number(searchParams?.image)
  const { getToken } = auth()

  // Response type
  type Response = {
    data: Game & {
      media: Media[]
      platforms: {
        platform: Platform
      }[]
      categories: {
        category: Category
      }[]
    }
    isOwned: boolean
  }

  try {
    const response = await fetch(
      `${process.env.BASE_URL}/api/game/${id}`,
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          'Content-Type': 'application/json'
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data, isOwned } = await response.json() as Response;

    if (!data) {
      throw new Error('No game data received');
    }

    const game = data;
    const relatedCategories = getCategoryNames(game.categories)
      .split(',')
      .join('|');

    return (
      <div className="pb-24">
        {/* ...existing JSX... */}
      </div>
    );

  } catch (error) {
    console.error('Error fetching game details:', error);
    // You might want to return an error UI component here
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Failed to load game details</p>
      </div>
    );
  }
}

export default GameDetailsPage