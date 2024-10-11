'use client'

import { EventCard } from "@/components/cards/EventCard";
import { InputText } from "@/components/shared/Input";
import { Pagination } from "@/components/shared/Pagination";
import { Template } from "@/components/Template";
import { BASE_URL } from "@/resources";
import { EventPage } from "@/resources/event.resource";
import { Project } from "@/resources/project.resource";
import axios from "axios";
import { useParams } from "next/navigation";

import { useEffect, useState } from "react";

export default function ProjectDetails({ params }: any) {

    const projectId = params.projectId;

    const [project, setProject] = useState<Project>();
    useEffect(() => {
        axios.get(`${BASE_URL}/projects/${projectId}`)
            .then((response) => {
                setProject(response.data);
            });
    }, [projectId]);
    

    return (
        <>
            <Template>
                <div className="relative flex flex-col sm:flex-row xl:flex-col items-start">
                    <div className="order-1 sm:ml-6 xl:ml-0">
                        <h3 className="mb-1 text-slate-900 font-semibold">
                            <span className="mb-1 block text-lg leading-6 text-indigo-500">{project?.title}</span>
                        </h3>
                        <div className="prose prose-slate prose-sm text-slate-600">
                            <p>{project?.body} </p>
                        </div>
                    </div>
                    <img src={project?.image} alt={project?.title} className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full" width="1216" height="640" />
                </div>
                <Events/>
            </Template>
        </>
    );
}


function Events() {
    const params = useParams();
    const projectId = params.projectId;

    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber)
    }

    const [eventPage, setEventPage] = useState<EventPage>({ content: [], page: { number: 0, size: 0, totalElements: 0, totalPages: 0 } });

    useEffect(() => {
        axios.get(`${BASE_URL}/events/by-project/${projectId}?page=${pageNumber}&size=10`)
            .then((response) => {
                setEventPage(response.data);
            });
    }, [projectId, pageNumber]);

    return (
        <>
            <div className="flex items-center w-full justify-center mt-12">
                <Pagination pagination={eventPage} onPageChange={handlePageChange} />
            </div>
            <div className=" grid grid-cols-1 xl:grid-cols-2 gap-y-10 gap-x-6 items-start p-8">
                {eventPage.content?.map(x => (
                    <div key={x.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start">
                        <EventCard event={x} />
                    </div>
                ))}
            </div>
        </>
    );
}
