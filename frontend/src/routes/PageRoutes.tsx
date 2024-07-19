import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/main/Home";
import { UserLoginForm, UserRegisterForm } from "components/forms/UserForm";
import { PostList } from "pages/lists/PostList";
import { PostProfile } from "pages/profiles/PostProfile";
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
                <Route path="/postagens" element={<PostList />} />
                <Route path="/postagem" >
                    <Route path=":postId" element={<PostProfile />} />
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