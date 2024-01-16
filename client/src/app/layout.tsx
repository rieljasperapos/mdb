import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from "@components/ui/toaster"
import { Header } from '@components/header'
import { connect } from '@/utils/dbconnect'
import { getServerSession } from 'next-auth'
import SessionProvider from '@/utils/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <div>
            {children}
            <Toaster />
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
