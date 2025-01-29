import { TextInput } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { categoryMock, eventMock, postMock, projectMock } from "./MockData";
import { removeAccents } from "components/shared/Template";
import * as GoIcons from "react-icons/go"
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
            <div className="flex items-center justify-between my-5">
                <div className="flex space-x-4 px-4">
                    <TextInput icon={GoIcons.GoSearch}
                        className="w-full"
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
                                <h5 className=" mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{category.categoryName}</h5>
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
            <div className="flex items-center justify-between my-5">
                <div className="flex space-x-4 px-4">
                    <TextInput icon={GoIcons.GoSearch}
                        className="w-full"
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
                                <img className="object-cover w-full rounded-t-xl h-80" src={post.postImage ? post.postImage : "https://cdn1.iconfinder.com/data/icons/dashboard-ui-vol-1/48/JD-46-512.png"} alt={post.postTitle} />
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
            <div className="flex items-center justify-between my-5">
                <div className="flex space-x-4 px-4">
                    <TextInput icon={GoIcons.GoSearch}
                        className="w-full"
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
                                <img className="object-cover w-full rounded-t-xl h-70 md:h-80 md:w-80 md:rounded-none md:rounded-s-xl" src={project.projectImage ? project.projectImage : "https://cdn1.iconfinder.com/data/icons/dashboard-ui-vol-1/48/JD-46-512.png"} alt={project.projectTitle} />
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <h3 className="mb-2 text-xl text-gray-900 font-semibold">{project.projectTitle}</h3>
                                    <p className="max-h-40 mb-3 font-normal text-gray-700 text-ellipsis overflow-hidden ">{project.projectDescription}</p>
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
            <div className="flex items-center justify-between my-5">
                <div className="flex space-x-4 px-4">
                    <TextInput className="w-full"
                        color="bg-zinc-400"
                        type="text"
                        id="query"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="buscar"
                    />
                </div>
            </div>
            <div className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
                {result.map(event => (
                    <div key={event.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                        <Link to={`/eventos/${event.id}`}
                            className="max-w-sm bg-zinc-100 border border-zinc-300 p-4 rounded-xl shadow-md transition duration-700 hover:shadow-xl hover:scale-105">

                            <img className="object-cover w-full rounded-t-xl h-60" src={event.eventImage ? event.eventImage : "https://cdn1.iconfinder.com/data/icons/dashboard-ui-vol-1/48/JD-46-512.png"} />
                            <hr />
                            <h5 className="h-32 text-xl font-bold tracking-tight text-gray-900">
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
                ))}
            </div>
        </>
    );
}