'use client'

import { useAuth } from '@/components/providers/supabase-provider'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function UserProfilePage() {
    const { user } = useAuth()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    if (!user) {
        router.push('/sign-in')
        return null
    }

    const handleSignOut = async () => {
        setLoading(true)
        try {
            await supabase.auth.signOut()
            router.push('/')
            router.refresh()
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-neutral-900 rounded-lg mt-8">
            <h1 className="text-2xl font-bold mb-6">User Profile</h1>
            <div className="space-y-4">
                <div>
                    <label className="text-sm text-gray-400">Email</label>
                    <p className="text-white">{user.email}</p>
                </div>
                <div>
                    <label className="text-sm text-gray-400">User ID</label>
                    <p className="text-white">{user.id}</p>
                </div>
            </div>
            <button
                onClick={handleSignOut}
                disabled={loading}
                className="mt-6 w-full p-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            >
                {loading ? 'Signing out...' : 'Sign Out'}
            </button>
        </div>
    )
}
