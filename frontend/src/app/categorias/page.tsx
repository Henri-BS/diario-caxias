'use client'

import { CategoryCard } from "@/components/card/categoryCard";
import { Pagination } from "@/components/pagination";
import { Template } from "@/components/template";
import { CategoryMockList } from "@/mock/mockList";
import { CategoryPage, useCategoryService } from "@/resources/category";
import { TextInput } from "flowbite-react";
import { useEffect, useState } from "react";


export default function Categories() {

    const [query, setQuery] = useState("");
    const categoryService = useCategoryService();
    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber);
    }
    const [categoryPage, setCategoryPage] = useState<CategoryPage>({ content: [], page: { number: 0, totalElements: 0 } })

    useEffect(() => {
        categoryService.findCategories(pageNumber, query)
            .then((response) => {
                setCategoryPage(response);
            });
    }, [pageNumber, query]);

    return (
        <>
            <Template>
                {!categoryPage.content.length ? <CategoryMockList /> :
                    <div>
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
                            {categoryPage.content?.filter((category) =>
                                category.categoryName?.toUpperCase().includes(query.toLocaleUpperCase()))
                                .map(category => (
                                    <div key={category?.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                                        <CategoryCard category={category} />
                                    </div>
                                ))}
                        </div>
                    </div>
                }
            </Template>
        </>
    );
}