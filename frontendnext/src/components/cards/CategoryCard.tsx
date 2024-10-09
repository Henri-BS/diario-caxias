'use client'

import { PostProps } from "@/resources/post.resource";
import Link from "next/link";

export const CategoryCard = ({ category }: PostProps) => {
    return (
        <Link href={`/categories/${category.id}`} key={category.id} className="flex flex-col max-h-70 items-center bg-zinc-100 border border-zinc-300 rounded-xl shadow md:flex-row md:max-w-full hover:bg-zinc-300">

            <div className="max-w-sm bg-zinc-100 border border-zinc-300 rounded-xl shadow hover:bg-zinc-300">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{category.title}</h5>
                    </a>
            </div>
        </Link>
    );
}