import { Button } from "@components/ui/button";
import Link from "next/link";

interface MorphButtonProps {
  label: string;
  href: string;
}

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