import { EventCard } from "components/cards/EventCard";
import { Pagination, SearchBar } from "components/shared/Pagination";
import { EventMockList } from "mock/MockList";
import { EventPage } from "resources/event";
import { useEffect, useState } from "react";
import { removeAccents } from "components/shared/Template";
import { baseUrl } from "utils/requests";
import axios from "axios";
import { FaCalendarCheck } from "react-icons/fa6";

export default function Events() {
    const [query, setQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber);
    }
    const [eventPage, setEventPage] = useState<EventPage>({ content: [], page: { number: 0, totalElements: 0 } });

    useEffect(() => {
        axios.get(`${baseUrl}/events?query=${query}&page=${pageNumber}&size=12`)
            .then((response) => {
                setEventPage(response.data);
            });
    }, [query, pageNumber]);

    return (
        <>
            {!eventPage.content.length ? <EventMockList /> :
                <div className="mt-10">
                    <SearchBar
                        pageIcon={<FaCalendarCheck />}
                        pageTitle="Eventos"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="flex items-center w-full justify-center">
                        <Pagination pagination={eventPage} onPageChange={handlePageChange} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
                        {eventPage.content?.filter((event) =>
                            event.eventTitle?.toUpperCase().includes(query.toLocaleUpperCase()) ||
                            removeAccents(event.eventTitle)?.toUpperCase().includes(query.toLocaleUpperCase())
                        ).map(event => (
                            <div key={event.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                                <EventCard event={event} />
                            </div>
                        ))}
                    </div>
                </div>
            }
        </>
    );
}