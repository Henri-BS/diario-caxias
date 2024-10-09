'use client'

import { CategoryProps } from "@/resources/category.resource";
import Link from "next/link";

export const CategoryCard = ({ category }: CategoryProps) => {
    return (
        <Link href={`/categories/${category.id}`} className="w-full text-center">

            <div className="p-6 bg-zinc-100 border border-zinc-300 rounded-lg shadow hover:bg-zinc-300">
                        <h5 className=" mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{category.name}</h5>
            </div>
        </Link>
    );
}