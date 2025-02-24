'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        const { error } = await supabase.auth.signUp({
            email,
            password
        })

        if (!error) {
            router.push('/sign-in')
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-neutral-900 rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Create Account</h1>
            <form onSubmit={handleSignUp} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 rounded bg-neutral-800"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 rounded bg-neutral-800"
                />
                <button type="submit" className="w-full p-2 bg-blue-500 rounded">
                    Sign Up
                </button>
            </form>
        </div>
    )
}
