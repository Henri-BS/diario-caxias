'use client'


import { EventCard } from "@/components/cards/EventCard";
import { UserCard } from "@/components/cards/UserCard";
import { Pagination } from "@/components/shared/Pagination";
import { Template } from "@/components/Template";
import { BASE_URL } from "@/resources";
import { Category } from "@/resources/category";
import { EventPage } from "@/resources/event";
import { UserPage } from "@/resources/user";
import axios from "axios";

import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa6";

export default function CategoryDetails({ params }: any) {
    const categoryId = params.categoryId;

    const [category, setCategory] = useState<Category>();
    useEffect(() => {
        axios.get(`${BASE_URL}/categories/${categoryId}`)
            .then((response) => {
                setCategory(response.data);
            });
    }, [categoryId]);

    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber);
    }
    const [eventPage, setEventPage] = useState<EventPage>({ content: [], page: { number: 0, totalElements: 0 } });
    const [userPage, setUserPage] = useState<UserPage>({ content: [], page: { number: 0, totalElements: 0 } });

    useEffect(() => {
        axios.get(`${BASE_URL}/event-category/by-category/${categoryId}?page=${pageNumber}&size=12`)
            .then((response) => {
                setEventPage(response.data);
            });
    }, [categoryId, pageNumber]);

    useEffect(() => {
        axios.get(`${BASE_URL}/user-category/by-category/${categoryId}?page=${pageNumber}&size=12`)
            .then((response) => {
                setUserPage(response.data);
            });
    }, [categoryId, pageNumber]);


    return (
        <Template>
            <div className="w-full p-6 bg-zinc-100 border border-zinc-300 rounded-lg shadow-md ">
                <h5 className=" mb-2 text-4xl font-bold tracking-tight text-indigo-500 ">{category?.categoryName}</h5>
                <p className="font-medium text-lg">{category?.categoryDescription}</p>
                <div className="grid md:grid-cols-2 text-gray-800 mt-5">
                    <p className="flex flex-row items-center text-lg gap-2"><FaIcons.FaCalendarCheck /> Eventos relacionados: <b>{eventPage.page.totalElements}</b></p>
                    <p className="flex flex-row items-center text-lg gap-2"><FaIcons.FaUser />Usuários relacionados: <b>{userPage.page.totalElements}</b></p>
                </div>
            </div>
            
            <h2 className="flex flex-row text-2xl mt-5 gap-2"><FaIcons.FaCalendarCheck/>Eventos Relacionados</h2>
            <div className="flex items-center w-full justify-center">
                <Pagination pagination={eventPage} onPageChange={handlePageChange} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
                {eventPage.content?.map(x => (
                    <div key={x.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                        <EventCard event={x} />
                    </div>
                ))}
            </div>
            <h2 className="flex flex-row text-2xl mt-5 gap-2"><FaIcons.FaUser /> Usuários Relacionados</h2>
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
        </Template>
    );
}





