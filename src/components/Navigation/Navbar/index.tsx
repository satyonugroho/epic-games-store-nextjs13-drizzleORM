import React from 'react'
import { SearchBar } from '..'
import MobileNav from '../SideBar/MobileNav'
import { useAuth } from '@/components/providers/supabase-provider'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

function Navbar() {
  const { user } = useAuth()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className="flex justify-between items-center mb-8 gap-4">
      <div className="flex gap-4">
        <MobileNav />
        <SearchBar basePath="search" />
      </div>
      {user ? (
        <div className="flex items-center gap-4">
          <Link href="/profile">Profile</Link>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <Link href="/sign-in">Sign In</Link>
      )}
    </div>
  )
}

export default Navbar
