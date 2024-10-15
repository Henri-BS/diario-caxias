'use client'

import { PostProps } from "@/resources/post";
import Link from "next/link";

export const PostCard = ({ post }: PostProps) => {
    return (
        <Link
            href={`/posts/${post.id}`}
            className="w-80 bg-zinc-200 border border-zinc-300 rounded-xl md:max-w-full hover:bg-zinc-100 shadow-md transition duration-700 hover:shadow-xl hover:scale-105">
            <div className="max-w-sm bg-zinc-100 border border-zinc-300 rounded-xl shadow hover:bg-zinc-300">
                <img className="object-cover w-full rounded-t-xl h-60" src={post.imageUrl} alt={post.title} />
                <div className="p-5">
                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">{post.title}</h5>
                    <p className="mb-3 font-normal text-gray-700 ">{post.description}</p>
                </div>
            </div>
        </Link>
    );
}