'use client'

import { UserCard } from "@/components/card/userCard";
import { Pagination } from "@/components/pagination";
import { Template } from "@/components/template";
import { UserPage, useUserService } from "@/resources/user";
import axios from "axios";
import { TextInput } from "flowbite-react";
import { useEffect, useState } from "react";


export default function Usuarios() {
    const [query, setQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber);
    }
    const [userPage, setUserPage] = useState<UserPage>({ content: [], page: { number: 0, size: 0, totalPages: 0, totalElements: 0 } });
    const userService = useUserService();

    useEffect(() => {
        userService.findUsers(pageNumber, query)
            .then((response) => {
                setUserPage(response);
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
                            id="value"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="buscar usuários..."
                        />
                    </div>
                </div>
                <div className="flex items-center w-full justify-center">
                    <Pagination pagination={userPage} onPageChange={handlePageChange} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
                    {userPage.content?.filter((user) =>
                        user.username?.toUpperCase().includes(query.toLocaleUpperCase()))
                        .map(user => (
                            <div key={user.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                                <UserCard user={user} />
                            </div>
                        ))}
                </div>
            </Template>
        </>
    );
}