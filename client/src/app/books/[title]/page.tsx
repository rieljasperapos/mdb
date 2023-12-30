"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Book {
    title: string;
    author: string;
    publishYear: number;
};

interface BookParams {
    params: {
        title: string;
    }
};

const Book: React.FC<BookParams> = ({params : { title }}) => {
    const [bookData, setBookData] = useState<Book | null>(null);
    
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
        .then((data: Book) => {
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
        <div className="flex flex-col gap-5 justify-center items-center h-screen">
            <div className="mb-10">
                <Button asChild>
                    <Link href='/books'>Back</Link>
                </Button>
            </div>
            <div className="grid gap-4">
                <h1>Title:</h1>
                <p>{bookData?.title}</p>
                <h1>Author:</h1>
                <p>{bookData?.author}</p>
                <h1>Year Published:</h1>
                <p>{bookData?.publishYear}</p>
            </div>
        </div>
    )
}

export default Book;