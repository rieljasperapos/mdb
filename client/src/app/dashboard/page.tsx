"use client"
import { Header } from '@/components/header';
import { Overview } from '@/app/dashboard/_lib/components/books-analytics';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

const Dashboard = () => {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect('/auth/login');
    }
  })

  return (
    <div className='flex flex-col justify-center items-center p-10'>
      {status === "authenticated" ? (
        <>
          <Header />
          <div className='flex flex-col w-96 border p-6 my-10'>
            <div className='mb-8'>
              <h1 className='font-bold text-xl'>Books added</h1>
            </div>
            <div>
              <Overview />
            </div>
          </div>
        </>
      ):(
        <p>Loading...</p>
      )}

    </div>
  );
};

export default Dashboard;
