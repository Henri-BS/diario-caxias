import { Link } from "react-router-dom";
import { CategoryProps } from "resources/category";

export const CategoryCard = ({ category }: CategoryProps) => {
    return (
        <Link to={`/categorias/${category.categoryName}`} className="w-full text-center">
            <div className="p-6 bg-zinc-100 border border-zinc-300 rounded-lg shadow-md transition duration-700 hover:shadow-xl hover:scale-105">
                <h5 className=" mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{category.categoryName}</h5>
            </div>
        </Link>
    );
}