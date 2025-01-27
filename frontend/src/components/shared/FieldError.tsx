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