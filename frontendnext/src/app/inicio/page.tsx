'use client'

import { CategoryCard } from "@/components/cards/CategoryCard";
import { EventCard } from "@/components/cards/EventCard";
import { PostCard } from "@/components/cards/PostCard";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { Template } from "@/components/Template";
import { BASE_URL } from "@/resources";
import { CategoryPage } from "@/resources/category.resource";
import { PostPage } from "@/resources/post.resource";
import { ProjectPage } from "@/resources/project.resource";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Home() {

    return (
        <>
            <Template>
                <PostHomeList />
                <ProjectHomeList />
                <CategoryHomeList />
                <EventHomeList />
            </Template>
        </>
    );
}

function PostHomeList() {
    const [posts, setPosts] = useState<PostPage>({ content: [], page: { number: 0, size: 0, totalElements: 0, totalPages: 0 } });
    useEffect(() => {
        axios.get(`${BASE_URL}/posts?size=10`)
            .then((response) => {
                setPosts(response.data);
            });
    }, []);

    return (
        <>
            <div className="flex justify-between p-4 " >
                <h1 className="text-3xl">Publicações recentes</h1>
                <Link href={"/postagens"} className="text-2xl text-blue-600 hover:text-blue-400 hover:underline">Ver Lista</Link>
            </div>
            <div className="flex flex-row gap-4 overflow-y-auto ">
                {posts?.content.map(x => (
                    <div key={x.id} className="flex w-100 p-4 ">
                        <PostCard post={x} />
                    </div>
                ))}
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
    const [events, setEvents] = useState<ProjectPage>({ content: [], page: { number: 0, size: 0, totalElements: 0, totalPages: 0 } })
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

