'use client'

import { PostProps } from "@/resource/post";
import Link from "next/link";
export const PostCard = ({ post }: PostProps) => {
    return (
        <Link
            href={`/postagens/${post.id}`}
            className=" bg-zinc-200 border border-zinc-300 rounded-xl  hover:bg-zinc-100 shadow-md transition duration-700 hover:shadow-xl ">
            <div className=" w-[470px] bg-zinc-100 border border-zinc-300 rounded-xl shadow hover:bg-zinc-300">
                <img className="object-cover w-full rounded-t-xl h-80" src={post.postImage ? post.postImage : "https://cdn1.iconfinder.com/data/icons/dashboard-ui-vol-1/48/JD-46-512.png"} alt={post.postTitle} />
                <div className="p-5 max-h-60 text-ellipsis overflow-hidden">
                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">{post.postTitle}</h5>
                    <p className="mb-3 font-normal text-gray-700">{post.postSummary}</p>
                </div>
            </div>
        </Link>
    );
}