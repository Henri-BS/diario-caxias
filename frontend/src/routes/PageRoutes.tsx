import { Header, Footer, Loading } from "components/shared/Template";
import Login from "pages/forms/LoginForm";
import Projects from "pages/lists/ProjectList";
import Users from "pages/lists/UserList";
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
                <div className={`${loading ? 'animate-pulse' : ''} mt-10`} >
                    {loading ?
                        <div className="text-center">
                            <Loading />
                        </div>
                        :
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/usuarios" element={<Users />} />
                            <Route path="/perfil:userId" element={<Login />} />
                            <Route path="/projetos" element={<Projects />} />
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