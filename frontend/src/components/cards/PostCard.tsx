import axios from "axios";
import { PostEditForm } from "components/forms/PostForm";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Props } from "types/main";
import { Post, PostProps } from "types/post";
import { BASE_URL } from "utils/requests";

export function PostMdCard({ post }: PostProps) {

    return (
        <>
            <Link to={`/postagem/${post.id}`} className="text-decoration-none">
                <div className="card">
                    <img src={post.image} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <p className="card-text">{post.userId}</p>
                    </div>
                </div>
            </Link>
        </>
    );
}


export function PostLgCard({ id: postId }: Props) {

    const navigate = useNavigate();
    const params = useParams();
    const [post, setPost] = useState<Post>();
    useEffect(() => {
        axios.get(`${BASE_URL}/post/${postId}`)
            .then((response) => {
                setPost(response.data);
            });
    }, [postId]);

    const deletePost = () => {
        axios.delete(`${BASE_URL}/post/delete/${postId}`)
            .then((response) => {
                navigate("/postagens");
            })
    }

    return (
        <>
            <div className="card mb-3" >
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={post?.image} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{post?.title}</h5>
                            <p className="card-text">{post?.userId}</p>
                            <p className="card-text">
                                <Link to={`/dept/${post?.userId}`} className="text-decoration-none">{post?.userName}</Link>
                            </p>
                        </div>
                    </div>
                    <p>{post?.body}</p>
                </div>
            </div>
            <nav className="d-flex justify-content-start">
                <button className="btn btn-primary" data-bs-target="#postEditModal" data-bs-toggle="modal">
                    Editar
                </button>
                <button className="btn btn-danger" data-bs-target="#postDeleteModal" data-bs-toggle="modal">
                    Deletar
                </button>
            </nav>
            <div className="modal fade" id="postEditModal" role={"dialog"}>
                <div className="modal-dialog" role={"document"}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="modal-title">Editar</label>
                        </div>
                        <div className="modal-body"><PostEditForm id={`${params.postId}`} /></div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="postDeleteModal" role={"dialog"}>
                <div className="modal-dialog" role={"document"}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="modal-title">Deseja deletar este publicação ?</label>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="text-close" data-bs-dismiss="modal">cancelar</button>
                            <button onClick={() => deletePost()} data-bs-dismiss="modal" className="btn btn-danger" >Deletar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
