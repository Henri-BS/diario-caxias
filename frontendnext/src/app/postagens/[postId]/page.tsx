'use client'

import { ProjectCard } from "@/components/cards/ProjectCard";
import { Pagination } from "@/components/shared/Pagination";
import { Template } from "@/components/Template";
import { BASE_URL } from "@/resources";
import { Post } from "@/resources/post";
import { ProjectPage } from "@/resources/project";
import axios from "axios";

import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa6";

export default function PostDetails({ params }: any) {
    const postId = params.postId;

    const [post, setPost] = useState<Post>();
    useEffect(() => {
        axios.get(`${BASE_URL}/posts/${postId}`)
            .then((response) => {
                setPost(response.data);
            });
    }, [postId]);

    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber)
    }

    const [projectPage, setProjectPage] = useState<ProjectPage>({ content: [], page: { number: 0, totalElements: 0 } });

    useEffect(() => {
        axios.get(`${BASE_URL}/project-post/by-post/${postId}?page=${pageNumber}&size=10`)
            .then((response) => {
                setProjectPage(response.data);
            });
    }, [postId, pageNumber]);

    return (
        <Template>
            <div >
                <div className="relative flex flex-col sm:flex-row xl:flex-col items-start">
                    <div className="order-1 sm:ml-6 xl:ml-0">
                        <h3 className="mb-1 text-slate-900 font-semibold">
                            <span className="mb-1 block text-3xl leading-6 text-indigo-500">{post?.postTitle}</span>
                        </h3>
                        <div className="prose prose-slate prose-sm text-slate-600 mt-5">
                            <p className="flex flex-row items-center text-gray-700 text-lg gap-2"><FaIcons.FaFolderClosed /> Projetos relacionados: <b>{projectPage.page.totalElements}</b></p>
                            <p>{post?.postSummary}</p>
                        </div>
                    </div>
                    <img src={post?.postImage} className="mb-6 shadow-md rounded-lg bg-slate-50 w-[22rem] sm:mb-0 " />
                </div>
                <p className="mt-5 text-medium">{post?.postDescription} </p>
            </div>
            <div className="flex flex-wrap w-full justify-between mt-12">
            </div>
            <div className="flex items-center w-full justify-center mt-12">
                <Pagination pagination={projectPage} onPageChange={handlePageChange} />
            </div>
            <div className=" grid grid-cols-1 gap-y-10 gap-x-6 items-start p-8">
                {projectPage.content?.map(x => (
                    <div key={x.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start">
                        <ProjectCard project={x} />
                    </div>
                ))}
            </div>
        </Template>
    );
}



