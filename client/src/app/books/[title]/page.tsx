"use client"
import { Button } from "@components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface IBook {
  title: string;
  author: string;
  publishYear: number;
  [key: string]: any;
};

interface BookParams {
  params: {
    title: string;
  }
};

const Book = ({ params: { title } }: BookParams) => {
  const [bookData, setBookData] = useState<IBook | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3001/books/${title}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}`);
        }

        return res.json();
      })
      .then((data: IBook) => {
        if (data) {
          console.log(data);
          setBookData(data);
        }
      })
      .catch((err: Error) => {
        console.error(err);
      })
  }, [])

  return (
    <div className="flex flex-col gap-5 justify-center items-center p-20">
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
    </div>
  )
}

export default Book;