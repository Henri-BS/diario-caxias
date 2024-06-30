import axios, { AxiosRequestConfig } from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Props } from "types/main";
import { Post } from "types/post";
import { BASE_URL } from "utils/requests";

export function PostAddForm() {
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const title = (event.target as any).title.value;
        const image = (event.target as any).image.value;
        const body = (event.target as any).body.value;

        const config: AxiosRequestConfig = {
            baseURL: BASE_URL,
            method: "POST",
            url: "/post/save",
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
                <button type="button" className="text-close" data-bs-dismiss="modal">cancelar</button>
                <button type="submit" className="btn btn-success">Adicionar</button>
            </div>
        </form>
    );
}

export function PostEditForm({ id: postId }: Props) {

    const [post, setPost] = useState<Post>();
    useEffect(() => {
        axios.get(`${BASE_URL}/post/${postId}`)
            .then((response) => {
                setPost(response.data);
            })
    }, [postId])

    const navigate = useNavigate();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const title = (event.target as any).title.value;
        const image = (event.target as any).image.value;
        const body = (event.target as any).body.value;

        const config: AxiosRequestConfig = {
            baseURL: BASE_URL,
            method: "PUT",
            url: "/post/update",
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
                <input type="text" className="form-control" id="title" defaultValue={post?.title}/>
            </div>

            <div className="form-group">
                <label htmlFor="image">Imagem: </label>
                <input type="text" className="form-control" id="image" defaultValue={post?.image}/>
            </div>

            <div className="form-group">
                <label htmlFor="body">Descrição: </label>
                <input className="form-control" id="body" defaultValue={post?.body}/>
            </div>
            <div className="modal-footer">
                <button type="button" className="text-close" data-bs-dismiss="modal">cancelar</button>
                <button type="submit" className="btn btn-success">Editar</button>
            </div>
        </form>
    );
}