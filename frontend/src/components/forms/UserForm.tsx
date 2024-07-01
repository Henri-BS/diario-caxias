import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Props } from "types/main";
import { User } from "types/user";
import { BASE_URL } from "utils/requests";

export function UserRegisterForm() {

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        const firstName = (e.target as any).firstName.value;
        const lastName = (e.target as any).lastName.value;
        const email = (e.target as any).email.value;
        const password = (e.target as any).password.value;

        const config: AxiosRequestConfig = {
            baseURL: BASE_URL,
            url: "/api/register",
            method: "POST",
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            }
        }
        try {
            axios(config).then(response => {
                setMessage(response.data);
                if (response.data === 'Cadastrado') {
                    navigate('/');
                } else {
                    setMessage('Dados inválidos');
                }
            })
        } catch (error) {
            setMessage('Dados inválidos');
        }

    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Cadastro</div>
                        <div className="card-body">
                            {message && <div className="alert alert-info">{message}</div>}
                            <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                    <label>Nome</label>
                                    <input type="text" className="form-control" id="firstName"/>
                                </div>
                                <div className="form-group">
                                    <label>Sobrenome</label>
                                    <input type="text" className="form-control" id="lastName"/>
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" id="email" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label>Senha</label>
                                    <input type="password" id="password" className="form-control"/>
                                </div>
                                <button type="submit" className="btn btn-primary">Cadastrar</button>
                            </form>
                            <div className="mt-3">
                                <span>Já possui cadastro? <Link to="/login">Login</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export function UserLoginForm() {

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        const email = (e.target as any).email.value;
        const password = (e.target as any).password.value;

        const config: AxiosRequestConfig = {
            baseURL: BASE_URL,
            url: "/api/login",
            method: "POST",
            data: {
                email: email,
                password: password
            }
        }
        try {

            axios(config).then(response => {
                setMessage(response.data);
                if (response.data === 'Usuário Cadastrado com Sucesso') {
                    navigate('/');
                }
            })
        } catch (error) {
            setMessage('Falha no Cadastro');
        }

    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Login</div>
                        <div className="card-body">
                            {message && <div className="alert alert-info">{message}</div>}
                            <form onSubmit={handleSubmit}>
                           
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" id="email" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label>Senha</label>
                                    <input type="password" id="password" className="form-control"/>
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                            <div className="mt-3">
                                <span>Não possui cadastro? <Link to="/register">Cadastre-se</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export function UserEditForm({ id: userId }: Props) {

    const [user, setUser] = useState<User>();
    useEffect(() => {
        axios.get(`${BASE_URL}/user/${userId}`)
            .then((response) => {
                setUser(response.data);
            })
    }, [userId])

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        const firstName = (e.target as any).firstName.value;
        const lastName = (e.target as any).lastName.value;
        const password = (e.target as any).password.value;

        const config: AxiosRequestConfig = {
            baseURL: BASE_URL,
            url: "/user/update",
            method: "PUT",
            data: {
                id: userId,
                firstName: firstName,
                lastName: lastName,
                password: password
            }
        }
        try {
            axios(config).then(response => {
                setMessage(response.data);
                if (response.data === 'Cadastrado') {
                    navigate('/');
                } else {
                    setMessage('Dados inválidos');
                }
            })
        } catch (error) {
            setMessage('Dados inválidos');
        }

    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Editar</div>
                        <div className="card-body">
                            {message && <div className="alert alert-info">{message}</div>}
                            <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                    <label>Nome</label>
                                    <input type="text" className="form-control" id="firstName"/>
                                </div>
                                <div className="form-group">
                                    <label>Sobrenome</label>
                                    <input type="text" className="form-control" id="lastName"/>
                                </div>
                                <div className="form-group">
                                    <label>Senha</label>
                                    <input type="password" id="password" className="form-control"/>
                                </div>
                                <button type="submit" className="btn btn-primary">Editar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};