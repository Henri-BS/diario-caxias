import { Carousel, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { categoryMock, eventMock, postMock, projectMock } from "./MockData";
import { removeAccents } from "components/shared/Template";
import * as GoIcons from "react-icons/go"
import * as FaIcons from "react-icons/fa6";
import moment from "moment";

export const CategoryMockList = () => {

    const [query, setQuery] = useState("");

    const filter = () => {
        return categoryMock.filter(item =>
            item.categoryName.toUpperCase().includes(query.toLocaleUpperCase())
        );
    };

    const result = filter();
    return (
        <>
            <div className="flex items-center justify-between mt-6">
            <h1 className="flex flex-row items-center gap-x-2 text-2xl text-gray-700 font-semibold"><FaIcons.FaTags/> Categorias</h1>
                <div className="flex space-x-4 px-4">
                    <TextInput icon={GoIcons.GoSearch}
                        className="py-2"
                        color="bg-zinc-400"
                        type="text"
                        id="query"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="buscar"
                    />
                </div>
            </div>
            <div className="  grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-6 items-start p-8">
                {result.map(category => (
                    <div key={category.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                        <Link to={`/categorias/${category.id}`} className="w-full text-center">
                            <div className="p-6 bg-zinc-100 border border-zinc-300 rounded-lg shadow-md transition duration-700 hover:shadow-xl hover:scale-105">
                                <h5 className="h-10 mb-2 text-2xl font-bold tracking-tight text-gray-900 text-ellipsis oveflow-hidden">{category.categoryName}</h5>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}

export const PostMockList = () => {
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
            <div className="flex items-center justify-between mt-6">
            <h1 className="flex flex-row items-center gap-x-2 text-2xl text-gray-700 font-semibold"><FaIcons.FaNewspaper/> Postagens</h1>
                <div className="flex space-x-4 px-4">
                    <TextInput icon={GoIcons.GoSearch}
                        className="py-2"
                        color="bg-zinc-400"
                        type="text"
                        id="query"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="buscar"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 gap-x-10 items-start p-8">
                {result.map(post => (
                    <div key={post.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                        <Link
                            to={`/postagens/${post.id}`}
                            className=" bg-zinc-200 border border-zinc-300 rounded-xl  hover:bg-zinc-100 shadow-md transition duration-700 hover:shadow-xl ">
                            <div className=" w-[470px] bg-zinc-100 border border-zinc-300 rounded-xl shadow hover:bg-zinc-300">
                                <img className="object-cover w-full rounded-t-xl h-80" src={post.postImage ?? "https://cdn1.iconfinder.com/data/icons/dashboard-ui-vol-1/48/JD-46-512.png"} alt={post.postTitle} />
                                <div className="p-5 max-h-60 text-ellipsis overflow-hidden">
                                    <h5 className="mb-2 h-24 text-2xl font-semibold tracking-tight text-gray-900 overflow-hidden">{post.postTitle}</h5>
                                    <p className="mb-3 h-26 font-normal text-gray-700 overflow-hidden">{post.postSummary}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}

export const ProjectMockList = () => {

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
            <div className="flex items-center justify-between mt-6">
            <h1 className="flex flex-row items-center gap-x-2 text-2xl text-gray-700 font-semibold"><FaIcons.FaFolderClosed/> Projetos</h1>
                <div className="flex space-x-4 px-4">
                    <TextInput icon={GoIcons.GoSearch}
                        className="py-2"
                        color="bg-zinc-400"
                        type="text"
                        id="query"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="buscar"
                    />
                </div>
            </div>
            <div className="  grid grid-cols-1 xl:grid-cols-2 gap-y-10 gap-x-6 items-start p-8">
                {result.map(project => {
                    return (
                        <div key={project.id} className="relative flex flex-col sm:flex-row sm:w-200 xl:flex-col items-start ">
                            <Link to={`/projetos/${project.id}`} key={project.id} className="flex flex-col h-70 items-center bg-zinc-100 border border-zinc-300 rounded-xl shadow-md md:flex-row md:w-full hover:shadow-xl transition duration-700 hover:scale-105">
                                <img className="object-cover w-full rounded-t-xl h-70 md:h-80 md:w-80 md:rounded-none md:rounded-s-xl" src={project.projectImage ?? "https://cdn1.iconfinder.com/data/icons/dashboard-ui-vol-1/48/JD-46-512.png"} alt={project.projectTitle} />
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <h3 className="mb-2 text-lg font-semibold tracking-tight text-gray-900 text-ellipsis overflow-hidden">{project.projectTitle}</h3>
                                    <p className="max-h-24 mb-3 font-normal text-gray-700 text-ellipsis overflow-hidden ">{project.projectDescription}</p>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </>
    );
}

export const EventMockList = () => {

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
            <div className="flex flex-row items-center justify-between mt-6">
                <h1 className="flex flex-row items-center gap-x-2 text-2xl text-gray-700 font-semibold"><FaIcons.FaCalendarCheck/> Eventos</h1>
                <div className="flex space-x-4 px-4">
                    <TextInput icon={GoIcons.GoSearch}
                        className="py-2"
                        color="bg-zinc-400"
                        type="text"
                        id="query"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="buscar"
                    />
                </div>
            </div>
            <hr />
            <div className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
                {result.map(event => (
                    <div key={event.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                        <Link to={`/eventos/${event.id}`}
                            className="max-w-sm bg-zinc-100 border border-zinc-300 p-4 rounded-xl shadow-md transition duration-700 hover:shadow-xl hover:scale-105">
                            <img className="object-cover w-full rounded-t-xl h-60" src={event.eventImage ?? "https://cdn1.iconfinder.com/data/icons/dashboard-ui-vol-1/48/JD-46-512.png"} alt={event.eventTitle} />
                            <hr />
                            <h5 title={event.eventTitle} className="h-14 text-lg font-semibold tracking-tight text-gray-900 text-ellipsis overflow-hidden">
                                {event.eventTitle}
                            </h5>
                            <span className="text-md text-gray-500">{event.projectTitle}</span>
                            <div className="mt-4 flex space-x-3 lg:mt-6 justify-between">
                                <p className="flex gap-2 items-center text-center text-sm font-medium text-gray-700">
                                    <GoIcons.GoCalendar /> {moment(event.eventDate).format("DD/MM/yyyy")}
                                </p>
                                <p className="flex gap-2 items-center text-center text-sm font-medium text-gray-700">
                                    <GoIcons.GoChecklist /> {event.eventStatus}
                                </p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}

export const PostMockCarousel = () => {
    return (
        <>
            <Carousel>
                {postMock.map(post => {
                    postMock.length = 8
                    return (
                        <div key={post.id} className="flex justify-center items-center">
                            <Link to={`/postagens/${post.id}`} className="bg-zinc-200 border border-zinc-300 rounded-xl  hover:bg-zinc-100 shadow-md transition duration-700 hover:shadow-xl ">
                                <div className="min-w-[340px] bg-zinc-100 border border-zinc-300 rounded-xl shadow hover:bg-zinc-300">
                                    <img className="object-cover w-full rounded-t-xl h-60" src={post.postImage ?? "https://cdn1.iconfinder.com/data/icons/dashboard-ui-vol-1/48/JD-46-512.png"} alt={post.postTitle} />
                                    <div className="p-5 max-h-60 text-ellipsis overflow-hidden">
                                        <h5 className="mb-2 h-24 text-2xl font-semibold tracking-tight text-gray-900 overflow-hidden">{post.postTitle}</h5>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </Carousel>
        </>
    );
}

export const HomeMock = () => {
    return (
        <>
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
                            <Link to={`/projetos/${project.id}`} key={project.id} className="flex flex-col h-70 items-center bg-zinc-100 border border-zinc-300 rounded-xl shadow-md md:flex-row md:w-full hover:shadow-xl transition duration-700 hover:scale-105">
                                <img className="object-cover w-full rounded-t-xl  md:h-80 md:w-80 md:rounded-none md:rounded-s-xl" src={project.projectImage ?? "https://cdn1.iconfinder.com/data/icons/dashboard-ui-vol-1/48/JD-46-512.png"} alt={project.projectTitle} />
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <h3 className="mb-2 text-xl text-gray-900 font-semibold">{project.projectTitle}</h3>
                                    <p className="h-24   mb-3 font-normal text-gray-700 text-ellipsis overflow-hidden">{project.projectDescription}</p>
                                </div>
                            </Link>
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
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-4 items-start p-8 overflow-hidden">
                {categoryMock.map(category => {
                    categoryMock.length = 8
                    return (
                        <div key={category.id} className="overflow-hidden">
                            <Link to={`/categorias/${category.categoryName}`} className="max-w-md text-center">
                                <div className="h-16 py-4 px-2 bg-zinc-100 border border-zinc-300 rounded-lg shadow-md transition duration-700 hover:shadow-xl hover:scale-105 text-ellipsis oveflow-hidden">
                                    <h5 className=" mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">{category.categoryName}</h5>
                                </div>
                            </Link>
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
                            <Link to={`/eventos/${event.id}`}
                                className="max-w-sm bg-zinc-100 border border-zinc-300 p-4 rounded-xl shadow-md transition duration-700 hover:shadow-xl hover:scale-105">
                                <img className="object-cover w-full rounded-t-xl h-60" src={event.eventImage ?? "https://cdn1.iconfinder.com/data/icons/dashboard-ui-vol-1/48/JD-46-512.png"} alt={event.eventTitle} />
                                <hr />
                                <h5 title={event.eventTitle} className="h-20 text-lg font-semibold tracking-tight text-gray-900 text-ellipsis overflow-hidden">
                                    {event.eventTitle}
                                </h5>
                                <span className="text-md text-gray-500 dark:text-gray-400 overflow-hidden">{event.projectTitle}</span>

                                <div className="mt-4 flex space-x-3 lg:mt-6 justify-between">
                                    <p className="flex gap-2 items-center text-center text-sm font-medium text-gray-700">
                                        <GoIcons.GoCalendar /> {moment(event.eventDate).format("DD/MM/yyyy")}
                                    </p>
                                    <p className="flex gap-2 items-center text-center text-sm font-medium text-gray-700">
                                        <GoIcons.GoChecklist /> {event.eventStatus}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </>
    )
}