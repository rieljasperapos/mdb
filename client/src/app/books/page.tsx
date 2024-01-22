"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import BookTable from "@/app/books/_lib/components/book-table";

const Books = () => {
  const { status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/auth/login");
    }
  }, [status])
  return (
    <div className="flex flex-col gap-4 justify-center items-center p-10">
      {status === "authenticated" ? (
        <>
          <div className="my-10">
            <Button variant='ghost' asChild>
              <Link href='/'>Back</Link>
            </Button>
          </div>
          <div className="grid gap-10">
            <h1 className="mb-2">BOOKS</h1>
            <BookTable />
          </div>
        </>
      ):(
        <p>Loading...</p>
      )}
    </div>
  )
}

export default Books;