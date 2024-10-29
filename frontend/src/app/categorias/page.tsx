'use client'

import { CategoryCard } from "@/components/card/categoryCard";
import { Pagination } from "@/components/pagination";
import { Template } from "@/components/template";
import { CategoryPage } from "@/resource/category";
import axios from "axios";
import { TextInput } from "flowbite-react";
import { useEffect, useState } from "react";


export default function Categories() {
    const baseUrl = process.env.NODE_ENV ?? "http://localhost:8080";
    const [query, setQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber);
    }
    const [categoryPage, setCategoryPage] = useState<CategoryPage>({ content: [], page: { number: 0, totalElements: 0 } })

    useEffect(() => {
        axios.get(`${baseUrl}/categories?page=${pageNumber}&query=${query}&size=12`)
            .then((response) => {
                setCategoryPage(response.data);
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
                            placeholder="buscar categorias..."
                        />
                    </div>
                </div>
                <div className="flex items-center w-full justify-center">
                    <Pagination pagination={categoryPage} onPageChange={handlePageChange} />
                </div>
                <div className="  grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-6 items-start p-8">
                    {categoryPage.content?.filter((x) =>
                        x.categoryName?.toUpperCase().includes(query.toLocaleUpperCase()))
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