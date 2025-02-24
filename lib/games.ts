import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function acquireGame(gameId: string, userId: string) {
    const supabase = createClientComponentClient()

    const { data, error } = await supabase
        .from('user_games')
        .insert([
            {
                user_id: userId,
                game_id: gameId,
                acquired_at: new Date().toISOString()
            }
        ])
        .select()
        .single()

    if (error) throw error
    return data
}

export async function getUserGames(userId: string) {
    const supabase = createClientComponentClient()

    const { data, error } = await supabase
        .from('user_games')
        .select('*, games(*)')
        .eq('user_id', userId)

    if (error) throw error
    return data
}
