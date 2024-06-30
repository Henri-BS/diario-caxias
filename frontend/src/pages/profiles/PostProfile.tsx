import { PostLgCard } from "components/cards/PostCard";
import { useParams } from "react-router-dom";

export function PostProfile() {

    const params = useParams();

    return (
        <>
            <div className="container">
                <PostLgCard id={`${params.postId}`} />               
            </div>
        </>
    );
}