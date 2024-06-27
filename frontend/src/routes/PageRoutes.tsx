import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/main/Home";
import { UserLoginForm, UserRegisterForm } from "components/forms/UserForm";

function PageRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<UserRegisterForm />} />
                <Route path="/login" element={<UserLoginForm />} />
                <Route path="/dashboard" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default PageRoutes;