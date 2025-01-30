import { CategoryCard } from "components/cards/CategoryCard";
import { EventCard } from "components/cards/EventCard";
import { CarouselPostCard } from "components/cards/PostCard";
import { ProjectCard } from "components/cards/ProjectCard";
import { CategoryPage, useCategoryService } from "resources/category";
import { EventPage, useEventService } from "resources/event";
import { PostPage, usePostService } from "resources/post";
import { ProjectPage, useProjectService } from "resources/project";
import { CustomFlowbiteTheme, Flowbite, Carousel } from "flowbite-react";
import { useState, useEffect } from "react";
import { CategoryMockHomeList, EventMockHomeList, PostMockCarousel, ProjectHomeMockList } from "mock/MockList";
import { Link } from "react-router-dom";



export default function Home() {
    return (
        <>
            <div className=" grid grid-cols-1 lg:grid-cols-3 flex gap-x-8 mt-10">
                <div className=" flex flex-col block w-full p-6 bg-white border border-gray-200 rounded-lg shadow mb-4">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center">
                        Boas vindas ao Diário Caxias
                    </h5>

                    <p className="font-normal text-gray-700 text-justify">
                        Aqui nesta plataforma você poderá encontrar um vasto acervo de projetos e eventos que visam contribuir com o desenvolvimento educacional, profissional e cultural da cidade de Caxias do Maranhão.
                        O Diário Caxias se compromete em estabelecer um vínculo entre a educação formal e a informal, permitindo que pessoas das mais diversas áreas ou níveis acadêmicos possam participar ativamente das atividades propostas, almejando uma participação multidisciplinar dos Caxienses.
                        Para saber um pouco mais sobre os recentes projetos ou eventos, clique nas últimas nóticias que aparecem aqui ao lado e faça a sua história em sua cidade.
                    </p>
                </div>
                <div className="col-span-2">
                    <PostCarousel />
                </div>
            </div>
            <ProjectHomeList />
            <CategoryHomeList />
            <EventHomeList />
        </>
    );


    function PostCarousel() {

        const customTheme: CustomFlowbiteTheme = {
            carousel: {
                root: {
                    base: "relative h-full w-full",
                    leftControl: "absolute left-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none",
                    rightControl: "absolute right-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none"
                },
                indicators: {
                    active: {
                        off: "bg-gray-400/70 hover:bg-gray-500",
                        on: "bg-gray-500"
                    },
                    base: "h-3 w-3 rounded-full",
                    wrapper: "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3"
                },
                control: {
                    base: "inline-flex h-8 w-8 items-center justify-center rounded-full group-focus:outline-none group-focus:ring-4 group-focus:ring-white bg-gray-800/50 group-hover:bg-gray-800/60 group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
                    icon: "h-5 w-5 text-white sm:h-6 sm:w-6"
                },
            }
        };

        const postService = usePostService();
        const [posts, setPosts] = useState<PostPage>({ content: [], page: { number: 0, totalElements: 0 } });
        useEffect(() => {
            postService.findPosts()
                .then((response) => {
                    setPosts(response);
                });
        }, []);

        return (
            <>
                <div className="flex flex-col justify-center items-center">
                    <div className="flex justify-between w-full" >
                        <h1 className="text-2xl">Últimas Notícias</h1>
                        <Link to={"/postagens"} className="text-xl text-blue-600 hover:text-blue-400 hover:underline">
                            Ver mais
                        </Link>
                    </div>
                    <div className="h-[520px] w-full ">
                        <Flowbite theme={{ theme: customTheme }}>
                            {!posts.content.length ? <PostMockCarousel /> :
                                <Carousel>
                                    {posts.content.map(post => (
                                        <div key={post.id} className="flex justify-center items-center">
                                            <CarouselPostCard post={post} />
                                        </div>
                                    ))}
                                </Carousel>
                            }
                        </Flowbite>
                    </div>
                </div>
            </>
        );
    }

    function ProjectHomeList() {
        const projectService = useProjectService();
        const [projects, setProjects] = useState<ProjectPage>({ content: [], page: { number: 0, size: 0, totalElements: 0, totalPages: 0 } })
        useEffect(() => {
            projectService.findProjects()
                .then((response) => {
                    setProjects(response);
                })
        }, [])

        return (
            <>
                <div className="flex justify-between p-4 mt-12" >
                    <h1 className="text-3xl">Projetos recentes</h1>
                    <Link to={"/projetos"} className="text-2xl text-blue-600 hover:text-blue-400 hover:underline">
                        Ver mais
                    </Link>
                </div>
                {!projects.content.length ? <ProjectHomeMockList /> :
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-10 gap-x-6 items-start p-8">
                        {projects.content?.map(project => (
                            <div key={project.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                                <ProjectCard project={project} />
                            </div>
                        ))}
                    </div>
                }
            </>
        );
    }

    function CategoryHomeList() {
        const categoryService = useCategoryService();
        const [categories, setCategories] = useState<CategoryPage>({ content: [], page: { number: 0, totalElements: 0 } });
        useEffect(() => {
            categoryService.findCategories()
                .then((response) => {
                    setCategories(response);
                });
        }, []);

        return (
            <>
                <div className="flex justify-between p-4 " >
                    <h1 className="text-3xl">Categorias</h1>
                    <Link to={"/categorias"} className="text-2xl text-blue-600 hover:text-blue-400 hover:underline ">
                        Ver mais
                    </Link>
                </div>
                {!categories.content.length ? <CategoryMockHomeList /> :
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 items-start p-8">
                        {categories?.content.map(category => (
                            <div key={category.id} className="w-100 py-4 ">
                                <CategoryCard category={category} />
                            </div>
                        ))}
                    </div>
                }
            </>
        );
    }

    function EventHomeList() {
        const eventService = useEventService();
        const [events, setEvents] = useState<EventPage>({ content: [], page: { number: 0, totalElements: 0 } })
        useEffect(() => {
            eventService.findEvents()
                .then((response) => {
                    setEvents(response);
                })
        }, [])

        return (
            <>
                <div className="flex justify-between p-4 " >
                    <h1 className="text-3xl">Eventos recentes</h1>
                    <Link to={"/eventos"} className="text-2xl text-blue-600 hover:text-blue-400 hover:underline">
                        Ver mais
                    </Link>
                </div>
                {!events.content.length ? <EventMockHomeList /> :
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
                        {events.content?.map(event => (
                            <div key={event.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                                <EventCard event={event} />
                            </div>
                        ))}
                    </div>
                }
            </>
        );
    }
}