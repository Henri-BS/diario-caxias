import axios from "axios";
import { EventAddForm } from "components/forms/EventForm";
import { ProjectEditForm } from "components/forms/ProjectForm";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Props } from "types/main";
import { Project, ProjectProps } from "types/project";
import { BASE_URL } from "utils/requests";

export function ProjectMdCard({ project }: ProjectProps) {

    return (
        <>
            <Link to={`/projeto/${project.id}`} className="text-decoration-none">
                <div className="card card-lg-container" >
                    <div className="row g-0">
                        <div className="col-5 card-lg-img">
                            <img src={project?.image} className=" img-fluid rounded-start" width={"200"} height={"200"} alt="..." />
                        </div>
                        <div className="col-7">
                            <div className="card-body">
                                <h5 className="card-title">{project?.title}</h5>
                                <p className="card-text">{project.userFirstName} {project.userLastName}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}


export function ProjectLgCard({ id: projectId }: Props) {

    const navigate = useNavigate();
    const params = useParams();
    const [project, setProject] = useState<Project>();
    useEffect(() => {
        axios.get(`${BASE_URL}/project/${projectId}`)
            .then((response) => {
                setProject(response.data);
            });
    }, [projectId]);

    const deleteProject = () => {
        axios.delete(`${BASE_URL}/project/delete/${projectId}`)
            .then((response) => {
                navigate("/projetos");
            })
    }

    return (
        <>
            <div className="card border-0 mb-3" >
                <div className="row g-0">
                    <div className="col-md-5">
                        <img src={project?.image} className="img-fluid rounded-bottom " alt="..." />
                    </div>
                    <div className="col-md-7">
                        <div className="card-body">

                            <div className="d-flex justify-content-between">
                                <h1 className="card-title">{project?.title}</h1>
                                <button className="btn link-primary" data-bs-target="#menuProjectModal" data-bs-toggle="modal">
                                    <h2><i className="close bi bi-list" /></h2> 
                                </button>
                            </div>
                            <h4 className="card-text">
                                Criador:
                                <Link to={`/usuario/${project?.userId}`} >
                                    {project?.userFirstName} {project?.userLastName}
                                </Link>
                            </h4>
                        </div>


                    </div>
                </div>
            </div>
            <h3 className="p-3">{project?.body}</h3>

            <div className="modal fade" id="menuProjectModal" role={"dialog"}>
                <div className="modal-dialog" role={"document"}>
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-between">
                            <label className="modal-title">Menu</label>
                            <div>
                            <button className="btn btn-primary m-1" data-bs-toggle="modal" data-bs-target="#projectEditModal" data-bs-dismiss="modal">
                            <i className=" bi bi-pencil"/> Editar
                                </button>
                            <button className="btn btn-danger m-1" data-bs-toggle="modal" data-bs-target="#projectDeleteModal" data-bs-dismiss="modal">
                                <i className="bi bi-trash"/> Deletar
                            </button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="list-group">
                                <button className="list-group-item list-group-item-action" data-bs-toggle="modal" data-bs-target="#eventAddModal">
                                    Adicionar Evento <i className="bi bi-calendar2-check"/>
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="eventAddModal" role={"dialog"}>
                <div className="modal-dialog" role={"document"}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="modal-title">Adicionar um novo evento</label>
                            <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body"><EventAddForm id={projectId} /></div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="projectEditModal" role={"dialog"}>
                <div className="modal-dialog" role={"document"}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="modal-title">Editar</label>
                            <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body"><ProjectEditForm id={`${params.projectId}`} /></div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="projectDeleteModal" role={"dialog"}>
                <div className="modal-dialog" role={"document"}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="modal-title">Deseja deletar este projeto ?</label>
                            <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">cancelar</button>
                            <button onClick={() => deleteProject()} data-bs-dismiss="modal" className="btn btn-danger" >Deletar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
