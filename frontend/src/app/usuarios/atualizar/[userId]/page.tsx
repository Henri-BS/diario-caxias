'use client'

import { UserFormProps, userFormSchema, userValidationSchema } from "@/app/formSchema";
import { AuthenticatedPage } from "@/components/authenticatedPage";
import { FieldError } from "@/components/fieldError";
import { useNotification } from "@/components/notification";
import { Template } from "@/components/template";
import { useAuth } from "@/resource/auth";
import { useUserService } from "@/resource/user";
import { Button, Textarea, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { FaUser } from "react-icons/fa6";


export default function EditFormUser({ params }: any) {
   
    const [loading, setLoading] = useState<boolean>(false);
    const notification = useNotification();
    const service = useUserService();
    const auth = useAuth();
    const id = auth.getUserSession()?.id?.toString();


    const formik = useFormik<UserFormProps>({
        initialValues: userFormSchema,
        onSubmit: handleSubmit,
        validationSchema: userValidationSchema
    });

    async function handleSubmit(data: UserFormProps) {
        setLoading(true);
        const formData = new FormData();
        formData.append("username", data.username);
        formData.append("userImage", data.userImage);
        formData.append("userCoverImage", data.userCoverImage);
        formData.append("userBio", data.userBio);
        formData.append("userLocation", data.userLocation);
        formData.append("id", id as string);

        await service.updateUserInfo(formData);

        formik.resetForm();
        setLoading(false);
        notification.notify("Salvo com sucesso !", "success");
    }


    return (
        <AuthenticatedPage>
            <Template loading={loading}>
                <section className="flex flex-col items-center justify-center my-5">
                    <span className="flex gap-2 mt-3 mb-10 text-2xl font-bold tracking-tight text-gray-900">
                        Atualizar Dados de Usuário <FaUser />
                    </span>
                    <form onSubmit={formik.handleSubmit} className="space-y-2 w-1/2">
                        <div className="grid grid-cols-1">
                            <TextInput type="hidden"
                                id="id"
                                onChange={formik.handleChange}
                                value={id} />
                        </div>
                        <div className="mt-5 grid grid-cols-1">
                            <label className="block text-sm font-medium leading-6 text-gray-700">Url de Imagem: </label>
                            <TextInput
                                color="bg-zinc-400"
                                id="userImage"
                                onChange={formik.handleChange}
                                value={formik.values.userImage} />
                        </div>
                        <div className="mt-5 grid grid-cols-1">
                            <label className="block text-sm font-medium leading-6 text-gray-700">Url de Imagem de Capa: </label>
                            <TextInput
                                color="bg-zinc-400"
                                id="userCoverImage"
                                onChange={formik.handleChange}
                                value={formik.values.userCoverImage} />
                        </div>
                        <div className="mt-5 grid grid-cols-1">
                            <label className="block text-sm font-medium leading-6 text-gray-700">Nome de Usuário: *</label>
                            <TextInput
                                color="bg-zinc-400"
                                id="username"
                                onChange={formik.handleChange}
                                value={formik.values.username}
                                placeholder="nome de usuário" />
                            <FieldError error={formik.errors.username} />
                        </div>
                        <div className="mt-5 grid grid-cols-1">
                            <label className='block text-sm font-medium leading-6 text-gray-700'>Biografia: </label>
                            <Textarea
                                color="bg-zinc-400"
                                id="userBio"
                                onChange={formik.handleChange}
                                value={formik.values.userBio}
                                placeholder="breve biografia do usuário" />
                        </div>
                        <div className="mt-5 grid grid-cols-1">
                            <label className='block text-sm font-medium leading-6 text-gray-700'>Localização: </label>
                            <TextInput
                                color="bg-zinc-400"
                                id="userLocation"
                                onChange={formik.handleChange}
                                value={formik.values.userLocation}
                                placeholder="bairro ou localização em que você reside" />
                        </div>
                        <div className="mt-5 flex items-center justify-end gap-x-4">
                            <Button type="submit" gradientDuoTone="purpleToBlue" >Salvar</Button>
                            <Link href={`/usuarios/${id}`}>
                                <Button type="button" color="failure" >Cancelar</Button>
                            </Link>
                        </div>
                    </form>
                </section>
            </Template>
        </AuthenticatedPage>
    );
}