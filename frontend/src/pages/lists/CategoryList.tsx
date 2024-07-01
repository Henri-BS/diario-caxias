import axios from "axios";
import { CategoryMdCard } from "components/cards/CategoryCard";
import { PostMdCard } from "components/cards/PostCard";
import { CategoryAddForm } from "components/forms/CategoryForm";
import { PostAddForm } from "components/forms/PostForm";
import Pagination from "components/shared/Pagination";
import { useState, useEffect } from "react";
import { CategoryPage } from "types/category";
import { PostPage } from "types/post";
import { BASE_URL } from "utils/requests";

export function CategoryList() {
    const [value, setValue] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber);
    }

    const [categoryPage, setCategoryPage] = useState<CategoryPage>({
        content: [],
        number: 0
    });
    useEffect(() => {
        axios.get(`${BASE_URL}/category/list?page=${pageNumber}&name=${value}&size=20`)
            .then((response) => {
                setCategoryPage(response.data);
            });
    }, [pageNumber, value]);

    return (
        <>
            <div className="container">
                <nav className="navbar row m-0">
                    <div className="col-12 col-md-4 col-xl-4 mb-2" >
                        <button data-bs-target="#addCategoryModal" data-bs-toggle="modal" className="btn btn-success">Adicionar Categoria</button>
                    </div>
                    <div className="col-12 col-md-4 col-xl-3 mt-2" >
                        <Pagination page={categoryPage} onPageChange={handlePageChange} />
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
                    {categoryPage.content?.filter((x) =>
                        x.name.toUpperCase().includes(value.toLocaleUpperCase()))
                        .map(x => (
                            <div key={x.id} className="col-12 col-md-6 col-xl-3 mb-3">
                                <CategoryMdCard category={x} />
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