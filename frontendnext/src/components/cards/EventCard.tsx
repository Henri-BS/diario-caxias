'use client'

import { EventProps } from "@/resources/event.resource";
import Link from "next/link";

export const EventCard = ({ event }: EventProps) => {
    return (
        <Link href={`/eventos/${event.id}`} key={event.id} className="flex flex-col max-h-70 items-center bg-zinc-100 border border-zinc-300 rounded-xl shadow md:flex-row md:max-w-full hover:bg-zinc-300">
            <img className="object-cover w-full rounded-t-xl h-70 md:h-100 md:w-80 md:rounded-none md:rounded-s-xl" src={event.imageUrl} alt={event.title} />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h3 className="mb-2 text-slate-900 font-semibold">{event.title}</h3>
                <p className="mb-3 font-normal text-gray-700 text-clip overflow-hidden ">{event.description}</p>
            </div>
        </Link>
    );
}