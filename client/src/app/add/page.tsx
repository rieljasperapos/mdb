"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"

interface Books {
    title: string;
    author: string;
    publishYear: number
};

const Add = () => {
    const [inputTitle, setInputTitle] = useState("");
    const [inputAuthor, setInputAuthor] = useState("");
    const [inputPublishYear, setInputPublishYear] = useState(0);
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertFailed, setAlertFailed] = useState(false);

    const handleClick = () => {
        fetch('http://localhost:3001/addBook', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inputTitle, inputAuthor, inputPublishYear })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`Error ${res.status}`);
            }

            return res.json();
        })
        .then(data => {
            console.log(data);
            if (data.valid) {
                console.log(data);
                setAlertSuccess(true);
                setAlertFailed(false);
                setInputTitle("");
                setInputAuthor("");
                setInputPublishYear(0);
            } else {
                setAlertFailed(true);
            }
        })
        .catch(err => {
            console.error(err);
        })
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            {alertSuccess &&
                    <Alert variant='success'>
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Successful!</AlertTitle>
                        <AlertDescription>
                            The book is successfully added.
                        </AlertDescription>
                    </Alert>
            }
            {alertFailed && 
                    <Alert variant='destructive'>
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Failed!</AlertTitle>
                        <AlertDescription>
                            Please fill out missing fields.
                        </AlertDescription>
                    </Alert>}
            <div className="my-10">
                <Button asChild>
                    <Link href='/'>Back</Link>
                </Button>
            </div>
            <div className="grid gap-10">
                <h1>This is add page</h1>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
                    <Input value={inputTitle} type="text" id="title" placeholder="e.g Atomic Habits" onChange={(e) => setInputTitle(e.target.value)} required />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="author">Author <span className="text-red-500">*</span></Label>
                    <Input value={inputAuthor} type="text" id="author" placeholder="e.g James Clear" onChange={(e) => setInputAuthor(e.target.value)} required />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="year">Year Published <span className="text-red-500">*</span></Label>
                    <Input type='number' id="year" placeholder="e.g 2016" onChange={(e) => setInputPublishYear(Number(e.target.value))} required />
                </div>
                
                <Button variant='outline' onClick={handleClick}>Submit</Button>
                
            </div>

        </div>
    )
}

export default Add;