import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/main/Home";
import { UserLoginForm, UserRegisterForm } from "components/forms/UserForm";
import { PostList } from "pages/lists/PostList";
import { PostProfile } from "pages/profiles/PostProfile";

function PageRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<UserRegisterForm />} />
                <Route path="/login" element={<UserLoginForm />} />
                <Route path="/postagens" element={<PostList />} />
                <Route path="/postagem" >
                    <Route path=":postId" element={<PostProfile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default PageRoutes;