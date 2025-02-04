import { PostCard } from "components/cards/PostCard";
import { Pagination } from "components/shared/Pagination";
import { PostMockList } from "mock/MockList";
import { PostPage } from "resources/post";
import { TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { removeAccents } from "components/shared/Template";
import axios from "axios";
import { baseUrl } from "utils/requests";


export default function Posts() {
    const [query, setQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber);
    }
    const [postPage, setPostPage] = useState<PostPage>({ content: [], page: { number: 0, totalElements: 0 } });

    useEffect(() => {
        axios.get(`${baseUrl}/posts?query=${query}&page=${pageNumber}&size=12`)
            .then((response) => {
                setPostPage(response.data);
            });
    }, [pageNumber, query]);

    return (
        <>
            {!postPage.content.length ? <PostMockList /> :
                <div className="mt-10">
                    <div className="flex items-center justify-between my-5">
                        <div className="flex space-x-4 px-4">
                            <TextInput icon={GoSearch}
                                className="w-full"
                                color="bg-zinc-400"
                                type="text"
                                id="query"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="buscar"
                            />
                        </div>
                    </div>
                    <div className="flex items-center w-full justify-center">
                        <Pagination pagination={postPage} onPageChange={handlePageChange} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-10 items-start p-8">
                        {postPage?.content.filter((post) =>
                            post.postTitle?.toUpperCase().includes(query.toLocaleUpperCase()) ||
                            removeAccents(post.postTitle)?.toUpperCase().includes(query.toLocaleUpperCase())
                        ).map(post => (
                            <div key={post.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                                <PostCard post={post} />
                            </div>
                        ))}
                    </div>
                </div>
            }
        </>
    );
}