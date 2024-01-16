"use client"
import { Header } from '@/components/header';
import { Overview } from '@components/added-books-analytics';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Skeleton } from '@/components/ui/skeleton';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  // const checkAuthentication = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3001/auth", {
  //       credentials: "include"
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Error ${response.status}`);
  //     }
  //     const data = await response.json();
  //     if (data.status) {
  //       setAuthenticated(true);
  //     } else {
  //       router.push("/auth/login");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   if (!session?.user) {
  //     redirect("/auth/login");
  //   }
  //   // checkAuthentication();
  // }, []);

  if (!session?.user) {
    redirect("/auth/login")
  }

  return (
    <div className='flex flex-col justify-center items-center p-10'>
      {status === "authenticated" ? 
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
        :
        <p>Loading...</p>
      }

    </div>
  );
};

export default Dashboard;
