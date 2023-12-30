"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

interface Book {
    title: string;
    author: string;
    publishYear: number;
};

const Search = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState<Book | null>(null);
    console.log(input);

    const handleSubmit = () => {
        fetch(`http://localhost:3001/books/${input}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ input })
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
                setResult(data);
            }
        })
        .catch(err => {
            console.error(err);
        })

        console.log(result);

    }
    return (
        <div className="flex flex-col gap-8 justify-center items-center h-screen">
            <div className="mb-10">
                <Button asChild>
                    <Link href='/'>Back</Link>
                </Button>
            </div>
            <div className="grid gap-10 ">
                <h1>HELLO THIS IS SEARCH PAGE</h1>
                <input value={input} type="text" placeholder="Search" className="p-2 rounded-lg border" onChange={(e) => setInput(e.target.value)}></input>

                {result?.title === input ?
                    <div className="grid grid-cols-2 gap-8">
                        <h1>Title:</h1>
                        <p>{result.title}</p>
                        <h1>Author:</h1>
                        <p>{result.author}</p>
                        <h1>Year Published:</h1>
                        <p>{result.publishYear}</p>
                    </div>
                    :
                    <Button variant="outline" onClick={handleSubmit}>Submit</Button>
                }
            </div>
        </div>
    )
}

export default Search;