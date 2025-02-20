import { EventProps } from "resources/event";
import * as GoIcons from "react-icons/go";
import moment from "moment";
import { Link } from "react-router-dom";

export const EventCard = ({ event }: EventProps) => {
    return (
        <Link to={`/eventos/${event.id}`}
            className="max-w-sm bg-zinc-100 border border-zinc-300 p-4 rounded-xl shadow-md transition duration-700 hover:shadow-xl hover:scale-105">
            <img className="object-cover w-full rounded-t-xl h-52 md:h-72" src={event.eventImage ?? "https://cdn1.iconfinder.com/data/icons/dashboard-ui-vol-1/48/JD-46-512.png"} alt={event.eventTitle} />
            <hr />
            <h5 title={event.eventTitle} className="h-14 text-lg font-semibold tracking-tight text-gray-900 text-ellipsis overflow-hidden">
                {event.eventTitle}
            </h5>
            <span className="text-md text-gray-500">{event.projectTitle}</span>
            <div className="mt-4 flex space-x-3 lg:mt-6 justify-between">
                <p className="flex gap-2 items-center text-center text-sm font-medium text-gray-700">
                    <GoIcons.GoCalendar /> {moment(event.eventDate).format("DD/MM/yyyy")}
                </p>
                <p className="flex gap-2 items-center text-center text-sm font-medium text-gray-700">
                    <GoIcons.GoChecklist /> {event.eventStatus}
                </p>
            </div>
        </Link>
    );
}