'use client'

import { ProjectCard } from "@/components/card/projectCard";
import { Pagination } from "@/components/pagination";
import { Template } from "@/components/template";
import { ProjectPage } from "@/resources/project";
import axios from "axios";
import { TextInput } from "flowbite-react";
import { useEffect, useState } from "react";


export default function Projects() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const [query, setQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber);
    }
    const [projectPage, setProjectPage] = useState<ProjectPage>({ content: [], page: { number: 0, totalElements: 0 } });

        useEffect(() => {
            axios.get(`${baseUrl}/projects?page=${pageNumber}&query=${query}&size=10`)
                .then((response) => {
                    setProjectPage(response.data);
                });
        }, [pageNumber, query]);


    return (
        <>
            <Template>
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
                <div className="flex items-center w-full justify-center">
                    <Pagination pagination={projectPage} onPageChange={handlePageChange} />
                </div>
                <div className="  grid grid-cols-1 xl:grid-cols-2 gap-y-10 gap-x-6 items-start p-8">
                    {projectPage.content?.filter((x) =>
                        x.projectTitle?.toUpperCase().includes(query.toLocaleUpperCase()))
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