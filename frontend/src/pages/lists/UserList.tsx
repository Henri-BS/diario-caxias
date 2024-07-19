import axios from "axios";
import { UserCard, UserMdCard } from "components/cards/UserCard";
import { UserRegisterForm } from "components/forms/UserForm";
import Pagination from "components/shared/Pagination";
import { useEffect, useState } from "react";
import { UserPage } from "types/user";
import { BASE_URL } from "utils/requests";

export function UserList() {
    const [value, setValue] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber);
    }

    const [userPage, setUserPage] = useState<UserPage>({ content: [], number: 0 });
    useEffect(() => {
        axios.get(`${BASE_URL}/api/user/list?page=${pageNumber}&firstName=${value}&lastName=${value}&size=12`)
            .then((response) => {
                setUserPage(response.data);
            });
    }, [pageNumber, value, value]);

    return (
        <>
            <div className="container">
                <nav className="navbar row m-0">
                    <div className="col-12 col-md-4 col-xl-4 mb-2" >
                    <button data-bs-target="#addUserModal" data-bs-toggle="modal" className="btn btn-success">Adicionar Usuário</button>
                    </div>
                    <div className="col-12 col-md-4 col-xl-3 mt-2" >
                        <Pagination page={userPage} onPageChange={handlePageChange} />
                    </div>
                    <div className="col-12 col-md-4 col-xl-3 mb-2" >
                        <div className="form-group">
                            <input
                                type="text"
                                id="value"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className="form-control"
                                placeholder="buscar pessoas..."
                            />
                        </div>
                    </div>
                </nav >

                <div className="row">
                    {userPage.content?.filter((x) =>
                    x.firstName.toUpperCase().includes(value.toLocaleUpperCase()) ||
                    x.lastName.toUpperCase().includes(value.toLocaleUpperCase()) 
                    ) 
                        .map(x => (
                            <div key={x.id} className="col-12 col-md-6 col-xl-3 mb-3">
                                <UserCard user={x} />
                            </div>
                        ))}
                </div>
            </div>

            <div className="modal fade" id="addUserModal" role={"dialog"}>
                <div className="modal-dialog" role={"document"}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="modal-title">Cadastrar</label>
                            <button className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"><i className="fa fa-times" /></span>
                            </button>
                        </div>
                        <div className="modal-body"><UserRegisterForm /></div>
                    </div>
                </div>
            </div>
        </>
    );
}