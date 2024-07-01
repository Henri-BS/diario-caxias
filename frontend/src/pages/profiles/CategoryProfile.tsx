import { CategoryLgCard } from "components/cards/CategoryCard";
import { useParams } from "react-router-dom";

export function CategoryProfile() {

    const params = useParams();

    return (
        <>
            <div className="container">
                <CategoryLgCard id={`${params.categoryId}`} />               
            </div>
        </>
    );
}