import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa6";
import { Props } from "resources";
import { Link, useParams } from "react-router-dom";
import { ProjectCard } from "components/cards/ProjectCard";
import { Breadcrumb } from "flowbite-react";
import { Category } from "resources/category";
import { Project } from "resources/project";
import axios from "axios";
import { baseUrl } from "utils/requests";

export function CategoryProfile() {
    const params = useParams();
    return (
        <CategoryDetails params={`${params.categoryName}`} />
    );
}

export function CategoryDetails({ params: categoryName }: Props) {

    const [category, setCategory] = useState<Category>();
    useEffect(() => {
        axios.get(`${baseUrl}/categories/by-name/${categoryName}`)
            .then((response) => {
                setCategory(response.data);
            });
    }, [categoryName]);


    const [projects, setProjects] = useState<Project[]>();
    useEffect(() => {
        axios.get(`${baseUrl}/project-category?categoryName=${categoryName}`)
            .then((response) => {
                setProjects(response.data);
            });

    }, [categoryName]);


    return (
        <div>
            <Breadcrumb aria-label="breadcrumb" className="mb-3 py-2">
                <Breadcrumb.Item icon={FaIcons.FaHouse}>
                    <Link to="/">
                        Início
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/categorias">
                        Categorias
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item >
                    <Link to={`/categorias/${categoryName}`}>
                        {categoryName}
                    </Link>
                </Breadcrumb.Item>
            </Breadcrumb>

            <div>
                <div className="w-full p-6 bg-zinc-100 border border-zinc-300 rounded-lg shadow-md ">
                    <h5 className=" mb-2 text-4xl font-bold tracking-tight text-cyan-600 ">{category?.categoryName}</h5>
                    <p className="font-medium text-lg">{category?.categoryDescription}</p>
                    <div className="grid md:grid-cols-2 text-gray-800 mt-5">
                        <p className="flex flex-row items-center text-lg gap-2"><FaIcons.FaCalendarCheck /> Projetos relacionados: <b>{projects?.length}</b></p>
                    </div>
                </div>

                <h2 className="flex flex-row gap-2 mt-5 text-2xl text-zinc-800 "><FaIcons.FaFolderClosed />Projetos Relacionados</h2>
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 items-start p-8">
                    {projects?.map(project => (
                        <div key={project?.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}