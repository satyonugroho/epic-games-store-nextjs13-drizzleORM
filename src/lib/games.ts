import { Game } from '@/db/game/schema'
import { createQueryString } from '@/utils/filters'
import { auth } from '@clerk/nextjs/server'

export const useGames = async <T = Game>(
  page: number,
  searchParams?: { [key: string]: string | string[] | undefined },
  endpoint?: string,
  pageSize?: number,
): Promise<{ data: T[]; hasNextPage: boolean }> => {
  const { getToken } = auth()
  const apiPath = endpoint ? endpoint : 'game'

  const perPage = pageSize ? pageSize : 12
  const pageOffset = (page - 1) * perPage
  const nextPageOffset = pageOffset + perPage

  const query = {
    limit: perPage.toString(),
    offset: pageOffset.toString(),
    ...searchParams,
  }

  const nextQuery = {
    limit: perPage.toString(),
    offset: nextPageOffset.toString(),
    ...searchParams,
  }

  const currentPageQuery = createQueryString(query)
  const nextPageQuery = createQueryString(nextQuery)

  try {
    // Fetch current page
    const currentPageResponse = await fetch(
      `${process.env.BASE_URL}/api/${apiPath}${currentPageQuery}`,
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          'Content-Type': 'application/json'
        },
      }
    );

    if (!currentPageResponse.ok) {
      throw new Error(`HTTP error! status: ${currentPageResponse.status}`);
    }

    const currentPageData = await currentPageResponse.json();

    // Fetch next page
    const nextPageResponse = await fetch(
      `${process.env.BASE_URL}/api/${apiPath}${nextPageQuery}`,
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          'Content-Type': 'application/json'
        },
      }
    );

    if (!nextPageResponse.ok) {
      throw new Error(`HTTP error! status: ${nextPageResponse.status}`);
    }

    const nextPageData = await nextPageResponse.json();

    return {
      data: currentPageData?.data || [],
      hasNextPage: (nextPageData?.data || []).length > 0,
    };

  } catch (error) {
    console.error('Error fetching games:', error);
    return {
      data: [],
      hasNextPage: false,
    };
  }
}