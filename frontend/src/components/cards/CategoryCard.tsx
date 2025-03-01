import { Link } from "react-router-dom";
import { CategoryProps } from "resources/category";

export const CategoryCard = ({ category }: CategoryProps) => {
    return (
        <Link to={`/categorias/${category.categoryName}`} className="w-full text-center">
            <div className="py-4 bg-zinc-100 border border-zinc-400 rounded-lg shadow-md transition duration-700 hover:shadow-xl hover:scale-105">
                <h5 title={category.categoryName} className="h-8 text-lg font-semibold tracking-tight text-gray-900 overflow-hidden">{category.categoryName}</h5>
            </div>
        </Link>
    );
}