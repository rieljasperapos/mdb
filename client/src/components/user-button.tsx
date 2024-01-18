"use client"
import { Button } from "@components/ui/button"
import { LoginButton } from "@components/auth/login-button"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { Skeleton } from "./ui/skeleton"

interface IUser {
  name: string;
  email: string;
};

const initialUser = {
  name: "",
  email: ""
};

export const UserButton = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<IUser>(initialUser);
  const router = useRouter();
  const { data: session, status } = useSession();

  // const checkAuthentication = () => {
  //   fetch("http://localhost:3001/auth", {
  //     credentials: "include"
  //   })
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error(`Error ${res.status}`)
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       if (data.status) {
  //         setUser(data.data.user)
  //         setAuthenticated(true);
  //       }
  //     })
  // }

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     setAuthenticated(true);
  //   } else {
  //     setAuthenticated(false);
  //   }
  //   // checkAuthentication();
  // }, [])

  // const onClick = () => {
  //   fetch("http://localhost:3001/logout", {
  //     credentials: "include"
  //   })
  //   .then((res) => {
  //     if (!res.ok) {
  //       throw new Error (`Error ${res.status}`)
  //     }

  //     return res.json();
  //   })
  //   .then((data) => {
  //     if (data) {
  //       router.push("/auth/login")
  //       console.log(data);
  //     }
  //   })
  //   .catch((err) => {
  //     console.error(err)
  //   })
  // }

  if (status === "loading") {
    return <Skeleton className="h-10 w-10 rounded-full"></Skeleton>
  }

  return (
    <>
      {session?.user ? (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={session.user.image ? session.user.image : "https://github.com/shadcn.png"} />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{session.user.email}</DropdownMenuItem>
              <DropdownMenuItem>
                <Button 
                  variant="ghost"
                  onClick={() => signOut()}
                  >
                  Sign out
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ):(
        <LoginButton>
          <Button>Sign in</Button>
        </LoginButton>
      )}
    </>
  )
}