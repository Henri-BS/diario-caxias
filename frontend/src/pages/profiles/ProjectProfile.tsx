import { CategoryCard } from "components/cards/CategoryCard";
import { PostCard } from "components/cards/PostCard";
import { Pagination } from "components/shared/Pagination";
import { ProjectMockProfile } from "mock/MockProfile";
import { CategoryPage } from "resources/category";
import { EventPage } from "resources/event";
import { PostPage } from "resources/post";
import { ItemDetails, Project } from "resources/project";
import { Accordion, Breadcrumb, Button, Dropdown, List, Modal, Tabs, Timeline } from "flowbite-react";

import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa6";
import { Props } from "resources";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "utils/requests";
import { useAuth } from "resources/auth";
import { ItemAddForm, ProjectEditForm } from "pages/forms/ProjectForm";
import Markdown from "react-markdown";
import moment from "moment";

export function ProjectProfile() {
    const params = useParams();
    return (
        <>
            <ProjectDetails params={`${params.projectId}`} />
        </>
    );

    function ProjectDetails({ params: projectId }: Props) {
        const auth = useAuth();
        const [edit, setEdit] = useState<boolean>(false);
        const [addItem, setAddItem] = useState<boolean>(false);
        const [deleteModal, setDeleteModal] = useState(false);
        const navigate = useNavigate();
        const params = useParams();
        const [project, setProject] = useState<Project>();
        const [pageNumber, setPageNumber] = useState(0);
        const handlePageChange = (newPageNumber: number) => {
            setPageNumber(newPageNumber)
        }
        const [items, setItems] = useState<ItemDetails[]>();
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
            axios.get(`${baseUrl}/project-category?projectId=${projectId}&page=${pageNumber}&size=${categoryPage.page.totalElements}`)
                .then((response) => {
                    setCategoryPage(response.data);
                });
            axios.get(`${baseUrl}/project-post?projectId=${projectId}&page=${pageNumber}&size=9`)
                .then((response) => {
                    setPostPage(response.data);
                });
            axios.get(`${baseUrl}/projects/items/${projectId}`)
                .then((response) => {
                    setItems(response.data);
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
            <div className="mt-10">
                <div className="flex flex-col md:flex-row justify-between  text-lg font-semibold text-gray-700">
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
                            <Dropdown.Item icon={FaIcons.FaCircleInfo} onClick={() => setAddItem(true)} className="text-md font-medium">
                                Adicionar Informação
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
                                        <span onClick={() => setDeleteModal(false)}>{"Deletar"}</span>
                                    </Button>
                                    <Button color="gray" onClick={() => setDeleteModal(false)}>
                                        Cancelar
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>

                    <Modal show={addItem} size="3xl" onClose={() => setAddItem(false)} popup>
                        <Modal.Header />
                        <Modal.Body>
                            <ItemAddForm params={projectId}/>
                        </Modal.Body>
                    </Modal>
                </div>
                {!project ? <ProjectMockProfile params={`${params.projectId}`} /> :
                    <div>
                        {edit ? <ProjectEditForm params={projectId} /> :
                            <div>
                                <div className="relative flex flex-col sm:flex-row xl:flex-col items-start">
                                    <div className="order-1 sm:ml-6 xl:ml-0">
                                        <h1 className="mb-1 block text-3xl font-semibold leading-6 text-indigo-500">{project?.projectTitle}</h1>
                                        <div className="prose prose-slate prose-sm text-slate-600 mt-5">
                                            <p className="flex flex-row items-center text-gray-700 text-lg gap-2"><FaIcons.FaTag /> Categorias relacionados: <b>{categoryPage.page.totalElements}</b></p>
                                            <p className="flex flex-row items-center text-gray-700 text-lg gap-2"><FaIcons.FaCalendarCheck /> Eventos relacionados: <b>{eventPage.page.totalElements}</b></p>
                                            <p className="flex flex-row items-center text-gray-700 text-lg gap-2"><FaIcons.FaNewspaper /> Postagens relacionados: <b>{postPage.page.totalElements}</b></p>
                                        </div>
                                    </div>
                                    <img src={project?.projectImage ? project.projectImage : "https://cdn1.iconfinder.com/data/icons/dashboard-ui-vol-1/48/JD-46-512.png"} className="mb-6 shadow-md rounded-lg bg-slate-50 w-[22rem] sm:mb-0" alt={project.projectTitle} />
                                </div>

                                <Accordion className="mt-8">
                                    <Accordion.Panel>
                                        <Accordion.Title>
                                            <h2 className="flex flex-row  items-center gap-2 text-xl text-zinc-800 "><FaIcons.FaCircleInfo />Informações Gerais</h2>
                                        </Accordion.Title>
                                        <Accordion.Content className="p-2">

                                            <List unstyled className=" py-4 px-10 justify-center">
                                                {items?.filter((item) => (
                                                    item.itemType?.includes(item.itemType)
                                                )).map((item) => {
                                                    return (
                                                        <>
                                                            <List.Item className=" text-dark divide-x divide-slate-600">
                                                                <h2 className="font-semibold text-xl text-slate-700">{item.itemType}</h2>
                                                                <List unstyled nested>
                                                                    <List.Item className="text-slate-700"><Markdown>{item.itemDescription}</Markdown></List.Item>
                                                                </List>
                                                            </List.Item>
                                                        </>
                                                    )
                                                })}
                                            </List>
                                        </Accordion.Content>
                                    </Accordion.Panel>
                                </Accordion>

                                <p className="mt-5 text-xl text-justify px-10">
                                    <Markdown>{project?.projectDescription}</Markdown>
                                </p>

                                <Tabs className="mt-4 text-zinc-500 p-1 rounded-md overflow-scroll" variant="fullWidth">
                                    <Tabs.Item active title="Eventos" icon={FaIcons.FaCalendarCheck}>
                                        <Pagination pagination={eventPage} onPageChange={handlePageChange} />
                                        <Timeline className="mt-5 mx-2">
                                            {eventPage.content?.map(event => {
                                                return (
                                                    <>
                                                        <Timeline.Item>
                                                            <Timeline.Point icon={FaIcons.FaCalendarWeek} />
                                                            <Timeline.Content>
                                                                <Timeline.Time>{moment(event.eventDate).format("DD/MM/yyyy")}</Timeline.Time>
                                                                <Timeline.Body>
                                                                    <Link to={`/eventos/${event.id}`}>
                                                                        <div className="flex items-center space-x-4 rtl:space-x-reverse py-1 sm:py-2 hover:bg-zinc-100 transition duration-500 hover:shadow-lg rounded-md">
                                                                            <img src={event.eventImage} alt="postagem" className="h-24 w-24 rounded-md" />
                                                                            <div title={event.eventTitle} className="inline-flex font-semibold text-gray-900 h-12 overflow-hidden">
                                                                                {event.eventTitle}
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                </Timeline.Body>
                                                            </Timeline.Content>
                                                        </Timeline.Item >
                                                    </>
                                                )
                                            })}
                                        </Timeline>
                                    </Tabs.Item>
                                    <Tabs.Item title="Categorias" icon={FaIcons.FaTag}>
                                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-4 items-start p-4">
                                            {categoryPage.content?.map(category => (
                                                <div key={category.id} >
                                                    <CategoryCard category={category} />
                                                </div>
                                            ))}
                                        </div>
                                    </Tabs.Item>
                                    <Tabs.Item active title="Postagens" icon={FaIcons.FaNewspaper}>
                                        <Pagination pagination={postPage} onPageChange={handlePageChange} />
                                        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
                                            {postPage.content?.map(post => (
                                                <Link to={`/postagens/${post.id}`} key={post.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start">
                                                    <PostCard post={post} />
                                                </Link>
                                            ))}
                                        </div>
                                    </Tabs.Item>
                                    <Tabs.Item active title="Galeria" icon={FaIcons.FaImage}>
                                        <p className="mb-1 py-10 text-center block font-semibold text-3xl leading-6 text-slate-600">Em Desenvolvimento</p>
                                    </Tabs.Item>
                                    <Tabs.Item active title="Organização" icon={FaIcons.FaUserGroup}>
                                        <p className="mb-1 py-10 text-center block font-semibold text-3xl leading-6 text-slate-600">Em Desenvolvimento</p>
                                    </Tabs.Item>
                                </Tabs>
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }
}

