import { TextInput } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { projectMock } from "./MockData";

export const ProjectMockList = () => {

    const [query, setQuery] = useState("");

    const filter = () => {
        return projectMock.filter(item => item.projectTitle.toUpperCase().includes(query.toLocaleUpperCase()));
    };

    const result = filter();
    return (
        <>
            <div className="flex items-center justify-between my-5">
                <div className="flex space-x-4 px-4">
                    <TextInput className="w-full"
                        color="bg-zinc-400"
                        type="text"
                        id="query"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="buscar projetos..."
                    />
                </div>
            </div>
            <div className="  grid grid-cols-1 xl:grid-cols-2 gap-y-10 gap-x-6 items-start p-8">
                {result.map(project => {
                    return (
                        <div key={project.id} className="relative flex flex-col sm:flex-row sm:w-200 xl:flex-col items-start ">
                            <Link to={`/projetos/${project.id}`} key={project.id} className="flex flex-col h-70 items-center bg-zinc-100 border border-zinc-300 rounded-xl shadow-md md:flex-row md:w-full hover:shadow-xl transition duration-700 hover:scale-105">
                                <img className="object-cover w-full rounded-t-xl h-70 md:h-80 md:w-80 md:rounded-none md:rounded-s-xl" src={project.projectImage ? project.projectImage : "https://cdn1.iconfinder.com/data/icons/dashboard-ui-vol-1/48/JD-46-512.png"} alt={project.projectTitle} />
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <h3 className="mb-2 text-xl text-gray-900 font-semibold">{project.projectTitle}</h3>
                                    <p className="max-h-40 mb-3 font-normal text-gray-700 text-ellipsis overflow-hidden ">{project.projectDescription}</p>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </>
    );
}