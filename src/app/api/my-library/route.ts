import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const limit = Number(searchParams.get('limit'))
  const offset = Number(searchParams.get('offset')) || null

  try {
    const { data, error } = await supabase
      .from('user_games')
      .select('*, games(*)')
      .eq('user_id', user.id)
      .limit(limit)
      .range(offset || 0, (offset || 0) + (limit || 10))

    if (error) throw error
    return NextResponse.json({ data })
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 })
  }
}
