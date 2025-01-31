import * as GoIcons from "react-icons/go";

import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa6";
import { Accordion } from "flowbite-react";
import moment from "moment";
import { UserCard } from "components/cards/UserCard";
import { Pagination } from "components/shared/Pagination";
import { Event, useEventService } from "resources/event";
import { UserPage } from "resources/user";
import { EventMockProfile } from "mock/MockProfile";
import { Props } from "resources";
import { useParams } from "react-router-dom";


export function EventProfile() {
    const params = useParams();
    return (
        <>
            <EventDetails params={`${params.eventTitle}`} />
        </>
    );
}

export function EventDetails({ params: eventTitle }: Props) {
    const eventService = useEventService();
    const [event, setEvent] = useState<Event>();

    useEffect(() => {
        eventService.findEventById(eventTitle)
            .then((response) => {
                setEvent(response);
            });
    }, [eventTitle]);

    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber);
    }

    const [userPage, setUserPage] = useState<UserPage>({ content: [], page: { number: 0, totalElements: 0 } });
    useEffect(() => {
        eventService.findUsersByEvent(eventTitle, pageNumber)
            .then((response) => {
                setUserPage(response);
            });
    }, [eventTitle, pageNumber]);

    return (
        <>
            {!event ? <EventMockProfile params={eventTitle} /> :
                <div className="mt-10">
                    <div className="relative flex flex-col sm:flex-row xl:flex-col items-start">
                        <div className="order-1 sm:ml-6 xl:ml-0">
                            <h3 className="mb-1 text-slate-900 font-semibold">
                                <span className="mb-1 block text-2xl leading-6 text-indigo-500">{event?.eventTitle}</span>
                            </h3>
                            <div>
                                <p className="flex gap-2 items-center text-center text-lg font-semibold text-gray-700">
                                    <FaIcons.FaFolderClosed /> Projeto: {event?.projectTitle}
                                </p>
                                <p className="flex gap-2 items-center text-center text-lg font-semibold text-gray-700">
                                    <GoIcons.GoCalendar /> Data do evento: {moment(event?.eventDate).format("DD/MM/yyyy")}
                                </p>
                                <p className="flex gap-2 items-center text-center text-lg font-semibold text-gray-700">
                                    <GoIcons.GoChecklist /> Status: {event?.eventStatus}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <img src={event?.eventImage} className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full" width="1216" height="640" />
                            <p className="flex gap-2 mt-2 items-center text-center text-sm font-medium text-gray-700">
                                enviado em: {event?.createdDate}
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 prose prose-slate prose-lg text-slate-800 text-justify">
                        <p>{event?.eventDescription} </p>
                    </div>
                    <Accordion collapseAll className="mt-12 ">
                        <Accordion.Panel>
                            <Accordion.Title>
                                <h2 className="flex flex-row gap-2 mt-5 text-2xl text-zinc-800 "><FaIcons.FaUser />Usuários Relacionados</h2>
                            </Accordion.Title>
                            <Accordion.Content className="p-2">
                                <div className="flex items-center w-full justify-center">
                                    <Pagination pagination={userPage} onPageChange={handlePageChange} />
                                </div>
                                <div className="  grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
                                    {userPage.content?.map(user => (
                                        <div key={user?.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                                            <UserCard user={user} />
                                        </div>
                                    ))}
                                </div>
                            </Accordion.Content>
                        </Accordion.Panel>
                    </Accordion>
                </div>
            }
        </>
    );
}
