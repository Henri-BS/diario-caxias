'use client'

import { CategoryCard } from "@/components/card/categoryCard";
import { ProjectCard } from "@/components/card/projectCard";
import { Pagination } from "@/components/pagination";
import { Template } from "@/components/template";
import { useAuth } from "@/resource/auth";
import { CategoryPage } from "@/resource/category";
import { ProjectPage } from "@/resource/project";
import { User } from "@/resource/user";
import axios from "axios";
import { Accordion } from "flowbite-react";
import Link from "next/link";

import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa6";


export default function UserPersonalProfile({ params }: any) {
    const baseUrl = process.env.NODE_ENV ?? "http://localhost:8080";
    const auth = useAuth();
    const userId = auth.getUserSession()?.id;

    const [user, setUser] = useState<User>();
    useEffect(() => {
        axios.get(`${baseUrl}/users/${userId}`)
            .then((response) => {
                setUser(response.data);
            });
    }, [userId]);

    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber)
    }
    const [projectPage, setProjectPage] = useState<ProjectPage>({ content: [], page: { number: 0, totalElements: 0 } });
    const [categoryPage, setCategoryPage] = useState<CategoryPage>({ content: [], page: { number: 0, totalElements: 0 } });

    useEffect(() => {
        axios.get(`${baseUrl}/projects/by-user/${userId}?page=${pageNumber}&size=10`)
            .then((response) => {
                setProjectPage(response.data);
            });
    }, [userId, pageNumber]);

    useEffect(() => {
        axios.get(`${baseUrl}/user-category/by-user/${userId}?page=${pageNumber}&size=12`)
            .then((response) => {
                setCategoryPage(response.data);
            });
    }, [pageNumber]);


    return (
        <Template>

            <div className=" flex flex-wrap items-center  justify-center ">
                <div className="container lg:w-full bg-white shadow-xl transform duration-200 easy-in-out  ">
                    <Link href={`/usuarios/atualizar/${userId}`} className="flex justify-end p-2 cursor-pointer text-xl text-gray-600 hover:text-gray-800">
                        <FaIcons.FaPenToSquare />
                    </Link>
                    <div className=" h-40 overflow-hidden" >
                        <img className="w-full" src={user?.userCoverImage ? user.userCoverImage : "https://www.pixelstalk.net/wp-content/uploads/2016/05/Black-background-lines-scratches-1920x1080.jpg"} alt="" />
                    </div>
                    <div className="flex justify-center px-5 -mt-12">
                        <img className="h-32 w-32 bg-white p-2 rounded-full" src={user?.userImage ? user?.userImage : "https://cdn1.iconfinder.com/data/icons/basic-ui-element-2-2-line/512/Basic_UI_Elements_-_2.1_-_line-11-256.png"} alt="" />
                    </div>
                    <div className="text-gray-600 text-center px-14">
                        <h2 className="text-gray-800 text-3xl font-bold">{user?.username}</h2>
                        <p className="mt-2 text-md font-semibold"> {user?.userLocation} </p>
                        <p className="mt-2 text-lg">{user?.userBio}</p>
                    </div>
                    <hr className="mt-6" />
                </div>
            </div>
            <Accordion collapseAll className="mt-12 ">
                <Accordion.Panel>
                    <Accordion.Title>
                        <h2 className="flex flex-row gap-2 mt-5 text-2xl text-zinc-800 "><FaIcons.FaTag />Categorias Relacionadas</h2>
                    </Accordion.Title>
                    <Accordion.Content className="p-2">

                        <div className="flex items-center w-full justify-center">
                            <Pagination pagination={categoryPage} onPageChange={handlePageChange} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
                            {categoryPage.content?.map(x => (
                                <div key={x.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                                    <CategoryCard category={x} />
                                </div>
                            ))}
                        </div>

                    </Accordion.Content>
                </Accordion.Panel>

                <Accordion.Panel>
                    <Accordion.Title>
                        <h2 className="flex flex-row gap-2 mt-5 text-2xl text-zinc-800 "><FaIcons.FaFolderClosed />Projetos Relacionados</h2>
                    </Accordion.Title>
                    <Accordion.Content className="p-2">
                        <div className="flex items-center w-full justify-center mt-12">
                            <Pagination pagination={projectPage} onPageChange={handlePageChange} />
                        </div>
                        <div className="  grid grid-cols-1 xl:grid-cols-2 gap-y-10 gap-x-6 items-start p-8">
                            {projectPage.content?.map(x => (
                                <div key={x.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                                    <ProjectCard project={x} />
                                </div>
                            ))}
                        </div>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
        </Template>
    );
}