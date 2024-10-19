'use client'

import { PostProps } from "@/resources/post";
import Link from "next/link";
export const PostCard = ({ post }: PostProps) => {
    return (
        <Link
            href={`/posts/${post.id}`}
            className="w-80 bg-zinc-200 border border-zinc-300 rounded-xl md:max-w-full hover:bg-zinc-100 shadow-md transition duration-700 hover:shadow-xl hover:scale-105">
            <div className="max-w-sm bg-zinc-100 border border-zinc-300 rounded-xl shadow hover:bg-zinc-300">
                <img className="object-cover w-full rounded-t-xl h-60" src={post.postImage ? post.postImage : "https://cdn1.iconfinder.com/data/icons/dashboard-ui-vol-1/48/JD-46-512.png"} alt={post.postTitle} />
                <div className="p-5">
                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">{post.postTitle}</h5>
                    <p className="mb-3 font-normal text-gray-700 ">{post.postDescription}</p>
                </div>
            </div>
        </Link>
    );
}