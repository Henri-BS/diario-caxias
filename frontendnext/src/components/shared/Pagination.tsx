import { Project } from "@/resources/project.resource";

type PageProps = {
    items?: Project[];
    total?: number;
    current: number;
    onPageChange: Function;
}

export const Pagination = ({ items, total, current, onPageChange }: PageProps) => {
    const next = () => {
        if (current < 1) {
            return current + 1;
        }
    }

    const prev = () => {
        if (current > 1) {
            return current - 1;
        }
    }

    return (
        <nav>
            <ul className="flex items-center -space-x-px h-10 text-base">
                <li onClick={() => onPageChange( current - 1)}>
                    <button className="cursor-pointer flex items-center justify-center px-3 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-600 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
                        <span className="sr-only">Previous</span>
                        <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                        </svg>
                    </button>
                </li>

                <li onClick={() => onPageChange(current = 0)}>
                    <p className="cursor-pointer flex items-center justify-center px-6 h-10 leading-tight text-gray-500 bg-white border border-gray-600 hover:bg-gray-100 hover:text-gray-700 ">{current + 1} </p>
                </li>
                <li onClick={() => onPageChange(current + 1)}>
                    <button className="cursor-pointer flex items-center justify-center px-3 h-10 leading-tight text-gray-500 bg-white border border-gray-600 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
                        <span className="sr-only">Next</span>
                        <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                        </svg>
                    </button>
                </li>
            </ul>
        </nav>
    );
}