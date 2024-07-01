import { UserLgCard } from "components/cards/UserCard";
import { useParams } from "react-router-dom";

export function UserProfile() {

    const params = useParams();

    return (
        <>
            <div className="container">
                <UserLgCard id={`${params.userId}`} />               
            </div>
        </>
    );
}