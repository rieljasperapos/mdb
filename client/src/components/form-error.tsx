import { FaCircleExclamation } from "react-icons/fa6";

interface FormErrorProps {
  message: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  return (
    message && (
      <div className="bg-destructive/15 flex items-center gap-3 p-2 rounded-md text-destructive/50 text-sm">
        <FaCircleExclamation className="h-4 w-4" />
        <p>{message}</p>
      </div>
    )
  );
};
