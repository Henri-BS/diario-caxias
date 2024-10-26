'use client'


import { AuthenticatedPage } from "@/components/AuthenticatedPage";
import { FieldError } from "@/components/shared/FieldError";
import { useNotification } from "@/components/shared/Notification";
import { Template } from "@/components/Template";
import { useAuth } from "@/resources/auth";
import { Post, usePostService } from "@/resources/post";
import { Button, Textarea, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { FaNewspaper } from "react-icons/fa6";
import * as Yup from "yup";

export interface FormProps {
    title: string;
    description: string;
    summary: string;
    image: string;
    userId: number;
}

export const formSchema: FormProps = {
    title: "",
    description: "",
    summary: "",
    image: "",
    userId: 0
};

export const formValidationSchema = Yup.object().shape({
    title: Yup.string()
        .trim()
        .required("O campo título é obrigatório!")
        .min(3, "O título deve ter no mínimo 3 caracteres!")
        .max(80, "O título deve ter no máximo 80 caracteres!"),
        summary: Yup.string()
        .trim()
        .required("O campo de resumo é obrigatório!")
        .max(250, "O título deve ter no máximo 250 caracteres!"),
    description: Yup.string()
        .trim()
        .required("O campo de descrição é obrigatório!"),
});

export default function AddFormPost() {
    const [loading, setLoading] = useState<boolean>(false);
    const notification = useNotification();
    const service = usePostService();
    const auth = useAuth();
    const userId = auth.getUserSession()?.id;

    const { values, handleChange, handleSubmit, errors, resetForm } = useFormik<FormProps>({
        initialValues: formSchema,
        validationSchema: formValidationSchema,
        onSubmit: onSubmit
    })

    async function onSubmit(values: FormProps) {
        const post: Post = { postTitle: values.title, postDescription: values.description, postSummary: values.summary, postImage: values.image, userId: userId }
        try {
            await service.savePost(post);
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
                        Publicar Nova Notícia <FaNewspaper />
                    </span>
                    <form onSubmit={handleSubmit} className="space-y-2 w-1/2">
                        <div className="grid grid-cols-1">
                            <TextInput
                                type="hidden"
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
                                placeholder="título da postagem" />
                            <FieldError error={errors.title} />
                        </div>
                        <div className="grid grid-cols-1">
                            <label className="block text-sm font-medium leading-6 text-gray-700">Resumo: *</label>
                            <Textarea
                                color="bg-zinc-400"
                                id="summary"
                                onChange={handleChange}
                                value={values.summary}
                                placeholder="resumo da postagem" />
                            <FieldError error={errors.summary} />
                        </div>
                        <div className="grid grid-cols-1">
                            <label className="block text-sm font-medium leading-6 text-gray-700">Descrição: *</label>
                            <Textarea
                                color="bg-zinc-400"
                                id="description"
                                onChange={handleChange}
                                value={values.description}
                                placeholder="descrição da postagem" />
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
                            <Link href="/postagens">
                                <Button type="button" color="failure" >Cancelar</Button>
                            </Link>
                        </div>
                    </form>
                </section>
            </Template>
        </AuthenticatedPage>
    );
}
