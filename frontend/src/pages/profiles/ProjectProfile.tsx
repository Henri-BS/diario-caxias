'use client'

import { CategoryCard } from "components/cards/CategoryCard";
import { EventCard } from "components/cards/EventCard";
import { PostCard } from "components/cards/PostCard";
import { Pagination } from "components/shared/Pagination";
import { ProjectMockProfile } from "mock/MockProfile";
import { CategoryPage } from "resources/category";
import { EventPage, useEventService } from "resources/event";
import { PostPage } from "resources/post";
import { Project, useProjectService } from "resources/project";
import axios from "axios";
import { Accordion } from "flowbite-react";

import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa6";
import { Props } from "resources";
import { useParams } from "react-router-dom";

export function ProjectProfile() {
    const params = useParams();
    return (
        <>
            <ProjectDetails params={`${params.projectId}`} />
        </>
    );
}

export function ProjectDetails({ params: projectId }: Props) {
    const projectService = useProjectService();
    const eventService = useEventService();
    const [project, setProject] = useState<Project>();
    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber)
    }
    const [eventPage, setEventPage] = useState<EventPage>({ content: [], page: { number: 0, totalElements: 0 } });
    const [categoryPage, setCategoryPage] = useState<CategoryPage>({ content: [], page: { number: 0, totalElements: 0 } });
    const [postPage, setPostPage] = useState<PostPage>({ content: [], page: { number: 0, totalElements: 0 } });

    useEffect(() => {
        projectService.findProjectById(projectId)
            .then((response) => {
                setProject(response);
            });
    }, [projectId]);

    useEffect(() => {
        eventService.findEventsByProject(projectId, pageNumber)
            .then((response) => {
                setEventPage(response);
            });
        projectService.findCategoriesByProject(projectId, pageNumber)
            .then((response) => {
                setCategoryPage(response);
            });
        projectService.findPostsByProject(projectId, pageNumber)
            .then((response) => {
                setPostPage(response);
            });
    }, [projectId, pageNumber]);


    return (
        <>
            {!project ? <ProjectMockProfile params={projectId} /> :
                <div className="mt-10">
                    <div className="relative flex flex-col sm:flex-row xl:flex-col items-start">
                        <div className="order-1 sm:ml-6 xl:ml-0">
                            <h3 className="mb-1 text-slate-900 font-semibold">
                                <span className="mb-1 block text-3xl leading-6 text-indigo-500">{project?.projectTitle}</span>
                            </h3>
                            <div className="prose prose-slate prose-sm text-slate-600 mt-5">
                                <p className="flex flex-row items-center text-gray-700 text-lg gap-2"><FaIcons.FaTag /> Categorias relacionados: <b>{categoryPage.page.totalElements}</b></p>
                                <p className="flex flex-row items-center text-gray-700 text-lg gap-2"><FaIcons.FaCalendarCheck /> Eventos relacionados: <b>{eventPage.page.totalElements}</b></p>
                                <p className="flex flex-row items-center text-gray-700 text-lg gap-2"><FaIcons.FaNewspaper /> Postagens relacionados: <b>{postPage.page.totalElements}</b></p>
                            </div>
                        </div>
                        <img src={project?.projectImage} className="mb-6 shadow-md rounded-lg bg-slate-50 w-[22rem] sm:mb-0 " />
                    </div>
                    <p className="mt-5 text-xl text-justify">{project?.projectDescription} </p>
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
                                    {categoryPage.content?.map(category => (
                                        <div key={category.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                                            <CategoryCard category={category} />
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
                                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-4 items-start p-8">
                                    {eventPage.content?.map(event => (
                                        <div key={event.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start">
                                            <EventCard event={event} />
                                        </div>
                                    ))}
                                </div>
                            </Accordion.Content>
                        </Accordion.Panel>
                        <Accordion.Panel>
                            <Accordion.Title>
                                <h2 className="flex flex-row gap-2 mt-5 text-2xl text-zinc-800 "><FaIcons.FaNewspaper />Postagens Relacionados</h2>
                            </Accordion.Title>
                            <Accordion.Content className="p-2">
                                <div className="flex items-center w-full justify-center mt-12">
                                    <Pagination pagination={postPage} onPageChange={handlePageChange} />
                                </div>
                                <div className=" mt-10 grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-8 ">
                                    {postPage.content?.map(post => (
                                        <div key={post.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start">
                                            <PostCard post={post} />
                                        </div>
                                    ))}
                                </div>
                            </Accordion.Content>
                        </Accordion.Panel>
                    </Accordion>
                </div>
            }
        </>
    );
}