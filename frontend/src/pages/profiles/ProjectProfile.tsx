import { CategoryCard } from "components/cards/CategoryCard";
import { EventCard } from "components/cards/EventCard";
import { PostCard } from "components/cards/PostCard";
import { Pagination } from "components/shared/Pagination";
import { ProjectMockProfile } from "mock/MockProfile";
import { CategoryPage } from "resources/category";
import { EventPage } from "resources/event";
import { PostPage } from "resources/post";
import { Project } from "resources/project";
import { Accordion, Button, Dropdown, Modal } from "flowbite-react";

import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa6";
import { Props } from "resources";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "utils/requests";
import { useAuth } from "resources/auth";
import { ProjectEditForm } from "pages/forms/ProjectForm";

export function ProjectProfile() {
    const params = useParams();
    return (
        <>
            <ProjectDetails params={`${params.projectId}`} />
        </>
    );
}

export function ProjectDetails({ params: projectId }: Props) {
    const auth = useAuth();
    const [edit, setEdit] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const [project, setProject] = useState<Project>();
    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber)
    }
    const [eventPage, setEventPage] = useState<EventPage>({ content: [], page: { number: 0, totalElements: 0 } });
    const [categoryPage, setCategoryPage] = useState<CategoryPage>({ content: [], page: { number: 0, totalElements: 0 } });
    const [postPage, setPostPage] = useState<PostPage>({ content: [], page: { number: 0, totalElements: 0 } });


    useEffect(() => {
        axios.get(`${baseUrl}/projects/${projectId}`)
            .then((response) => {
                setProject(response.data);
            });
    }, [projectId]);

    useEffect(() => {
        axios.get(`${baseUrl}/events/by-project/${projectId}?page=${pageNumber}&size=8`)
            .then((response) => {
                setEventPage(response.data);
            });
        axios.get(`${baseUrl}/project-category?projectId=${projectId}&page=${pageNumber}&size=9`)
            .then((response) => {
                setCategoryPage(response.data);
            });
        axios.get(`${baseUrl}/project-post?projectId=${projectId}&page=${pageNumber}&size=9`)
            .then((response) => {
                setPostPage(response.data);
            });
    }, [projectId, pageNumber]);


    const deleteProject = () => {
        axios.delete(`${baseUrl}/projects/delete/${projectId}`)
            .then((response) => {
                navigate("/projetos");
                return response.status;
            })
    }

    return (
        <>
            {!project ? <ProjectMockProfile params={`${params.projectId}`} /> :
                <div className="mt-10">
                    <div className="flex py-6 gap-2 justify-between items-center text-center text-lg font-semibold text-gray-700">
                        <Link to={"/projetos"}>
                            <FaIcons.FaArrowLeft className="hover:shadow-xl cursor-pointer rounded-full p-1 border transition duration-800 hover:bg-gray-200 text-3xl" />
                        </Link>
                        {project.userId === auth.getUserSession()?.id ?
                            <Dropdown label="Configurações" inline>
                                <Dropdown.Item icon={FaIcons.FaSquarePen} onClick={() => setEdit(true)} className="text-md font-medium">
                                    Editar 
                                </Dropdown.Item>
                                <Dropdown.Item icon={FaIcons.FaTrash} onClick={() => setDeleteModal(true)} className="text-md font-medium">
                                    Deletar
                                </Dropdown.Item>
                            </Dropdown>
                            : ""
                        }
                        <Modal show={deleteModal} size="md" onClose={() => setDeleteModal(false)} popup>
                            <Modal.Header />
                            <Modal.Body>
                                <div className="text-center">
                                    <FaIcons.FaExclamation className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200 border-4 p-2  rounded-full" />
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                        Deseja deletar esta projeto?
                                    </h3>
                                    <div className="flex justify-center gap-4">
                                        <Button color="failure" onClick={() => deleteProject()} >
                                            <span onClick={() => setDeleteModal(false)}>{"Deletar"}</span>
                                        </Button>
                                        <Button color="gray" onClick={() => setDeleteModal(false)}>
                                            Cancelar
                                        </Button>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </div>
                    {edit ? <ProjectEditForm params={projectId} /> :
                        <div>
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
                                <img src={project?.projectImage ? project.projectImage : "https://cdn1.iconfinder.com/data/icons/dashboard-ui-vol-1/48/JD-46-512.png"} className="mb-6 shadow-md rounded-lg bg-slate-50 w-[22rem] sm:mb-0" alt={project.projectTitle} />
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
                </div>

            }
        </>
    );
}