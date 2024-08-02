import axios from "axios";
import { ProjectMdCard } from "components/cards/ProjectCard";
import { ProjectAddForm } from "components/forms/ProjectForm";
import Pagination from "components/shared/Pagination";
import { useState, useEffect } from "react";
import { ProjectPage } from "types/project";
import { BASE_URL } from "utils/requests";

export function PostList() {
    const [value, setValue] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber);
    }

    const [projectPage, setProjectPage] = useState<ProjectPage>({ content: [], number: 0});
    useEffect(() => {
        axios.get(`${BASE_URL}/project/list?page=${pageNumber}&name=${value}&size=10`)
            .then((response) => {
                setProjectPage(response.data);
            });
    }, [pageNumber, value]);

    return (
        <>
            <div className="container">
                <nav className="navbar row m-0">
                    <div className="col-12 col-md-4 col-xl-4 mb-2" >
                        <button data-bs-target="#addProjectModal" data-bs-toggle="modal" className="btn btn-success">Adicionar Projeto</button>
                    </div>
                    <div className="col-12 col-md-4 col-xl-3 mt-2" >
                        <Pagination page={projectPage} onPageChange={handlePageChange} />
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
                    {projectPage.content?.filter((x) =>
                        x.title.toUpperCase().includes(value.toLocaleUpperCase()))
                        .map(x => (
                            <div key={x.id} className="col-12 col-md-6 mb-3">
                                <ProjectMdCard project={x} />
                            </div>
                        ))}
                </div>
            </div>

            <div className="modal fade" id="addPostModal" role={"dialog"}>
                <div className="modal-dialog" role={"document"}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="modal-title">Adicionar um novo projeto</label>
                            <button className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"><i className="fa fa-times" /></span>
                            </button>
                        </div>
                        <div className="modal-body"><ProjectAddForm /></div>
                    </div>
                </div>
            </div>
        </>
    );
}