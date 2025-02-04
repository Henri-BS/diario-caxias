import { Pagination } from "components/shared/Pagination";
import { UserCard } from "components/cards/UserCards";
import { UserPage } from "resources/user";
import { TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { removeAccents } from "components/shared/Template";
import { GoSearch } from "react-icons/go";
import axios from "axios";
import { baseUrl } from "utils/requests";

export default function Users() {
    const [query, setQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber);
    }
    const [userPage, setUserPage] = useState<UserPage>({ content: [], page: { number: 0, size: 0, totalPages: 0, totalElements: 0 } });

    useEffect(() => {
        axios.get(`${baseUrl}/users?query=${query}&page=${pageNumber}&size=12`)
            .then((response) => {
                setUserPage(response.data);
            });
    }, [pageNumber, query]);

    return (
        <div className="mt-10">
            <div className="flex items-center justify-between my-5">
                <div className="flex space-x-4 px-4">
                    <TextInput icon={GoSearch}
                        className="w-full"
                        color="bg-zinc-400"
                        type="text"
                        id="value"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="buscar"
                    />
                </div>
            </div>
            <div className="flex items-center w-full justify-center">
                <Pagination pagination={userPage} onPageChange={handlePageChange} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
                {userPage.content?.filter((user) =>
                    user.username?.toUpperCase().includes(query.toLocaleUpperCase()) ||
                    removeAccents(user.username)?.toUpperCase().includes(query.toLocaleUpperCase()) ||
                    user.userLocation?.toUpperCase().includes(query.toLocaleUpperCase()) ||
                    removeAccents(user.userLocation)?.toUpperCase().includes(query.toLocaleUpperCase())
                ).map(user => (
                        <div key={user.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                            <UserCard user={user} />
                        </div>
                    ))}
            </div>
        </div>
    );
}