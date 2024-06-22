import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/main/Home";

function PageRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default PageRoutes;