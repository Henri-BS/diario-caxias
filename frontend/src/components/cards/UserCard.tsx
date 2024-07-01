import axios from "axios";
import { UserEditForm } from "components/forms/UserForm";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { User, UserProps } from "types/user";
import { Props } from "types/main";
import { BASE_URL } from "utils/requests";

export function UserMdCard({user }: UserProps) {

    return (
        <>
            <Link to={`/usuario/${user.id}`} className="text-decoration-none">
                <div className="card">
                    <img src={user.image} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{user.firstName} {user.lastName}</h5>
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
        axios.get(`${BASE_URL}/user/${userId}`)
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
                            <h5 className="card-title">{user?.firstName} {user?.lastName}</h5>
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
                        <div className="modal-body"><UserEditForm id={`${params.userId}`} /></div>
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
