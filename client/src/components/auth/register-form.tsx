import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import { CardWrapper } from "./card-wrapper"
import { Button } from "../ui/button"

export const RegisterForm = () => {
  return (
    <div className="flex justify-center items-center my-12">
      <CardWrapper
        headerTitle="Register"
        headerLabel="Greetings!"
        login="Already have an account?"
        loginHref="/auth/login"
      >
        <div className="grid gap-8">
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Username</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Password</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Confirm Password</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Button>Sign up</Button>
          </div>
        </div>

      </CardWrapper>
    </div>
  )
}