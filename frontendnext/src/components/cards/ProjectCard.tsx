'use client'

import { ProjectProps } from "@/resources/project";
import Link from "next/link";

export const ProjectCard = ({ project }: ProjectProps) => {
    return (
        <Link href={`/projetos/${project.id}`} key={project.id} className="flex flex-col h-70 items-center bg-zinc-100 border border-zinc-300 rounded-xl shadow-md md:flex-row md:w-full hover:shadow-xl transition duration-700 hover:scale-105">
            <img className="object-cover w-full rounded-t-xl h-70 md:h-80 md:w-80 md:rounded-none md:rounded-s-xl" src={project.image ? project.image : "https://cdn1.iconfinder.com/data/icons/dashboard-ui-vol-1/48/JD-46-512.png"} alt={project.title} />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h3 className="mb-2 text-xl text-gray-900 font-semibold">{project.title}</h3>
                <p className="max-h-40 mb-3 font-normal text-gray-700 text-ellipsis overflow-hidden ">{project.body}</p>
            </div>
        </Link>
    );
}