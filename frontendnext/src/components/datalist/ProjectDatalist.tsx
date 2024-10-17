import { BASE_URL } from "@/resources";
import { ProjectPage } from "@/resources/project";
import axios from "axios";
import { TextInput } from "flowbite-react";
import { useEffect, useState } from "react"


export default function ProjectDatalist() {

    const [query, setQuery] = useState("");
    const [projectPage, setProjectPage] = useState<ProjectPage>({ content: [], page: { number: 0, totalElements: 0 } });

    useEffect(() => {
        axios.get(`${BASE_URL}/projects?title=${query}`)
            .then((response) => {
                setProjectPage(response.data);
            })
    }, [query]);

    return (
        <div>
            <datalist id="projectList">
                {projectPage.content?.filter((x) =>
                    x.title?.toUpperCase().includes(query.toLocaleUpperCase()))
                    .map((x) =>
                        <option id="query" key={x.id} value={x.title}>
                            {x.title}
                        </option>
                    )
                }
            </datalist>
        </div>
    )
}