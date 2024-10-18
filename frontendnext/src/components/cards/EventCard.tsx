'use client'

import { EventCategoryProps, EventProps } from "@/resources/event";
import { Card } from "flowbite-react";
import Link from "next/link";
import * as GoIcons from "react-icons/go";

export const EventCard = ({ event }: EventProps) => {
    return (
        <Link href={`/eventos/${event.id}`} key={event.id} className="  rounded-xl shadow-md transition duration-700 hover:shadow-xl hover:scale-105">
            <Card
                className="max-w-sm bg-zinc-100 border border-zinc-300"
                imgAlt=""
                imgSrc={event.image ? event.image : "https://cdn1.iconfinder.com/data/icons/dashboard-ui-vol-1/48/JD-46-512.png"}
            >
                <h5 className="text-xl font-bold tracking-tight text-gray-900 ">
                    {event.title}
                </h5>
                <span className="text-md text-gray-500 dark:text-gray-400">{event.projectTitle}</span>

                <div className="mt-4 flex space-x-3 lg:mt-6 justify-between">
                    <p className="flex gap-2 items-center text-center text-sm font-medium text-gray-700">
                        <GoIcons.GoCalendar/> {event.date}
                    </p>
                    <p className="flex gap-2 items-center text-center text-sm font-medium text-gray-700">
                        <GoIcons.GoChecklist/> {event.status}
                    </p>
                </div>
            </Card>

        </Link>
    );
}

export const EventCategoryCard = ({ eventCategory }: EventCategoryProps) => {
    return (
        <Link href={`/eventos/${eventCategory.eventId}`} className="  rounded-xl shadow-md transition duration-700 hover:shadow-xl hover:scale-105">
            <Card
                className="max-w-sm bg-zinc-100 border border-zinc-300"
                imgAlt=""
                imgSrc={eventCategory.eventImage ? eventCategory.eventImage : "https://cdn1.iconfinder.com/data/icons/dashboard-ui-vol-1/48/JD-46-512.png"}
            >
                <h5 className="text-xl font-bold tracking-tight text-gray-900 ">
                    {eventCategory.eventTitle}
                </h5>
                <span className="text-md text-gray-500 dark:text-gray-400">{eventCategory.eventProjectTitle}</span>

                <div className="mt-4 flex space-x-3 lg:mt-6 justify-between">
                    <p className="flex gap-2 items-center text-center text-sm font-medium text-gray-700">
                        <GoIcons.GoCalendar/> {eventCategory.eventDate}
                    </p>
                    <p className="flex gap-2 items-center text-center text-sm font-medium text-gray-700">
                        <GoIcons.GoChecklist/> {eventCategory.eventStatus}
                    </p>
                </div>
            </Card>

        </Link>
    );
}