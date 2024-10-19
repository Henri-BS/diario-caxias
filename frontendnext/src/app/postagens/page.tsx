'use client'

import { PostCard } from "@/components/cards/PostCard";
import { Pagination } from "@/components/shared/Pagination";
import { Template } from "@/components/Template";
import { BASE_URL } from "@/resources";
import { PostPage } from "@/resources/post";
import axios from "axios";
import { TextInput } from "flowbite-react";
import { useEffect, useState } from "react";


export default function Posts() {
    const [query, setQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber);
    }
    const [postPage, setPostPage] = useState<PostPage>({ content: [], page: { number: 0, size: 0, totalElements: 0, totalPages: 0 } });

    useEffect(() => {
        axios.get(`${BASE_URL}/posts?page=${pageNumber}&query=${query}&size=10`)
            .then((response) => {
                setPostPage(response.data);
            });
    }, [pageNumber, query]);

    return (
        <>
            <Template>
                <div className="flex items-center justify-between my-5">
                    <div className="flex space-x-4 px-4">
                        <TextInput className="w-full"
                            color="bg-zinc-400"
                            type="text"
                            id="value"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="buscar postagens..."
                        />
                    </div>
                </div>
                <div className="flex items-center w-full justify-center">
                    <Pagination pagination={postPage} onPageChange={handlePageChange} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
                    {postPage?.content.filter((x) =>
                        x.postTitle?.toUpperCase().includes(query.toLocaleUpperCase()))
                        .map(x => (
                            <div key={x.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                                <PostCard post={x} />
                            </div>
                        ))}
                </div>
            </Template>
        </>
    );
}
