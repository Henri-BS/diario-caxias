import * as FaIcons from "react-icons/fa6";
import * as GoIcons from "react-icons/go";
import { categoryMock } from "./MockData";

export function CategoryMockProfile({ params }: any) {
    const categoryId = params.categoryId;

    const filterById = (id: any) => {
        return categoryMock.filter(item => item.id.toString() === id);
    };

    const result = filterById(categoryId);

    return (
        <>
            {result.map(category => {
                return (
                    <div key={category.id}>
                        <div className="w-full p-6 bg-zinc-100 border border-zinc-300 rounded-lg shadow-md ">
                            <h5 className=" mb-2 text-4xl font-bold tracking-tight text-indigo-500 ">{category?.categoryName}</h5>
                            <p className="font-medium text-lg">{category?.categoryDescription}</p>
                            <div className="grid md:grid-cols-2 text-gray-800 mt-5">
                                <p className="flex flex-row items-center text-lg gap-2"><FaIcons.FaCalendarCheck /> Projetos relacionados: <b>{3}</b></p>
                                <p className="flex flex-row items-center text-lg gap-2"><FaIcons.FaUser /> Usuários relacionados: <b>{5}</b></p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}