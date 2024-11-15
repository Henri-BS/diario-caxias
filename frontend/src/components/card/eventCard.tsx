'use client'

import { EventProps } from "@/resources/event";
import Link from "next/link";
import * as GoIcons from "react-icons/go";
import moment from "moment";
export const EventCard = ({ event }: EventProps) => {
    return (
        <Link href={`/eventos/${event.id}`}
            className="max-w-sm bg-zinc-100 border border-zinc-300 p-4 rounded-xl shadow-md transition duration-700 hover:shadow-xl hover:scale-105">

            <img className="object-cover w-full rounded-t-xl h-60" src={event.eventImage ? event.eventImage : "https://cdn1.iconfinder.com/data/icons/dashboard-ui-vol-1/48/JD-46-512.png"} />
            <hr />
            <h5 className="h-32 text-xl font-bold tracking-tight text-gray-900">
                {event.eventTitle}
            </h5>
            <span className="text-md text-gray-500 dark:text-gray-400 overflow-hidden">{event.projectTitle}</span>

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