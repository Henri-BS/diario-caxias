'use client'

import AddFormEvent from "@/app/eventos/adicionar/page";
import { EventCard } from "@/components/cards/EventCard";
import { Pagination } from "@/components/shared/Pagination";
import { Template } from "@/components/Template";
import { BASE_URL } from "@/resources";
import { useAuth } from "@/resources/auth";
import { EventPage } from "@/resources/event";
import { Project } from "@/resources/project";
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




    return (
        <Template>

            <div className="h-screen flex flex-wrap items-center  justify-center  ">
            <div className="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3    bg-white  shadow-lg    transform   duration-200 easy-in-out">
            <Link href={`/usuarios/atualizar/${userId}`}>
            <div className="flex justify-end p-2 cursor-pointer">
            <FaIcons.FaBars/>
            </div>
            </Link>
                <div className=" h-32 overflow-hidden" >
                    <img className="w-full" src={user?.userImage} alt="" />
                </div>
                <div className="flex justify-center px-5  -mt-12">
                    <img className="h-32 w-32 bg-white p-2 rounded-full" src={user?.userImage ? user?.userImage : "https://cdn1.iconfinder.com/data/icons/basic-ui-element-2-2-line/512/Basic_UI_Elements_-_2.1_-_line-11-256.png"} alt="" />
                </div>
                <div>
                    <div className="text-center px-14">
                        <h2 className="text-gray-800 text-3xl font-bold">{user?.username}</h2>
                        <p className="text-gray-400 mt-2 hover:text-blue-500"  >{user?.userLocation}</p>
                        <p className="mt-2 text-gray-500 text-sm">{user?.userBio}</p>
                    </div>
                    <hr className="mt-6" />
                </div>
            </div>
        </div>

        </Template>
    );
}