'use client'

import { EventCard } from "@/components/card/eventCard";
import { Pagination } from "@/components/pagination";
import { Template } from "@/components/template";
import { EventMockList } from "@/mock/mockList";
import { EventPage, useEventService } from "@/resources/event";
import { TextInput } from "flowbite-react";
import { useEffect, useState } from "react";


export default function Events() {
    const [query, setQuery] = useState("");
    const eventService = useEventService();
    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber);
    }
    const [eventPage, setEventPage] = useState<EventPage>({ content: [], page: { number: 0, totalElements: 0 } });

    useEffect(() => {
        eventService.findEvents(pageNumber, query)
            .then((response) => {
                setEventPage(response);
            });
    }, [pageNumber, query]);

    return (
        <>
            <Template>
                {!eventPage.content.length ? <EventMockList /> :
                    <div>
                        <div className="flex items-center justify-between my-5">
                            <div className="flex space-x-4 px-4">
                                <TextInput className="w-full"
                                    color="bg-zinc-400"
                                    type="text"
                                    id="query"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="buscar eventos..."
                                />
                            </div>
                        </div>
                        <div className="flex items-center w-full justify-center">
                            <Pagination pagination={eventPage} onPageChange={handlePageChange} />
                        </div>
                        <div className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
                            {eventPage.content?.filter((event) =>
                                event.eventTitle?.toUpperCase().includes(query.toLocaleUpperCase()))
                                .map(event => (
                                    <div key={event.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                                        <EventCard event={event} />
                                    </div>
                                ))}
                        </div>
                    </div>
                }
            </Template>
        </>
    );
}