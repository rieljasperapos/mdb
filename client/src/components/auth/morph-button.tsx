import { Button } from "@components/ui/button";
import Link from "next/link";
import { MorphButtonProps } from "@/types/auth-type";

export const MorphButton = ({
  label,
  href,
}: MorphButtonProps) => {
  return (
    <>
      <div>
        <Button
          variant="link"
          asChild
          >
            <Link href={href}>{label}</Link>
        </Button>
      </div>
    </>
  )
}