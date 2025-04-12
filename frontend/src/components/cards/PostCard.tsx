import { Link } from "react-router-dom";
import { PostProps } from "resources/post";

export const PostCard = ({ post }: PostProps) => {
    return (
        <Link to={`/postagens/${post.postId}`} className="w-full bg-zinc-800 rounded-lg hover:bg-zinc-100 shadow-md transition duration-700 hover:shadow-xl ">
            <div className="lg:w-full bg-zinc-100 rounded-lg">
                <img className="object-cover w-full rounded-xl h-60 md:h-80" src={post.postImage ? post.postImage : require("assets/img/image.png")} alt={"postagem"} />
                <h5 title={post.postTitle} className="h-[78px] rounded-b-xl w-full absolute bottom-0 p-4 text-lg font-semibold bg-zinc-800/80 tracking-tight text-white overflow-hidden text-ellipsis">{post.postTitle}</h5>
            </div>
        </Link>
    );
}

export const PostSmCard = ({ post }: PostProps) => {
    return (
        <Link to={`/postagens/${post.postId}`}>
                <div className="flex items-center space-x-4 rtl:space-x-reverse p-2 hover:bg-slate-200 transition duration-500 hover:shadow-lg rounded-md">
                    <img src={post.postImage ? post.postImage : require("assets/img/image.png")} alt="postagem" className="h-16 w-20 rounded-md" />
                    <div title={post.postTitle} className="inline-flex font-semibold text-gray-900 h-12 overflow-hidden">
                        {post.postTitle}
                    </div>
                </div>
        </Link>
    );
}