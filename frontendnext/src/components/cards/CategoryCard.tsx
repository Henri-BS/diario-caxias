'use client'

import { CategoryProps } from "@/resources/category";
import Link from "next/link";

export const CategoryCard = ({ category }: CategoryProps) => {
    return (
        <Link href={`/categorias/${category.id}`} className="w-full text-center">
            <div className="p-6 bg-zinc-100 border border-zinc-300 rounded-lg shadow-md transition duration-700 hover:shadow-xl hover:scale-105">
                <h5 className=" mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{category.name}</h5>
            </div>
        </Link>
    );
}