import { CategoryCard } from "components/cards/CategoryCard";
import { ProjectCard } from "components/cards/ProjectCard";
import { Pagination } from "components/shared/Pagination";
import { CustomMarkdown } from "components/shared/Template";
import { useAuth } from "resources/auth";
import { CategoryPage } from "resources/category";
import { Project, ProjectPage } from "resources/project";
import { User } from "resources/user";
import { Props } from "resources";
import { baseUrl } from "utils/requests";

import { Accordion, Breadcrumb, Tabs } from "flowbite-react";

import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Event, EventUser } from "resources/event";
import { EventSmCard } from "components/cards/EventCard";
import { PostSmCard } from "components/cards/PostCard";
import { Post } from "resources/post";

export function UserProfile() {
    const params = useParams();

    return (
        <UserDetails params={`${params.userId}`} />
    );

    function UserDetails({ params: userId }: Props) {

        const [user, setUser] = useState<User>();
        const [projects, setProjects] = useState<Project[]>();
        const [eventsCreated, setEventsCreated] = useState<Event[]>();
        const [events, setEvents] = useState<EventUser[]>();
        const [posts, setPosts] = useState<Post[]>();

        useEffect(() => {
            axios.get(`${baseUrl}/users/${userId}`)
                .then((response) => {
                    setUser(response.data);
                });
        }, [userId]);

        useEffect(() => {
            axios.get(`${baseUrl}/projects/by-user/${userId}`)
                .then((response) => {
                    setProjects(response.data);
                });

            axios.get(`${baseUrl}/events/by-user/${userId}`)
                .then((response) => {
                    setEventsCreated(response.data);
                });

            axios.get(`${baseUrl}/posts/by-user/${userId}`)
                .then((response) => {
                    setPosts(response.data);
                });

            axios.get(`${baseUrl}/event-user?userId=${userId}`)
                .then((response) => {
                    setEvents(response.data);
                });

        }, [userId]);


        return (
            <div>
                <Breadcrumb aria-label="breadcrumb" className="mb-3 py-2">
                    <Breadcrumb.Item icon={FaIcons.FaHouse}>
                        <Link to="/">
                            Início
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/usuarios">
                            Usuários
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <Link to={`/usuarios/${userId}`}>
                            {userId}
                        </Link>
                    </Breadcrumb.Item>
                </Breadcrumb>

                <div>
                    <div className="flex flex-wrap items-center justify-center my-4">
                        <div className="lg:w-full bg-white transform duration-200 easy-in-out">
                            <div className=" h-40 overflow-hidden" >
                                <img className="w-full rounded-t-lg" src={user?.userCoverImage ?? require("assets/img/user_cover.png")} alt={user?.username} />
                            </div>
                            <div className="flex justify-center px-5 -mt-12">
                                <img className="h-32 w-32 bg-white p-2 rounded-full" src={user?.userImage ?? require("assets/img/user_profile.png")} alt={user?.username} />
                            </div>
                            <div className="text-gray-600 text-center px-14">
                                <h2 className="text-gray-800 text-3xl font-bold">{user?.username}</h2>
                                <p className="mt-2 text-md font-semibold"> {user?.userLocation} </p>
                            </div>
                        </div>
                    </div>
                    <Accordion collapseAll className="my-6 ">
                        <Accordion.Panel>
                            <Accordion.Title>
                                <h2 className="flex flex-row items-center gap-2 text-xl text-slate-800 "><FaIcons.FaPencil />Bio</h2>
                            </Accordion.Title>
                            <Accordion.Content className="p-2">

                                <p className="mt-2 text-md md:text-lg ">
                                    <CustomMarkdown item={user?.userBio} />
                                </p>
                            </Accordion.Content>
                        </Accordion.Panel>
                    </Accordion>

                    <Tabs className="p-1 text-slate-600 rounded-md overflow-x-scroll" variant="fullWidth">
                        <Tabs.Item icon={FaIcons.FaFolderClosed} title="Projetos Relacionados" >
                            <h2 className="mt-5 text-2xl text-zinc-800 ">Projetos Criados:</h2>
                            <div className="grid grid-cols-1 gap-y-10 gap-x-6 items-start p-8 divide-y divide-gray-300">
                                {projects?.map(project => (
                                    <div key={project.id}>
                                        <ProjectCard project={project} />
                                    </div>
                                ))}
                            </div>
                        </Tabs.Item>
                        <Tabs.Item icon={FaIcons.FaCalendarCheck} title="Eventos Relacionados" >
                            <h2 className="mt-5 text-2xl text-zinc-800 ">Eventos Criados:</h2>
                            {eventsCreated?.length === null ? "Nenhum evento criado encontrado!" :
                                <div className="grid grid-cols-1 items-start p-8 divide-y divide-gray-300">
                                    {eventsCreated?.map(event =>
                                        <div key={event.eventId}>
                                            <EventSmCard event={event} />
                                        </div>
                                    )}
                                </div>
                            }

                            <h2 className="mt-5 text-2xl text-zinc-800 ">Eventos que Participo: </h2>
                            {events?.length === null ? "Nenhum evento que participo encontrado!" :
                                <div className="grid grid-cols-1 items-start p-8 divide-y divide-gray-300">
                                    {events?.map(event => (
                                        <div key={event.eventId} >
                                            <EventSmCard event={event} />
                                        </div>
                                    ))}
                                </div>
                            }
                        </Tabs.Item>
                        <Tabs.Item icon={FaIcons.FaNewspaper} title="Postagens Relacionadas">
                            <h2 className="mt-5 text-2xl text-zinc-800 ">Postagens Criadas: </h2>
                            {posts?.length === null ? "Nenhuma postagem criada encontrada!" :
                                <div className="grid grid-cols-1 gap-x-2 w-full items-start p-8 divide-y divide-gray-300">
                                    {posts?.map(post => (
                                        <div key={post.postId}>
                                            <PostSmCard post={post} />
                                        </div>
                                    ))}
                                </div>
                            }
                        </Tabs.Item>
                    </Tabs>
                </div>
            </div>
        );
    }
}
