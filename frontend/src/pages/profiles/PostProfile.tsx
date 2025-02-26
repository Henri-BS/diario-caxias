import { ProjectCard } from "components/cards/ProjectCard";
import { Pagination } from "components/shared/Pagination";
import { PostMockProfile } from "mock/MockProfile";
import { Post } from "resources/post";
import { ProjectPage } from "resources/project";
import { Accordion, Breadcrumb, Button, Dropdown, Modal } from "flowbite-react";

import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa6";
import { Props } from "resources";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "utils/requests";
import { useAuth } from "resources/auth";
import { PostEditForm } from "pages/forms/PostForm";


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
    const [projectPage, setProjectPage] = useState<ProjectPage>({ content: [], page: { number: 0, totalElements: 0 } });
    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber)
    }
    const auth = useAuth();
    const navigate = useNavigate();
    const params = useParams();
    const [edit, setEdit] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState(false);

    useEffect(() => {
        axios.get(`${baseUrl}/posts/${postId}`)
            .then((response) => {
                setPost(response.data);
            });
    }, [postId]);

    useEffect(() => {
        axios.get(`${baseUrl}/project-post?postId=${postId}&page=${pageNumber}&size=8`)
            .then((response) => {
                setProjectPage(response.data);
            });
    }, [postId, pageNumber]);

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
                                        <p className="flex flex-row items-center text-gray-800 text-lg gap-2"><FaIcons.FaFolderClosed /> Projetos relacionados: <b>{projectPage.page.totalElements}</b></p>
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
                                <h2 className="flex flex-row gap-2 mt-5 text-2xl text-zinc-800 "><FaIcons.FaFolderClosed />Projetos Relacionados</h2>
                            </Accordion.Title>
                            <Accordion.Content className="p-2">
                                <div className="flex items-center w-full justify-center mt-12">
                                    <Pagination pagination={projectPage} onPageChange={handlePageChange} />
                                </div>
                                <div className=" grid grid-cols-1 gap-y-10 gap-x-6 items-start p-8">
                                    {projectPage.content?.map(project => (
                                        <div key={project.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start">
                                            <ProjectCard project={project} />
                                        </div>
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