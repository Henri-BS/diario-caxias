'use client'

import AddFormEvent from "@/app/eventos/adicionar/page";
import { EventCard } from "@/components/cards/EventCard";
import { Pagination } from "@/components/shared/Pagination";
import { Template } from "@/components/Template";
import { BASE_URL } from "@/resources";
import { EventPage } from "@/resources/event";
import { Project } from "@/resources/project";
import axios from "axios";

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
 

    return (
        <Template>
            <div >
                <div className="relative flex flex-col sm:flex-row xl:flex-col items-start">
                    <div className="order-1 sm:ml-6 xl:ml-0">
                        <h3 className="mb-1 text-slate-900 font-semibold">
                            <span className="mb-1 block text-3xl leading-6 text-indigo-500">{project?.projectTitle}</span>
                        </h3>
                        <div className="prose prose-slate prose-sm text-slate-600 mt-5">
                        <p className="flex flex-row items-center text-gray-700 text-lg gap-2"><FaIcons.FaCalendarCheck /> Eventos relacionados: <b>{eventPage.page.totalElements}</b></p>
                        </div>
                    </div>
                    <img src={project?.projectImage} className="mb-6 shadow-md rounded-lg bg-slate-50 w-[22rem] sm:mb-0 " />
                </div>
                <p className="mt-5 text-medium">{project?.projectDescription} </p>
            </div>
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
        </Template>
    );
}




