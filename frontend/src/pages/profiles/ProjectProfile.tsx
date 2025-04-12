import { PostSmCard } from "components/cards/PostCard";
import { Pagination } from "components/shared/Pagination";
import { EventPage } from "resources/event";
import { Post } from "resources/post";
import { Project, ProjectCategory } from "resources/project";
import { Accordion, Breadcrumb, Button, Dropdown, Modal, Tabs, Timeline } from "flowbite-react";

import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa6";
import { Props } from "resources";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "utils/requests";
import { useAuth } from "resources/auth";
import { ProjectCategoryAddForm, ProjectEditForm } from "pages/forms/ProjectForm";
import moment from "moment";
import { EventSmCard } from "components/cards/EventCard";
import { CustomMarkdown } from "components/shared/Template";
import { useNotification } from "components/shared/Notification";

export function ProjectProfile() {
    const params = useParams();
    return (
        <ProjectDetails params={`${params.projectId}`} />
    );

    function ProjectDetails({ params: projectId }: Props) {
        const auth = useAuth();
        const navigate = useNavigate();
        const notification = useNotification();
        const [edit, setEdit] = useState(false);
        const [addCategory, setAddCategory] = useState(false);
        const [deleteModal, setDeleteModal] = useState(false);
        const [pageNumber, setPageNumber] = useState(0);
        const [project, setProject] = useState<Project>();
        const [eventPage, setEventPage] = useState<EventPage>({ content: [], page: { number: 0, totalElements: 0 } });
        const [categories, setCategories] = useState<ProjectCategory[]>();
        const [posts, setPosts] = useState<Post[]>();

        const handlePageChange = (newPageNumber: number) => {
            setPageNumber(newPageNumber)
        }

        useEffect(() => {
            axios.get(`${baseUrl}/projects/${projectId}`)
                .then((response) => {
                    setProject(response.data);
                });
        }, [projectId]);

        useEffect(() => {
            axios.get(`${baseUrl}/events/by-project/${projectId}?page=${pageNumber}&size=8&sort=eventDate,DESC`)
                .then((response) => {
                    setEventPage(response.data);
                });
            axios.get(`${baseUrl}/project-category?projectId=${projectId}`)
                .then((response) => {
                    setCategories(response.data);
                });
            axios.get(`${baseUrl}/event-post?projectId=${projectId}&page=${pageNumber}&size=9`)
                .then((response) => {
                    setPosts(response.data);
                });
        }, [projectId, pageNumber]);

        const deleteProject = () => {
            axios.delete(`${baseUrl}/projects/delete/${projectId}`)
                .then((response) => {
                    setDeleteModal(false)
                    navigate("/projetos")
                    notification.notify("Deletado com sucesso!", "success");
                    return response.status;
                })
        }

        const deleteProjectCategory = (id: any) => {
            axios.delete(`${baseUrl}/project-category/delete/${id}`)
                .then((response) => {
                    return response.status;
                })
        }

        const postsByProject = posts?.filter((post, index, self) => {
            return self.map(p => p.postId).indexOf(post.postId) === index;
        });

        return (
            <div>
                <div className="flex flex-col md:flex-row justify-between md:items-center text-lg font-semibold text-gray-700">
                    <Breadcrumb aria-label="breadcrumb" className="mb-3 py-2">
                        <Breadcrumb.Item icon={FaIcons.FaHouse}>
                            <Link to="/">
                                Início
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to="/projetos">
                                Projetos
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item >
                            <Link to={`/projetos/${projectId}`}>
                                {projectId}
                            </Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    {project?.userId === auth.getUserSession()?.id ?
                        <Dropdown label="Configurações" inline>
                            <Dropdown.Item icon={FaIcons.FaSquarePen} onClick={() => setEdit(true)} className="text-md font-medium">
                                Editar Projeto
                            </Dropdown.Item>
                            <Dropdown.Item icon={FaIcons.FaTag} onClick={() => setAddCategory(true)} className="text-md font-medium">
                                Adicionar Categoria
                            </Dropdown.Item>
                            <Dropdown.Item icon={FaIcons.FaTrash} onClick={() => setDeleteModal(true)} className="text-md font-medium">
                                Deletar Projeto
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
                                    Deseja deletar este projeto?
                                </h3>
                                <div className="flex justify-center gap-4">
                                    <Button color="failure" onClick={() => deleteProject()} >
                                        {"Deletar"}
                                    </Button>
                                    <Button color="gray" onClick={() => setDeleteModal(false)}>
                                        Cancelar
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>

                    <Modal show={addCategory} size="3xl" onClose={() => setAddCategory(false)} popup>
                        <Modal.Header />
                        <Modal.Body>
                            <ProjectCategoryAddForm params={projectId} />
                        </Modal.Body>
                    </Modal>

                </div>
                <div>
                    {edit ? <ProjectEditForm params={projectId} /> :
                        <div>
                            <div className="relative flex flex-col sm:flex-row xl:flex-col items-start md:shadow-md">
                                <div className="order-1 sm:ml-6 xl:ml-0">
                                    <h1 className="mb-1 block text-3xl font-semibold leading-6 text-cyan-600">{project?.projectTitle}</h1>
                                    <div className="prose prose-slate prose-sm text-lg text-slate-700 mt-5">
                                        <p className="flex flex-row items-center gap-2"><FaIcons.FaTag /> Categorias relacionadas: <b>{categories?.length}</b></p>
                                        <p className="flex flex-row items-center gap-2"><FaIcons.FaCalendarCheck /> Eventos relacionados: <b>{eventPage.page.totalElements}</b></p>
                                        <p className="flex flex-row items-center gap-2"><FaIcons.FaNewspaper /> Postagens relacionadas: <b>{postsByProject?.length}</b></p>
                                    </div>
                                </div>
                                <img src={project?.projectImage ? project?.projectImage : require("assets/img/image.png")} className="mb-6 shadow-md rounded-lg bg-slate-50 w-[22rem] sm:mb-0" alt={project?.projectTitle} />
                            </div>

                            <Accordion collapseAll className="my-6 ">
                                <Accordion.Panel>
                                    <Accordion.Title>
                                        <h2 className="flex flex-row items-center gap-2 text-xl text-slate-800 "><FaIcons.FaCircleInfo />Informações Gerais</h2>
                                    </Accordion.Title>
                                    <Accordion.Content className="p-2">
                                        <p className="mt-5 text-md text-slate-700 md:px-10">
                                            <CustomMarkdown item={project?.projectDetails ? project.projectDetails : "Nenhuma informação foi encontrada!"} />
                                        </p>
                                    </Accordion.Content>
                                </Accordion.Panel>
                                <Accordion.Panel>
                                    <Accordion.Title>
                                        <h2 className="flex flex-row items-center gap-2 text-xl text-slate-800 "><FaIcons.FaRectangleList />Descrição</h2>
                                    </Accordion.Title>
                                    <Accordion.Content>
                                        <p className="mt-5 text-xl text-slate-700 md:px-10">
                                            <CustomMarkdown item={project?.projectDescription ? project.projectDescription : "Nenhuma descrição foi encontrada!"} />
                                        </p>
                                    </Accordion.Content>
                                </Accordion.Panel>
                            </Accordion>


                            <Tabs className="p-1 text-slate-600 rounded-md overflow-x-scroll" variant="fullWidth">
                                <Tabs.Item active title="Eventos" icon={FaIcons.FaCalendarCheck}>
                                    {eventPage.content.length === null ? "Nenhum evento encontrado!" :
                                        <div>
                                            <Pagination pagination={eventPage} onPageChange={handlePageChange} />
                                            <Timeline className="mt-5 ml-2">
                                                {eventPage.content?.map(event => {
                                                    return (
                                                        <>
                                                            <Timeline.Item>
                                                                <Timeline.Point icon={FaIcons.FaCalendarWeek} />
                                                                <Timeline.Content>
                                                                    <Timeline.Time>{event.eventDate ? moment(event.eventDate).format("DD/MM/yyyy") : "Indefinido"}</Timeline.Time>
                                                                    <Timeline.Body>
                                                                        <EventSmCard event={event} />
                                                                    </Timeline.Body>
                                                                </Timeline.Content>
                                                            </Timeline.Item >
                                                        </>
                                                    )
                                                })}
                                            </Timeline>
                                        </div>
                                    }
                                </Tabs.Item>

                                <Tabs.Item title="Categorias" icon={FaIcons.FaTag}>
                                    {categories?.length === null ? "Nenhuma categoria encontrada!" :
                                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-10 gap-x-4 items-start p-4">
                                            {categories?.map(category => (
                                                <div key={category.id} className="flex flex-row items-center py-4 bg-zinc-100 border border-zinc-400 rounded-lg shadow-md transition duration-700 hover:shadow-xl hover:scale-105">
                                                    <Link to={`/categorias/${category.categoryName}`} className="w-full text-center">
                                                        <h5 title={category.categoryName} className="h-8 text-lg font-semibold tracking-tight text-gray-900 overflow-hidden">{category.categoryName}</h5>
                                                    </Link>
                                                    {project?.userId === auth.getUserSession()?.id ?
                                                        <div title="Deletar" className="border-l-2 border-zinc-300 px-2">
                                                            <FaIcons.FaTrash className="cursor-pointer" onClick={() => deleteProjectCategory(category.id)} />
                                                        </div>
                                                        : ""
                                                    }
                                                </div>
                                            ))}
                                        </div>
                                    }
                                </Tabs.Item>

                                <Tabs.Item active title="Postagens" icon={FaIcons.FaNewspaper}>
                                    {postsByProject?.length === null ? "Nenhuma postagem encontrada!" :
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-4">
                                            {postsByProject?.map(post => (
                                                <PostSmCard post={post} />
                                            ))}
                                        </div>
                                    }
                                </Tabs.Item>

                                <Tabs.Item active title="Galeria" icon={FaIcons.FaImage}>
                                    <p className="mb-1 py-10 text-center block font-semibold text-3xl leading-6 text-slate-600">Em Desenvolvimento</p>
                                </Tabs.Item>

                                <Tabs.Item active title="Organização" icon={FaIcons.FaUserGroup}>
                                    <h2 className="text-xl font-semibold">Autor:</h2>
                                    <div className="flex items-center space-x-4 rtl:space-x-reverse py-1 sm:py-2 border-2 border-zinc-300 rounded-md">
                                        <img src={project?.userImage ? project?.userImage : require("assets/img/user_profile.png")} alt="usuário" className="h-20 min-w-20 rounded-full" />
                                        <div title={project?.username} className="inline-flex font-semibold text-gray-900 h-12 overflow-hidden">
                                            {project?.username}
                                        </div>
                                    </div>
                                    <p className="mb-1 py-10 text-center block font-semibold text-3xl leading-6 text-slate-600">Em Desenvolvimento</p>
                                </Tabs.Item>
                            </Tabs>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

