import { useState, useEffect } from "react";
import { IBook, initialBooksInput } from "@/types/book-type";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { RiDeleteBin6Line } from "react-icons/ri";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@components/ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import useAlert from "@/hooks/useAlert";

const BookTable = () => {
  const [books, setBooks] = useState<IBook[] | null>(null);
  const [booksInput, setBooksInput] = useState<IBook>(initialBooksInput);
  const { data: session, status } = useSession();
  const alerts = useAlert();

  const handleChange = (field: keyof IBook, value: any) => {
    setBooksInput((prevBook) => ({
      ...prevBook,
      [field]: value,
    }));
  }

  const dateToString = (createdAt: string) => {
    const originalDate = new Date(createdAt);

    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate: string = originalDate.toLocaleDateString('en-US', options);

    return formattedDate;
  }

  const handleClick = (book: string) => {
    fetch(`https://api-mdb.vercel.app/delete-book-user/${book}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: session?.user?.email })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (data.valid) {
          alerts.showAlertSuccess({
            message: data.message,
            type: 'success',
            status: true
          });
          fetchBook();
        }
      })
      .catch(err => {
        console.error(err);
      })
  }

  const handleSaveChangesClick = (book: IBook) => {
    const requestBody = {
      email: session?.user?.email,
      title: booksInput.title || undefined,
      author: booksInput.author || undefined,
      description: booksInput.description,
      publishYear: (booksInput.publishYear !== null && booksInput.publishYear !== 0) ? booksInput.publishYear : undefined,
    };

    fetch(`https://api-mdb.vercel.app/update-book-user/${book.title}`, {
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
        if (data.valid) {
          alerts.showAlertSuccess({
            message: data.message,
            type: 'success',
            status: true
          });
          fetchBook();
        } else {
          alerts.showAlertFailed({
            message: data.message,
            type: 'failed',
            status: true
          });
        }
      })
      .catch(err => {
        console.error(err);
      })
  }

  const fetchBook = () => {
    fetch('https://api-mdb.vercel.app/get-book-user', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: session?.user?.email }),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}`);
        }
        return res.json();
      })
      .then((data: IBook[]) => {
        if (data) {
          setBooks(data);
        }
      })
      .catch((err: Error) => {
        console.error(err);
      })
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/auth/login");
    }
    fetchBook();
  }, [status])

  return (
    <>
      {alerts.alertSuccess.status &&
        <Alert variant='success'>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Successful!</AlertTitle>
          <AlertDescription>
            {alerts.alertSuccess.message}
          </AlertDescription>
        </Alert>
      }
      {alerts.alertFailed.status &&
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Failed!</AlertTitle>
          <AlertDescription>
            {alerts.alertFailed.message}
          </AlertDescription>
        </Alert>
      }
      {books ? (
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
                          <Label htmlFor="title" className="text-right">
                            Title
                          </Label>
                          <Input
                            id="name"
                            defaultValue={book.title}
                            className="col-span-3"
                            onChange={(e) => {
                              const inputValue = e.target.value;
                              handleChange('title', inputValue);
                            }}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="author" className="text-right">
                            Author
                          </Label>
                          <Input
                            id="author"
                            defaultValue={book.author}
                            className="col-span-3"
                            onChange={(e) => {
                              const inputValue = e.target.value;
                              handleChange('author', inputValue);
                            }}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="year" className="text-right">
                            Year Published
                          </Label>
                          <Input
                            type="number"
                            id="yearPublished"
                            defaultValue={book.publishYear}
                            className="col-span-3"
                            onChange={(e) => {
                              const inputValue = e.target.value;
                              handleChange('publishYear', inputValue);
                            }}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="year" className="text-right">
                            Description
                          </Label>
                          <Textarea
                            defaultValue={book.description}
                            id="description"
                            className="col-span-3"
                            onChange={(e) => handleChange('description', e.target.value)}
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
                  {dateToString(book.createdAt)}
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="space-y-6">
          <Skeleton className="h-[20px] rounded-full" />
          <Skeleton className="h-[20px] rounded-full" />
          <Skeleton className="h-[20px] rounded-full" />
        </div>
      )}
    </>

  )
}

export default BookTable;