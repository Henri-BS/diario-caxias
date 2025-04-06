import { EventProps } from "resources/event";
import * as GoIcons from "react-icons/go";
import moment from "moment";
import { Link } from "react-router-dom";

export const EventCard = ({ event }: EventProps) => {
    return (
        <Link to={`/eventos/${event.eventId}`}
            className="flex flex-row items-center bg-zinc-100 border border-zinc-300 p-2 rounded-xl shadow-md transition duration-700 hover:shadow-xl hover:scale-105">
            <img className="object-cover rounded-t-xl h-24 md:w-40 md:h-40" src={event.eventImage ? event.eventImage : require("assets/img/image.png")} alt={event.eventTitle} />
            <div>
                <h5 title={event.eventTitle} className="h-12 max-w-[400px] md:h-14 text-md md:text-lg font-semibold tracking-tight text-gray-900 overflow-hidden">
                    {event.eventTitle}
                </h5>
                <div className="h-6 overflow-hidden">
                    <Link title={`Projeto: ${event.projectTitle}`} to={`/projetos/${event.projectId}`} className="text-md text-gray-500 overflow-hidden hover:underline">
                        {event.projectTitle}
                    </Link>

                </div>
                <div className="mt-4 flex flex-col md:flex-row md:mt-10 justify-between text-sm font-medium text-gray-700">
                    <p title="Data do Evento" className="flex gap-2 items-center text-center">
                        <GoIcons.GoCalendar /> {moment(event.eventDate).format("DD/MM/yyyy")}
                    </p>
                    <p title="Status do Evento" className="flex gap-2 items-center text-center">
                        <GoIcons.GoChecklist /> {event.eventStatus}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export const EventSmCard = ({ event }: EventProps) => {
    return (
        <Link to={`/eventos/${event.eventId}`}>
            <div className="flex items-center space-x-4 rtl:space-x-reverse  py-1 sm:py-2 hover:bg-slate-200 transition duration-500 hover:shadow-lg rounded-md">
                <img src={event.eventImage ? event.eventImage : require("assets/img/image.png")} alt="postagem" className="h-16 w-16 md:h-24 md:w-24 rounded-md" />
                <div className="flex flex-col">
                    <h3 title={event.eventTitle} className="inline-flex font-semibold text-gray-700 h-12 overflow-hidden">{event.eventTitle}</h3>
                    <p className=" text-gray-600 max-h-12 overflow-hidden">
                        Projeto: <Link to={`/projetos/${event.projectId}`} className="hover:underline"> {event?.projectTitle}</Link>
                    </p>
                </div>
            </div>
        </Link>
    );
}
