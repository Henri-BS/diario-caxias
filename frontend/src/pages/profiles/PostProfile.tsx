import { PostMockProfile } from "mock/MockProfile";
import { Post } from "resources/post";
import { Accordion, Breadcrumb, Button, Dropdown, Modal } from "flowbite-react";

import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa6";
import { Props } from "resources";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "utils/requests";
import { useAuth } from "resources/auth";
import { PostEditForm, EventPostAddForm } from "pages/forms/PostForm";
import { EventSmCard } from "components/cards/EventCard";
import { Event } from "resources/event";


export function PostProfile() {
    const params = useParams();
    return (
        <>
            <PostDetails params={`${params.postId}`} />
        </>
    );
}


export function PostDetails({ params: postId }: Props) {
    const [post, setPost] = useState<Post>();
    const [events, setEvents] = useState<Event[]>();
    const auth = useAuth();
    const navigate = useNavigate();
    const params = useParams();
    const [edit, setEdit] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [addProject, setAddProject] = useState(false);

    useEffect(() => {
        axios.get(`${baseUrl}/posts/${postId}`)
            .then((response) => {
                setPost(response.data);
            });
    }, [postId]);

    useEffect(() => {
        axios.get(`${baseUrl}/event-post?postId=${postId}`)
            .then((response) => {
                setEvents(response.data);
            });
    }, [postId]);

    const deletePost = () => {
        axios.delete(`${baseUrl}/posts/delete/${postId}`)
            .then((response) => {
                navigate("/postagens");
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
                        <Link to="/postagens">
                            Postagens
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <Link to={`/postagens/${postId}`}>
                            {postId}
                        </Link>
                    </Breadcrumb.Item>
                </Breadcrumb>

                {post?.userId === auth.getUserSession()?.id ?
                    <Dropdown label="Configurações" inline>
                        <Dropdown.Item icon={FaIcons.FaSquarePen} onClick={() => setEdit(true)} className="text-md font-medium">
                            Editar Postagem
                        </Dropdown.Item>
                        <Dropdown.Item icon={FaIcons.FaFolderClosed} onClick={() => setAddProject(true)} className="text-md font-medium">
                            Adicionar Projeto
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
                                Deseja deletar esta postagem?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button color="failure" onClick={() => deletePost()} >
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

            <Modal show={addProject} size="3xl" onClose={() => setAddProject(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <EventPostAddForm params={postId} />
                </Modal.Body>
            </Modal>

            {!post ? <PostMockProfile params={`${params.postId}`} /> :
                <div>
                    {edit ? <PostEditForm params={postId} /> :
                        <div>
                            <div className="relative flex flex-col md:flex-row xl:flex-col items-start">
                                <div className="order-1 sm:ml-6 xl:ml-0">
                                    <h3 className="mb-1 text-slate-900 font-semibold">
                                        <span className="mb-1 text-3xl leading-6 text-indigo-500">{post?.postTitle}</span>
                                    </h3>
                                    <div className="prose prose-slate prose-sm text-slate-600 mt-5">
                                        <p className="flex flex-row items-center text-gray-800 text-lg gap-2"><FaIcons.FaCalendarCheck /> Eventos relacionados: <b>{events?.length}</b></p>
                                        <i>{post?.postSummary}</i>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <img src={post?.postImage ? post?.postImage : "https://cdn1.iconfinder.com/data/icons/dashboard-ui-vol-1/48/JD-46-512.png"} className="mb-6 shadow-md rounded-lg bg-slate-50 w-[60rem] sm:mb-0" alt={post.postTitle} />
                                    <p className="flex gap-2 mt-2 items-center text-center text-sm font-medium text-gray-700">
                                        enviado em: {post?.createdDate}
                                    </p>
                                </div>
                            </div>
                            <p className="mt-5 text-xl text-gray-800 text-justify">{post?.postDescription} </p>
                        </div>
                    }


                    <Accordion collapseAll className="mt-12 ">
                        <Accordion.Panel>
                            <Accordion.Title>
                                <h2 className="flex flex-row items-center gap-x-2 text-xl text-zinc-800 "><FaIcons.FaCalendarCheck />Eventos Relacionados</h2>
                            </Accordion.Title>
                            <Accordion.Content className="p-2">
                                <div className=" grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-6 items-start p-8">
                                    {events?.map(event => (
                                        <>
                                            <div key={event.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start">
                                                <EventSmCard event={event} />
                                            </div>
                                        </>
                                    ))}
                                </div>
                            </Accordion.Content>
                        </Accordion.Panel>
                    </Accordion>
                </div>
            }
        </div>
    );
}