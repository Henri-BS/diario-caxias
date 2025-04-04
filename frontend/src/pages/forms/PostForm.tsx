import { FieldError, useNotification } from "components/shared/Notification";
import { useAuth } from "resources/auth";
import { Post } from "resources/post";
import { Breadcrumb, Button, Label, Textarea, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { FaCalendarCheck, FaHouse, FaNewspaper, FaX } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "./UserForm";
import * as Yup from "yup";
import axios from "axios";
import { baseUrl } from "utils/requests";
import { Props } from "resources";
import { useEffect, useState } from "react";
import { EventPage } from "resources/event";

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

    const { values, handleChange, errors, resetForm } = useFormik<Post>({
        initialValues: {
            postTitle: "",
            postDescription: "",
            postSummary: "",
            postImage: "",
            userId: 0,
        },
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
                    navigate(`/postagens/${post.postId}`);
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
                <div>
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
                        <div className="flex flex-row justify-between items-center text-lg font-semibold tracking-tight text-gray-700 mb-3 w-full md:w-2/3">
                            <span className="flex flex-row items-center gap-2"><FaNewspaper /> Adicionar Postagem </span>
                            <FaX onClick={() => navigate(-1)} className="hover:shadow-xl cursor-pointer rounded-full p-1 border hover:bg-gray-300  text-2xl" />
                        </div>
                        <form onSubmit={onSubmit} className="space-y-2 w-full md:w-2/3">
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

    const { values, handleChange, errors } = useFormik<Post>({
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
            postId: postId,
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
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-row justify-between items-center text-xl font-semibold tracking-tight text-gray-700 mb-3 w-full md:w-2/3">
                        <span className="flex flex-row items-center gap-2"><FaNewspaper /> Editar Postagem </span>
                        <FaX onClick={() => navigate(0)} className="hover:shadow-xl cursor-pointer rounded-full  p-1 border hover:bg-gray-300 text-2xl" />
                    </div>
                    <form onSubmit={onSubmit} className="space-y-2 w-full md:w-2/3">
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
                                defaultValue={post?.postTitle}
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
                                className="h-[160px]"
                                color="bg-zinc-400"
                                id="postSummary"
                                onChange={handleChange}
                                value={values.postSummary}
                                defaultValue={post?.postSummary}
                            />
                            <FieldError error={errors.postSummary} />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium leading-6 text-gray-700" value="Descrição: *" />
                            <Textarea
                                className="h-[160px]"
                                color="bg-zinc-400"
                                id="postDescription"
                                onChange={handleChange}
                                value={values.postDescription}
                                defaultValue={post?.postDescription}
                            />
                        </div>

                        <div className="mt-5 flex items-center justify-end gap-x-4">
                            <Button type="submit" gradientDuoTone="purpleToBlue">Salvar</Button>
                        </div>
                    </form>
                </div>
            }
        </>
    );
}


export function EventPostAddForm({ params: postId }: Props) {

    const notification = useNotification();
    const auth = useAuth();
    const userId = auth.getUserSession()?.id;
    const navigate = useNavigate();

    const query = "";
    const [eventPage, setEventPage] = useState<EventPage>({ content: [], page: { number: 0, totalElements: 0 } });

    useEffect(() => {
        axios.get(`${baseUrl}/events?size=40`)
            .then((response) => {
                setEventPage(response.data);
            })
    }, [query]);

    type EventPost = {
        eventTitle?: string;
        postId?: number;
        userId?: number;
    }

    const { values, handleChange, resetForm } = useFormik<EventPost>({
        initialValues: {
            eventTitle: "",
            postId: 0,
            userId: 0
        },
        validationSchema: postValidationSchema,
        onSubmit: onSubmit
    })


    async function onSubmit() {
        const eventPost: EventPost = { eventTitle: values.eventTitle, postId: postId, userId: userId }

        try {
            axios.post(`${baseUrl}/event-post/save`, eventPost)
                .then((response) => {
                    navigate(`/postagens/${postId}`)
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
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-row justify-between items-center text-xl font-semibold tracking-tight text-gray-700 mb-3 w-full md:w-2/3">
                    <span className="flex flex-row items-center gap-2"><FaCalendarCheck /> Adicionar Evento </span>
                </div>
                <form onSubmit={onSubmit} className="space-y-2 w-full md:w-2/3">
                    <div>
                        <TextInput type="hidden"
                            id="userId"
                            onChange={handleChange}
                            value={userId}
                        />
                        <TextInput type="hidden"
                            id="postId"
                            onChange={handleChange}
                            value={postId}
                        />
                    </div>
                    <div>
                        <TextInput
                            color="bg-zinc-400"
                            id="eventTitle"
                            list="eventList"
                            onChange={handleChange}
                            value={values.eventTitle}
                        />
                        <datalist id="eventList">
                            {eventPage.content?.filter((event) =>
                                event.eventTitle?.toUpperCase().includes(query.toLocaleUpperCase()))
                                .map((event) =>
                                    <>
                                        <option id="query" key={event.eventId} value={event.eventTitle}>
                                            {event.eventTitle}
                                        </option>
                                    </>
                                )
                            }
                        </datalist>
                    </div>

                    <div className="mt-5 flex items-center justify-end gap-x-4">
                        <Button type="submit" gradientDuoTone="purpleToBlue" >Salvar</Button>
                    </div>
                </form>
            </div>
        </>
    );
}