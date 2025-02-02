import { CategoryCard } from "components/cards/CategoryCard";
import { ProjectCard } from "components/cards/ProjectCard";
import { Pagination } from "components/shared/Pagination";
import { useAuth } from "resources/auth";
import { CategoryPage, useCategoryService } from "resources/category";
import { ProjectPage, useProjectService } from "resources/project";
import { User, useUserService } from "resources/user";

import { Accordion } from "flowbite-react";

import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa6";
import { Props } from "resources";
import { useParams } from "react-router-dom";

export function UserPersonalProfile() {
    const params = useParams();
    return (
        <>
            <UserPersonalDetails params={`${params.userId}`} />
        </>
    );
}


export function UserPersonalDetails({ params: userId }:Props) {
    
    const auth = useAuth();
    userId = auth.getUserSession()?.id;
    const userService = useUserService();
    const projectService = useProjectService();
    const categoryService = useCategoryService();
    const [user, setUser] = useState<User>();
    const [projectPage, setProjectPage] = useState<ProjectPage>({ content: [], page: { number: 0, totalElements: 0 } });
    const [categoryPage, setCategoryPage] = useState<CategoryPage>({ content: [], page: { number: 0, totalElements: 0 } });
    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber)
    }

    useEffect(() => {
        userService.findUserById(userId)
            .then((response) => {
                setUser(response);
            });
    }, [userId]);

    useEffect(() => {
        projectService.findProjectsByUser(userId, pageNumber)
            .then((response) => {
                setProjectPage(response);
            });

        categoryService.findCategoriesByUser(userId, pageNumber)
            .then((response) => {
                setCategoryPage(response);
            });
    }, [userId, pageNumber]);


    return (
        <>

            <div className="flex flex-wrap items-center  justify-center mt-10">
                <div className="container lg:w-full bg-white shadow-xl transform duration-200 easy-in-out">
                    <div className=" h-40 overflow-hidden" >
                        <img className="w-full rounded-t-lg" src={user?.userCoverImage ?? "https://www.pixelstalk.net/wp-content/uploads/2016/05/Black-background-lines-scratches-1920x1080.jpg"} alt="" />
                    </div>
                    <div className="flex justify-center px-5 -mt-12">
                        <img className="h-32 w-32 bg-white p-2 rounded-full" src={user?.userImage ?? "https://cdn1.iconfinder.com/data/icons/basic-ui-element-2-2-line/512/Basic_UI_Elements_-_2.1_-_line-11-256.png"} alt="" />
                    </div>
                    <div className="text-gray-600 text-center px-14">
                        <h2 className="text-gray-800 text-3xl font-bold">{user?.username}</h2>
                        <p className="mt-2 text-md font-semibold"> {user?.userLocation} </p>
                        <p className="mt-2 text-lg">{user?.userBio}</p>
                    </div>
                    <hr className="mt-6" />
                </div>
            </div>
            <Accordion collapseAll className="mt-12 ">
                <Accordion.Panel>
                    <Accordion.Title>
                        <h2 className="flex flex-row gap-2 mt-5 text-2xl text-zinc-800 "><FaIcons.FaTag />Categorias Relacionadas</h2>
                    </Accordion.Title>
                    <Accordion.Content className="p-2">

                        <div className="flex items-center w-full justify-center">
                            <Pagination pagination={categoryPage} onPageChange={handlePageChange} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
                            {categoryPage.content?.map(category => (
                                <div key={category.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                                    <CategoryCard category={category} />
                                </div>
                            ))}
                        </div>

                    </Accordion.Content>
                </Accordion.Panel>

                <Accordion.Panel>
                    <Accordion.Title>
                        <h2 className="flex flex-row gap-2 mt-5 text-2xl text-zinc-800 "><FaIcons.FaFolderClosed />Projetos Relacionados</h2>
                    </Accordion.Title>
                    <Accordion.Content className="p-2">
                        <div className="flex items-center w-full justify-center mt-12">
                            <Pagination pagination={projectPage} onPageChange={handlePageChange} />
                        </div>
                        <div className="  grid grid-cols-1 xl:grid-cols-2 gap-y-10 gap-x-6 items-start p-8">
                            {projectPage.content?.map(project => (
                                <div key={project.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                                    <ProjectCard project={project} />
                                </div>
                            ))}
                        </div>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
        </>
    );
}