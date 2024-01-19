"use client";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { Textarea } from "@components/ui/textarea";
import { toast } from "@components/ui/use-toast";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

const Add = () => {
  // TODO: Compress books input fields to object
  const [inputTitle, setInputTitle] = useState("");
  const [inputAuthor, setInputAuthor] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [inputPublishYear, setInputPublishYear] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { data: session, status } = useSession();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      allowedTypes.includes(file.type)
        ? setSelectedFile(file)
        : alert(
          "Invalid file type. Please select an image (JPEG, PNG, or GIF)."
        );
    } else {
      setSelectedFile(null);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/auth/login");
    }

  }, [status])
    
  const handleClick = () => {
    const email = session?.user?.email;
    console.log(email);
    const formData = new FormData();
    formData.append("email", email as string);
    formData.append("inputTitle", inputTitle);
    formData.append("inputAuthor", inputAuthor);
    formData.append("inputPublishYear", inputPublishYear.toString());
    formData.append("inputDescription", inputDescription);

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    console.log(formData);

    fetch("http://localhost:3001/add-book-user", {
      method: "POST",
      // credentials: "include",
      body: formData
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`Error ${res.status}`);
        }
      })
      .then((data) => {
        if (data.valid) {
          toast({
            description: data.message,
          });
          setInputTitle("");
          setInputAuthor("");
          setInputPublishYear(0);
          setInputDescription("");
        } else {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: data.message,
          });
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  if (!session?.user) {
    redirect("/auth/login")
  }
        
  return (
    <div className="flex flex-col justify-center items-center p-10">
      {status === "authenticated" ? (
        <>
          <div className="my-10">
            <Button variant="ghost" asChild>
              <Link href="/">Back</Link>
            </Button>
          </div>
          <div className="grid gap-10">
            <h1>This is add page</h1>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="title">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                value={inputTitle}
                type="text"
                id="title"
                placeholder="e.g Atomic Habits"
                onChange={(e) => setInputTitle(e.target.value)}
                required
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="author">
                Author <span className="text-red-500">*</span>
              </Label>
              <Input
                value={inputAuthor}
                type="text"
                id="author"
                placeholder="e.g James Clear"
                onChange={(e) => setInputAuthor(e.target.value)}
                required
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="year">
                Year Published <span className="text-red-500">*</span>
              </Label>
              <Input
                value={inputPublishYear === 0 ? "" : inputPublishYear}
                type="number"
                id="year"
                placeholder="e.g 2016"
                onChange={(e) => setInputPublishYear(Number(e.target.value))}
                required
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                value={inputDescription}
                id="description"
                onChange={(e) => setInputDescription(e.target.value)}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Picture</Label>
              <Input
                id="picture"
                type="file"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
            </div>
            <Button variant="default" onClick={handleClick}>
              Submit
            </Button>
          </div>
        </>
      ):(
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Add;
