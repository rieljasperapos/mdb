"use client"
import { Button } from "@components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { IBook } from "@/types/book-type";

interface BookParams {
  params: {
    title: string;
  }
};

const Book = ({ params: { title } }: BookParams) => {
  const [bookData, setBookData] = useState<IBook | null>(null);
  const { data: session, status } = useSession();

  const fetchBookContent = () => {
    fetch(`http://localhost:3001/books-user/${title}`, {
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

  useEffect(() => {
    fetchBookContent();
  }, [status])

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
                <img src={bookData.image} alt={bookData.title} style={{ maxWidth: '100%', maxHeight: '400px' }} className="mb-16" />
              ) : (
                <p>No image available</p>
              )}
            </div>
            <h1>Title:</h1>
            <p>{bookData?.title}</p>
            <h1>Author:</h1>
            <p>{bookData?.author}</p>
            <h1>Year Published:</h1>
            <p>{bookData?.publishYear}</p>
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