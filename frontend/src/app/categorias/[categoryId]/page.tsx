'use client'


import { ProjectCard } from "@/components/card/projectCard";
import { UserCard } from "@/components/card/userCard";
import { Pagination } from "@/components/pagination";
import { Template } from "@/components/template";
import { Category } from "@/resources/category";
import { ProjectPage } from "@/resources/project";
import { UserPage } from "@/resources/user";
import axios from "axios";
import { Accordion } from "flowbite-react";

import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa6";

export default function CategoryDetails({ params }: any) {
    const categoryId = params.categoryId;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const [category, setCategory] = useState<Category>();

    useEffect(() => {
        axios.get(`${baseUrl}/categories/${categoryId}`)
            .then((response) => {
                setCategory(response.data);
            });
    }, [categoryId]);

    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber);
    }
    const [projectPage, setProjectPage] = useState<ProjectPage>({ content: [], page: { number: 0, totalElements: 0 } });
    const [userPage, setUserPage] = useState<UserPage>({ content: [], page: { number: 0, totalElements: 0 } });

    useEffect(() => {
        axios.get(`${baseUrl}/project-category/by-category/${categoryId}?page=${pageNumber}&size=12`)
            .then((response) => {
                setProjectPage(response.data);
            });
    }, [categoryId, pageNumber]);

    useEffect(() => {
        axios.get(`${baseUrl}/user-category/by-category/${categoryId}?page=${pageNumber}&size=12`)
            .then((response) => {
                setUserPage(response.data);
            });
    }, [pageNumber]);


    return (
        <Template>
            <div className="w-full p-6 bg-zinc-100 border border-zinc-300 rounded-lg shadow-md ">
                <h5 className=" mb-2 text-4xl font-bold tracking-tight text-indigo-500 ">{category?.categoryName}</h5>
                <p className="font-medium text-lg">{category?.categoryDescription}</p>
                <div className="grid md:grid-cols-2 text-gray-800 mt-5">
                    <p className="flex flex-row items-center text-lg gap-2"><FaIcons.FaCalendarCheck /> Projetos relacionados: <b>{projectPage.page.totalElements}</b></p>
                    <p className="flex flex-row items-center text-lg gap-2"><FaIcons.FaUser />Usuários relacionados: <b>{userPage.page.totalElements}</b></p>
                </div>
            </div>
            <Accordion collapseAll>
                <Accordion.Panel>
                    <Accordion.Title>
                        <h2 className="flex flex-row gap-2 mt-5 text-2xl text-zinc-800 "><FaIcons.FaFolderClosed />Projetos Relacionados</h2>
                    </Accordion.Title>
                    <Accordion.Content className="p-2">
                        <div className="flex items-center w-full justify-center">
                            <Pagination pagination={projectPage} onPageChange={handlePageChange} />
                        </div>
                        <div className="grid grid-cols-1 gap-y-10 gap-x-6 items-start p-8">
                            {projectPage.content?.map(x => (
                                <div key={x.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                                    <ProjectCard project={x} />
                                </div>
                            ))}
                        </div>
                    </Accordion.Content>
                </Accordion.Panel>

                <Accordion.Panel>
                    <Accordion.Title>
                        <h2 className="flex flex-row gap-2 mt-5 text-2xl text-zinc-800 "><FaIcons.FaUser />Usuários Relacionados</h2>
                    </Accordion.Title>
                    <Accordion.Content className="p-2">
                        <div className="flex items-center w-full justify-center">
                            <Pagination pagination={userPage} onPageChange={handlePageChange} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
                            {userPage.content?.map(x => (
                                <div key={x.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                                    <UserCard user={x} />
                                </div>
                            ))}
                        </div>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
        </Template>
    );
}