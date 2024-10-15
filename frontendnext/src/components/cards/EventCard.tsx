'use client'

import { EventProps } from "@/resources/event";
import Link from "next/link";

export const EventCard = ({ event }: EventProps) => {
    return (
        <Link href={`/eventos/${event.id}`} key={event.id} className="flex flex-col max-h-70 items-center bg-zinc-100 border border-zinc-300 rounded-xl shadow-md md:flex-row md:max-w-full transition duration-700 hover:shadow-xl hover:scale-105">
            <img className="object-cover w-full rounded-t-xl h-70 md:h-100 md:w-80 md:rounded-none md:rounded-s-xl" src={event.imageUrl} />
            <div className="flex flex-col justify-between py-8 leading-normal">
                <h3 className="mb-2 text-xl text-gray-900 font-semibold">{event.title}</h3>
                <p className="mb-3 font-normal text-gray-700 text-clip overflow-hidden ">Projeto: {event.projectTitle}</p>
                <p className="mb-3 font-normal text-gray-700 text-clip overflow-hidden ">Data: {event.date}</p>
            </div>
        </Link>
    );
}