import { Button } from "./ui/button"
import { LoginButton } from "./auth/login-button"

export const UserButton = () => {
  return (
    <>
      <LoginButton>
        <Button>Sign in</Button>
      </LoginButton>
    </>
  )
}