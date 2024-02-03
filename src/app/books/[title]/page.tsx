"use client"
import { Button } from "@components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { IBook, BookParams } from "@/types/book-type";
import Image from "next/image";

const Book = ({ params: { title } }: BookParams) => {
  const [bookData, setBookData] = useState<IBook | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchBookContent = () => {
      fetch(`https://api-mdb.vercel.app/books-user/${title}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: session?.user?.email, title: title })
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(`Error ${res.status}`);
          }
          return res.json();
        })
        .then((data: IBook) => {
          if (data) {
            setBookData(data);
          }
        })
        .catch((err: Error) => {
          console.error(err);
        })
    }
    fetchBookContent();
  }, [session?.user?.email, title])

  return (
    <div className="flex flex-col gap-5 justify-center items-center p-20">
      {status === "authenticated" ? (
        <>
          <div className="mb-10">
            <Button variant='ghost' asChild>
              <Link href='/books'>Back</Link>
            </Button>
          </div>
          <div className="grid gap-4 px-40">
            <div className="flex justify-center items-center">
              {bookData?.image ? (
                <Image src={bookData.image} alt={bookData.title} style={{ maxWidth: '100%', maxHeight: '400px' }} className="mb-16" />
              ) : (
                <p>No image available</p>
              )}
            </div>
            <h1>Title:</h1>
            {bookData?.title ? (
              <p>{bookData?.title}</p>
            ):(
              <p>Loading...</p>
            )}
            <h1>Author:</h1>
            {bookData?.author ? (
              <p>{bookData?.author}</p>
            ):(
              <p>Loading...</p>
            )}
            <h1>Year Published:</h1>
            {bookData?.publishYear ? (
              <p>{bookData?.publishYear}</p>
            ):(
              <p>Loading...</p>
            )}
            {bookData?.description ?
              <>
                <h1>Description:</h1>
                <p>{bookData?.description}</p>
              </>
              :
              ""
            }
          </div>
        </>
      ):(
        <p>Loading...</p>
      )}
    </div>
  )
}

export default Book;