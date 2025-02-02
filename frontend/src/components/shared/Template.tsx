import { useEffect, useState } from "react"
import * as FaIcons from "react-icons/fa6";
import { Button, Dropdown, Modal, Tooltip } from "flowbite-react";
import axios from "axios";
import { useAuth } from "resources/auth";
import { User, useUserService } from "resources/user";
import { Link, useNavigate } from "react-router-dom";

export function removeAccents(str: any) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export const Loading = () => {
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

export const Header = () => {

    const SidebarItems = [
        {
            title: "Início",
            path: "/",
            icon: <FaIcons.FaHouse />
        },
        {
            title: "Postagens",
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
            title: "Categorias",
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
    const userSession = auth.getUserSession();
    const navigate = useNavigate();
    const userService = useUserService();
    const userId = userSession?.id;

    function FindUser() {
        const [user, setUser] = useState<User>();
        useEffect(() => {
            if (!!userSession) {
                userService.findUserById(userId)
                    .then((response) => {
                        setUser(response);
                    });
            }
        }, []);
        return (

            <Dropdown label="" dismissOnClick={false}
                renderTrigger={() => <img src={user?.userImage ?? "https://cdn1.iconfinder.com/data/icons/basic-ui-element-2-2-line/512/Basic_UI_Elements_-_2.1_-_line-11-256.png"} className="h-12 w-12 rounded-full bg-[#ffffffbe] cursor-point border border-gray-100 transition duration-600 hover:border-blue-500" />}>
                <Tooltip content={user?.username}>
                    <Dropdown.Item icon={FaIcons.FaUser} href={`/perfil/${userId}`} className="text-md font-medium">
                        Meu Perfil
                    </Dropdown.Item>
                </Tooltip>
                <Dropdown.Item icon={FaIcons.FaRightFromBracket} href="/login" className="text-md font-medium" onClick={logout}>
                    Sair
                </Dropdown.Item>
            </Dropdown>

        )
    }

    function logout() {
        auth.invalidateSession();
        navigate(0);
    }

    return (
        <>
            <header className="border-b border-gray-500 fixed w-full backdrop-blur-sm bg-[#171717ec] text-white py-5 z-40 top-0">
                <div className="mx-auto flex justify-between items-center px-2 gap-4">

                    <div className="gap-2 flex items-center ">
                        <div className=" text-2xl cursor-pointer">
                            <FaIcons.FaBars onClick={showSidebar} />
                        </div>
                        <Link to={"/"}>
                            <h1 className="self-center text-lg font-semibold whitespace-nowrap">
                                Diário Caxias
                            </h1>
                        </Link>
                    </div>

                    <div className="flex  gap-2 items-center text-gray-300">
                        <Dropdown label={<FaIcons.FaPlus />} color="[transparent]" >
                            <Dropdown.Header className="font-semibold text-md">Adicionar</Dropdown.Header>
                            <Link to={"/projetos/adicionar"}>
                                <Dropdown.Item className="gap-2">Projeto <FaIcons.FaFolderClosed /></Dropdown.Item>
                            </Link>
                            <Link to={"/eventos/adicionar"}>
                                <Dropdown.Item className="gap-2">Evento <FaIcons.FaCalendarCheck /></Dropdown.Item>
                            </Link>
                            <Link to={"/postagens/adicionar"}>
                                <Dropdown.Item className="gap-2">Postagem <FaIcons.FaNewspaper /></Dropdown.Item>
                            </Link>
                        </Dropdown>
                        {!userSession ?
                            <Link to={"/login"} >
                                <Button gradientDuoTone="greenToBlue">Login</Button>
                            </Link>
                            :
                            <div className="flex flex-row items-center">
                                <FindUser />
                            </div>
                        }
                    </div>
                </div>
            </header>
            <nav className={sidebar ? "fixed z-40 top-0 left-full transition duration-600" : "flex flex-col justify-top fixed z-40  bg-zinc-800 w-96 h-screen top-20 left-0 transition duration-600"}>
                <ul className="w-full" >
                    {SidebarItems.map((item, index) => {
                        return (
                            <li key={index} className="flex justify-start items-center p-4 h-20">
                                <Link to={item.path} className="flex items-center px-4 borber rounded-xl w-full h-16 p-4 text-2xl text-gray-400 hover:text-gray-100 hover:bg-gray-600 transition duration-600">
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



export const Footer = () => {

    const [aboutModal, setAboutModal] = useState<boolean>(false);
    const [tutorialModal, setTutorialModal] = useState<boolean>(false);
    const [contributeModal, setContributeModal] = useState<boolean>(false);
    const [termsModal, setTermsModal] = useState<boolean>(false);

    return (
        <>
            <footer className="mt-2 bg-white shadow bg-zinc-800">
                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div className="sm:flex sm:items-center sm:justify-between">

                        <a href="/" className="flex items-center sm:justify-between">
                            <span className="self-center text-3xl font-semibold whitespace-nowrap text-white">Diário Caxias</span>
                        </a>

                        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-100 sm:mb-0 ">
                            <li>
                                <a onClick={() => setAboutModal(true)} className="cursor-pointer hover:underline me-4 md:me-6">Sobre o Diário Caxias</a>
                            </li>
                            <li>
                                <a onClick={() => setTutorialModal(true)} className="cursor-pointer hover:underline me-4 md:me-6">Tutorial do site</a>
                            </li>
                            <li>
                                <a onClick={() => setContributeModal(true)} className="cursor-pointer hover:underline me-4 md:me-6">Como contribuir?</a>
                            </li>
                            <li>
                                <a onClick={() => setTermsModal(true)} className="cursor-pointer hover:underline me-4 md:me-6">Termos de uso e privacidade</a>
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
            <Modal show={aboutModal} size="4xl" onClose={() => setAboutModal(false)}>
                <Modal.Header>Sobre o Diário Caxias</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6 p-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Aqui nesta plataforma você poderá encontrar um vasto acervo de projetos e eventos que visam contribuir com o desenvolvimento educacional, profissional e cultural da cidade de Caxias do Maranhão.
                            O Diário Caxias se compromete em estabelecer um vínculo entre a educação formal e a informal, permitindo que pessoas das mais diversas áreas ou níveis acadêmicos possam participar ativamente das atividades propostas, almejando uma participação multidisciplinar dos Caxienses.
                            Dedicada a promover e apoiar iniciativas que visam a integração social e o desenvolvimento comunitário na cidade de Caxias do Maranhão.
                            Esta plataforma serve como um ponto de encontro para cidadãos, organizações não governamentais, empresas e instituições públicas que desejam contribuir para o bem-estar da comunidade local.
                            <ul>
                                <h3 className="text-lg">O Diário Caxias se compromete com os seguintes objetivos:</h3>
                                <li>Conectar indivíduos e grupos com projetos de educacionais e profissionais que necessitam de voluntários, recursos ou parcerias.</li>
                                <li>Oferecer um espaço onde os projetos podem compartilhar suas atividades, resultados e necessidades de forma transparente.</li>
                                <li>Incentivar a participação ativa dos cidadãos, grupos eorganizações  em iniciativas comunitárias, promovendo um senso de pertencimento e responsabilidade social.</li>
                                <li>Contribuir para o desenvolvimento sustentável da cidade através de projetos que gerem impacto positivo nas áreas de educação, saúde, meio ambiente, cultura e economia.</li>
                            </ul>
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button gradientDuoTone="purpleToBlue" onClick={() => setAboutModal(false)}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={tutorialModal} size="4xl" onClose={() => setTutorialModal(false)}>
                <Modal.Header>Tutorial do site</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6 p-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            O Diário Caxias permite que os seus usuários possam ter acesso a diversos recursos, alguns do principais recursos poderão ser visto logo a seguir
                            <ul>
                                <h3 className="text-lg">Projetos</h3>
                                <li>Os projetos possuem o objetivo de agregar todo o conteúdo relacionado a uma determinada temática. Um projeto pode possuir vários eventos, categorias ou nóticias que estejam relacionados a temática.</li>
                                <li>Lista de Projetos: a lista completa de projetos pode ser acessada através da opção "Projetos" no menu lateral da barra de navegação, na página da lista é possível buscar projetos pelo título através do mecanismo de busca.</li>
                                <li>Perfil do Projeto: ao clicar em um card na lista de projetos, é possível acessar o perfil do projeto que possui informações como: descrição do projeto, eventos, categorias e postagens relacionadas.</li>
                                <li>Criação de Projeto: usuários cadastrados podem criar projetos, basta clicar no botão de criação no canto superior direito da tela e selecionar a opção "Projetos" depois é necessário inserir os dados solicitados e salvar.</li>
                            </ul>
                            <ul>
                                <h3 className="text-lg">Eventos</h3>
                                <li>Cada projeto é formado por vários eventos e os eventos irão conter informações sobre as atividades que irão ocorrer relacionadas a temática do projeto, os eventos irão manter o projeto vivo e para isso eles contam com a participação de usuários interessados.</li>
                                <li>Lista de Eventos: a lista completa de eventos pode ser acessada através da opção "Eventos" no menu lateral da barra de navegação, na página da lista é possível buscar eventos pelo título através do mecanismo de busca.</li>
                                <li>Perfil do Evento: ao clicar em um card na lista de eventos, é possível acessar o perfil do evento que possui informações como: descrição do evento, projeto relacionado, status, data, usuários relacionados.</li>
                                <li>Criação de Evento: usuários cadastrados podem criar eventos, basta clicar no botão de criação no canto superior direito da tela e selecionar a opção "Eventos" depois é necessário inserir os dados solicitados e salvar.</li>
                            </ul>
                            <ul>
                                <h3 className="text-lg">Categorias</h3>
                                <li>Lista de Categrias: a lista completa de categorias pode ser acessada através da opção "Categorias" no menu lateral da barra de navegação, na página da lista é possível buscar categorias pelo título através do mecanismo de busca.</li>
                                <li>Perfil da Categoria: ao clicar em um card na lista de categorias, é possível acessar o perfil da categoria que possui informações como: descrição da categoria, projetos e usuários relacionados.</li>
                            </ul>
                            <ul>
                                <h3 className="text-lg">Postagens</h3>
                                <li>As postagens têm o propósito de manter os usuários informados sobre as últimas ocorrências relacionadas a temática de um projeto, uma nóticia pode flar sobre mais de um projeto específico e também pode abordar a temática do projeto de outras formas se for mais conveniente.</li>
                                <li>Lista de Postagens: a lista completa de postagens pode ser acessada através da opção "Postagens" no menu lateral da barra de navegação, na página da lista é possível buscar postagens pelo título através do mecanismo de busca.</li>
                                <li>Perfil da Postagem: ao clicar em um card na lista de postagens, é possível acessar o perfil da postagem que possui informações como: descrição da postagem, resumo e projetos relacionados.</li>
                                <li>Criação de Postagem: usuários cadastrados podem criar postagens, basta clicar no botão de criação no canto superior direito da tela e selecionar a opção "Postagens" depois é necessário inserir os dados solicitados e salvar.</li>
                            </ul>
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button gradientDuoTone="purpleToBlue" onClick={() => setTutorialModal(false)}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={contributeModal} size="4xl" onClose={() => setContributeModal(false)}>
                <Modal.Header>Como Contribuir?</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6 p-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Aqui vai algumas dicas sobre como você pode contribuir e participar do Diário Caxias. Existem várias abordagens para se introduzir na atividades da plataforma, vamos explorar algumas a seguir.
                            <ul>
                                <h3>Organizações/ONGs</h3>
                                <p>Se você faz parte uma organização que tenha interesse em participar das atividades do Diário Caxias, o mais recomendado é que a organização crie um projeto na plataforma e fique responsável em administrar os eventos que ocorrem lá dentro.</p>
                                <h3>Membro comum</h3>
                                <p>Se você é uma pessoa física que não possui interesse em vínculos profundos, você pode apenas participar dos eventos relacionados as temáticas de seu interesse.</p>
                            </ul>
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button gradientDuoTone="purpleToBlue" onClick={() => setContributeModal(false)}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal show={termsModal} size="4xl" onClose={() => setTermsModal(false)}>
                <Modal.Header>Termos de Uso e Política de Privacidade</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6 p-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">

                            <h3 className="text-lg">Termos de Uso</h3>
                            <ul>
                                <li>1. Aceitação dos Termos Ao acessar e utilizar o Diário Caxias, você concorda com os presentes Termos de Uso. Caso não concorde com algum dos termos, não utilize a plataforma.</li>
                                <li>2. Objetivo da Plataforma Diário Caxias tem como objetivo conectar cidadãos, organizações e empresas com projetos sociais que visam a integração social e a contribuição comunitária em Caxias do Maranhão.</li>
                                <li>3. Cadastro de Usuários Para utilizar a plataforma, é necessário realizar um cadastro, fornecendo informações pessoais verdadeiras e atualizadas. O usuário é responsável por manter a confidencialidade de sua senha e por todas as atividades realizadas com sua conta.</li>
                                <li>4. Responsabilidades do Usuário O usuário se compromete a utilizar a plataforma de forma ética e legal, não publicando conteúdos ofensivos, discriminatórios ou que violem direitos de terceiros.</li>
                                <li>5. Direitos da Plataforma Diário Caxias reserva-se o direito de modificar ou descontinuar, temporariamente ou permanentemente, os serviços oferecidos, com ou sem aviso prévio.</li>
                                <li>6. Limitação de Responsabilidade A plataforma não se responsabiliza por quaisquer danos diretos ou indiretos resultantes do uso ou da incapacidade de uso dos serviços oferecidos.</li>
                                <li>7. Modificações dos Termos de Uso Diário Caxias pode alterar os Termos de Uso a qualquer momento. As alterações serão comunicadas aos usuários e entrarão em vigor imediatamente após a publicação.</li>
                            </ul>

                            <h3 className="text-lg">Política de Privacidade</h3>
                            <ul>
                                <li>1. Coleta de Informações Coletamos informações pessoais fornecidas pelos usuários no momento do cadastro, como nome, e-mail e telefone, além de dados de navegação, como endereço IP e cookies.</li>
                                <li>2. Uso das Informações As informações coletadas são utilizadas para:
                                    <ul>
                                        <li>Facilitar a conexão entre usuários e projetos sociais.</li>
                                        <li>Melhorar a experiência do usuário na plataforma.</li>
                                        <li>Enviar comunicações relevantes sobre a plataforma e seus serviços.</li>
                                    </ul>
                                </li>
                                <li>3. Compartilhamento de Informações Não compartilhamos informações pessoais dos usuários com terceiros, exceto quando necessário para cumprir obrigações legais ou proteger os direitos da plataforma.</li>
                                <li>4. Segurança das Informações Adotamos medidas de segurança para proteger as informações pessoais dos usuários contra acesso não autorizado, alteração, divulgação ou destruição.</li>
                                <li>5. Direitos dos Usuários Os usuários têm o direito de acessar, corrigir ou excluir suas informações pessoais a qualquer momento, mediante solicitação.</li>
                                <li>6. Alterações na Política de Privacidade o Diário Caxia pode alterar esta Política de Privacidade a qualquer momento. As alterações serão comunicadas aos usuários e entrarão em vigor imediatamente após a publicação.</li>
                                <li>7. Contato Em caso de dúvidas sobre os Termos de Uso ou a Política de Privacidade, entre em contato conosco através do e-mail: pasifcode@gmail.com.</li>
                            </ul>
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button gradientDuoTone="purpleToBlue" onClick={() => setTermsModal(false)}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}