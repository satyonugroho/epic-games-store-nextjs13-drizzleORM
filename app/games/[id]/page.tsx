'use client'

import { acquireGame } from '@/lib/games'
import { useAuth } from '@/components/providers/supabase-provider'

export default function GamePage({ params }: { params: { id: string } }) {
    const { user } = useAuth()

    const handleAcquire = async () => {
        if (!user) return // Handle authentication

        try {
            await acquireGame(params.id, user.id)
            // Handle success (e.g., show success message, redirect)
        } catch (error) {
            // Handle error
        }
    }

    return (
        <div>
            {/* ...existing game details... */}
            <button
                onClick={handleAcquire}
                className="button primary"
            >
                Get Game Now
            </button>
        </div>
    )
}
