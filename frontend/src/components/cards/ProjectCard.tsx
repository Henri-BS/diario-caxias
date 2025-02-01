import { Link } from "react-router-dom";
import { ProjectProps } from "resources/project";


export const ProjectCard = ({ project }: ProjectProps) => {
    return (
        <Link to={`/projetos/${project.id}`} key={project.id} className="flex flex-col h-70 items-center bg-zinc-100 border border-zinc-300 rounded-xl shadow-md md:flex-row md:w-full hover:shadow-xl transition duration-700 hover:scale-105">
            <img className="object-cover w-full rounded-t-xl h-70 md:h-80 md:w-80 md:rounded-none md:rounded-s-xl" src={project.projectImage ?? "https://cdn1.iconfinder.com/data/icons/dashboard-ui-vol-1/48/JD-46-512.png"} alt={project.projectTitle} />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h3 className="mb-2 text-xl text-gray-900 font-semibold">{project.projectTitle}</h3>
                <p className="max-h-40 mb-3 font-normal text-gray-700 text-ellipsis overflow-hidden ">{project.projectDescription}</p>
            </div>
        </Link>
    );
}