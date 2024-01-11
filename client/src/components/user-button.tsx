import { Button } from "@components/ui/button"
import { LoginButton } from "@components/auth/login-button"

export const UserButton = () => {
  return (
    <>
      <LoginButton>
        <Button>Sign in</Button>
      </LoginButton>
    </>
  )
}