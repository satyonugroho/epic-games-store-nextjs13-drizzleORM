import '@/styles/globals.css'
import { SupabaseProvider } from '../components/providers/supabase-provider'

export const metadata = {
    title: 'Games Store',
    description: 'Free games for everyone'
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <SupabaseProvider>
                    {children}
                </SupabaseProvider>
            </body>
        </html>
    )
}
