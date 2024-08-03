import axios, { AxiosRequestConfig } from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Props } from "types/main";
import { Event } from "types/event";
import { BASE_URL } from "utils/requests";
import { Project } from "types/project";
import { CategoryDatalist } from "./DatalistForm";

export function EventAddForm({ id: projectId }: Props) {
    const navigate = useNavigate();

    const [project, setProject] = useState<Project>();
    useEffect(() => {
        axios.get(`${BASE_URL}/project/${projectId}`)
            .then((response) => {
                setProject(response.data);
            })
    }, [projectId]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const title = (e.target as any).title.value;
        const image = (e.target as any).image.value;
        const description = (e.target as any).description.value;

        const config: AxiosRequestConfig = {
            baseURL: BASE_URL,
            method: "POST",
            url: "/event/save",
            data: {
                title: title,
                image: image,
                description: description,
                projectId: projectId
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
                <label htmlFor="description">Descrição: </label>
                <textarea className="form-control" id="description"></textarea>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">cancelar</button>
                <button type="submit" className="btn btn-success">Adicionar</button>
            </div>
        </form>
    );
}

export function EventEditForm({ id: eventId }: Props) {

    const [event, setEvent] = useState<Event>();
    useEffect(() => {
        axios.get(`${BASE_URL}/event/${eventId}`)
            .then((response) => {
                setEvent(response.data);
            })
    }, [eventId])

    const navigate = useNavigate();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const title = (e.target as any).title.value;
        const image = (e.target as any).image.value;
        const description = (e.target as any).description.value;

        const config: AxiosRequestConfig = {
            baseURL: BASE_URL,
            method: "PUT",
            url: "/event/update",
            data: {
                id: eventId,
                title: title,
                image: image,
                description: description
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
                <input type="text" className="form-control" id="title" defaultValue={event?.title} />
            </div>

            <div className="form-group">
                <label htmlFor="image">Imagem: </label>
                <input type="text" className="form-control" id="image" defaultValue={event?.image} />
            </div>

            <div className="form-group">
                <label htmlFor="description">Descrição: </label>
                <input className="form-control" id="description" defaultValue={event?.description} />
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">cancelar</button>
                <button type="submit" className="btn btn-success">Editar</button>
            </div>
        </form>
    );
}

export function EventCategoryAddForm({ id: eventId }: Props) {

    const [event, setEvent] = useState<Event>();
    useEffect(() => {
        axios.get(`${BASE_URL}/event/${eventId}`)
            .then((response) => {
                setEvent(response.data);
            })
    }, [eventId])

    const navigate = useNavigate();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const categoryName = (e.target as any).categoryName.value;

        const config: AxiosRequestConfig = {
            baseURL: BASE_URL,
            method: "POST",
            url: "/event-category/save",
            data: {
                eventId: eventId,
                categoryId: categoryName
            }
        };
        axios(config).then(response => {
            navigate(0);
        })
    }

    return (
        <form className=" form-container" onSubmit={handleSubmit}>
            <div className="form-group">
                <CategoryDatalist />
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">cancelar</button>
                <button type="submit" className="btn btn-success">Adicionar</button>
            </div>
        </form>
    );
}