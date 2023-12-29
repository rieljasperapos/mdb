"use client"
import Link from "next/link";
import { useEffect, useState } from "react";

interface Books {
    title: string;
    author: string;
    publishYear: number;
};

const Books = () => {
    const [books, setBooks] = useState<Books[] | null>(null);
    useEffect(() => {
        fetch('http://localhost:3001/books')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Error ${res.status}`);
                }

                console.log(res);
                return res.json();
            })
            .then((data: Books[]) => {
                if (data) {
                    setBooks(data);
                    console.log(data);
                } else {
                    console.log("Error fetching the data");
                }
            })
            .catch((err: Error) => {
                console.error(err);
            })
    }, [])

    return (
        <div className="flex flex-col gap-4 justify-center items-center h-screen">
            <div className="mb-10">
                <Link href='/' className="p-2 bg-gray-200 rounded-lg hover:bg-gray-100">Back</Link>
            </div>
            <div className="grid gap-5">
                <h1 className="mb-2">HELLO THIS IS BOOKS PAGE</h1>
                {books?.map((book, idx) => (
                    <Link href={`/books/${book.title}`} key={idx} className="font-medium">{book.title}</Link>
                ))}
            </div>
        </div>
    )
}

export default Books;