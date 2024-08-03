import axios, { AxiosRequestConfig } from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Props } from "types/main";
import { Project } from "types/project";
import { BASE_URL } from "utils/requests";

export function ProjectAddForm() {
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const title = (e.target as any).title.value;
        const image = (e.target as any).image.value;
        const body = (e.target as any).body.value;

        const config: AxiosRequestConfig = {
            baseURL: BASE_URL,
            method: "POST",
            url: "/project/save",
            data: {
                title: title,
                image: image,
                body: body
            }
        };
        axios(config).then(response => {
            navigate(0);
        })
    }

    return (
        <form className=" form-container" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Título: </label>
                <input type="text" className="form-control" id="title" />
            </div>

            <div className="form-group">
                <label htmlFor="image">Imagem: </label>
                <input type="text" className="form-control" id="image" />
            </div>

            <div className="form-group">
                <label htmlFor="body">Descrição: </label>
                <textarea className="form-control" id="body"></textarea> 
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">cancelar</button>
                <button type="submit" className="btn btn-success">Adicionar</button>
            </div>
        </form>
    );
}

export function ProjectEditForm({ id: projectId }: Props) {

    const [project, setProject] = useState<Project>();
    useEffect(() => {
        axios.get(`${BASE_URL}/project/${projectId}`)
            .then((response) => {
                setProject(response.data);
            })
    }, [projectId])

    const navigate = useNavigate();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const title = (e.target as any).title.value;
        const image = (e.target as any).image.value;
        const body = (e.target as any).body.value;

        const config: AxiosRequestConfig = {
            baseURL: BASE_URL,
            method: "PUT",
            url: "/project/update",
            data: {
                id: projectId,
                title: title,
                image: image,
                body: body
            }
        };
        axios(config).then(response => {
            navigate(0);
        })
    }

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Título: </label>
                <input type="text" className="form-control" id="title" defaultValue={project?.title}/>
            </div>

            <div className="form-group">
                <label htmlFor="image">Imagem: </label>
                <input type="text" className="form-control" id="image" defaultValue={project?.image}/>
            </div>

            <div className="form-group">
                <label htmlFor="body">Descrição: </label>
                <textarea className="form-control" id="body" defaultValue={project?.body}></textarea> 
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">cancelar</button>
                <button type="submit" className="btn btn-success">Editar</button>
            </div>
        </form>
    );
}