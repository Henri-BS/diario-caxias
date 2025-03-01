import { TextInput } from "flowbite-react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { GoSearch } from "react-icons/go";
import { Project } from "resources/project";
import { User } from "resources/user";

type Page = {
    content: User[] | Project[] | Event[];
    page: {
        size?: number;
        number: number;
        totalElements: number;
        totalPages?: number;
    }
}

type PageProps = {
    pagination: Page;
    onPageChange: Function;
}

export const Pagination = ({ pagination, onPageChange }: PageProps) => {

    const next = (pageNumber: number) => {
        if (pageNumber !== pagination.page?.totalPages) {
            onPageChange(pagination.page?.number + 1)
        }
    }

    return (
        <>
            {pagination.page?.totalElements >= 1 ?
                    <ul className="flex gap-2 items-center w-full mt-4 -space-x-px h-10 text-base">
                        <li>
                            <button onClick={() => onPageChange(pagination.page?.number - 1)} className="cursor-pointer flex items-center justify-center px-3 h-10 ms-0 leading-tight text-gray-500 bg-white border  border-gray-600 rounded-full hover:bg-gray-100 hover:text-gray-700">
                                <SlArrowLeft/>
                            </button>
                        </li>
                        <li>
                            <p className="flex items-center justify-center px-6 h-10 leading-tight rounded-full text-gray-500 bg-white border border-gray-600">{pagination.page?.number + 1} de {pagination.page?.totalPages} </p>
                        </li>
                        <li>
                            <button onClick={() => next(pagination.page.number + 1)} className="cursor-pointer flex items-center justify-center px-3 h-10 leading-tight text-gray-500 bg-white border border-gray-600 rounded-full       hover:bg-gray-100 hover:text-gray-700">
                                <SlArrowRight/>
                            </button>
                        </li>
                    </ul>
                : " "}
        </>
    );
}

type InputSearchProps = {
    pageTitle?: string;
    pageIcon?: any;
    onChange?: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    value?: string;
}

export const SearchBar = ({ pageTitle, value, onChange, pageIcon }: InputSearchProps) => {

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between mt-6">
                <h1 className="flex flex-row items-center gap-x-4 text-2xl text-gray-700 font-semibold">{pageIcon} {pageTitle}</h1>
                <div className="flex md:justify-end">
                    <TextInput icon={GoSearch}
                        className="py-2 max-w-[400px]"
                        color="bg-zinc-400"
                        type="text"
                        id="query"
                        value={value}
                        onChange={onChange}
                        placeholder="buscar"
                    />
                </div>
            </div>
        </>
    );
}