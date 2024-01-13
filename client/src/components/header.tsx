import { MainNav } from "@components/main-nav"
import { UserButton } from "@components/user-button"

export const Header = () => {
  return (
    <>
      <header className="sticky flex justify-center p-10">
        <div className="flex items-center justify-between gap-10 w-full h-16 max-w-3xl px-4 mx-auto sm:px-6">
          <MainNav />
          <UserButton />
        </div>
      </header>
    </>
  )
}
