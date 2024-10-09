'use client'

import { PostProps } from "@/resources/post.resource";
import Link from "next/link";

export const PostCard = ({ category: post }: PostProps) => {
    return (
        <Link href={`/posts/${post.id}`} key={post.id} className="flex flex-col max-h-70 items-center bg-zinc-100 border border-zinc-300 rounded-xl shadow md:flex-row md:max-w-full hover:bg-zinc-300">

            <div className="max-w-sm bg-zinc-100 border border-zinc-300 rounded-xl shadow hover:bg-zinc-300">
                <a href="#">
                    <img className="object-cover w-full rounded-t-xl md:h-60 md:w-80 " src={post.imageUrl} alt={post.title} />
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{post.title}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 ">{post.description}</p>
                </div>
            </div>
        </Link>
    );
}