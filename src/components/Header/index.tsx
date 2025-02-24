'use client'

import Link from 'next/link'
import { useAuth } from '@/components/providers/supabase-provider'
import { supabase } from '@/lib/supabase'

export function Header() {
    const { user } = useAuth()

    const handleSignOut = async () => {
        await supabase.auth.signOut()
    }

    return (
        <header className="py-4">
            <nav className="container mx-auto flex items-center justify-between">
                <Link href="/">Games Store</Link>
                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <Link href="/library">My Library</Link>
                            <button onClick={handleSignOut}>Sign Out</button>
                        </>
                    ) : (
                        <Link href="/sign-in">Sign In</Link>
                    )}
                </div>
            </nav>
        </header>
    )
}
