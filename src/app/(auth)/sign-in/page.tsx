'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function SignInPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleGitHubSignIn() {
        await supabase.auth.signInWithOAuth({
            provider: 'github'
        })
    }

    async function handleAnonymousSignIn() {
        try {
            setLoading(true)
            const { error } = await supabase.auth.signInAnonymously()
            if (error) throw error
            router.push('/')
        } catch (e) {
            setError('Error signing in anonymously')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-sm mx-auto mt-8 space-y-4">
            <button
                onClick={handleGitHubSignIn}
                className="w-full p-2 bg-gray-800 text-white rounded"
            >
                Sign in with GitHub
            </button>
            <button
                onClick={handleAnonymousSignIn}
                disabled={loading}
                className="w-full p-2 bg-gray-600 text-white rounded"
            >
                Continue as Guest
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    )
}
