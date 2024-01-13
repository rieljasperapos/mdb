import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@components/ui/button";

export const Socials = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full gap-8">
        <div>
          <h1>Login With</h1>
        </div>
        <div className="flex gap-x-4 w-full">
          <Button 
            size="lg" 
            className="w-full" 
            variant="outline"
          >
            <FcGoogle 
              className="h-5 w-5" 
            />
          </Button>
          <Button 
            size="lg" 
            className="w-full" 
            variant="outline"
          >
            <FaGithub 
              className="h-5 w-5" 
            />
          </Button>
        </div>
      </div>
    </>
  )
}