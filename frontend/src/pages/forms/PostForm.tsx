import { FieldError, useNotification } from "components/shared/Notification";
import { useAuth } from "resources/auth";
import { Post } from "resources/post";
import { Breadcrumb, Button, Label, Textarea, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { FaHouse, FaNewspaper, FaX } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "./UserForm";
import * as Yup from "yup";
import axios from "axios";
import { baseUrl } from "utils/requests";
import { Props } from "resources";
import { useEffect, useState } from "react";

export interface PostFormProps {
    id?: number,
    postTitle?: string;
    postDescription?: string;
    postSummary?: string;
    postImage?: string;
    userId?: number;
}

export const postFormSchema: PostFormProps = {
    postTitle: "",
    postDescription: "",
    postSummary: "",
    postImage: "",
    userId: 0,
};

export const postValidationSchema = Yup.object().shape({
    postTitle: Yup.string()
        .trim()
        .required("O campo título é obrigatório!")
        .min(3, "O título deve ter no mínimo 3 caracteres!")
        .max(100, "O título deve ter no máximo 100 caracteres!"),
    postSummary: Yup.string()
        .trim()
        .required("O campo de resumo é obrigatório!")
        .max(300, "O resumo deve ter no máximo 300 caracteres!"),
    postDescription: Yup.string()
        .trim()
        .required("O campo de descrição é obrigatório!")
        .min(3, "O título deve ter no mínimo 3 caracteres!"),
});


export function PostAddForm() {
    const notification = useNotification();
    const auth = useAuth();
    const userId = auth.getUserSession()?.id;
    const navigate = useNavigate();

    const { values, handleChange, errors, resetForm } = useFormik<PostFormProps>({
        initialValues: postFormSchema,
        validationSchema: postValidationSchema,
        onSubmit: onSubmit
    })

    async function onSubmit() {
        const post: Post = {
            postTitle: values.postTitle,
            postDescription: values.postDescription,
            postSummary: values.postSummary,
            postImage: values.postImage,
            userId: userId
        }
        try {
            axios.post(`${baseUrl}/posts/save`, post)
                .then((response) => {
                    navigate(`/postagens/${post.id}`);
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
                            <Link to="/postagens">
                                Postagens
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item >
                            <Link to="/postagens/adicionar">
                                Adicionar Postagem
                            </Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-row justify-between items-center text-lg font-semibold tracking-tight text-gray-700 mb-3 w-2/3">
                            <span className="flex flex-row items-center gap-2"><FaNewspaper /> Adicionar Postagem </span>
                            <FaX onClick={() => navigate(-1)} className="hover:shadow-xl cursor-pointer rounded-full p-1 border hover:bg-gray-300  text-2xl" />
                        </div>
                        <form onSubmit={onSubmit} className="space-y-2 w-2/3">
                            <div>
                                <TextInput
                                    type="hidden"
                                    id="userId"
                                    onChange={handleChange}
                                    value={userId}
                                />
                            </div>
                            <div>
                                <Label className="block text-sm font-medium leading-6 text-gray-700" value="Título: *" />
                                <TextInput
                                    color="bg-zinc-400"
                                    id="postTitle"
                                    onChange={handleChange}
                                    value={values.postTitle}
                                />
                                <FieldError error={errors.postTitle} />
                            </div>
                            <div>
                                <Label className="block text-sm font-medium leading-6 text-gray-700" value="Url de Imagem: " />
                                <TextInput
                                    color="bg-zinc-400"
                                    id="postImage"
                                    onChange={handleChange}
                                    value={values.postImage}
                                />
                            </div>
                            <div>
                                <Label className="block text-sm font-medium leading-6 text-gray-700" value="Resumo: *" />
                                <Textarea
                                    color="bg-zinc-400"
                                    id="postSummary"
                                    onChange={handleChange}
                                    value={values.postSummary}
                                />
                                <FieldError error={errors.postSummary} />
                            </div>
                            <div>
                                <Label className="block text-sm font-medium leading-6 text-gray-700" value="Descrição: *" />
                                <Textarea
                                    color="bg-zinc-400"
                                    id="postDescription"
                                    onChange={handleChange}
                                    value={values.postDescription}
                                />
                                <FieldError error={errors.postDescription} />
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


export function PostEditForm({ params: postId }: Props) {
    const notification = useNotification();
    const auth = useAuth();
    const userId = auth.getUserSession()?.id;
    const navigate = useNavigate();

    const [post, setPost] = useState<Post>();
    useEffect(() => {
        axios.get(`${baseUrl}/posts/${postId}`)
            .then((response) => {
                setPost(response.data);
            });
    }, [postId]);

    const { values, handleChange, errors } = useFormik<PostFormProps>({
        initialValues: {
            postTitle: post?.postTitle,
            postDescription: post?.postDescription,
            postImage: post?.postImage,
            postSummary: post?.postSummary,
        },
        validationSchema: postValidationSchema,
        onSubmit: onSubmit
    })

    async function onSubmit() {
        const postValues: Post = {
            id: postId,
            postTitle: values.postTitle ?? post?.postTitle,
            postDescription: values.postDescription ?? post?.postDescription,
            postImage: values.postImage ?? post?.postImage,
            postSummary: values.postSummary ?? post?.postSummary,
            userId: userId
        }
        try {
            axios.put(`${baseUrl}/posts/update`, postValues)
                .then((response) => {
                    navigate(0);
                    return response.status;
                });
        } catch (error: any) {
            const message = error?.message;
            notification.notify(message, "error");
        }
    }
    return (
        <>
            {!auth.isSessionValid() ? <Login /> :
                <div className="flex flex-col items-center justify-center mt-10">
                    <div className="flex flex-row justify-between items-center text-xl font-semibold tracking-tight text-gray-700 mb-3 w-2/3">
                        <span className="flex flex-row items-center gap-2"><FaNewspaper /> Editar Postagem </span>
                        <FaX onClick={() => navigate(0)} className="hover:shadow-xl cursor-pointer rounded-full  p-1 border hover:bg-gray-300  text-2xl" />
                    </div>
                    <form onSubmit={onSubmit} className="space-y-2 w-2/3">
                        <div>
                            <TextInput
                                type="hidden"
                                id="userId"
                                onChange={handleChange}
                                value={userId}
                            />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium leading-6 text-gray-700" value="Título: *" />
                            <TextInput
                                color="bg-zinc-400"
                                id="postTitle"
                                onChange={handleChange}
                                value={values.postTitle}
                            />
                            <FieldError error={errors.postTitle} />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium leading-6 text-gray-700" value="Url de Imagem: " />
                            <TextInput
                                color="bg-zinc-400"
                                id="postImage"
                                onChange={handleChange}
                                value={values.postImage}
                            />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium leading-6 text-gray-700" value="Resumo: *" />
                            <Textarea
                                color="bg-zinc-400"
                                id="postSummary"
                                onChange={handleChange}
                                value={values.postSummary}
                            />
                            <FieldError error={errors.postSummary} />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium leading-6 text-gray-700" value="Descrição: *" />
                            <Textarea
                                color="bg-zinc-400"
                                id="postDescription"
                                onChange={handleChange}
                                value={values.postDescription}
                            />
                            <FieldError error={errors.postDescription} />
                        </div>

                        <div className="mt-5 flex items-center justify-end gap-x-4">
                            <Button type="submit" gradientDuoTone="purpleToBlue" >Salvar</Button>
                        </div>
                    </form>
                </div>
            }
        </>
    );
}