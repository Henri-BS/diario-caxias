import { Button, Dropdown, Label, Select, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaCalendarCheck } from "react-icons/fa6";
import { useNotification, FieldError } from "components/shared/Notification";
import { useFormik } from "formik";
import { useAuth } from "resources/auth";
import { Event, useEventService } from "resources/event";
import { ProjectPage } from "resources/project";
import { Login } from "./UserForm";
import * as Yup from "yup";
import { Link, useParams } from "react-router-dom";
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
    title: Yup.string()
        .trim()
        .required("O campo título é obrigatório!")
        .min(3, "O título deve ter no mínimo 3 caracteres!")
        .max(100, "O título deve ter no máximo 100 caracteres!"),
    description: Yup.string()
        .trim()
        .required("O campo de descrição é obrigatório!"),
    date: Yup.string().trim().required("O campo de data é obrigatório!"),
    status: Yup.string().trim().required("O campo de status é obrigatório!"),
});

export function EventAddForm() {
    const notification = useNotification();
    const eventService = useEventService();
    const auth = useAuth();
    const userId = auth.getUserSession()?.id;

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
            await eventService.saveEvent(event);
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
                <div className="flex flex-col items-center my-6">
                    <span className="flex gap-2 mt-3 mb-10 text-2xl font-bold tracking-tight text-gray-900">
                        Adicionar Novo Evento <FaCalendarCheck />
                    </span>
                    <form onSubmit={onSubmit} className="space-y-2 w-1/2 ">
                        <div>
                            <TextInput type="hidden"
                                id="userId"
                                onChange={handleChange}
                                value={userId}
                            />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium leading-6 text-gray-700" value="Título: *"/>
                            <TextInput
                                color="bg-zinc-400"
                                id="eventTitle"
                                onChange={handleChange}
                                value={values.eventTitle}
                                />
                            <FieldError error={errors.eventTitle} />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium leading-6 text-gray-700" value="Projeto Associado: *"/>
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
                            <Label className="block text-sm font-medium leading-6 text-gray-700" value="Status do Evento: *"/>
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
                            <Button type="button" href={`/eventos`}  color="failure" >Cancelar</Button>
                        </div>
                    </form>
                </div>
            }
        </>
    );
}

export function EventEditProfile() {
    const params = useParams();
    return (
        <>
            <EventEditForm params={`${params.eventId}`} />
        </>
    );
}

export function EventEditForm({ params: eventId }: Props) {
    const notification = useNotification();
    const auth = useAuth();
    const userId = auth.getUserSession()?.id;

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
            eventTitle: values.eventTitle,
            eventDescription: values.eventDescription,
            eventImage: values.eventImage,
            eventDate: values.eventDate,
            eventStatus: values.eventStatus,
            projectTitle: values.projectTitle,
            userId: userId
        }
        try {
            axios.put(`${baseUrl}/events/update`, eventValues)
                .then((response) => {
                    console.log(response.data);
                });
                console.log(eventValues);
            notification.notify("Salvo com sucesso!", "success");
        } catch (error: any) {
            const message = error?.message;
            notification.notify(message, "error");
        }
    }

    return (
        <>
                <div className="flex flex-col items-center my-6">
                    <span className="flex items-center gap-2 mt-3 mb-10 text-2xl font-bold tracking-tight text-gray-900">
                    Editar Evento <FaCalendarCheck />
                    </span>   
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
                            <Button type="button" href={`/eventos/${eventId}`}  color="failure" >Cancelar</Button>
                        </div>
                    </form>
                </div>
        </>
    );
}