import Link from "next/link";

export const MainNav = () => {
  return (
    <>
      <ul className='flex gap-4'>
        <Link href='/dashboard' className='cursor-pointer hover:text-orange-500 hover:underline'>Dashboard</Link>
        <Link href='/books' className='cursor-pointer hover:text-orange-500 hover:underline'>Books</Link>
        <Link href='/search' className='cursor-pointer hover:text-orange-500 hover:underline'>Search</Link>
        <Link href='/add' className='cursor-pointer hover:text-orange-500 hover:underline'>Add</Link>
      </ul>
    </>
  )
}