'use client'

import { ProjectCard } from "@/components/card/projectCard";
import { Pagination } from "@/components/pagination";
import { Template } from "@/components/template";
import { PostMockProfile } from "@/mock/mockProfile";
import { Post, usePostService } from "@/resources/post";
import { ProjectPage, useProjectPostService } from "@/resources/project";
import { Accordion } from "flowbite-react";

import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa6";

export default function PostDetails({ params }: any) {
    const postId = params.postId;
    const postService = usePostService();
    const projectPostService = useProjectPostService();
    const [post, setPost] = useState<Post>();
    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber)
    }
    const [projectPage, setProjectPage] = useState<ProjectPage>({ content: [], page: { number: 0, totalElements: 0 } });

    useEffect(() => {
        postService.findPostById(postId)
            .then((response) => {
                setPost(response);
            });
    }, [postId]);

    useEffect(() => {
        projectPostService.findProjectsByPost(postId, pageNumber)
            .then((response) => {
                setProjectPage(response);
            });
    }, [postId, pageNumber]);

    return (
        <Template>
            {!post ? <PostMockProfile params={params} /> :
                <div>
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
                            <img src={post?.postImage} className="mb-6 shadow-md rounded-lg bg-slate-50 w-[60rem] sm:mb-0 " />
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
        </Template>
    );
}