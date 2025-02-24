import { supabase } from './supabase'

export async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    return { data, error }
}

export async function signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    })
    return { data, error }
}

export async function signInAnonymously() {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: 'anonymous@example.com',
        password: 'anonymous',
    })
    return { data, error }
}

export async function signOut() {
    return await supabase.auth.signOut()
}

export function getSession() {
    return supabase.auth.getSession()
}

export function getUser() {
    return supabase.auth.getUser()
}
