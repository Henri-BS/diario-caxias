import { EventProps } from "resources/event";
import * as GoIcons from "react-icons/go";
import moment from "moment";
import { Link } from "react-router-dom";

export const EventCard = ({ event }: EventProps) => {
    return (
        <Link to={`/eventos/${event.id}`}
            className="flex flex-col md:flex-row max-w-sm bg-zinc-100 border border-zinc-300 p-2 rounded-xl shadow-md transition duration-700 hover:shadow-xl hover:scale-105">
            <img className="object-cover  rounded-t-xl h-52 md:w-full md:h-36" src={event.eventImage ?? "https://cdn1.iconfinder.com/data/icons/dashboard-ui-vol-1/48/JD-46-512.png"} alt={event.eventTitle} />
            <div>
            <h5 title={event.eventTitle} className="h-14  text-lg font-semibold tracking-tight text-gray-900 text-ellipsis overflow-hidden">
                {event.eventTitle}
            </h5>
            <span className="text-md text-gray-500">{event.projectTitle}</span>
            <div className="mt-4 flex md:flex-col lg:mt-6 justify-between">
                <p title="Data do Evento" className="flex gap-2 items-center text-center text-sm font-medium text-gray-700">
                    <GoIcons.GoCalendar /> {moment(event.eventDate).format("DD/MM/yyyy")}
                </p>
                <p title="Status do Evento" className="flex gap-2 items-center text-center text-sm font-medium text-gray-700">
                    <GoIcons.GoChecklist /> {event.eventStatus}
                </p>
            </div>
            </div>
        </Link>
    );
}

export const EventSmCard = ({ event }: EventProps) => {
    return (
        <Link to={`/eventos/${event.id}`}>
            <div className="flex items-center space-x-4 rtl:space-x-reverse py-1 sm:py-2 hover:bg-zinc-100 transition duration-500 hover:shadow-lg rounded-md">
                <img src={event.eventImage} alt="postagem" className="h-24 w-24 rounded-md" />
                <div className="flex flex-col">
                    <h3 title={event.eventTitle} className="inline-flex font-semibold text-gray-900 h-12 overflow-hidden">{event.eventTitle}</h3>
                    <Link to={`/projetos/${event.projectId}`} className="text-gray-600 h-6 overflow-hidden hover:underline"> {event.projectTitle}</Link>
                </div>
            </div>
        </Link>
    );
}
