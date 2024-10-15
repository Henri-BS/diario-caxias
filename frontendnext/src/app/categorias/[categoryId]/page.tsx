'use client'

import { Template } from "@/components/Template";
import { BASE_URL } from "@/resources";
import { Category } from "@/resources/category";
import axios from "axios";

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

    return (
        <Template>
             <div className="w-full text-center p-6 bg-zinc-100 border border-zinc-300 rounded-lg shadow-md ">
                <h5 className=" mb-2 text-5xl font-bold tracking-tight text-gray-900 ">{category?.name}</h5>
            </div>
        </Template>
    );
}




