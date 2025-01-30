import { toast } from "react-toastify";

export const useNotification = () => {
    function notify(message: string, level: "success" | "info" | "warning" | "error") {
        toast(message, {
            type: level
        });
    }
    return {
        notify
    }
}

interface FieldErrorProps {
    error: any | null;
}

export function FieldError({ error }: FieldErrorProps) {
    if (error) {
        return (
            <span className="text-red-400 text-sm">{error}</span>
        );
    }
    return null;
}