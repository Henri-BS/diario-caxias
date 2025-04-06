import { CategoryCard } from "components/cards/CategoryCard";
import { EventCard } from "components/cards/EventCard";
import { PostCard, PostSmCard } from "components/cards/PostCard";
import { ProjectCard } from "components/cards/ProjectCard";
import { CategoryPage } from "resources/category";
import { EventPage } from "resources/event";
import { PostPage } from "resources/post";
import { ProjectPage } from "resources/project";
import { CustomFlowbiteTheme, Flowbite, Carousel, Accordion, Breadcrumb } from "flowbite-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "utils/requests";
import { FaHouse } from "react-icons/fa6";

export const customTheme: CustomFlowbiteTheme = {
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
            base: "inline-flex h-8 w-8 items-center justify-center rounded-full group-focus:outline-none group-focus:ring-4 group-focus:ring-white bg-gray-800/50 group-hover:bg-gray-800/80 group-focus:ring-gray-800/80 sm:h-10 sm:w-10",
            icon: "h-5 w-5 text-white sm:h-6 sm:w-6"
        },
    }
};

export default function Home() {

    const [posts, setPosts] = useState<PostPage>({ content: [], page: { number: 0, totalElements: 0 } });
    const [projects, setProjects] = useState<ProjectPage>({ content: [], page: { number: 0, size: 0, totalElements: 0, totalPages: 0 } })
    const [categories, setCategories] = useState<CategoryPage>({ content: [], page: { number: 0, totalElements: 0 } });
    const [events, setEvents] = useState<EventPage>({ content: [], page: { number: 0, totalElements: 0 } })

    useEffect(() => {
        axios.get(`${baseUrl}/posts?size=6&sort=id,DESC`)
            .then((response) => {
                setPosts(response.data);
            });
        axios.get(`${baseUrl}/projects?size=8&sort=id`)
            .then((response) => {
                setProjects(response.data);
            })
        axios.get(`${baseUrl}/categories?size=12`)
            .then((response) => {
                setCategories(response.data);
            });
        axios.get(`${baseUrl}/events?size=9`)
            .then((response) => {
                setEvents(response.data);
            })
    }, []);

    return (
        <>
            <div>
                <Breadcrumb aria-label="breadcrumb" className="mb-3 py-2">
                    <Breadcrumb.Item icon={FaHouse}>
                        <Link to="/">
                            Início
                        </Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Accordion collapseAll>
                    <Accordion.Panel>
                        <Accordion.Title>
                            <h5 className="flex flex-row justify-between sm:text-lg md:text-xl font-semibold tracking-tight text-gray-600 text-center">
                                Boas vindas ao Diário Caxias
                            </h5>
                        </Accordion.Title>
                        <Accordion.Content>
                            <p className="font-normal text-gray-700">
                                Aqui nesta plataforma você poderá encontrar um vasto acervo de projetos e eventos que visam contribuir com o desenvolvimento educacional, profissional e cultural da cidade de Caxias do Maranhão.
                                O Diário Caxias se compromete em estabelecer um vínculo entre a educação formal e a informal, permitindo que pessoas das mais diversas áreas ou níveis acadêmicos possam participar ativamente das atividades propostas, almejando uma participação multidisciplinar dos Caxienses.
                                Para saber um pouco mais sobre os recentes projetos ou eventos, clique nas últimas nóticias que aparecem aqui ao lado e faça a sua história em sua cidade.
                            </p>
                        </Accordion.Content>
                    </Accordion.Panel>
                </Accordion>
            </div>

            <div>
                <div className="items-center p-4 mt-4">
                    <div className="flex justify-between w-full sm:text-lg md:text-xl">
                        <h1>Últimas Postagens</h1>
                        <Link to={"/postagens"} className="text-blue-600 hover:text-blue-400 hover:underline">
                            Ver mais
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 items-center">
                        <div className="h-80 md:h-96 max-w-[600px] w-full">
                            <Flowbite theme={{ theme: customTheme }}>
                                <Carousel>
                                    {posts.content.map(post => (
                                        <div key={post.postId} className="flex justify-center items-center w-full">
                                            <PostCard post={post} />
                                        </div>
                                    ))}
                                </Carousel>
                            </Flowbite>
                        </div>

                        <div className="mt-4">
                            <div className="divide-y divide-gray-300">
                                {posts.content.map(post => (
                                    <div key={post.postId}>
                                        <PostSmCard post={post} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between p-4 sm:text-lg md:text-xl">
                    <h1>Projetos recentes</h1>
                    <Link to={"/projetos"} className="text-blue-600 hover:text-blue-400 hover:underline">
                        Ver mais
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {projects.content?.map(project => (
                        <div key={project.id} className="flex justify-center ">
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>

                <div className="flex justify-between p-4 sm:text-lg md:text-xl" >
                    <h1>Categorias</h1>
                    <Link to={"/categorias"} className="text-blue-600 hover:text-blue-400 hover:underline">
                        Ver mais
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-6 gap-x-4 items-start">
                    {categories?.content.map(category => (
                        <div key={category.id} >
                            <CategoryCard category={category} />
                        </div>
                    ))}
                </div>

                <div className="flex justify-between p-4 sm:text-lg md:text-xl">
                    <h1>Eventos recentes</h1>
                    <Link to={"/eventos"} className="text-blue-600 hover:text-blue-400 hover:underline">
                        Ver mais
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4 items-start">
                    {events.content?.map(event => (
                        <div key={event.eventId} className="flex justify-center">
                            <EventCard event={event} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}