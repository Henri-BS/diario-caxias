import axios from "axios";
import { PostSmCard } from "components/cards/PostCard";
import { UserCard } from "components/cards/UserCards";
import { Pagination } from "components/shared/Pagination";
import { CustomMarkdown } from "components/shared/Template";
import { Breadcrumb, Button, Dropdown, Modal, Tabs } from "flowbite-react";
import moment from "moment";
import { EventEditForm, EventUserAddForm } from "pages/forms/EventForm";
import { Login } from "pages/forms/UserForm";
import { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa6";
import * as GoIcons from "react-icons/go";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Props } from "resources";
import { useAuth } from "resources/auth";
import { Event, EventUser } from "resources/event";
import { Post } from "resources/post";
import { baseUrl } from "utils/requests";


export function EventProfile() {
    const params = useParams();

    return (
        <EventDetails params={`${params.eventId}`} />
    );

    function EventDetails({ params: eventId }: Props) {
        const auth = useAuth();
        const navigate = useNavigate();
        const [event, setEvent] = useState<Event>();
        const [posts, setPosts] = useState<Post[]>();
        const [users, setUsers] = useState<EventUser[]>();
        const [addUser, setAddUser] = useState(false);
        const [edit, setEdit] = useState(false);
        const [deleteModal, setDeleteModal] = useState(false);

        useEffect(() => {
            axios.get(`${baseUrl}/events/${eventId}`)
                .then((response) => {
                    setEvent(response.data);
                });
        }, [eventId]);

        useEffect(() => {
            axios.get(`${baseUrl}/event-user?eventId=${eventId}`)
                .then((response) => {
                    setUsers(response.data);
                });
            axios.get(`${baseUrl}/event-post?eventId=${eventId}`)
                .then((response) => {
                    setPosts(response.data);
                });
        }, [eventId]);

        const deleteEvent = () => {
            axios.delete(`${baseUrl}/events/delete/${eventId}`)
                .then((response) => {
                    navigate("/eventos");
                    return response.status
                })
        }

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
                                            <GoIcons.GoFileDirectory /> Projeto: <Link to={`/projetos/${event?.projectId}`} className="hover:underline"> {event?.projectTitle}</Link>
                                        </p>
                                        <p className="flex gap-2 items-center text-center text-lg font-semibold text-gray-700">
                                            <GoIcons.GoCalendar /> Data do evento: {event?.eventDate ? moment(event?.eventDate).format("DD/MM/yyyy") : "Indefinido"}
                                        </p>
                                        <p className="flex gap-2 items-center text-center text-lg font-semibold text-gray-700">
                                            <GoIcons.GoChecklist /> Status: {event?.eventStatus ?? "Indefinido"}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <img src={event?.eventImage ? event.eventImage : require("assets/img/image.png")} className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full" width="1216" height="640" alt={event?.eventTitle} />
                                    <p className="flex gap-2 mt-2 items-center text-center text-sm font-medium text-gray-700">
                                        enviado em: {event?.createdDate}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 text-xl text-zinc-800 text-justify">
                                <CustomMarkdown item={event?.eventDescription} />
                            </div>
                            <Tabs className="mt-4 text-zinc-500 p-1 rounded-md overflow-scroll" variant="fullWidth">

                                <Tabs.Item title="Participantes" icon={FaIcons.FaUsersRectangle}>

                                    <Button onClick={() => setAddUser(true)} className="text-md font-medium flex space-x-2 items-center" color="gray" gradientDuoTone="purpleToBlue">
                                        <FaIcons.FaUser className="mr-2 h-5 w-5" /> Participar
                                    </Button>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-4 mt-5">
                                        {users?.map((user) => (
                                            <div key={user?.userId} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                                                <UserCard user={{
                                                    id: user.userId,
                                                    username: user.username,
                                                    userImage: user.userImage,
                                                }} />
                                            </div>
                                        ))}
                                    </div>

                                    <Modal show={addUser} size="3xl" onClose={() => setAddUser(false)} popup>
                                        <Modal.Header />
                                        <Modal.Body>
                                            {!auth.isSessionValid() ? <Login /> :
                                                <div className="text-center">
                                                    <FaIcons.FaUserGroup className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200 border-4 p-2  rounded-full" />
                                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                                        Deseja participar deste evento?
                                                    </h3>
                                                    <div className="flex justify-center items-center gap-x-4">
                                                        <EventUserAddForm params={eventId} />
                                                        <Button color="gray" onClick={() => setAddUser(false)}>
                                                            Cancelar
                                                        </Button>
                                                    </div>
                                                </div>
                                            }
                                        </Modal.Body>
                                    </Modal>
                                </Tabs.Item>

                                <Tabs.Item title="Postagens" icon={FaIcons.FaNewspaper}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-4">
                                        {posts?.map((post) => (
                                            <>
                                                <PostSmCard post={post} />
                                            </>
                                        ))}
                                    </div>
                                </Tabs.Item>

                                <Tabs.Item title="Galeria" icon={FaIcons.FaImage}>
                                    <p className="mb-1 py-10 text-center block font-semibold text-3xl leading-6 text-slate-600">Em Desenvolvimento</p>
                                </Tabs.Item>

                                <Tabs.Item title="Programação" icon={FaIcons.FaClipboardList}>
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

