"use client"
import { Button } from '@/components/ui/button';
import { UserButton } from '@components/user-button'
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className='flex flex-col gap-4 justify-center items-center'>
      <h1>WELCOME TO MY TEST APP, <span className='font-semibold text-lg'>{session?.user?.name}</span></h1>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : (
        <>
          {session?.user ? (
            <>
              <Link href="/dashboard">
                <Button>Dashboard</Button>
              </Link>
              <UserButton />
            </>
          ) : (
            <>
              <p>Login Now</p>
              <UserButton />
            </>
          )}
        </>
      )}
    </div>
  )
}
