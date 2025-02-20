import { ProjectCard } from "components/cards/ProjectCard";
import { Pagination, SearchBar } from "components/shared/Pagination";
import { ProjectPage } from "resources/project";
import { useEffect, useState } from "react";
import { ProjectMockList } from "mock/MockList";
import { removeAccents } from "components/shared/Template";
import axios from "axios";
import { baseUrl } from "utils/requests";
import { FaFolderClosed } from "react-icons/fa6";

export default function Projects() {
    const [query, setQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber);
    }
    const [projectPage, setProjectPage] = useState<ProjectPage>({ content: [], page: { number: 0, totalElements: 0 } });

    useEffect(() => {
        axios.get(`${baseUrl}/projects?query=${query}&page=${pageNumber}&size=12`)
            .then((response) => {
                setProjectPage(response.data);
            });
    }, [query, pageNumber]);

    return (
        <>
            {!projectPage.content.length ? <ProjectMockList /> :
                <div className="mt-10">
                    <SearchBar
                        pageIcon={<FaFolderClosed />}
                        pageTitle="Projetos"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="flex items-center w-full justify-center">
                        <Pagination pagination={projectPage} onPageChange={handlePageChange} />
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-10 gap-x-6 items-start p-8">
                        {projectPage.content?.filter((project) =>
                            project.projectTitle?.toUpperCase().includes(query.toLocaleUpperCase()) ||
                            removeAccents(project.projectTitle)?.toUpperCase().includes(query.toLocaleUpperCase())
                        ).map(project => (
                            <div key={project.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                                <ProjectCard project={project} />
                            </div>
                        ))}
                    </div>
                </div>
            }
        </>
    );
}