'use client'

import Link from 'next/link'

export function SideBar() {
    return (
        <aside className="w-64 bg-neutral-900 p-4 h-full">
            <nav className="space-y-4">
                <Link href="/" className="block hover:text-blue-500">
                    Home
                </Link>
                <Link href="/library" className="block hover:text-blue-500">
                    My Library
                </Link>
                <Link href="/search" className="block hover:text-blue-500">
                    Browse
                </Link>
            </nav>
        </aside>
    )
}
