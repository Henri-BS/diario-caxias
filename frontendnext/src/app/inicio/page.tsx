'use client'

import { PostCard } from "@/components/cards/PostCard";
import { BASE_URL } from "@/resources";
import { PostPage } from "@/resources/post.resource";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Home() {

    const [posts, setPosts] = useState<PostPage>({ content: [], page: { number: 0, size: 0, totalElements: 0, totalPages: 0 } });
    useEffect(() => {
        axios.get(`${BASE_URL}/posts?size=10`)
            .then((response) => {
                setPosts(response.data);
            });
    }, []);


    return (
        <>
            <div className="flex justify-between p-4 " >
                <h1 className="text-3xl">Publicações recentes</h1>
                <Link href={"/postagens"} className="text-2xl text-blue-600 hover:text-blue-400 hover:underline">Ver Lista</Link>
            </div>
            <div className="flex flex-row gap-4 overflow-y-auto ">
                {posts?.content.map(x => (
                    <div key={x.id} className="flex w-100 p-4 ">
                        <PostCard post={x} />
                    </div>
                ))}
            </div>
            
        </>
    );
}

