import * as Yup from 'yup';

export interface LoginFormProps {
    username?: string;
    email: string;
    password: string;
    passwordMatch?: string;
}

export const loginFormSchema: LoginFormProps = { 
    email: "", 
    username: "", 
    password: "", 
    passwordMatch: ""
}

export const loginValidationSchema =  Yup.object().shape({
    email: Yup.string().trim().required('Email é obrigatório!').email('Email inválido!'),
    password: Yup.string().required('A senha é obrigatória!').min(8, 'A senha deve ter no mínimo 8 caracteres!'),
    passwordMatch: Yup.string().oneOf( [Yup.ref('password')], 'As senhas não coincidem!' )
});


export interface EventFormProps {
    title: string;
    description: string;
    image: string;
    date: string;
    status: string;
    projectTitle: string;
    userId: number;
}

export const eventFormSchema: EventFormProps = {
    title: "",
    description: "",
    image: "",
    date: "",
    status: "",
    projectTitle: "",
    userId: 0
};

export const eventValidationSchema = Yup.object().shape({
    title: Yup.string()
        .trim()
        .required("O campo título é obrigatório!")
        .min(3, "O título deve ter no mínimo 3 caracteres!")
        .max(100, "O título deve ter no máximo 100 caracteres!"),
    description: Yup.string()
        .trim()
        .required("O campo de descrição é obrigatório!"),
    date: Yup.string()
        .trim()
        .required("O campo de data é obrigatório!"),
    status: Yup.string()
        .trim()
        .required("O campo de status é obrigatório!")
});


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
    userId: 0
};

export const postValidationSchema = Yup.object().shape({
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


export interface ProjectFormProps {
    title: string;
    description: string;
    image: string;
    userId: number;
}

export const projectFormSchema: ProjectFormProps = {
    title: "",
    description: "",
    image: "",
    userId: 0
};

export const projectValidationSchema = Yup.object().shape({
    title: Yup.string()
        .trim()
        .required("O campo título é obrigatório!")
        .min(3, "O título deve ter no mínimo 3 caracteres!")
        .max(80, "O título deve ter no máximo 80 caracteres!"),
    description: Yup.string()
        .trim()
        .required("O campo de descrição é obrigatório!")
});


export interface UserFormProps {
    username: string;
    userImage: string;
    userCoverImage: string;
    userBio: string;
    userLocation: string;
    id: string;
}

export const userFormSchema: UserFormProps = {
    username: "",
    userImage: "",
    userCoverImage: "",
    userBio: "",
    userLocation: "",
    id: ""
};

export const userValidationSchema = Yup.object().shape({
    username: Yup.string()
        .trim()
        .required("O campo nome de usuário é obrigatório!")
        .min(3, "O nome de usuário deve ter no mínimo 3 caracteres!")
        .max(80, "O nome de usuário deve ter no máximo 80 caracteres!"),
});