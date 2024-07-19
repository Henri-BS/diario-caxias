import axios from "axios";
import { CategoryCard } from "components/cards/CategoryCard";
import { PostMdCard } from "components/cards/PostCard";
import { useEffect, useState } from "react";
import { Category, CategoryPage } from "types/category";
import { PostPage } from "types/post";
import { BASE_URL } from "utils/requests";

function Home() {

    const [categoryList, setCategoryList] = useState<Category[]>();
    useEffect(() => {
        axios.get(`${BASE_URL}/category/list`)
            .then((response) => {
                setCategoryList(response.data);
            });
    }, []);

    const [postPage, setPostPage] = useState<PostPage>({ content: [], number: 0 });
    useEffect(() => {
        axios.get(`${BASE_URL}/post/list?&size=${postPage.numberOfElements}`)
            .then((response) => {
                setPostPage(response.data);
            });
    }, []);

    return (
        <>
            <div className="list-horizontal-container">
                {categoryList?.map((x) =>
                    <div key={x.id} className="list-horizontal-item ">
                        <CategoryCard category={x} />
                    </div>
                )}
            </div>
            <div className="container disable-text-selection">
            <h2>Publicações</h2>
                <div className="row">
                    {postPage.content?.map((x) =>
                        <div key={x.id} className="col-12 col-lg-6">
                            <PostMdCard post={x} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
export default Home;