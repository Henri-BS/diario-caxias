
import { useFormik } from "formik";
import { useState } from "react";
import { Button, TextInput } from "flowbite-react";
import { useAuth } from "resources/auth";
import { Credentials, AccessToken, User } from "resources/user";
import { useNavigate } from "react-router-dom";
import { useNotification, FieldError } from "components/shared/Notification";
import * as Yup from "yup";

interface LoginFormProps {
    username?: string;
    email: string;
    password: string;
    passwordMatch?: string;
}

const loginFormSchema: LoginFormProps = {
    email: "",
    username: "",
    password: "",
    passwordMatch: "",
};

const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .trim()
        .required("Email é obrigatório!")
        .email("Email inválido!"),
    password: Yup.string()
        .required("A senha é obrigatória!")
        .min(8, "A senha deve ter no mínimo 8 caracteres!"),
    passwordMatch: Yup.string().oneOf(
        [Yup.ref("password")],
        "As senhas não coincidem!"
    ),
});

export default function Login() {
    const [newUserState, setNewUserState] = useState<boolean>(false);

    
    const auth = useAuth();
    const notification = useNotification();
    const navigate = useNavigate();


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
                navigate(0);
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
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-4xl font-bold leading-9 whitespace-nowrap tracking-tight text-gray-900">
                        {newUserState ? "Cadastre-se" : "Faça login na sua conta"}
                    </h2>
                </div>

                <div className="flex flex-col items-center my-6">
                    <form onSubmit={handleSubmit} className="space-y-2 w-1/2" >
                        {newUserState ?
                            <div className="mt-2">
                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Nome: </label>
                                </div>
                                <TextInput className="w-full"
                                    color="bg-zinc-400"
                                    id="username"
                                    value={values.username}
                                    onChange={handleChange} />
                                <FieldError error={errors.username} />
                            </div>
                            : ""
                        }
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

                        {newUserState ?
                            <div className="mt-2">
                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Confirmar Senha: </label>
                                </div>
                                <TextInput className="w-full"
                                    color="bg-zinc-400"
                                    type="password"
                                    id="passwordMatch"
                                    value={values.passwordMatch}
                                    onChange={handleChange} />
                                <FieldError error={errors.passwordMatch} />
                            </div>
                            : ""}

                        <div className="flex gap-2 items-center">
                            {newUserState ?
                                <div className="flex flex-row items-center gap-2">
                                    <Button type="submit" gradientDuoTone="greenToBlue">
                                        Salvar
                                    </Button>
                                    <Button type="button" color="failure" onClick={() => setNewUserState(false)} >
                                        Cancelar
                                    </Button>

                                </div>
                                :
                                <div className="flex flex-row items-center gap-2">
                                    <Button type="submit" gradientDuoTone="purpleToBlue">
                                        Login
                                    </Button>
                                    Não possui uma conta?
                                    <span className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        onClick={() => setNewUserState(true)} >Cadastre-se
                                    </span>
                                </div>
                            }
                        </div>
                    </form>
                </div>
            </div >
        </>
    );
}