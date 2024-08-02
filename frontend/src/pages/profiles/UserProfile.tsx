import axios from "axios";
import { ProjectMdCard } from "components/cards/ProjectCard";
import { UserLgCard } from "components/cards/UserCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Props } from "types/main";
import { Project, ProjectPage } from "types/project";
import { BASE_URL } from "utils/requests";

export function UserProfile() {

    const params = useParams();

    return (
        <>
            <div className="container">
                <UserLgCard id={`${params.userId}`} />               
                <PostListByUser id={`${params.userId}`} />                             
            </div>
        </>
    );
    
}

function PostListByUser({ id: userId }: Props) {
    const [postList, setPostList] = useState<Project[]>();
    useEffect(() => {
        axios.get(`${BASE_URL}/post/list-by-user/${userId}`)
            .then((response) => {
                setPostList(response.data);
            });
    }, [userId]);

    return (
        <>
            <div className="card-sm-box ">
                <div className="py-3 d-flex justify-content-between">
                    <h4 className="card-title">Projetos</h4>
                </div>
                    <div className="row">
                        {postList?.map(x => (
                            <div key={x.id} className="col-6">
                                <ProjectMdCard project={x} />
                            </div>
                        ))}
                    </div>
            </div>
        </>
    );
}