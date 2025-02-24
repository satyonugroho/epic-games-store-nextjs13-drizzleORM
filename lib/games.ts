import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient()

export async function acquireGame(gameId: string, userId: string) {
    const { data, error } = await supabase
        .from('user_games')
        .insert([
            {
                user_id: userId,
                game_id: gameId,
                acquired_at: new Date().toISOString(),
            }
        ])
        .select()

    if (error) throw error
    return data
}

export async function getUserGames(userId: string) {
    const { data, error } = await supabase
        .from('user_games')
        .select('*, games(*)')
        .eq('user_id', userId)

    if (error) throw error
    return data
}
