'use client'

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, TextInput } from "flowbite-react";
import { FieldError } from "@/components/fieldError";
import { useNotification } from "@/components/notification";
import { Template, RenderIf } from "@/components/template";
import { useAuth } from "@/resources/auth";
import { Credentials, AccessToken, User } from "@/resources/user";
import { LoginFormProps, loginFormSchema, loginValidationSchema } from "../formSchema";

export default function Login() {
    const [loading, setLoading] = useState<boolean>(false);
    const [newUserState, setNewUserState] = useState<boolean>(false);

    const auth = useAuth();
    const notification = useNotification();
    const router = useRouter();

    const { values, handleChange, handleSubmit, errors, resetForm } = useFormik<LoginFormProps>({
        initialValues: loginFormSchema,
        validationSchema: loginValidationSchema,
        onSubmit: onSubmit
    });

    async function onSubmit(values: LoginFormProps) {
        if (!newUserState) {
            const credentials: Credentials = { email: values.email, password: values.password }
            try {
                const accessToken: AccessToken = await auth.authenticate(credentials);
                auth.initSession(accessToken);
                router.refresh();
            } catch (error: any) {
                const message = error?.message;
                notification.notify(message, "error");
            }
        } else {
            const user: User = { email: values.email, username: values.username, password: values.password }
            try {
                await auth.saveUser(user);
                notification.notify("Usuário cadastrado!", "success");
                resetForm();
                setNewUserState(false);
            } catch (error: any) {
                const message = error?.message;
                notification.notify(message, "error");
            }
        }
    }
    return (
        <>
            <Template loading={loading}>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-4xl font-bold leading-9 whitespace-nowrap tracking-tight text-gray-900">
                            {newUserState ? "Cadastre-se" : "Faça login na sua conta"}
                        </h2>
                    </div>

                    <div className="flex flex-col items-center my-6">
                        <form onSubmit={handleSubmit} className="space-y-2 w-1/2" >
                            <RenderIf condition={newUserState}>
                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Nome: </label>
                                </div>
                                <div className="mt-2">
                                    <TextInput className="w-full"
                                        color="bg-zinc-400"
                                        id="username"
                                        value={values.username}
                                        onChange={handleChange} />
                                    <FieldError error={errors.username} />
                                </div>
                            </RenderIf>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Email: </label>
                            </div>
                            <div className="mt-2">
                                <TextInput className="w-full"
                                    color="bg-zinc-400"
                                    id="email"
                                    value={values.email}
                                    onChange={handleChange} />
                                <FieldError error={errors.email} />
                            </div>

                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Senha: </label>
                            </div>
                            <div className="mt-2">
                                <TextInput className="w-full"
                                    color="bg-zinc-400"
                                    type="password"
                                    id="password"
                                    value={values.password}
                                    onChange={handleChange} />
                                <FieldError error={errors.password} />
                            </div>

                            <RenderIf condition={newUserState}>
                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Confirmar Senha: </label>
                                </div>
                                <div className="mt-2">
                                    <TextInput className="w-full"
                                        color="bg-zinc-400"
                                        type="password"
                                        id="passwordMatch"
                                        value={values.passwordMatch}
                                        onChange={handleChange} />
                                    <FieldError error={errors.passwordMatch} />
                                </div>
                            </RenderIf>

                            <div className="flex gap-2 items-center">
                                <RenderIf condition={newUserState}>
                                    <Button type="submit" gradientDuoTone="greenToBlue">
                                        Salvar
                                    </Button>
                                    <Button type="button" color="failure" onClick={() => setNewUserState(false)} >
                                        Cancelar
                                    </Button>
                                </RenderIf>

                                <RenderIf condition={!newUserState}>
                                    <Button type="submit" gradientDuoTone="purpleToBlue">
                                        Login
                                    </Button>
                                    Não possui uma conta?
                                    <a className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        onClick={() => setNewUserState(true)} >Cadastre-se</a>
                                </RenderIf>
                            </div>
                        </form>
                    </div>
                </div>
            </Template>
        </>
    );
}