'use client'

import { EventCard } from "@/components/cards/EventCard";
import { ProjectCard } from "@/components/cards/ProjectCard";
import UserCard from "@/components/cards/UserCard";
import { InputText } from "@/components/shared/Input";
import { Pagination } from "@/components/shared/Pagination";
import { Template } from "@/components/Template";
import { BASE_URL } from "@/resources";
import { Project, ProjectPage } from "@/resources/project.resource";
import { UserPage } from "@/resources/user.resource";
import axios from "axios";
import { useEffect, useState } from "react";


export default function Usuarios() {
    const [query, setQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber);
    }
    const [userPage, setUserPage] = useState<UserPage>({content:[], page:{number: 0, size: 0, totalPages: 0, totalElements: 0}});

    useEffect(() => {
        axios.get(`${BASE_URL}/users?page=${pageNumber}&query=${query}&size=12`)
            .then((response) => {
                setUserPage(response.data);
            });
    }, [pageNumber, query]);

    return (
        <>
            <Template>
                <div className="flex items-center justify-between my-5">
                    <div className="flex space-x-4 px-4">
                        <InputText
                            type="text"
                            id="value"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            style="form-control"
                            placeholder="buscar usuários..."
                        />
                    </div>
                </div>
                <div className="flex items-center w-full justify-center">
                    <Pagination  pagination={userPage} onPageChange={handlePageChange}/>
                </div>
                <div className="  grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
                    {userPage.content?.filter((x) =>
                        x.username?.toUpperCase().includes(query.toLocaleUpperCase()))
                        .map(x => (
                            <div key={x.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                                <UserCard user={x} />
                            </div>
                        ))}
                </div>
            </Template>
        </>
    );
}