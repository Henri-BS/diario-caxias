import axios from "axios";
import { CategoryEditForm } from "components/forms/CategoryForm";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Category, CategoryProps } from "types/category";
import { Props } from "types/main";
import { BASE_URL } from "utils/requests";

export function CategoryMdCard({ category }: CategoryProps) {

    return (
        <>
            <Link to={`/categoria/${category.id}`} className="text-decoration-none">
                <div className="card border-0">
                    <img src={category.image} className="card-img-top " alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{category.name}</h5>
                        <p className="card-text">{category.description}</p>
                    </div>
                </div>
            </Link>
        </>
    );
}

export function CategoryCard({ category }: CategoryProps) {
    return (
        <Link to={`/categoria/${category.id}`} className="text-decoration-none">
        <div className="card card-profile border-0 disable-text-selection">
            <div className="card-avatar">
                <img className="img" src={category.image} />
            </div>
            <div className="card-body">
                <h6 className="card-title">{category.name}</h6>
            </div>
        </div>
        </Link>
    );
}

export function CategoryLgCard({ id: categoryId }: Props) {

    const navigate = useNavigate();
    const params = useParams();
    const [category, setCategory] = useState<Category>();
    useEffect(() => {
        axios.get(`${BASE_URL}/category/${categoryId}`)
            .then((response) => {
                setCategory(response.data);
            });
    }, [categoryId]);

    const deleteCategory = () => {
        axios.delete(`${BASE_URL}/category/delete/${categoryId}`)
            .then((response) => {
                navigate("/categorias");
            })
    }

    return (
        <>
            <div className="card mb-3" >
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={category?.image} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{category?.name}</h5>
                            <p className="card-text">{category?.description}</p>
                        </div>
                    </div>
                </div>
            </div>
            <nav className="d-flex justify-content-start">
                <button className="btn btn-primary" data-bs-target="#categoryEditModal" data-bs-toggle="modal">
                    Editar
                </button>
                <button className="btn btn-danger" data-bs-target="#categoryDeleteModal" data-bs-toggle="modal">
                    Deletar
                </button>
            </nav>
            <div className="modal fade" id="categoryEditModal" role={"dialog"}>
                <div className="modal-dialog" role={"document"}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="modal-title">Editar</label>
                        </div>
                        <div className="modal-body"><CategoryEditForm id={`${params.categoryId}`} /></div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="categoryDeleteModal" role={"dialog"}>
                <div className="modal-dialog" role={"document"}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="modal-title">Deseja deletar esta categoria ?</label>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="text-close" data-bs-dismiss="modal">cancelar</button>
                            <button onClick={() => deleteCategory()} data-bs-dismiss="modal" className="btn btn-danger" >Deletar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
