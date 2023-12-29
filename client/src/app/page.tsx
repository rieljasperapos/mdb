import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='flex justify-center h-screen items-center'>
      <ul className='flex gap-4'>
        <Link href='/books' className='cursor-pointer hover:text-orange-500 hover:underline'>Books</Link>
        <Link href='/search' className='cursor-pointer hover:text-orange-500 hover:underline'>Search</Link>
      </ul>
    </div>
  )
}
