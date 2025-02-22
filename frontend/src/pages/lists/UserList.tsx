import { Pagination, SearchBar } from "components/shared/Pagination";
import { UserCard } from "components/cards/UserCards";
import { UserPage } from "resources/user";
import { useEffect, useState } from "react";
import { removeAccents } from "components/shared/Template";
import axios from "axios";
import { baseUrl } from "utils/requests";
import { FaUser } from "react-icons/fa6";

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
            <SearchBar
                pageIcon={<FaUser />}
                pageTitle="Usuários"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Pagination pagination={userPage} onPageChange={handlePageChange} />
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