'use client'

import { ProjectFormProps, projectFormSchema, projectValidationSchema } from "@/app/formSchema";
import { AuthenticatedPage, FieldError, useNotification, Template } from "@/components";
import { useAuth } from "@/resources/auth";
import { Project, useProjectService } from "@/resources/project";
import { Button, Textarea, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { FaFolderClosed } from "react-icons/fa6";


export default function AddFormProject() {

    const [loading, setLoading] = useState<boolean>(false);
    const notification = useNotification();
    const service = useProjectService();
    const auth = useAuth();
    const userId = auth.getUserSession()?.id;


    const { values, handleChange, handleSubmit, errors, resetForm } = useFormik<ProjectFormProps>({
        initialValues: projectFormSchema,
        validationSchema: projectValidationSchema,
        onSubmit: onSubmit
    })


    async function onSubmit(values: ProjectFormProps) {
        const project: Project = { projectTitle: values.title, projectDescription: values.description, projectImage: values.image, userId: userId}
        try {
            await service.saveProject(project);
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
                <section className="flex flex-col items-center justify-center my-5">
                    <span className="flex gap-2 mt-3 mb-10 text-2xl font-bold tracking-tight text-gray-900">
                        Adicionar Novo Projeto <FaFolderClosed />
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
                                placeholder="título do projeto" />
                            <FieldError error={errors.title} />
                        </div>
                        <div className="mt-5 grid grid-cols-1">
                            <label className='block text-sm font-medium leading-6 text-gray-700'>Descrição: </label>
                            <Textarea
                                color="bg-zinc-400"
                                id="description"
                                onChange={handleChange}
                                value={values.description}
                                placeholder="descrição sobre o projeto" />
                            <FieldError error={errors.description} />
                        </div>
                        <div className="mt-5 grid grid-cols-1">
                            <label className="block text-sm font-medium leading-6 text-gray-700">Url de Imagem: </label>
                            <TextInput
                                color="bg-zinc-400"
                                id="image"
                                onChange={handleChange}
                                value={values.image}
                                placeholder="http://example-web.com/image.png" />
                        </div>
                        <div className="mt-5 flex items-center justify-end gap-x-4">
                            <Button type="submit" gradientDuoTone="purpleToBlue" >Salvar</Button>
                            <Link href="/projetos">
                                <Button type="button" color="failure" >Cancelar</Button>
                            </Link>
                        </div>
                    </form>
                </section>
            </Template>
        </AuthenticatedPage>
    );
}