import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/main/Home";
import { UserLoginForm, UserRegisterForm } from "components/forms/UserForm";
import { PostList } from "pages/lists/ProjectList";
import { ProjectProfile } from "pages/profiles/ProjectProfile";
import { CategoryList } from "pages/lists/CategoryList";
import { CategoryProfile } from "pages/profiles/CategoryProfile";
import { UserList } from "pages/lists/UserList";
import { UserProfile } from "pages/profiles/UserProfile";
import Navbar from "components/shared/Navbar";

function PageRoutes() {
    return (
        <BrowserRouter>
        <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<UserRegisterForm />} />
                <Route path="/login" element={<UserLoginForm />} />
                <Route path="/projetos" element={<PostList />} />
                <Route path="/projeto" >
                    <Route path=":projectId" element={<ProjectProfile />} />
                </Route>
                <Route path="/categorias" element={<CategoryList />} />
                <Route path="/categoria" >
                    <Route path=":categoryId" element={<CategoryProfile />} />
                </Route>
                <Route path="/usuarios" element={<UserList />} />
                <Route path="/usuario" >
                    <Route path=":userId" element={<UserProfile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default PageRoutes;