import Link from "next/link";
import React from "react"

interface TemplateProps {
    children: React.ReactNode
}

export const Template: React.FC<TemplateProps> = (props: TemplateProps) => {
    return (
        <>
        <Header/>
            {props.children}
            <Footer/>
        </>
    );
}

const Header: React.FC = () => {
    return (

        <header className="border-b border-gray-500 backdrop-blur-4x1 bg-zinc-800 text-white py-6">
            <div className="mx-auto flex justify-between items-center px-2">
                <Link href={"/projetos"}>
                    <h1 className="self-center text-3x1 font-semibold whitespace-nowrap dark:text-white">
                        Diário Caxias
                    </h1>
                </Link>
            </div>
        </header>
    );
}

const Footer: React.FC = () => {
    return (
        <>
            <footer className="mt-2 bg-white shadow bg-zinc-800">
                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div className="sm:flex sm:items-center sm:justify-between">

                        <a href="#" className="flex items-center sm:justify-between">
                            <span className="self-center text-3x1 font-semibold whitespace-nowrap text-white">Diário Caxias</span>
                        </a>

                        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-300">
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
                        <span className="text-sm text-gray-200 sm:text-center">© 2023 Pasifcode.</span>
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