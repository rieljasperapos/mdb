"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


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
                <Button asChild>
                    <Link href='/'>Back</Link>
                </Button>
            </div>
            <div className="grid gap-10">
                <h1 className="mb-2">HELLO THIS IS BOOKS PAGE</h1>
                <Table>
                    <TableCaption>A list of books.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Title</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Year Published</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                            {books?.map((book, idx) => (
                                <TableRow key={idx}>
                                    <TableCell className="font-medium">{book.title}</TableCell>
                                    <TableCell>{book.author}</TableCell>
                                    <TableCell>{book.publishYear}</TableCell>
                                    <TableCell>
                                        <Button variant="outline" asChild>
                                            <Link href={`/books/${book.title}`}>View</Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>

                {/* {books?.map((book, idx) => (
                    <Link href={`/books/${book.title}`} key={idx} className="font-medium">{book.title}</Link>
                ))} */}
            </div>
        </div>
    )
}

export default Books;