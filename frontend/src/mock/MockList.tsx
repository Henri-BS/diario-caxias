
import { CategoryCard } from "components/cards/CategoryCard";
import { EventCard } from "components/cards/EventCard";
import { PostCard, CarouselPostCard, PostSmCard } from "components/cards/PostCard";
import { ProjectCard } from "components/cards/ProjectCard";
import { SearchBar } from "components/shared/Pagination";
import { removeAccents } from "components/shared/Template";
import { Flowbite, Carousel } from "flowbite-react";
import { customTheme } from "pages/main/Home";
import { useState } from "react";
import * as FaIcons from "react-icons/fa6";
import { Link } from "react-router-dom";
import { categoryMock, postMock, projectMock, eventMock } from "./MockData";

export function CategoryMockList() {

    const [query, setQuery] = useState("");

    const filter = () => {
        return categoryMock.filter(item =>
            item.categoryName.toUpperCase().includes(query.toLocaleUpperCase())
        );
    };

    const result = filter();
    return (
        <>
            <SearchBar
                pageIcon={<FaIcons.FaTags />}
                pageTitle="Categorias"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-6 items-start p-8">
                {result.map(category => (
                    <div key={category.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                        <CategoryCard category={category} />
                    </div>
                ))}
            </div>
        </>
    );
}

export function PostMockList() {
    const [query, setQuery] = useState("");

    const filter = () => {
        return postMock.filter(item =>
            item.postTitle.toUpperCase().includes(query.toLocaleUpperCase()) ||
            removeAccents(item.postTitle).toUpperCase().includes(query.toLocaleUpperCase())
        );
    };

    const result = filter();
    return (
        <>
            <SearchBar
                pageIcon={<FaIcons.FaNewspaper />}
                pageTitle="Postagens"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-10 items-start p-8">
                {result.map(post => (
                    <div key={post.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                        <PostCard post={post} />
                    </div>
                ))}
            </div>
        </>
    );
}

export function ProjectMockList() {

    const [query, setQuery] = useState("");

    const filter = () => {
        return projectMock.filter(item =>
            item.projectTitle.toUpperCase().includes(query.toLocaleUpperCase()) ||
            removeAccents(item.projectTitle).toUpperCase().includes(query.toLocaleUpperCase())

        );
    };

    const result = filter();
    return (
        <>
            <SearchBar
                pageIcon={<FaIcons.FaFolderClosed />}
                pageTitle="Projetos"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <div className="  grid grid-cols-1 xl:grid-cols-2 gap-y-10 gap-x-6 items-start p-8">
                {result.map(project => {
                    return (
                        <div key={project.id} className="relative flex flex-col sm:flex-row sm:w-200 xl:flex-col items-start ">
                            <ProjectCard project={project} />
                        </div>
                    )
                })}
            </div>
        </>
    );
}

export function EventMockList() {

    const [query, setQuery] = useState("");

    const filter = () => {
        return eventMock.filter(item =>
            item.eventTitle.toUpperCase().includes(query.toLocaleUpperCase()) ||
            removeAccents(item.eventTitle).toUpperCase().includes(query.toLocaleUpperCase())
        );
    };

    const result = filter();
    return (
        <>
            <SearchBar
                pageIcon={<FaIcons.FaCalendarCheck />}
                pageTitle="Eventos"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <hr />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
                {result.map(event => (
                    <div key={event.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                        <EventCard event={event} />
                    </div>
                ))}
            </div>
        </>
    );
}

export function HomeMock() {
    return (
        <>
            <div className="items-center p-4 mt-4">
                <div className="flex justify-between w-full sm:text-lg md:text-xl">
                    <h1>Últimas Postagens</h1>
                    <Link to={"/postagens"} className="text-blue-600 hover:text-blue-400 hover:underline">
                        Ver mais
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 items-center">
                    <div className="h-96 max-w-[600px] w-full">
                        <Flowbite theme={{ theme: customTheme }}>
                            <Carousel>
                                {postMock.map(post => {
                                    postMock.length = 6
                                    return (
                                        <div key={post.id} className="flex justify-center items-center w-full">
                                            <CarouselPostCard post={post} />
                                        </div>
                                    )
                                })}
                            </Carousel>
                        </Flowbite>
                    </div>

                    <div className="mt-4 p-4">
                        <ul className="divide-y divide-gray-200">
                            {postMock.map(post => {
                                postMock.length = 6
                                return (
                                    <div key={post.id}>
                                        <PostSmCard post={post} />
                                    </div>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex justify-between p-4 sm:text-lg md:text-xl">
                <h1>Projetos recentes</h1>
                <Link to={"/projetos"} className="text-blue-600 hover:text-blue-400 hover:underline">
                    Ver mais
                </Link>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-10 gap-x-6 items-start p-8 ">
                {projectMock.map(project => {
                    projectMock.length = 8
                    return (
                        <div key={project.id} className="relative flex flex-col sm:flex-row items-start ">
                            <ProjectCard project={project} />
                        </div>
                    )
                })}
            </div>

            <div className="flex justify-between p-4 sm:text-lg md:text-xl">
                <h1>Categorias</h1>
                <Link to={"/categorias"} className="text-blue-600 hover:text-blue-400 hover:underline">
                    Ver mais
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-4 items-start p-8">
                {categoryMock.map(category => {
                    categoryMock.length = 8
                    return (
                        <div key={category.id} className="overflow-hidden">
                            <CategoryCard category={category} />
                        </div>
                    )
                })}
            </div>

            <div className="flex justify-between p-4 sm:text-lg md:text-xl">
                <h1>Eventos recentes</h1>
                <Link to={"/eventos"} className="text-blue-600 hover:text-blue-400 hover:underline">
                    Ver mais
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
                {eventMock.map(event => {
                    eventMock.length = 9
                    return (
                        <div key={event.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                            <EventCard event={event} />
                        </div>
                    )
                })}
            </div>
        </>
    )
}