import axios from "axios";
import { UserEditForm } from "components/forms/UserForm";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { User, UserProps } from "types/user";
import { Props } from "types/main";
import { BASE_URL } from "utils/requests";


export function UserCard({user}: UserProps) {
    return (
        <Link to={`/usuario/${user.id}`} className="text-decoration-none">
        <div className="card user-md-card user-card">
            <div className="card-block">
                <div className="user-image">
                    <img src={user.image} className="img-radius" alt="User-Profile-Image" />
                </div>
                <h6 className="f-w-600 m-t-25 m-b-10">{user.username}</h6>
                <p className="text-muted">Active | Male | Born 23.05.1992</p>
                <hr/>
                <p className="m-t-15 text-muted">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <hr/>
                <div className="row justify-content-center user-social-link">
                    <div className="col-auto"><a href="#!"><i className="fa fa-facebook text-facebook"></i></a></div>
                    <div className="col-auto"><a href="#!"><i className="fa fa-twitter text-twitter"></i></a></div>
                    <div className="col-auto"><a href="#!"><i className="fa fa-dribbble text-dribbble"></i></a></div>
                </div>
            </div>
        </div>
    </Link>
    );
}

export function UserMdCard({user }: UserProps) {

    return (
        <>
            <Link to={`/usuario/${user.id}`} className="text-decoration-none">
                <div className="card">
                    <img src={user.image} className="" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{user.username}</h5>
                    </div>
                </div>
            </Link>
        </>
    );
}



export function UserLgCard({ id: userId }: Props) {

    const navigate = useNavigate();
    const params = useParams();
    const [user, setUser] = useState<User>();
    useEffect(() => {
        axios.get(`${BASE_URL}/api/user/${userId}`)
            .then((response) => {
                setUser(response.data);
            });
    }, [userId]);

    const deleteUser = () => {
        axios.delete(`${BASE_URL}/user/delete/${userId}`)
            .then((response) => {
                navigate("/usuarios");
            })
    }

    return (
        <>
            <div className="card mb-3" >
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={user?.image} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{user?.username}</h5>
                        </div>
                    </div>
                </div>
            </div>
            <nav className="d-flex justify-content-start">
                <button className="btn btn-primary" data-bs-target="#userEditModal" data-bs-toggle="modal">
                    Editar
                </button>
                <button className="btn btn-danger" data-bs-target="#userDeleteModal" data-bs-toggle="modal">
                    Deletar
                </button>
            </nav>
            <div className="modal fade" id="userEditModal" role={"dialog"}>
                <div className="modal-dialog" role={"document"}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="modal-title">Editar</label>
                        </div>
                        {/*<div className="modal-body"><UserEditForm id={`${params.userId}`} /></div>*/}
                    </div>
                </div>
            </div>

            <div className="modal fade" id="userDeleteModal" role={"dialog"}>
                <div className="modal-dialog" role={"document"}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="modal-title">Deseja deletar esta conta ?</label>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="text-close" data-bs-dismiss="modal">cancelar</button>
                            <button onClick={() => deleteUser()} data-bs-dismiss="modal" className="btn btn-danger" >Deletar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
