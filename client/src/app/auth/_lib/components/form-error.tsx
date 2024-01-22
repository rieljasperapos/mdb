import { FaCircleExclamation } from "react-icons/fa6";
import { FormStatusProps } from "@/types/auth-type";

export const FormError = ({ message }: FormStatusProps) => {
  return (
    message && (
      <div className="bg-destructive/15 flex items-center gap-3 p-2 rounded-md text-destructive/50 text-sm">
        <FaCircleExclamation className="h-4 w-4" />
        <p>{message}</p>
      </div>
    )
  );
};
