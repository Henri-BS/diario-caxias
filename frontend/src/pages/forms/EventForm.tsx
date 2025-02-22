import { Breadcrumb, Button, Label, Select, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaCalendarCheck, FaHouse, FaX } from "react-icons/fa6";
import { useNotification, FieldError } from "components/shared/Notification";
import { useFormik } from "formik";
import { useAuth } from "resources/auth";
import { Event } from "resources/event";
import { ProjectPage } from "resources/project";
import { Login } from "./UserForm";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "utils/requests";
import { Props } from "resources";

export interface EventFormProps {
    id?: number;
    eventTitle?: string;
    eventDescription?: string;
    eventImage?: string;
    eventDate?: string;
    eventStatus?: string;
    projectTitle?: string;
    userId?: number;
}

export const eventFormSchema: EventFormProps = {
    eventTitle: "",
    eventDescription: "",
    eventImage: "",
    eventDate: "",
    eventStatus: "",
    projectTitle: "",
    userId: 0,
};

export const eventValidationSchema = Yup.object().shape({
    eventTitle: Yup.string()
        .trim()
        .required("O campo título é obrigatório!")
        .min(3, "O título deve ter no mínimo 3 caracteres!")
        .max(100, "O título deve ter no máximo 100 caracteres!"),
    eventDescription: Yup.string()
        .trim()
        .required("O campo de descrição é obrigatório!"),
    eventDate: Yup.string().trim().required("O campo de data é obrigatório!"),
    eventStatus: Yup.string().trim().required("O campo de status é obrigatório!"),
});

export function EventAddForm() {
    const notification = useNotification();
    const auth = useAuth();
    const userId = auth.getUserSession()?.id;
    const navigate = useNavigate();
    const query = "";
    const [projectPage, setProjectPage] = useState<ProjectPage>({ content: [], page: { number: 0, totalElements: 0 } });

    useEffect(() => {
        axios.get(`${baseUrl}/projects?query=${query}&size=20`)
            .then((response) => {
                setProjectPage(response.data);
            })
    }, [query]);

    const { values, handleChange, errors, resetForm } = useFormik<EventFormProps>({
        initialValues: eventFormSchema,
        validationSchema: eventValidationSchema,
        onSubmit: onSubmit
    })

    async function onSubmit() {
        const event: Event = {
            eventTitle: values.eventTitle,
            eventDescription: values.eventDescription,
            eventImage: values.eventImage,
            eventDate: values.eventDate,
            eventStatus: values.eventStatus,
            projectTitle: values.projectTitle,
            userId: userId
        }
        try {
            axios.post(`${baseUrl}/events/save`, event)
                .then((response) => {
                    navigate(`/eventos/${event.id}`)
                    return response.status;
                });
            notification.notify("Salvo com sucesso!", "success");
            resetForm();
        } catch (error: any) {
            const message = error?.message;
            notification.notify(message, "error");
        }
    }

    return (
        <>
            {!auth.isSessionValid() ? <Login /> :
                <div className="mt-10">
                    <Breadcrumb aria-label="breadcrumb" className="mb-3 py-2">
                        <Breadcrumb.Item icon={FaHouse}>
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
                            <Link to="/eventos/adicionar">
                                Adicionar Evento
                            </Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <div className="flex flex-col items-center">
                        <div className="flex flex-row justify-between items-center text-xl font-semibold tracking-tight text-gray-700 mb-3 w-2/3">
                            <span className="flex flex-row items-center gap-2"><FaCalendarCheck /> Adicionar Evento</span>
                            <Link to={"/"}>
                                <FaX className="hover:shadow-xl cursor-pointer rounded-full  p-1 border hover:bg-gray-300  text-2xl" />
                            </Link>
                        </div>
                        <form onSubmit={onSubmit} className="space-y-2 w-2/3 ">
                            <div>
                                <TextInput type="hidden"
                                    id="userId"
                                    onChange={handleChange}
                                    value={userId}
                                />
                            </div>
                            <div>
                                <Label className="block text-sm font-medium leading-6 text-gray-700" value="Título: *" />
                                <TextInput
                                    color="bg-zinc-400"
                                    id="eventTitle"
                                    onChange={handleChange}
                                    value={values.eventTitle}
                                />
                                <FieldError error={errors.eventTitle} />
                            </div>
                            <div>
                                <Label className="block text-sm font-medium leading-6 text-gray-700" value="Projeto Associado: *" />
                                <TextInput
                                    color="bg-zinc-400"
                                    id="projectTitle"
                                    list="projectList"
                                    onChange={handleChange}
                                    value={values.projectTitle}
                                />
                                <datalist id="projectList">
                                    {projectPage.content?.filter((post) =>
                                        post.projectTitle?.toUpperCase().includes(query.toLocaleUpperCase()))
                                        .map((project) =>
                                            <>
                                                <option id="query" key={project.id} value={project.projectTitle}>
                                                    {project.projectTitle}
                                                </option>
                                            </>
                                        )
                                    }
                                </datalist>
                            </div>
                            <div>
                                <Label className='block text-sm font-medium leading-6 text-gray-700' value="Descrição: *" />
                                <Textarea
                                    color="bg-zinc-400"
                                    id="eventDescription"
                                    onChange={handleChange}
                                    value={values.eventDescription}
                                />
                                <FieldError error={errors.eventDescription} />
                            </div>
                            <div>
                                <Label className="block text-sm font-medium leading-6 text-gray-700" value="Data do Evento: *" />
                                <TextInput
                                    type="date"
                                    color="bg-zinc-400"
                                    id="eventDate"
                                    onChange={handleChange}
                                    value={values.eventDate}
                                />
                                <FieldError error={errors.eventDate} />
                            </div>
                            <div>
                                <Label className="block text-sm font-medium leading-6 text-gray-700" value="Status do Evento: *" />
                                <Select
                                    color="bg-zinc-400"
                                    id="eventStatus"
                                    onChange={handleChange}
                                    value={values.eventStatus}
                                >
                                    <option></option>
                                    <option>Indefinido</option>
                                    <option>Finalizado</option>
                                    <option>Planejando</option>
                                    <option>Programado</option>
                                    <option>Cancelado</option>
                                    <option>Adiado</option>
                                </Select>
                                <FieldError error={errors.eventStatus} />
                            </div>
                            <div>
                                <Label className="block text-sm font-medium leading-6 text-gray-700" value="Url de Imagem:" />
                                <TextInput
                                    color="bg-zinc-400"
                                    id="eventImage"
                                    onChange={handleChange}
                                    value={values.eventImage}
                                />
                            </div>
                            <div className="mt-5 flex items-center justify-end gap-x-4">
                                <Button type="submit" gradientDuoTone="purpleToBlue" >Salvar</Button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    );
}


export function EventEditForm({ params: eventId }: Props) {
    const notification = useNotification();
    const auth = useAuth();
    const userId = auth.getUserSession()?.id;
    const navigate = useNavigate();

    const query = "";
    const [projectPage, setProjectPage] = useState<ProjectPage>({ content: [], page: { number: 0, totalElements: 0 } });

    useEffect(() => {
        axios.get(`${baseUrl}/projects?query=${query}&size=20`)
            .then((response) => {
                setProjectPage(response.data);
            })
    }, [query]);

    const [event, setEvent] = useState<Event>();
    useEffect(() => {
        axios.get(`${baseUrl}/events/${eventId}`)
            .then((response) => {
                setEvent(response.data);
            });
    }, [eventId]);

    const { values, handleChange, errors } = useFormik<EventFormProps>({
        initialValues: {
            id: eventId,
            eventTitle: event?.eventTitle,
            eventDescription: event?.eventDescription,
            eventImage: event?.eventImage,
            eventDate: event?.eventDate,
            eventStatus: event?.eventStatus,
            projectTitle: event?.projectTitle,
            userId: userId
        },
        validationSchema: eventValidationSchema,
        onSubmit: onSubmit
    })

    async function onSubmit() {
        const eventValues: Event = {
            id: eventId,
            eventTitle: values.eventTitle ?? event?.eventTitle,
            eventDescription: values.eventDescription ?? event?.eventDescription,
            eventImage: values.eventImage ?? event?.eventImage,
            eventDate: values.eventDate ?? event?.eventDate,
            eventStatus: values.eventStatus ?? event?.eventStatus,
            projectTitle: values.projectTitle ?? event?.projectTitle,
            userId: userId
        }
        try {
            axios.put(`${baseUrl}/events/update`, eventValues)
                .then((response) => {
                    navigate(0)
                    return response.status;
                });
            notification.notify("Salvo com sucesso!", "success");
        } catch (error: any) {
            const message = error?.message;
            notification.notify(message, "error");
        }
    }

    return (
        <>
            <div className="flex flex-col items-center my-6 ">
                <div className="flex flex-row justify-between items-center text-xl font-semibold tracking-tight text-gray-700 mb-3 w-2/3">
                    <span className="flex flex-row items-center gap-2"><FaCalendarCheck /> Editar Evento </span>
                    <FaX onClick={() => navigate(0)} className="hover:shadow-xl cursor-pointer rounded-full  p-1 border hover:bg-gray-300  text-2xl" />
                </div>
                <form onSubmit={onSubmit} className="space-y-2 w-2/3">
                    <div>
                        <TextInput
                            type="hidden"
                            id="id"
                            onChange={handleChange}
                            value={eventId}
                        />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium leading-6 text-gray-700" value="Título: *" />
                        <TextInput
                            color="bg-zinc-400"
                            id="eventTitle"
                            onChange={handleChange}
                            value={values.eventTitle}
                        />
                        <FieldError error={errors.eventTitle} />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium leading-6 text-gray-700" value="Projeto Associado: *" />
                        <TextInput
                            color="bg-zinc-400"
                            id="projectTitle"
                            list="projectList"
                            onChange={handleChange}
                            value={values.projectTitle}
                        />
                        <datalist id="projectList">
                            {projectPage.content?.filter((post) =>
                                post.projectTitle?.toUpperCase().includes(query.toLocaleUpperCase()))
                                .map((project) =>
                                    <>
                                        <option id="query" key={project.id} value={project.projectTitle}>
                                            {project.projectTitle}
                                        </option>
                                    </>
                                )
                            }
                        </datalist>
                    </div>
                    <div>
                        <Label className="block text-sm font-medium leading-6 text-gray-700" value="Descrição: *" />
                        <Textarea
                            color="bg-zinc-400"
                            id="eventDescription"
                            onChange={handleChange}
                            value={values.eventDescription}
                        />
                        <FieldError error={errors.eventDescription} />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium leading-6 text-gray-700" value="Data do Evento: *" />
                        <TextInput
                            type="date"
                            color="bg-zinc-400"
                            id="eventDate"
                            onChange={handleChange}
                            value={values.eventDate}
                        />
                        <FieldError error={errors.eventDate} />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium leading-6 text-gray-700" value="Status do Evento: *" />
                        <Select
                            color="bg-zinc-400"
                            id="eventStatus"
                            onChange={handleChange}
                            value={values.eventStatus}
                        >
                            <option></option>
                            <option>Indefinido</option>
                            <option>Finalizado</option>
                            <option>Planejando</option>
                            <option>Programado</option>
                            <option>Cancelado</option>
                            <option>Adiado</option>
                        </Select>
                        <FieldError error={errors.eventStatus} />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium leading-6 text-gray-700" value="Url de Imagem:" />
                        <TextInput
                            color="bg-zinc-400"
                            id="eventImage"
                            onChange={handleChange}
                            value={values.eventImage}
                        />
                    </div>
                    <div className="mt-5 flex items-center justify-end gap-x-4">
                        <Button type="submit" gradientDuoTone="purpleToBlue" >Salvar</Button>
                    </div>
                </form>
            </div>
        </>
    );
}