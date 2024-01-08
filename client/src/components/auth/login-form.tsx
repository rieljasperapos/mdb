import { CardWrapper } from "./card-wrapper"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "../ui/button"

export const LoginForm = () => {
  return (
    <div className="flex justify-center items-center my-12">
      <CardWrapper
        headerTitle="Login"
        headerLabel="Welcome Back!"
        showSocial
        register="Dont have an account?"
        registerHref="/auth/register"
      >
        <div className="grid gap-8">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Password</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Button>Sign in</Button>
          </div>
        </div>

      </CardWrapper>
    </div>
  )
}