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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import { RiDeleteBin6Line } from "react-icons/ri";


interface Books {
    title: string;
    author: string;
    publishYear: number;
};

const Books = () => {
    const [books, setBooks] = useState<Books[] | null>(null);
    const [alert, setAlert] = useState(false);
    const [title, setTitle] = useState<string | null>(null);
    const [author, setAuthor] = useState<string | null>(null);
    const [publishYear, setPublishYear] = useState<number | null>(null);

    console.log(title)
    console.log(author);
    console.log(publishYear);

    const fetchBook = () => {
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
    }
    useEffect(() => {
        fetchBook();
    }, [])

    const handleClick = (book: string) => {
        console.log(book);
        console.log('test');
        fetch(`http://localhost:3001/deleteBook/${book}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Error ${res.status}`);
                }

                return res.json();
            })
            .then(data => {
                if (data.valid) {
                    console.log(data);
                    setAlert(true);
                    fetchBook();

                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    const handleSaveChangesClick = (book: Books) => {
        const requestBody = {
            title: title || undefined,
            author: author || undefined,
            publishYear: (publishYear !== null && publishYear !== 0) ? publishYear : undefined,
        };

        console.log(requestBody.title);

        fetch(`http://localhost:3001/updateBook/${book.title}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`Error ${res.status}`);
            }

            return res.json();
        })
        .then(data => {
            if (data) {
                console.log(data);
                fetchBook();
            }
        })
        .catch(err => {
            console.error(err);
        })
    }

    return (
        <div className="flex flex-col gap-4 justify-center items-center p-10">
            {alert &&
                <Alert variant='success'>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Successful!</AlertTitle>
                    <AlertDescription>
                        The book is successfully deleted and is completely removed from the database.
                    </AlertDescription>
                </Alert>
            }
            <div className="my-10">
                <Button asChild>
                    <Link href='/'>Back</Link>
                </Button>
            </div>
            <div className="grid gap-10">
                <h1 className="mb-2">BOOKS</h1>
                {books ? (<Table>
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
                                <TableCell>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline">Edit Book</Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Edit Book</DialogTitle>
                                                <DialogDescription>
                                                    Make changes to the selected book. Click save when you're done.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="name" className="text-right">
                                                        Title
                                                    </Label>
                                                    <Input
                                                        id="name"
                                                        defaultValue={book.title}
                                                        className="col-span-3"
                                                        onChange={(e) => {
                                                            const inputValue = e.target.value;
                                                            setTitle(inputValue)
                                                        }}
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="username" className="text-right">
                                                        Author
                                                    </Label>
                                                    <Input
                                                        id="username"
                                                        defaultValue={book.author}
                                                        className="col-span-3"
                                                        onChange={(e) => {
                                                            const inputValue = e.target.value;
                                                            setAuthor( inputValue )
                                                        }}
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="username" className="text-right">
                                                        Year Published
                                                    </Label>
                                                    <Input
                                                        type="number"
                                                        id="yearPublished"
                                                        defaultValue={book.publishYear}
                                                        className="col-span-3"
                                                        onChange={(e) => {
                                                            const inputValue = e.target.value;
                                                            setPublishYear(Number(inputValue));
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <DialogClose asChild>
                                                <Button type="submit" onClick={() => handleSaveChangesClick(book)}>Save changes</Button>
                                            </DialogClose>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                                <TableCell>
                                    <AlertDialog>
                                        <AlertDialogTrigger><RiDeleteBin6Line /></AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete the book
                                                    and remove it's data from our servers.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleClick(book.title)}>Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                    {/* <RiDeleteBin6Line className="text-red-800" onClick={() => handleClick(book.title)} /> */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                ) :
                    <div className="space-y-6">
                        <Skeleton className="h-[20px] rounded-full" />
                        <Skeleton className="h-[20px] rounded-full" />
                        <Skeleton className="h-[20px] rounded-full" />
                    </div>

                }

                {/* {books?.map((book, idx) => (
                    <Link href={`/books/${book.title}`} key={idx} className="font-medium">{book.title}</Link>
                ))} */}
            </div>
        </div>
    )
}

export default Books;