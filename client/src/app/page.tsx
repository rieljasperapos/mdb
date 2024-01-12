import { Overview } from '@components/added-books-analytics'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Dashboard",
}

export default function Home() {
  return (
    <div className='flex flex-col justify-center items-center p-10'>
      <div className='flex flex-col w-96 border p-6 my-10'>
        <div className='mb-8'>
          <h1 className='font-bold text-xl'>Books added</h1>
        </div>
        <div>
          <Overview />
        </div>
      </div>
    </div>
  )
}
