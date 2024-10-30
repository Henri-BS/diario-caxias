'use client'

import axios from "axios";
import { Button, Select, Textarea, TextInput } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCalendarCheck } from "react-icons/fa6";
import {eventFormSchema, EventFormProps, eventValidationSchema} from "@/app/formSchema"
import { FieldError } from "@/components/fieldError";
import { useNotification } from "@/components/notification";
import { Template } from "@/components/template";
import { useFormik } from "formik";
import { AuthenticatedPage } from "@/components/authenticatedPage";
import { useAuth } from "@/resources/auth";
import { Event, useEventService } from "@/resources/event";
import { ProjectPage } from "@/resources/project";

export default function AddFormEvent() {
    const baseUrl = "http://localhost:8080";
    const [loading, setLoading] = useState<boolean>(false);
    const notification = useNotification();
    const service = useEventService();
    const auth = useAuth();
    const userId = auth.getUserSession()?.id;

    const [query, setQuery] = useState("");
    const [projectPage, setProjectPage] = useState<ProjectPage>({ content: [], page: { number: 0, totalElements: 0 } });

    useEffect(() => {
        axios.get(`${baseUrl}/projects?title=${query}`)
            .then((response) => {
                setProjectPage(response.data);
            })
    }, [query]);

    const { values, handleChange, handleSubmit, errors, resetForm } = useFormik<EventFormProps>({
        initialValues: eventFormSchema,
        validationSchema: eventValidationSchema,
        onSubmit: onSubmit
    })

    async function onSubmit(values: EventFormProps) {
        const event: Event = {
            eventTitle: values.title,
            eventDescription: values.description,
            eventImage: values.image,
            eventDate: values.date,
            eventStatus: values.status,
            projectTitle: values.projectTitle,
            userId: userId
        }
        try {
            await service.saveEvent(event);
            notification.notify("Salvo com sucesso!", "success");
            resetForm();
        } catch (error: any) {
            const message = error?.message;
            notification.notify(message, "error");
        }
    }

    return (
        <AuthenticatedPage>
            <Template loading={loading}>
                <section className="flex flex-col items-center my-6">
                    <span className="flex gap-2 mt-3 mb-10 text-2xl font-bold tracking-tight text-gray-900">
                        Adicionar Novo Evento <FaCalendarCheck />
                    </span>
                    <form onSubmit={handleSubmit} className="space-y-2 w-1/2">
                        <div className="grid grid-cols-1">
                            <TextInput type="hidden"
                                id="userId"
                                onChange={handleChange}
                                value={userId}
                            />
                        </div>
                        <div className="grid grid-cols-1">
                            <label className="block text-sm font-medium leading-6 text-gray-700">Título: *</label>
                            <TextInput
                                color="bg-zinc-400"
                                id="title"
                                onChange={handleChange}
                                value={values.title}
                                placeholder="título do evento" />
                            <FieldError error={errors.title} />
                        </div>
                        <div className="grid grid-cols-1">
                            <label className="block text-sm font-medium leading-6 text-gray-700">Projeto Associado: *</label>
                            <TextInput
                                color="bg-zinc-400"
                                id="projectTitle"
                                list="projectList"
                                onChange={handleChange}
                                value={values.projectTitle}
                                placeholder="buscar projeto pelo nome"
                            />
                            <datalist id="projectList">
                                {projectPage.content?.filter((x) =>
                                    x.projectTitle?.toUpperCase().includes(query.toLocaleUpperCase()))
                                    .map((x) =>
                                        <>
                                        <option id="query" key={x.id} value={x.projectTitle}>
                                            {x.projectTitle}
                                        </option>
                                        </>
                                    )
                                }
                            </datalist>
                        </div>
                        <div className="grid grid-cols-1">
                            <label className='block text-sm font-medium leading-6 text-gray-700'>Descrição: *</label>
                            <Textarea
                                color="bg-zinc-400"
                                id="description"
                                onChange={handleChange}
                                value={values.description}
                                placeholder="descrição sobre o evento" />
                            <FieldError error={errors.description} />
                        </div>
                        <div className="grid grid-cols-1">
                            <label className="block text-sm font-medium leading-6 text-gray-700">Data do Evento: *</label>
                            <TextInput
                            color="bg-zinc-400"
                                type="date"
                                id="date"
                                onChange={handleChange}
                                value={values.date}
                            />
                            <FieldError error={errors.date} />
                        </div>
                        <div className="grid grid-cols-1">
                            <label className="block text-sm font-medium leading-6 text-gray-700">Status do Evento: *</label>
                            <Select
                                color="bg-zinc-400"
                                id="status"
                                onChange={handleChange}
                                value={values.status}
                            >
                                <option></option>
                                <option>Indefinido</option>
                                <option>Finalizado</option>
                                <option>Planejando</option>
                                <option>Programado</option>
                                <option>Cancelado</option>
                                <option>Adiado</option>
                            </Select>
                            <FieldError error={errors.status} />
                        </div>
                        <div className="grid grid-cols-1">
                            <label className="block text-sm font-medium leading-6 text-gray-700">Url de Imagem: </label>
                            <TextInput
                                color="bg-zinc-400"
                                id="image"
                                onChange={handleChange}
                                value={values.image}
                                placeholder="ex: http://example-web.com/image.png" />
                        </div>
                        <div className="mt-5 flex items-center justify-end gap-x-4">
                            <Button type="submit" gradientDuoTone="purpleToBlue" >Salvar</Button>
                            <Link href="/eventos">
                                <Button type="button" color="failure" >Cancelar</Button>
                            </Link>
                        </div>
                    </form>
                </section>
            </Template>
        </AuthenticatedPage>
    );
}