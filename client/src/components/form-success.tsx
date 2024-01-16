import { CiCircleCheck } from "react-icons/ci"

interface FormErrorProps {
  message: string;
}

export const FormSuccess = ({
  message
}: FormErrorProps) => {
  return (
    message && (
      <div className="bg-emerald-500/15 flex items-center gap-x-3 p-2 rounded-md text-emerald-500 text-sm">
        <CiCircleCheck className="h-4 w-4" />
        <p>{message}</p>
      </div>
    )
  )
}