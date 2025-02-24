'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Session, User } from '@supabase/supabase-js'

const SupabaseContext = createContext<{
    user: User | null
    session: Session | null
}>({
    user: null,
    session: null,
})

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setSession(session)
                setUser(session?.user ?? null)
            }
        )

        return () => subscription.unsubscribe()
    }, [])

    return (
        <SupabaseContext.Provider value={{ user, session }}>
            {children}
        </SupabaseContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(SupabaseContext)
}
