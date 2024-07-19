import axios from "axios";
import { CategoryCard } from "components/cards/CategoryCard";
import { CategoryAddForm } from "components/forms/CategoryForm";
import Pagination from "components/shared/Pagination";
import { useState, useEffect } from "react";
import { Category, CategoryPage } from "types/category";
import { BASE_URL } from "utils/requests";

export function CategoryList() {
    const [value, setValue] = useState("");

    const [categoryList, setCategoryList] = useState<Category[]>();
    useEffect(() => {
        axios.get(`${BASE_URL}/category/list?name=${value}&size=20`)
            .then((response) => {
                setCategoryList(response.data);
            });
    }, [value]);

    return (
        <>
            <div className="container">
                <nav className="navbar row m-0">
                    <div className="col-12 col-md-4 col-xl-4 mb-2" >
                        <button data-bs-target="#addCategoryModal" data-bs-toggle="modal" className="btn btn-success">Adicionar Categoria</button>
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
                    {categoryList?.filter((x) =>
                        x.name.toUpperCase().includes(value.toLocaleUpperCase()))
                        .map(x => (
                            <div key={x.id} className="col-12 col-md-6 col-xl-3 mb-3">
                                <CategoryCard category={x} />
                            </div>
                        ))}
                </div>
            </div>

            <div className="modal fade" id="addCategoryModal" role={"dialog"}>
                <div className="modal-dialog" role={"document"}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="modal-title">Adicionar uma nova categoria</label>
                            <button className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"><i className="fa fa-times" /></span>
                            </button>
                        </div>
                        <div className="modal-body"><CategoryAddForm /></div>
                    </div>
                </div>
            </div>
        </>
    );
}