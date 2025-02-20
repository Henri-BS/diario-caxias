import { CategoryCard } from "components/cards/CategoryCard";
import { Pagination, SearchBar } from "components/shared/Pagination";
import { CategoryMockList } from "mock/MockList";
import { CategoryPage } from "resources/category";
import { useEffect, useState } from "react";
import { removeAccents } from "components/shared/Template";
import { baseUrl } from "utils/requests";
import axios from "axios";
import { FaTags } from "react-icons/fa6";

export default function Categories() {

    const [query, setQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber);
    }
    const [categoryPage, setCategoryPage] = useState<CategoryPage>({ content: [], page: { number: 0, totalElements: 0 } })

    useEffect(() => {
        axios.get(`${baseUrl}/categories?query=${query}&page=${pageNumber}&size=12`)
            .then((response) => {
                setCategoryPage(response.data);
            });
    }, [query, pageNumber]);

    return (
        <>
            {!categoryPage.content.length ? <CategoryMockList /> :
                <div className="mt-10">
                    <SearchBar
                        pageIcon={<FaTags />}
                        pageTitle="Categorias"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="flex items-center w-full justify-center">
                        <Pagination pagination={categoryPage} onPageChange={handlePageChange} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-6 items-start p-8">
                        {categoryPage.content?.filter((category) =>
                            category.categoryName?.toUpperCase().includes(query.toLocaleUpperCase()) ||
                            removeAccents(category.categoryName)?.toUpperCase().includes(query.toLocaleUpperCase())
                        ).map(category => (
                            <div key={category?.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                                <CategoryCard category={category} />
                            </div>
                        ))}
                    </div>
                </div>
            }
        </>
    );
}