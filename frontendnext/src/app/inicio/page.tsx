'use client'

import { CategoryCard } from "@/components/cards/CategoryCard";
import { EventCard } from "@/components/cards/EventCard";
import { PostCard } from "@/components/cards/PostCard";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { Template } from "@/components/Template";
import { BASE_URL } from "@/resources";
import { CategoryPage } from "@/resources/category.resource";
import { EventPage } from "@/resources/event.resource";
import { PostPage } from "@/resources/post.resource";
import { ProjectPage } from "@/resources/project.resource";
import { UserPage } from "@/resources/user.resource";
import axios from "axios";
import { Carousel } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa6";


export default function Home() {
    
    return (
        <>
            <Template>
                <div className=" grid grid-cols-1 md:grid-cols-2">
                    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                            Boas vindas ao Diário Caxias
                        </h5>
                        <p className="font-normal text-gray-700">
                            Aqui nesta plataforma você poderá encontrar um vasto acervo de projetos e eventos que visam contribuir com o desenvolvimento educacional, profissional e cultural da cidade de Caxias do Maranhão.
                            O Diário Caxias se compromete em estabelecer um vínculo entre a educação formal e a informal, permitindo que pessoas das mais diversas áreas ou níveis acadêmicos possam participar ativamente das atividades propostas, almejando uma participação multidisciplinar dos Caxienses.
                            Para saber um pouco mais sobre os recentes projetos ou eventos, clique nas últimas nóticias que aparecem aqui ao lado e faça a sua história em sua cidade.
                        </p>
                    </div>

                    <PostCarousel />
                </div>

                <ProjectHomeList />
                <CategoryHomeList />
                <EventHomeList />
            </Template>
        </>
    );
    
    
    function PostCarousel() {
        const [posts, setPosts] = useState<PostPage>({ content: [], page: { number: 0, size: 0, totalElements: 0, totalPages: 0 } });
        useEffect(() => {
            axios.get(`${BASE_URL}/posts?size=10`)
                .then((response) => {
                    setPosts(response.data);
                });
        }, []);
    
        return (
            <>

                <div className="flex flex-col justify-center items-center">
                    <div className="flex justify-between p-4 w-full" >
                        <h1 className="text-2xl">Últimas Notícias</h1>
                        <Link href={"/postagens"} className="text-xl text-blue-600 hover:text-blue-400 hover:underline">
                            Ver mais
                        </Link>
                    </div>
                    <div className="h-96 w-96">
                        <Carousel>
                            {posts.content.map(x => (
                                <div key={x.id}>
                                    <PostCard post={x} />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </>
        );
    }

    function ProjectHomeList() {

        const [projects, setProjects] = useState<ProjectPage>({ content: [], page: { number: 0, size: 0, totalElements: 0, totalPages: 0 } })
        useEffect(() => {
            axios.get(`${BASE_URL}/projects?size=10`)
                .then((response) => {
                    setProjects(response.data);
                })
        }, [])
    
        return (
            <>
                <div className="flex justify-between p-4 " >
                    <h1 className="text-3xl">Projetos recentes</h1>
                    <Link href={"/projetos"} className="text-2xl text-blue-600 hover:text-blue-400 hover:underline">
                        Ver Lista
                    </Link>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-10 gap-x-6 items-start p-8">
                    {projects.content?.map(x => (
                        <div key={x.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                            <ProjectCard project={x} />
                        </div>
                    ))}
                </div>
            </>
        );
    }

    function CategoryHomeList() {
        
        const [categories, setCategories] = useState<CategoryPage>({ content: [], page: { number: 0, size: 0, totalElements: 0, totalPages: 0 } });
        useEffect(() => {
            axios.get(`${BASE_URL}/categories?size=12`)
                .then((response) => {
                    setCategories(response.data);
                });
        }, []);
    
        return (
            <>
                <div className="flex justify-between p-4 " >
                    <h1 className="text-3xl">Categorias</h1>
                    <Link href={"/categorias"} className="text-2xl text-blue-600 hover:text-blue-400 hover:underline ">Ver Lista</Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 items-start p-8">
                    {categories?.content.map(x => (
                        <div key={x.id} className="w-100 py-4 ">
                            <CategoryCard category={x} />
                        </div>
                    ))}
                </div>
            </>
        );
    }
    
    function EventHomeList() {
        const [events, setEvents] = useState<EventPage>({ content: [], page: { number: 0, size: 0, totalElements: 0, totalPages: 0 } })
        useEffect(() => {
            axios.get(`${BASE_URL}/events?size=10`)
                .then((response) => {
                    setEvents(response.data);
                })
        }, [])
        
        return (
            <>
                <div className="flex justify-between p-4 " >
                    <h1 className="text-3xl">Eventos recentes</h1>
                    <Link href={"/eventos"} className="text-2xl text-blue-600 hover:text-blue-400 hover:underline">
                        Ver Lista
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-6 items-start p-8">
                    {events.content?.map(x => (
                        <div key={x.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                            <EventCard event={x} />
                        </div>
                    ))}
                </div>
            </>
        );
    }

}