import axios from "axios";
import { EventCard } from "components/cards/EventCard";
import { ProjectLgCard } from "components/cards/ProjectCard";
import Pagination from "components/shared/Pagination";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { EventPage } from "types/event";
import { Props } from "types/main";
import { BASE_URL } from "utils/requests";

export function ProjectProfile() {

    const params = useParams();

    return (
        <>
            <ProjectLgCard id={`${params.projectId}`} />
            <hr />
            <div className="container">
                <EventListByProject id={`${params.projectId}`} />
            </div>
        </>
    );

    function EventListByProject({ id: projectId }: Props) {
        const [value, setValue] = useState("");
        const [pageNumber, setPageNumber] = useState(0);
        const handlePageChange = (newPageNumber: number) => {
            setPageNumber(newPageNumber);
        }
        const [eventPage, setEventPage] = useState<EventPage>({ content: [], number: 0 });
        useEffect(() => {
            axios.get(`${BASE_URL}/event/list-by-project/${projectId}?title=${value}&page=${pageNumber}&size=10`)
                .then((response) => {
                    setEventPage(response.data);
                });
        }, [projectId, value, pageNumber]);

        return (
            <>
                <div className="card-sm-box mt-5">
                    <div className="row py-3 d-flex justify-content-between">
                        <h4 className="col-12 col-md-4 col-xl-3 mb-2 card-title">Eventos <i className="bi bi-calendar2-check" /></h4>
                        <div className="col-12 col-md-4 col-xl-3 mb-2" >
                            <Pagination page={eventPage} onPageChange={handlePageChange} />
                        </div>
                        <div className="col-12 col-md-4 col-xl-3 mb-2" >
                            <div className="form-group d-flex justify-content-between">
                                <i className="bi bi-search m-1" />
                                <input
                                    type="text"
                                    id="value"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    className="form-control"
                                    placeholder="buscar eventos..."
                                />
                            </div>
                        </div>
                    </div>
                    {eventPage.empty ? <h5>Nenhum Item Adicionado</h5> :
                        <div className="row">
                            {eventPage.content?.filter((x) =>
                                x.title.toUpperCase().includes(value.toLocaleUpperCase()))
                                .map(x => (
                                    <div key={x.id} className="col-12 mb-2">
                                        <EventCard event={x} />
                                    </div>
                                ))}
                        </div>
                    }
                </div>
            </>
        );
    }
}