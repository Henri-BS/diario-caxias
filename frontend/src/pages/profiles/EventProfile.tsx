import axios from "axios";
import { PostSmCard } from "components/cards/PostCard";
import { UserCard } from "components/cards/UserCards";
import { Pagination } from "components/shared/Pagination";
import { CustomMarkdown } from "components/shared/Template";
import { Breadcrumb, Button, Dropdown, Modal, Tabs } from "flowbite-react";
import { EventMockProfile } from "mock/MockProfile";
import moment from "moment";
import { EventEditForm } from "pages/forms/EventForm";
import { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa6";
import * as GoIcons from "react-icons/go";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Props } from "resources";
import { useAuth } from "resources/auth";
import { Event } from "resources/event";
import { Post } from "resources/post";
import { UserPage } from "resources/user";
import { baseUrl } from "utils/requests";


export function EventProfile() {
    const params = useParams();
    return (
        <>
            <EventDetails params={`${params.eventId}`} />
        </>
    );
}

export function EventDetails({ params: eventId }: Props) {
    const [event, setEvent] = useState<Event>();
    const [userPage, setUserPage] = useState<UserPage>({ content: [], page: { number: 0, totalElements: 0 } });
    const [posts, setPosts] = useState<Post[]>();
    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber);
    }
    const auth = useAuth();
    const params = useParams();
    const [edit, setEdit] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${baseUrl}/events/${eventId}`)
            .then((response) => {
                setEvent(response.data);
            })
    }, [eventId]);

    useEffect(() => {
        axios.get(`${baseUrl}/event-user?eventId=${eventId}&page=${pageNumber}&size=9`)
            .then((response) => {
                setUserPage(response.data);
            })
        axios.get(`${baseUrl}/event-post?eventId=${eventId}&page=${pageNumber}&size=8`)
            .then((response) => {
                setPosts(response.data);
            });
    }, [eventId, pageNumber]);

    const deleteEvent = () => {
        axios.delete(`${baseUrl}/events/delete/${eventId}`)
            .then((response) => {
                navigate("/eventos");
                return response.status
            })
    }

    return (
        <div className="mt-10">
            <div className="flex flex-col md:flex-row justify-between py-4 text-lg font-semibold text-gray-700">

                <Breadcrumb aria-label="breadcrumb" className="mb-3 py-2">
                    <Breadcrumb.Item icon={FaIcons.FaHouse}>
                        <Link to="/">
                            Início
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/eventos">
                            Eventos
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <Link to={`/eventos/${eventId}`}>
                            {eventId}
                        </Link>
                    </Breadcrumb.Item>
                </Breadcrumb>

                {event?.userId === auth.getUserSession()?.id ?
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
                                Deseja deletar este evento?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button color="failure" onClick={() => deleteEvent()} >
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
            {!event ? <EventMockProfile params={`${params.eventId}`} /> :
                <div>
                    {edit ? <EventEditForm params={eventId} /> :
                        <div>
                            <div className="relative flex flex-col sm:flex-row xl:flex-col items-start">
                                <div className="order-1 sm:ml-6 xl:ml-0">
                                    <h3 className="mb-1 text-slate-900 font-semibold">
                                        <span className="mb-1 block text-2xl leading-6 text-cyan-600">{event?.eventTitle}</span>
                                    </h3>
                                    <div>
                                        <p className="flex gap-2 items-center text-center text-lg font-semibold text-gray-700">
                                            <GoIcons.GoFileDirectory /> Projeto: <Link to={`/projetos/${event.projectId}`} className="hover:underline"> {event?.projectTitle}</Link>
                                        </p>
                                        <p className="flex gap-2 items-center text-center text-lg font-semibold text-gray-700">
                                            <GoIcons.GoCalendar /> Data do evento: {event.eventDate ? moment(event?.eventDate).format("DD/MM/yyyy") : "Indefinido"}
                                        </p>
                                        <p className="flex gap-2 items-center text-center text-lg font-semibold text-gray-700">
                                            <GoIcons.GoChecklist /> Status: {event?.eventStatus ?? "Indefinido"}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <img src={event?.eventImage ? event.eventImage : require("assets/img/image.png")} className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full" width="1216" height="640" alt={event.eventTitle} />
                                    <p className="flex gap-2 mt-2 items-center text-center text-sm font-medium text-gray-700">
                                        enviado em: {event?.createdDate}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 text-xl text-zinc-800 text-justify">
                                <CustomMarkdown item={event?.eventDescription} />
                            </div>
                            <Tabs className="mt-4 text-zinc-500 p-1 rounded-md overflow-scroll" variant="fullWidth">
                                <Tabs.Item active title="Postagens" icon={FaIcons.FaNewspaper}>
                                    <div className=" grid grid-cols-1 gap-y-6 gap-x-4 items-start p-8 divide-y divide-gray-300">
                                        {posts?.map((post) => (
                                            <>
                                                <PostSmCard post={post} />
                                            </>
                                        ))}
                                    </div>

                                </Tabs.Item>

                                <Tabs.Item title="Participantes" icon={FaIcons.FaUsersRectangle}>
                                    <Pagination pagination={userPage} onPageChange={handlePageChange} />
                                    <div className="  grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
                                        {userPage.content?.map(user => (
                                            <div key={user?.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                                                <UserCard user={user} />
                                            </div>
                                        ))}
                                    </div>
                                </Tabs.Item>
                                <Tabs.Item title="Programação" icon={FaIcons.FaClipboardList}>
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
