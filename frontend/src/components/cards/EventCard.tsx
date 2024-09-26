import axios from "axios";
import { EventAddForm, EventCategoryAddForm, EventEditForm } from "components/forms/EventForm";
import moment from "moment";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Event, EventCategoryProps, EventProps } from "types/event";
import { Props } from "types/main";
import { BASE_URL } from "utils/requests";

export function EventCard({ event }: EventProps) {

    return (
        <>
            <Link to={`/evento/${event.id}`} className="text-decoration-none">
                <div className="card card-lg-container ">
                    <div className="row">
                        <h4 className="card-title p-2 mx-4">{event.title}</h4>
                        <img className="img-fluid col-4 col-md-2" src={event.image} alt="event-image" />
                        <div className="card-body col-8 col-md-10">
                            <h5><i className="bi bi-calendar" /> Data: {moment(event.date).format("DD/MM/yyyy")}</h5>
                            <h5><i className="bi bi-image-alt" /> Temporada: {event.season}</h5>
                            <h5><i className="bi bi-check2-circle" /> Situação: {event.status}</h5>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}


export function EventLgCard({ id: eventId }: Props) {

    const navigate = useNavigate();
    const params = useParams();
    const [event, setEvent] = useState<Event>();
    useEffect(() => {
        axios.get(`${BASE_URL}/event/${eventId}`)
            .then((response) => {
                setEvent(response.data);
            });
    }, [eventId]);

    const deleteEvent = () => {
        axios.delete(`${BASE_URL}/event/delete/${eventId}`)
            .then((response) => {
                navigate(0);
            })
    }

    return (
        <>
            <div className="card border-0 mb-3" >
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={event?.image} className="img-fluid rounded-bottom " alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">

                            <div className="d-flex justify-content-between">
                                <h1 className="card-title">{event?.title}</h1>
                                <button className="btn link-primary" data-bs-target="#menuEventModal" data-bs-toggle="modal">
                                    <h2><i className="close bi bi-list" /></h2>
                                </button>
                            </div>
                            <div className="card-body col-8 col-md-10">
                                <h4><i className="bi bi-calendar" /> Data: {moment(event?.date).format("DD/MM/yyyy")}</h4>
                                <h4><i className="bi bi-image-alt" /> Temporada: {event?.season}</h4>
                                <h4><i className="bi bi-check2-circle" /> Situação: {event?.status}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h3 className="p-3">{event?.description}</h3>

            <div className="modal fade" id="menuEventModal" role={"dialog"}>
                <div className="modal-dialog" role={"document"}>
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-between">
                            <label className="modal-title">Menu</label>
                            <div>
                                <button className="btn btn-primary m-1" data-bs-toggle="modal" data-bs-target="#eventEditModal" data-bs-dismiss="modal">
                                    <i className=" bi bi-pencil" /> Editar
                                </button>
                                <button className="btn btn-danger m-1" data-bs-toggle="modal" data-bs-target="#eventDeleteModal" data-bs-dismiss="modal">
                                    <i className="bi bi-trash" /> Deletar
                                </button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="list-group">
                                <button className="list-group-item list-group-item-action" data-bs-toggle="modal" data-bs-target="#eventCategoryAddModal">
                                    Adicionar Categoria <i className="bi bi-tag" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="eventCategoryAddModal" role={"dialog"}>
                <div className="modal-dialog" role={"document"}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="modal-title">Adicionar um novo evento</label>
                            <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body"><EventCategoryAddForm id={eventId} /></div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="eventEditModal" role={"dialog"}>
                <div className="modal-dialog" role={"document"}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="modal-title">Editar</label>
                            <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body"><EventEditForm id={`${params.eventId}`} /></div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="eventDeleteModal" role={"dialog"}>
                <div className="modal-dialog" role={"document"}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="modal-title">Deseja deletar este projeto ?</label>
                            <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">cancelar</button>
                            <button onClick={() => deleteEvent()} data-bs-dismiss="modal" className="btn btn-danger" >Deletar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export function EventCategoryCard({ eventCategory }: EventCategoryProps) {

    return (
        <>
            <Link to={`/event/${eventCategory.id}`} className="text-decoration-none">
                <abbr title={eventCategory.categoryName}>
                    <div className="category-card-container disable-text-selection">
                        {eventCategory.categoryName}
                    </div>
                </abbr>
            </Link>
        </>
    );
}

