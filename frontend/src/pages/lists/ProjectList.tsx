import { ProjectCard } from "components/cards/ProjectCard";
import { Pagination, SearchBar } from "components/shared/Pagination";
import { ProjectPage } from "resources/project";
import { useEffect, useState } from "react";
import { ProjectMockList } from "mock/MockList";
import { removeAccents } from "components/shared/Template";
import axios from "axios";
import { baseUrl } from "utils/requests";
import { FaFolderClosed, FaHouse } from "react-icons/fa6";
import { Breadcrumb } from "flowbite-react";
import { Link } from "react-router-dom";

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
        <div className="mt-10">

            <Breadcrumb aria-label="breadcrumb" className="mb-3 py-2">
                <Breadcrumb.Item icon={FaHouse}>
                    <Link to="/">
                        Início
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/projetos">
                        Projetos
                    </Link>
                </Breadcrumb.Item>
            </Breadcrumb>

            {!projectPage.content.length ? <ProjectMockList /> :
                <div>
                    <SearchBar
                        pageIcon={<FaFolderClosed />}
                        pageTitle="Projetos"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Pagination pagination={projectPage} onPageChange={handlePageChange} />
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
        </div>
    );
}