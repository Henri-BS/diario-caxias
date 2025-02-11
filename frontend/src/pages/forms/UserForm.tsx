
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { useAuth } from "resources/auth";
import { Credentials, AccessToken, User } from "resources/user";
import { useNavigate, useParams } from "react-router-dom";
import { useNotification, FieldError } from "components/shared/Notification";
import * as Yup from "yup";
import axios from "axios";
import { baseUrl } from "utils/requests";
import { FaUser } from "react-icons/fa6";
import { Props } from "resources";

interface UserFormProps {
    id?: number;
    username?: string;
    email?: string;
    password?: string;
    passwordMatch?: string;
    userImage?: string;
    userCoverImage?: string;
    userBio?: string;
    userLocation?: string;
}

const userFormSchema: UserFormProps = {
    id: 0,
    email: "",
    username: "",
    password: "",
    passwordMatch: "",
    userImage: "",
    userCoverImage: "",
    userBio: "",
    userLocation: "",
};

const userValidationSchema = Yup.object().shape({
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

export function Login() {
    const [newUserState, setNewUserState] = useState<boolean>(false);


    const auth = useAuth();
    const notification = useNotification();
    const navigate = useNavigate();


    const { values, handleChange, handleSubmit, errors, resetForm } = useFormik<UserFormProps>({
        initialValues: userFormSchema,
        validationSchema: userValidationSchema,
        onSubmit: onSubmit
    });

    async function onSubmit(values: UserFormProps) {
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
                    <form onSubmit={handleSubmit} className="space-y-2 w-2/3" >
                        {newUserState ?
                            <div>
                                <Label className="block text-sm font-medium leading-6 text-gray-900" value="Nome de Usuário:" />
                                <TextInput className="w-full"
                                    color="bg-zinc-400"
                                    id="username"
                                    value={values.username}
                                    onChange={handleChange} />
                            </div>
                            : ""
                        }
                        <div>
                            <Label className="block text-sm font-medium leading-6 text-gray-900" value="Email:" />
                            <TextInput className="w-full"
                                color="bg-zinc-400"
                                id="email"
                                value={values.email}
                                onChange={handleChange} />
                            <FieldError error={errors.email} />
                        </div>

                        <div>
                            <Label className="block text-sm font-medium leading-6 text-gray-900" value="Senha:" />
                            <TextInput className="w-full"
                                color="bg-zinc-400"
                                type="password"
                                id="password"
                                value={values.password}
                                onChange={handleChange} />
                            <FieldError error={errors.password} />
                        </div>

                        {newUserState ?
                            <div>
                                <Label className="block text-sm font-medium leading-6 text-gray-900" value="Confirmar Senha:" />
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
            </div>
        </>
    );
}

export function UserEditProfile() {
    const params = useParams();
    return (
        <>
            <UserEditForm params={`${params.userId}`} />
        </>
    );
}

export function UserEditForm({ params: userId }: Props) {
    const notification = useNotification();
    const auth = useAuth();
    userId = auth.getUserSession()?.id;

    const [user, setUser] = useState<User>();
    useEffect(() => {
        axios.get(`${baseUrl}/users/${userId}`)
            .then((response) => {
                setUser(response.data);
            });
    }, [userId]);

    const { values, handleChange, resetForm } = useFormik<UserFormProps>({
        initialValues: {
            id: userId,
            username: user?.username,
            userBio: user?.userBio,
            userImage: user?.userImage,
            userCoverImage: user?.userCoverImage,
            userLocation: user?.userLocation
        },
        validationSchema: userValidationSchema,
        onSubmit: onSubmit
    }
    );

    async function onSubmit() {
        const userValues: User = {
            id: userId,
            username: values.username,
            userBio: values.userBio,
            userImage: values.userImage,
            userCoverImage: values.userCoverImage,
            userLocation: values.userLocation
        }
        try {
            axios.put(`${baseUrl}/users/update`, userValues)
                .then((response) => {
                    console.log(response.data)
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
            <div className="flex flex-col items-center justify-center my-5">
                <span className="flex items-center gap-2 mt-3 mb-10 text-2xl font-bold tracking-tight text-gray-900">
                    Editar Usuário ({user?.username}) <FaUser />
                </span>
                <form onSubmit={onSubmit} className="space-y-2 w-2/3 ">
                    <div>
                        <TextInput
                            type="hidden"
                            id="id"
                            onChange={handleChange}
                            value={userId}
                        />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium leading-6 text-gray-700" value="Nome de Usuário: " />
                        <TextInput
                            color="bg-zinc-400"
                            id="username"
                            onChange={handleChange}
                            value={values.username}
                            defaultValue={user?.username}
                        />

                    </div>
                    <div>
                        <Label className="block text-sm font-medium leading-6 text-gray-700" value="Bio: " />
                        <Textarea
                        className="min-h-[120px]"
                            color="bg-zinc-400"
                            id="userBio"
                            onChange={handleChange}
                            value={values.userBio}
                            />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium leading-6 text-gray-700" value="Url da Imagem de Perfil: " />
                        <TextInput
                            color="bg-zinc-400"
                            id="userImage"
                            onChange={handleChange}
                            value={values.userImage}
                            />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium leading-6 text-gray-700" value="Url da Imagem de Capa:" />
                        <TextInput
                            color="bg-zinc-400"
                            id="userCoverImage"
                            onChange={handleChange}
                            value={values.userCoverImage}
                            />
                    </div>
                    <div className="mt-2">
                        <Label className="block text-sm font-medium leading-6 text-gray-700" value="Localização:" />
                        <TextInput
                            color="bg-zinc-400"
                            id="userLocation"
                            onChange={handleChange}
                            value={values.userLocation}
                            />
                    </div>
                    <div className="mt-5 flex items-center justify-end gap-x-4">
                        <Button type="submit" gradientDuoTone="purpleToBlue" >Salvar</Button>
                        <Button href={`/perfil/${userId}`} type="button" color="failure" >Cancelar</Button>
                    </div>
                </form>
            </div>
        </>
    );
}