import { PostLgCard } from "components/cards/PostCard";
import { useParams } from "react-router-dom";

export function PostProfile() {

    const params = useParams();

    return (
        <>
                <PostLgCard id={`${params.postId}`} />                
                <div className="container">
           
            </div>
        </>
    );
}