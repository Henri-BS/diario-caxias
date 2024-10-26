'use client'

import AddFormEvent from "@/app/eventos/adicionar/page";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { EventCard } from "@/components/cards/EventCard";
import { Pagination } from "@/components/shared/Pagination";
import { Template } from "@/components/Template";
import { BASE_URL } from "@/resources";
import { CategoryPage } from "@/resources/category";
import { EventPage } from "@/resources/event";
import { Project } from "@/resources/project";
import axios from "axios";
import { Accordion } from "flowbite-react";

import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa6";

export default function ProjectDetails({ params }: any) {
    const projectId = params.projectId;

    const [project, setProject] = useState<Project>();
    useEffect(() => {
        axios.get(`${BASE_URL}/projects/${projectId}`)
            .then((response) => {
                setProject(response.data);
            });
    }, [projectId]);

    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber)
    }

    const [eventPage, setEventPage] = useState<EventPage>({ content: [], page: { number: 0, totalElements: 0 } });

    useEffect(() => {
        axios.get(`${BASE_URL}/events/by-project/${projectId}?page=${pageNumber}&size=10`)
            .then((response) => {
                setEventPage(response.data);
            });
    }, [projectId, pageNumber]);

    const [categoryPage, setCategoryPage] = useState<CategoryPage>({ content: [], page: { number: 0, totalElements: 0 } });

    useEffect(() => {
        axios.get(`${BASE_URL}/project-category/by-project/${projectId}?page=${pageNumber}&size=12`)
            .then((response) => {
                setCategoryPage(response.data);
            });
    }, [projectId, pageNumber]);


    return (
        <Template>
            <div >
                <div className="relative flex flex-col sm:flex-row xl:flex-col items-start">
                    <div className="order-1 sm:ml-6 xl:ml-0">
                        <h3 className="mb-1 text-slate-900 font-semibold">
                            <span className="mb-1 block text-3xl leading-6 text-indigo-500">{project?.projectTitle}</span>
                        </h3>
                        <div className="prose prose-slate prose-sm text-slate-600 mt-5">
                            <p className="flex flex-row items-center text-gray-700 text-lg gap-2"><FaIcons.FaTag /> Categorias relacionados: <b>{categoryPage.page.totalElements}</b></p>
                            <p className="flex flex-row items-center text-gray-700 text-lg gap-2"><FaIcons.FaCalendarCheck /> Eventos relacionados: <b>{eventPage.page.totalElements}</b></p>
                        </div>
                    </div>
                    <img src={project?.projectImage} className="mb-6 shadow-md rounded-lg bg-slate-50 w-[22rem] sm:mb-0 " />
                </div>
                <p className="mt-5 text-xl text-justify">{project?.projectDescription} </p>
            </div>
            <Accordion collapseAll className="mt-12 ">
                <Accordion.Panel>
                    <Accordion.Title>
                        <h2 className="flex flex-row gap-2 mt-5 text-2xl text-zinc-800 "><FaIcons.FaTag />Categorias Relacionadas</h2>
                    </Accordion.Title>
                    <Accordion.Content className="p-2">
                        <div className="flex items-center w-full justify-center mt-12">
                            <Pagination pagination={categoryPage} onPageChange={handlePageChange} />
                        </div>
                        <div className="  grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
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
                        <h2 className="flex flex-row gap-2 mt-5 text-2xl text-zinc-800 "><FaIcons.FaCalendarCheck />Eventos Relacionadas</h2>
                    </Accordion.Title>
                    <Accordion.Content className="p-2">
                        <div className="flex items-center w-full justify-center mt-12">
                            <Pagination pagination={eventPage} onPageChange={handlePageChange} />
                        </div>
                        <div className=" grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
                            {eventPage.content?.map(x => (
                                <div key={x.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start">
                                    <EventCard event={x} />
                                </div>
                            ))}
                        </div>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
        </Template>
    );
}




