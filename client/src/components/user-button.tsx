"use client"
import { Button } from "@components/ui/button"
import { LoginButton } from "@components/auth/login-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react"
import { Skeleton } from "./ui/skeleton"

export const UserButton = () => {
  const { data: session, status } = useSession();

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