import { useAuth } from "@/resources/auth";
import { FC, ReactNode } from "react";

interface AuthenticatedPageProps {
    children: ReactNode
}


export const AuthenticatedPage: FC<AuthenticatedPageProps> = ({
    children
}) => {
    const auth = useAuth();

    if(!auth.isSessionValid()){
        return 
    }
    return(
        <>
        {children}
        </>
    )
}