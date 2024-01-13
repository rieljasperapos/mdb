import { Overview } from '@components/added-books-analytics'
import { UserButton } from '@/components/user-button'

export default function Home() {
  return (
    <div className='flex flex-col gap-4 justify-center items-center'>
      <h1>WELCOME TO MY TEST APP</h1>
      <p>Login Now</p>
      <UserButton />
    </div>
  )
}
