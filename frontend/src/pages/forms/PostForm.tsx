import { FieldError, useNotification } from "components/shared/Notification";
import { useAuth } from "resources/auth";
import { usePostService, Post } from "resources/post";
import { Button, Textarea, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { FaNewspaper } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Login } from "./UserForm";
import * as Yup from "yup";

export interface PostFormProps {
    title: string;
    description: string;
    summary: string;
    image: string;
    userId: number;
}

export const postFormSchema: PostFormProps = {
    title: "",
    description: "",
    summary: "",
    image: "",
    userId: 0,
};

export const postValidationSchema = Yup.object().shape({
    title: Yup.string()
        .trim()
        .required("O campo título é obrigatório!")
        .min(3, "O título deve ter no mínimo 3 caracteres!")
        .max(100, "O título deve ter no máximo 100 caracteres!"),
    summary: Yup.string()
        .trim()
        .required("O campo de resumo é obrigatório!")
        .max(300, "O resumo deve ter no máximo 300 caracteres!"),
    description: Yup.string()
        .trim()
        .required("O campo de descrição é obrigatório!"),
});


export function PostAddForm() {
    const notification = useNotification();
    const service = usePostService();
    const auth = useAuth();
    const userId = auth.getUserSession()?.id;

    const { values, handleChange, handleSubmit, errors, resetForm } = useFormik<PostFormProps>({
        initialValues: postFormSchema,
        validationSchema: postValidationSchema,
        onSubmit: onSubmit
    })

    async function onSubmit(values: PostFormProps) {
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
        <>
            {!auth.isSessionValid() ? <Login /> :
                <section className="flex flex-col items-center justify-center my-5">
                    <span className="flex gap-2 mt-3 mb-10 text-2xl font-bold tracking-tight text-gray-900">
                        Publicar Nova Postagem <FaNewspaper />
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
                        <div className="mt-2">
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
                            <Link to="/postagens">
                                <Button type="button" color="failure" >Cancelar</Button>
                            </Link>
                        </div>
                    </form>
                </section>
            }
        </>
    );
}