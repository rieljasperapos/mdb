import { UserButton } from '@/components/user-button'
import { getServerSession } from 'next-auth';

export default async function Home() {
  const session = await getServerSession();
  return (
    <div className='flex flex-col gap-4 justify-center items-center'>
      <h1>WELCOME TO MY TEST APP, <span className='font-semibold text-lg'>{session?.user?.name}</span></h1>
      <p>Login Now</p>
      <UserButton />
    </div>
  )
}
