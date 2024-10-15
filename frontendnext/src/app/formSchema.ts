import * as Yup from 'yup';

export interface LoginForm {
    username?: string;
    email: string;
    password: string;
    passwordMatch?: string;
}

export const validationSchema =  Yup.object().shape({
    email: Yup.string().trim().required('Email é obrigatório!').email('Email inválido!'),
    password: Yup.string().required('A senha é obrigatória!').min(8, 'A senha deve ter no mínimo 8 caracteres!'),
    passwordMatch: Yup.string().oneOf( [Yup.ref('password')], 'As senhas não coincidem!' )
});

export const formSchema: LoginForm = { email: '', username: '', password: '', passwordMatch: ''}