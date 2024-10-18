'use client'

import Link from "next/link";
import React, { FC, useState } from "react"
import { ToastContainer } from "react-toastify";
import * as FaIcons from "react-icons/fa6";
import { useAuth } from "@/resources/auth";
import { useRouter } from "next/navigation";
import { Dropdown, Popover } from "flowbite-react";


interface TemplateProps {
    children: React.ReactNode
    loading?: boolean;
}

export const Template: FC<TemplateProps> = ({ children, loading = false }: TemplateProps) => {
    return (
        <>
            <Header />
            <div className={`${loading ? 'animate-pulse' : ''} container mx-auto mt-28 px-4 `}>
                <RenderIf condition={loading}>
                    <div className="text-center">
                        <Loading />
                    </div>
                </RenderIf>
                {children}
            </div>
            <Footer />
            <ToastContainer position="top-right"
                autoClose={8000}
                hideProgressBar={false}
                draggable={false}
                closeOnClick={true}
                pauseOnHover={true}
            />
        </>
    );
}

interface RenderIfProps {
    condition?: boolean;
    children: React.ReactNode;
}

export const RenderIf: FC<RenderIfProps> = ({ condition = true, children }) => {
    if (condition) {
        return children
    }
    return false;
}

const Loading: FC = () => {
    return (
        <div role="status">
            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    );
}

const Header: FC = () => {

    const SidebarItems = [
        {
            title: "Início",
            path: "/inicio",
            icon: <FaIcons.FaHouse />
        },
        {
            title: "Notícias",
            path: "/postagens",
            icon: <FaIcons.FaNewspaper />
        },
        {
            title: "Projetos",
            path: "/projetos",
            icon: <FaIcons.FaFolderClosed />
        },
        {
            title: "Eventos",
            path: "/eventos",
            icon: <FaIcons.FaCalendarCheck />
        },
        {
            title: "Categrias",
            path: "/categorias",
            icon: <FaIcons.FaTag />
        },
        {
            title: "Usuários",
            path: "/usuarios",
            icon: <FaIcons.FaUser />
        }
    ]

    const [sidebar, setSidebar] = useState(true);
    const showSidebar = () => setSidebar(!sidebar);

    const auth = useAuth();
    const user = auth.getUserSession();
    const router = useRouter();

    function logout() {
        auth.invalidateSession();
        router.push("/login");
    }

    return (
        <>
            <header className="border-b border-gray-500 fixed w-full backdrop-blur-sm bg-[#171717ec] text-white py-6 z-40 top-0">
                <div className="mx-auto flex justify-between items-center px-2 gap-4">

                    <div className="gap-2 flex items-center ">
                        <div className=" text-2xl cursor-pointer">
                            <FaIcons.FaBars onClick={showSidebar} />
                        </div>
                        <Link href={"/inicio"}>
                            <h1 className="self-center text-xl font-semibold whitespace-nowrap">
                                Diário Caxias
                            </h1>
                        </Link>
                    </div>

                    <div className="flex  gap-2 items-center text-gray-300">
                        <Dropdown label={<FaIcons.FaPlus />}>
                            <div >
                                <Dropdown.Header className="font-semibold text-md">Adicionar</Dropdown.Header>
                                <Link href={"/projetos/adicionar"}>
                                    <Dropdown.Item className="gap-2">Projeto <FaIcons.FaFolderClosed /></Dropdown.Item>
                                </Link>
                                <Link href={"/eventos/adicionar"}>
                                    <Dropdown.Item className="gap-2">Evento <FaIcons.FaCalendarCheck /></Dropdown.Item>
                                </Link>
                                <Link href={"/postagens/adicionar"}>
                                    <Dropdown.Item className="gap-2">Notícia <FaIcons.FaNewspaper /></Dropdown.Item>
                                </Link>
                            </div>
                        </Dropdown>
                        <RenderIf condition={!!user}>
                            <div className="flex flex-row items-center">
                                <Popover title={user?.username} content={user?.username} className="bg-zinc-700 text-gray-100 p-1 rounded-lg" trigger="hover" arrow={false}>
                                    <img src={user?.image ? user?.image : "https://cdn1.iconfinder.com/data/icons/basic-ui-element-2-2-line/512/Basic_UI_Elements_-_2.1_-_line-11-256.png"} className="h-12 w-12 rounded-full bg-[#ffffffbe] cursor-point border border-gray-100 transition duration-600 hover:border-blue-500" />
                                </Popover>
                                <a className="flex flex-row items-center gap-2 py-3 px-6 text-md cursor-pointer font-medium text-blue-500 hover:underline" href={"/login"} onClick={logout}>
                                    Sair <FaIcons.FaRightFromBracket />
                                </a>
                            </div>
                        </RenderIf>
                    </div>

                </div>
            </header>
            <nav className={sidebar ? "fixed z-40 top-0 left-full transition duration-600" : "flex flex-col justify-top fixed z-40  bg-zinc-800 w-96 h-screen top-20 left-0 transition duration-600"}>
                <ul className="w-full" >
                    {SidebarItems.map((item, index) => {
                        return (
                            <li key={index} className="flex justify-start items-center p-4 h-20">
                                <Link href={item.path} className="flex items-center px-4 borber rounded-xl w-full h-16 p-4 text-2xl text-gray-400 hover:text-gray-100 hover:bg-gray-600 transition duration-600">
                                    {item.icon}
                                    <span className="ml-4">{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </>
    );
}



const Footer: FC = () => {
    return (
        <>
            <footer className="mt-2 bg-white shadow bg-zinc-800">
                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div className="sm:flex sm:items-center sm:justify-between">

                        <a href="/inicio" className="flex items-center sm:justify-between">
                            <span className="self-center text-3xl font-semibold whitespace-nowrap text-white">Diário Caxias</span>
                        </a>

                        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-100 sm:mb-0 ">
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6">Sobre o Diário Caxias</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6">Tutorial do Site</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6">Como Contribuir</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6">Termos de Uso e Privacidade</a>
                            </li>
                        </ul>
                    </div>
                    <hr className="my-6 border-gray-500 sm:mx-auto lg:my-8" />
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <span className="text-sm text-gray-200 sm:text-center">© 2025 Pasifcode.</span>
                        <div className="flex mt-4 lg:justify-center lg:mt-0 text-2x1">
                            <a href="mailto:hbsantos@gmail.com" className="me-4 text-gray-200 hover:text-white">
                                Email
                            </a>
                            <a href="https://www.linkedin.com/in/henrique-b-santos-1758351a3/" className="me-4 text-gray-200 hover:text-white">
                                Linkedin
                            </a>
                            <a href="https://github.com/Henri-BS" className="me-4 text-gray-200 hover:text-white">
                                GitHub
                            </a>

                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}