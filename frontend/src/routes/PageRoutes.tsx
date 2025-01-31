import { Header, Footer, Loading } from "components/shared/Template";
import Login from "pages/forms/LoginForm";
import Categories from "pages/lists/CategoryList";
import Events from "pages/lists/EventList";
import Posts from "pages/lists/PostList";
import Projects from "pages/lists/ProjectList";
import Users from "pages/lists/UserList";
import Home from "pages/main/Home";
import { CategoryProfile } from "pages/profiles/CategoryProfile";
import { EventProfile } from "pages/profiles/EventProfile";
import { PostProfile } from "pages/profiles/PostProfile";
import { ProjectProfile } from "pages/profiles/ProjectProfile";
import { UserPersonalProfile } from "pages/profiles/UserProfile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

interface TemplateProps {
    loading?: boolean;
}

export default function PageRoutes({ loading = false }: TemplateProps) {


    return (
        <>
            <BrowserRouter>
                <Header />
                <div className={`${loading ? 'animate-pulse' : ''} mt-10 p-6`} >
                    {loading ?
                        <div className="text-center">
                            <Loading />
                        </div>
                        :
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/usuarios" element={<Users />} />
                            <Route path="/perfil/:userId" element={<UserPersonalProfile />} />
                            <Route path="/projetos" element={<Projects />} />
                            <Route path="/projetos/:projectId" element={<ProjectProfile />} />
                            <Route path="/eventos" element={<Events />} />
                            <Route path="/eventos/:eventTitle" element={<EventProfile />} />
                            <Route path="/categorias" element={<Categories />} />
                            <Route path="/categorias/:categoryName" element={<CategoryProfile />} />
                            <Route path="/postagens" element={<Posts />} />
                            <Route path="/postagens/:postId" element={<PostProfile />} />
                        </Routes>
                    }
                </div>
                <Footer />
                <ToastContainer position="top-right"
                    autoClose={8000}
                    hideProgressBar={false}
                    draggable={false}
                    closeOnClick={true}
                    pauseOnHover={true}
                />
            </BrowserRouter>
        </>
    );
}