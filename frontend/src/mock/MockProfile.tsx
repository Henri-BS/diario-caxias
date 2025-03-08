import * as FaIcons from "react-icons/fa6";
import * as GoIcons from "react-icons/go";
import { categoryMock, eventMock, postMock, projectMock } from "./MockData";
import moment from "moment";
import { Props } from "resources";

export function CategoryMockProfile({ params: categoryName }: Props) {

    const filterByName = (name: any) => {
        return categoryMock.filter(item => item.categoryName.toString() === name);
    };

    const result = filterByName(categoryName);

    return (
        <>
            {result.map((category) => {
                return (
                    <div key={category.id} className="mt-10">
                        <div className="w-full p-6 bg-zinc-100 border border-zinc-300 rounded-lg shadow-md ">
                            <h5 className=" mb-2 text-4xl font-bold tracking-tight text-cyan-600 ">{category?.categoryName}</h5>
                            <p className="font-medium text-lg">{category?.categoryDescription}</p>
                            <div className="grid md:grid-cols-2 text-gray-800 mt-5">
                                <p className="flex flex-row items-center text-lg gap-2"><FaIcons.FaCalendarCheck /> Projetos relacionados: <b>{3}</b></p>
                                <p className="flex flex-row items-center text-lg gap-2"><FaIcons.FaUser /> Usuários relacionados: <b>{5}</b></p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export function EventMockProfile({ params: eventId }: Props) {

    const filterById = (id: any) => {
        return eventMock.filter(item => item.id.toString() === id);
    };

    const result = filterById(eventId);

    return (
        <>
            {result.map(event => {
                return (
                    <div key={event.id} className="mt-10">
                        <div className="relative flex flex-col sm:flex-row xl:flex-col items-start">
                            <div className="order-1 sm:ml-6 xl:ml-0">
                                <h3 className="mb-1 text-slate-900 font-semibold">
                                    <span className="mb-1 block text-2xl leading-6 text-cyan-600">{event?.eventTitle}</span>
                                </h3>
                                <div>
                                    <p className="flex gap-2 items-center text-center text-lg font-semibold text-gray-700">
                                        <FaIcons.FaFolderClosed /> Projeto: {event?.projectTitle}
                                    </p>
                                    <p className="flex gap-2 items-center text-center text-lg font-semibold text-gray-700">
                                        <GoIcons.GoCalendar /> Data do evento: {moment(event?.eventDate).format("DD/MM/yyyy")}
                                    </p>
                                    <p className="flex gap-2 items-center text-center text-lg font-semibold text-gray-700">
                                        <GoIcons.GoChecklist /> Status: {event?.eventStatus}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <img src={event?.eventImage} className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full" width="1216" height="640" alt={event.eventTitle} />
                                <p className="flex gap-2 mt-2 items-center text-center text-sm font-medium text-gray-700">
                                    enviado em: {event?.createdDate}
                                </p>
                            </div>
                        </div>
                        <div className="mt-5 prose prose-slate prose-lg text-slate-800 text-justify">
                            <p>{event?.eventDescription} </p>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export function PostMockProfile({ params: postId }: Props) {

    const filterById = (id: any) => {
        return postMock.filter(item => item.postId.toString() === id);
    };

    const result = filterById(postId);

    return (
        <>
            {result.map(post => {
                return (
                    <div key={post.postId} className="mt-10">
                        <div className="relative flex flex-col md:flex-row xl:flex-col items-start">
                            <div className="order-1 sm:ml-6 xl:ml-0">
                                <h3 className="mb-1 text-slate-900 font-semibold">
                                    <span className="mb-1 text-3xl leading-6 text-cyan-600">{post?.postTitle}</span>
                                </h3>
                                <div className="prose prose-slate prose-sm text-slate-600 mt-5">
                                    <p className="flex flex-row items-center text-gray-800 text-lg gap-2"><FaIcons.FaFolderClosed /> Projetos relacionados: <b>{2}</b></p>
                                    <i>{post?.postSummary}</i>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <img src={post?.postImage} className="mb-6 shadow-md rounded-lg bg-slate-50 w-[60rem] sm:mb-0" alt={post.postTitle} />
                                <p className="flex gap-2 mt-2 items-center text-center text-sm font-medium text-gray-700">
                                    enviado em: {post?.createdDate}
                                </p>
                            </div>
                        </div>
                        <p className="mt-5 text-xl text-gray-800 text-justify">{post?.postDescription} </p>
                    </div>
                )
            })}
        </>
    )
}

export function ProjectMockProfile({ params: projectId }: Props) {

    const filterById = (id: any) => {
        return projectMock.filter(item => item.id.toString() === id);
    };

    const result = filterById(projectId);

    return (
        <>
            {result.map((project) => {
                return (
                    <div key={project.id} className="mt-10">
                        <div className="relative flex flex-col sm:flex-row xl:flex-col items-start">
                            <div className="order-1 sm:ml-6 xl:ml-0">
                                <h3 className="mb-1 block text-3xl font-semibold leading-6 text-cyan-600">{project?.projectTitle}</h3>
                                <div className="prose prose-slate prose-sm text-lg text-slate-700 mt-5">
                                    <p className="flex flex-row items-center gap-2"><FaIcons.FaTag /> Categorias relacionados: <b>{0}</b></p>
                                    <p className="flex flex-row items-center gap-2"><FaIcons.FaCalendarCheck /> Eventos relacionados: <b>{0}</b></p>
                                    <p className="flex flex-row items-center gap-2"><FaIcons.FaNewspaper /> Postagens relacionados: <b>{0}</b></p>
                                </div>
                            </div>
                            <img src={project?.projectImage ? project.projectImage :  "https://cdn1.iconfinder.com/data/icons/dashboard-ui-vol-1/48/JD-46-512.png"} className="mb-6 shadow-md rounded-lg bg-slate-50 w-[22rem] sm:mb-0" alt={project.projectTitle} />
                        </div>
                        <p className="mt-5 text-xl text-justify">{project?.projectDescription} </p>
                    </div>
                )
            })}
        </>
    )
}