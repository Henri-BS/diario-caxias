'use client'

import { ProjectCard } from "@/components/cards/ProjectCard";
import { Pagination } from "@/components/shared/Pagination";
import { Template } from "@/components/Template";
import { BASE_URL } from "@/resources";
import { ProjectPage } from "@/resources/project";
import { User } from "@/resources/user";
import axios from "axios";
import Link from "next/link";

import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa6";

export default function UserPersonalProfile({ params }: any) {

    const userId = params.userId;

    const [user, setUser] = useState<User>();
    useEffect(() => {
        axios.get(`${BASE_URL}/users/${userId}`)
            .then((response) => {
                setUser(response.data);
            });
    }, [userId]);

    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber)
    }
    const [projectPage, setProjectPage] = useState<ProjectPage>({ content: [], page: { number: 0, totalElements: 0 } });

    useEffect(() => {
        axios.get(`${BASE_URL}/projects/by-user/${userId}?page=${pageNumber}&size=10`)
            .then((response) => {
                setProjectPage(response.data);
            });
    }, [userId, pageNumber]);



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
<h1 className="mt-12 text-2xl">Projetos Criados</h1>
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
        </Template>
    );
}