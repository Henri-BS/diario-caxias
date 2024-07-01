import axios, { AxiosRequestConfig } from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Category } from "types/category";
import { Props } from "types/main";
import { BASE_URL } from "utils/requests";

export function CategoryAddForm() {
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const name = (event.target as any).name.value;
        const image = (event.target as any).image.value;
        const description = (event.target as any).description.value;

        const config: AxiosRequestConfig = {
            baseURL: BASE_URL,
            method: "POST",
            url: "/category/save",
            data: {
                name: name,
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
                <button type="button" className="text-close" data-bs-dismiss="modal">cancelar</button>
                <button type="submit" className="btn btn-success">Adicionar</button>
            </div>
        </form>
    );
}

export function CategoryEditForm({ id: categoryId }: Props) {

    const [category, setCategory] = useState<Category>();
    useEffect(() => {
        axios.get(`${BASE_URL}/category/${categoryId}`)
            .then((response) => {
                setCategory(response.data);
            })
    }, [categoryId])

    const navigate = useNavigate();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const name = (event.target as any).name.value;
        const image = (event.target as any).image.value;
        const description = (event.target as any).description.value;

        const config: AxiosRequestConfig = {
            baseURL: BASE_URL,
            method: "PUT",
            url: "/category/update",
            data: {
                id: categoryId,
                name: name,
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
                <label htmlFor="name">Título: </label>
                <input type="text" className="form-control" id="name" defaultValue={category?.name}/>
            </div>

            <div className="form-group">
                <label htmlFor="image">Imagem: </label>
                <input type="text" className="form-control" id="image" defaultValue={category?.image}/>
            </div>

            <div className="form-group">
                <label htmlFor="description">Descrição: </label>
                <input className="form-control" id="description" defaultValue={category?.description}/>
            </div>
            <div className="modal-footer">
                <button type="button" className="text-close" data-bs-dismiss="modal">cancelar</button>
                <button type="submit" className="btn btn-success">Editar</button>
            </div>
        </form>
    );
}