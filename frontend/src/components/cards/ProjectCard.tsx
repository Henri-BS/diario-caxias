import { Link } from "react-router-dom";
import { ProjectProps } from "resources/project";
import Markdown from "react-markdown";

export const ProjectCard = ({ project }: ProjectProps) => {
    return (
        <Link to={`/projetos/${project.id}`} key={project.id} className="flex flex-row h-66 md:w-full md:h-40 items-start bg-zinc-100 border border-zinc-300 rounded-xl shadow-md  hover:shadow-xl transition duration-500 hover:scale-105">
            <img className="object-cover h-full w-28 md:h-40 md:w-40 rounded-s-xl" src={project.projectImage ? project.projectImage : require("assets/img/image.png")} alt={project.projectTitle} />
            <div className="flex flex-col justify-between p-4 leading-normal mt-2">
                <h3 title={project.projectTitle} className=" h-6 text-md md:text-lg text-gray-900 font-semibold overflow-hidden">{project.projectTitle}</h3>
                <p className="h-[40px] md:h-[60px] mb-3 text-sm font-normal text-gray-700 overflow-hidden"><Markdown>{project.projectDescription}</Markdown></p>
            </div>
        </Link>
    );
}