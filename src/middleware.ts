import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Optional: refresh session if expired
  const { data: { session }, error } = await supabase.auth.getSession()

  // Optional: protected routes check
  const isAuthPage = req.nextUrl.pathname.startsWith('/sign-in') ||
    req.nextUrl.pathname.startsWith('/sign-up')
  const isProtectedRoute = req.nextUrl.pathname.startsWith('/protected') ||
    req.nextUrl.pathname.startsWith('/library')

  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  if (session && isAuthPage) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
