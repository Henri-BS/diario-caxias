'use client'

import { CategoryCard } from "@/components/cards/CategoryCard";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { InputText } from "@/components/shared/Input";
import { Pagination } from "@/components/shared/Pagination";
import { Template } from "@/components/Template";
import { BASE_URL } from "@/resources";
import { CategoryPage } from "@/resources/category.resource";
import { EventPage } from "@/resources/event.resource";
import axios from "axios";
import { useEffect, useState } from "react";


export default function Projects() {
    const [query, setQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber);
    }
    const [categoryPage, setCategoryPage] = useState<CategoryPage>({content:[], page:{number: 0, size: 0, totalPages: 0, totalElements: 0}});

    useEffect(() => {
        axios.get(`${BASE_URL}/categories?page=${pageNumber}&query=${query}&size=5`)
            .then((response) => {
                setCategoryPage(response.data);
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
                            placeholder="buscar categorias..."
                        />
                    </div>
                </div>
                <div className="flex items-center w-full justify-center">
                    <Pagination  pagination={categoryPage} onPageChange={handlePageChange}/>
                </div>
                <div className="  grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-6 items-start p-8">
                    {categoryPage.content?.filter((x) =>
                        x.name?.toUpperCase().includes(query.toLocaleUpperCase()))
                        .map(x => (
                            <div key={x.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                                <CategoryCard category={x} />
                            </div>
                        ))}
                </div>
            </Template>
        </>
    );
}
