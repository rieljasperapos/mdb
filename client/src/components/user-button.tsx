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

  useEffect(() => {
    fetch("http://localhost:3001/auth", {
      credentials: "include"
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}`)
        }
        return res.json();
      })
      .then((data) => {
        if (data.status) {
          console.log(data.data.user);
          console.log(data.message);
          setUser(data.data.user)
          setAuthenticated(true);
        }
      })
  }, [])

  const onClick = () => {
    fetch("http://localhost:3001/logout", {
      credentials: "include"
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error (`Error ${res.status}`)
      }

      return res.json();
    })
    .then((data) => {
      if (data) {
        router.push("/auth/login")
        console.log(data);
      }
    })
    .catch((err) => {
      console.error(err)
    })
  }

  console.log(user);
  return (
    <>
      {authenticated ?
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{user.email}</DropdownMenuItem>
              <DropdownMenuItem>
                <Button 
                  variant="ghost"
                  onClick={onClick}
                  >
                  Sign out
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        :
        <LoginButton>
          <Button>Sign in</Button>
        </LoginButton>}
    </>
  )
}