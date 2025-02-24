import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  try {
    const { data: game, error } = await supabase
      .from('games')
      .select('*, categories(*), platforms(*)')
      .eq('id', params.id)
      .single()

    if (error) throw error

    // Check if user owns the game
    const { data: { user } } = await supabase.auth.getUser()
    let isOwned = false

    if (user) {
      const { data: userGame } = await supabase
        .from('user_games')
        .select()
        .eq('user_id', user.id)
        .eq('game_id', params.id)
        .single()

      isOwned = !!userGame
    }

    return NextResponse.json({ data: game, isOwned })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
