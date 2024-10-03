'use client'

import { ProjectCard } from "@/components/cards/ProjectCard";
import { Button } from "@/components/shared/Button";
import { Template } from "@/components/Template";
import { BASE_URL } from "@/resources";
import { Project, ProjectPage } from "@/resources/project.resource";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Projects() {
    const [query, setQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber);
    }
    const [projectPage, setProjectPage] = useState<ProjectPage>({ content: [], number: 0});
    
    useEffect(() => {
        axios.get(`${BASE_URL}/project/list?page=${pageNumber}&query=${query}`)
            .then((response) => {
                setProjectPage(response.data);
                console.log(response.data);
            });
    }, [pageNumber, query]);

    return (
        <>
        <Template>
                <div className="flex items-center justify-between my-5">
                    <div className="flex space-x-4">
                        <Button type="button" style={"btn bg-sky-500 hover:border-sky-600"} label={"Adicionar Projeto"}/>
                        <Button type="button" style={"btn bg-emerald-500 hover:border-emerald-600"} label={"Paginação"}/>

                        <div className="form-group">
                            <input
                                type="text"
                                id="value"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="form-control"
                                placeholder="buscar pessoas..."
                            />
                        </div>
                    </div>
                </div >

                <div className="  grid grid-cols-1 xl:grid-cols-2 gap-y-10 gap-x-6 items-start p-8">
                    {projectPage.content?.filter((x) =>
                        x.title?.toUpperCase().includes(query.toLocaleUpperCase()))
                        .map(x => (
                            <div key={x.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                                <ProjectCard project={x} />
                            </div>
                        ))}
                </div>
            </Template>
        </>
    );
}
