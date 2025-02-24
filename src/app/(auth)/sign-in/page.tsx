'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClientComponentClient()

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            })
            if (error) throw error
            router.push('/')
            router.refresh()
        } catch (error) {
            setError('Error signing in')
        } finally {
            setLoading(false)
        }
    }

    const handleGuestSignIn = async () => {
        setLoading(true)
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: 'anonymous@example.com',
                password: 'anonymous'
            })
            if (error) throw error
            router.push('/')
            router.refresh()
        } catch (error) {
            setError('Error signing in as guest')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <div className="w-full max-w-sm p-6 bg-neutral-900 rounded-lg">
                <h1 className="text-2xl font-bold mb-6">Sign In</h1>
                <form onSubmit={handleSignIn} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 bg-neutral-800 rounded"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 bg-neutral-800 rounded"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full p-2 bg-blue-600 rounded hover:bg-blue-700"
                    >
                        {loading ? 'Loading...' : 'Sign In'}
                    </button>
                </form>
                <button
                    onClick={handleGuestSignIn}
                    disabled={loading}
                    className="w-full p-2 mt-4 bg-neutral-700 rounded hover:bg-neutral-600"
                >
                    Continue as Guest
                </button>
                {error && <p className="mt-4 text-red-500">{error}</p>}
                <p className="mt-4 text-center">
                    Don't have an account?{' '}
                    <Link href="/sign-up" className="text-blue-500 hover:text-blue-400">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}
