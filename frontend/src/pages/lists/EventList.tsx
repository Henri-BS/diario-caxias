import { EventCard } from "components/cards/EventCard";
import { Pagination, SearchBar } from "components/shared/Pagination";
import { EventPage } from "resources/event";
import { useEffect, useState } from "react";
import { removeAccents } from "components/shared/Template";
import { baseUrl } from "utils/requests";
import axios from "axios";
import * as FaIcons from "react-icons/fa6";
import { Breadcrumb } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Events() {
    const [query, setQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber);
    }
    const [eventPage, setEventPage] = useState<EventPage>({ content: [], page: { number: 0, totalElements: 0 } });

    useEffect(() => {
        axios.get(`${baseUrl}/events?page=${pageNumber}&size=12`)
            .then((response) => {
                setEventPage(response.data);
            });
    }, [query, pageNumber]);

    return (
        <div>
            <Breadcrumb aria-label="breadcrumb" className="mb-3 py-2">
                <Breadcrumb.Item icon={FaIcons.FaHouse}>
                    <Link to="/">
                        Início
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/eventos">
                        Eventos
                    </Link>
                </Breadcrumb.Item>
            </Breadcrumb>

            <div>
                <SearchBar
                    pageIcon={<FaIcons.FaCalendarCheck />}
                    pageTitle="Eventos"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <Pagination pagination={eventPage} onPageChange={handlePageChange} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4 items-start p-8">
                    {eventPage.content?.filter((event) =>
                        event.eventTitle?.toUpperCase().includes(query.toLocaleUpperCase()) ||
                        removeAccents(event.eventTitle)?.toUpperCase().includes(query.toLocaleUpperCase()) ||
                        event.projectTitle?.toUpperCase().includes(query.toLocaleUpperCase()) ||
                        removeAccents(event.projectTitle)?.toUpperCase().includes(query.toLocaleUpperCase())
                    ).map(event => (
                        <div key={event.eventId} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                            <EventCard event={event} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}