import axios from "axios";
import { CategoryCard } from "components/cards/CategoryCard";
import { ProjectMdCard } from "components/cards/ProjectCard";
import { useEffect, useState } from "react";
import { Category, CategoryPage } from "types/category";
import { ProjectPage } from "types/project";
import { BASE_URL } from "utils/requests";

function Home() {

    const [categoryList, setCategoryList] = useState<CategoryPage>({ content: [], number: 0 });
    useEffect(() => {
        axios.get(`${BASE_URL}/category/list`)
            .then((response) => {
                setCategoryList(response.data);
            });
    }, []);

    const [postPage, setPostPage] = useState<ProjectPage>({ content: [], number: 0 });
    useEffect(() => {
        axios.get(`${BASE_URL}/project/list?&size=${postPage.numberOfElements}`)
            .then((response) => {
                setPostPage(response.data);
            });
    }, []);

    return (
        <>

            <div className="container disable-text-selection">
                <h2>Projetos</h2>
                <div className="row">
                    {postPage.content?.map((x) =>
                        <div key={x.id} className="col-12 col-lg-6">
                            <ProjectMdCard project={x} />
                        </div>
                    )}
                </div>
                <hr />
                <div className="row">
                    <h2>Categorias</h2>
                    {categoryList.content?.map((x) =>
                        <div key={x.id} className="col-4 col-md-2 my-2">
                            <CategoryCard category={x} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
export default Home;