'use client'

import { CategoryCard } from "@/components/cards/CategoryCard";
import UserCard from "@/components/cards/UserCard";
import { Pagination } from "@/components/shared/Pagination";
import { Template } from "@/components/Template";
import { BASE_URL } from "@/resources";
import { Category } from "@/resources/category";
import { UserPage } from "@/resources/user";
import { UserCategoryPage } from "@/resources/user.category";
import axios from "axios";
import { TextInput } from "flowbite-react";

import { useEffect, useState } from "react";

export default function CategoryDetails({ params }: any) {
    const categoryId = params.categoryId;

    const [category, setCategory] = useState<Category>();
    useEffect(() => {
        axios.get(`${BASE_URL}/categories/${categoryId}`)
            .then((response) => {
                setCategory(response.data);
            });
    }, [categoryId]);

    function Users({params}: any) {
        const [query, setQuery] = useState("");
        const [pageNumber, setPageNumber] = useState(0);
        const handlePageChange = (newPageNumber: number) => {
            setPageNumber(newPageNumber);
        }
        const [userPage, setUserPage] = useState<UserPage>({ content: [], page: { number: 0, size: 0, totalPages: 0, totalElements: 0 } });
    
        useEffect(() => {
            axios.get(`${BASE_URL}/user-category/${categoryId}?page=${pageNumber}&size=12`)
                .then((response) => {
                    setUserPage(response.data);
                });
        }, [categoryId, pageNumber]);
    
        return (
            <>
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
                    <div className="  grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
                        {userPage.content?.filter((x) =>
                            x.username?.toUpperCase().includes(query.toLocaleUpperCase()))
                            .map(x => (
                                <div key={x.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                                    <UserCard user={x} />
                                </div>
                            ))}
                    </div>
            </>
        );
    }
    
    

    return (
        <Template>
             <div className="w-full text-center p-6 bg-zinc-100 border border-zinc-300 rounded-lg shadow-md ">
                <h5 className=" mb-2 text-5xl font-bold tracking-tight text-gray-900 ">{category?.name}</h5>
            </div>
            <Users params={categoryId}/> 
        </Template>
    );
}





