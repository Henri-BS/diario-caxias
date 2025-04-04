import { Link } from "react-router-dom";
import { ProjectProps } from "resources/project";
import Markdown from "react-markdown";

export const ProjectCard = ({ project }: ProjectProps) => {
    return (
        <Link to={`/projetos/${project.id}`} key={project.id} className="flex flex-col h-66 md:w-full md:h-40 items-start bg-zinc-100 border border-zinc-300 rounded-xl shadow-md md:flex-row  hover:shadow-xl transition duration-700 hover:scale-105">
            <img className="object-cover h-52 w-full md:h-40 md:w-40 rounded-t-xl  md:rounded-none md:rounded-s-xl" src={project.projectImage ? project.projectImage : require("assets/img/image.png")} alt={project.projectTitle} />
            <div className="flex flex-col justify-between p-4 leading-normal mt-2">
                <h3 title={project.projectTitle} className=" text-lg md:text-xl text-gray-900 font-semibold">{project.projectTitle}</h3>
                <p className="h-[70px] mb-3 font-normal text-gray-700 text-ellipsis overflow-hidden"><Markdown>{project.projectDescription}</Markdown></p>
            </div>
        </Link>
    );
}