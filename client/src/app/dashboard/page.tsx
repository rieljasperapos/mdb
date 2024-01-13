"use client"
import { Header } from '@/components/header';
import { Overview } from '@components/added-books-analytics';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch("http://localhost:3001/auth", {
          credentials: "include"
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        const data = await response.json();
        if (data.status) {
          setAuthenticated(true);
        } else {
          router.push("/auth/login");
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkAuthentication();
  }, []);

  if (!authenticated) {
    return null;
  }

  return (
    <div className='flex flex-col justify-center items-center p-10'>
      <Header />
      <div className='flex flex-col w-96 border p-6 my-10'>
        <div className='mb-8'>
          <h1 className='font-bold text-xl'>Books added</h1>
        </div>
        <div>
          <Overview />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
