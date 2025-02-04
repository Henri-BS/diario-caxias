import { ProjectCard } from "components/cards/ProjectCard";
import { Pagination } from "components/shared/Pagination";
import { PostMockProfile } from "mock/MockProfile";
import { Post } from "resources/post";
import { ProjectPage } from "resources/project";
import { Accordion } from "flowbite-react";

import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa6";
import { Props } from "resources";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "utils/requests";


export function PostProfile() {
    const params = useParams();
    return (
        <>
            <PostDetails params={`${params.postId}`} />
        </>
    );
}


export function PostDetails({ params: postId }: Props) {
    const [post, setPost] = useState<Post>();
    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber)
    }
    const [projectPage, setProjectPage] = useState<ProjectPage>({ content: [], page: { number: 0, totalElements: 0 } });

    useEffect(() => {
        axios.get(`${baseUrl}/posts/${postId}`)
            .then((response) => {
                setPost(response.data);
            });
    }, [postId]);

    useEffect(() => {
        axios.get(`${baseUrl}/project-post?postId=${postId}&page=${pageNumber}&size=8`)
            .then((response) => {
                setProjectPage(response.data);
            });
    }, [postId, pageNumber]);

    return (
        <>
            {!post ? <PostMockProfile params={postId} /> :
                <div className="mt-10">
                    <div className="relative flex flex-col md:flex-row xl:flex-col items-start">
                        <div className="order-1 sm:ml-6 xl:ml-0">
                            <h3 className="mb-1 text-slate-900 font-semibold">
                                <span className="mb-1 text-3xl leading-6 text-indigo-500">{post?.postTitle}</span>
                            </h3>
                            <div className="prose prose-slate prose-sm text-slate-600 mt-5">
                                <p className="flex flex-row items-center text-gray-800 text-lg gap-2"><FaIcons.FaFolderClosed /> Projetos relacionados: <b>{projectPage.page.totalElements}</b></p>
                                <i>{post?.postSummary}</i>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <img src={post?.postImage} className="mb-6 shadow-md rounded-lg bg-slate-50 w-[60rem] sm:mb-0" alt={post.postTitle} />
                            <p className="flex gap-2 mt-2 items-center text-center text-sm font-medium text-gray-700">
                                enviado em: {post?.createdDate}
                            </p>
                        </div>
                    </div>
                    <p className="mt-5 text-xl text-gray-800 text-justify">{post?.postDescription} </p>
                </div>
            }
            <Accordion collapseAll className="mt-12 ">
                <Accordion.Panel>
                    <Accordion.Title>
                        <h2 className="flex flex-row gap-2 mt-5 text-2xl text-zinc-800 "><FaIcons.FaFolderClosed />Projetos Relacionados</h2>
                    </Accordion.Title>
                    <Accordion.Content className="p-2">
                        <div className="flex items-center w-full justify-center mt-12">
                            <Pagination pagination={projectPage} onPageChange={handlePageChange} />
                        </div>
                        <div className=" grid grid-cols-1 gap-y-10 gap-x-6 items-start p-8">
                            {projectPage.content?.map(project => (
                                <div key={project.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start">
                                    <ProjectCard project={project} />
                                </div>
                            ))}
                        </div>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
            </>
    );
}