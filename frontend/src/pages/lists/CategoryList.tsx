import { CategoryCard } from "components/cards/CategoryCard";
import { Pagination, SearchBar } from "components/shared/Pagination";
import { CategoryMockList } from "mock/MockList";
import { CategoryPage } from "resources/category";
import { useEffect, useState } from "react";
import { removeAccents } from "components/shared/Template";
import { baseUrl } from "utils/requests";
import axios from "axios";
import { FaHouse, FaTags } from "react-icons/fa6";
import { Breadcrumb } from "flowbite-react";
import { Link } from "react-router-dom";

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
        <div className="mt-10">
            <Breadcrumb aria-label="breadcrumb" className="mb-3 py-2">
                <Breadcrumb.Item icon={FaHouse}>
                    <Link to="/">
                        Início
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/categorias">
                        Categorias
                    </Link>
                </Breadcrumb.Item>
            </Breadcrumb>
            {!categoryPage.content.length ? <CategoryMockList /> :
                <div>
                    <SearchBar
                        pageIcon={<FaTags />}
                        pageTitle="Categorias"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Pagination pagination={categoryPage} onPageChange={handlePageChange} />

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
        </div>
    );
}