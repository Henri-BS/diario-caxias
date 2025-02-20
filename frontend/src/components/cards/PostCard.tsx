
import { Link } from "react-router-dom";
import { PostProps } from "resources/post";

export const PostCard = ({ post }: PostProps) => {
    return (
        <Link
            to={`/postagens/${post.id}`}
            className=" max-w-sm bg-zinc-100 border border-zinc-300 rounded-xl shadow-md transition duration-700 hover:shadow-xl hover:scale-105">
                <img className="object-cover w-full rounded-t-xl h-60" src={post.postImage ? post.postImage : "https://cdn1.iconfinder.com/data/icons/dashboard-ui-vol-1/48/JD-46-512.png"} alt={post.postTitle} />
                <div className="p-4 overflow-hidden text-ellipsis ...">
                    <h5 title={post.postTitle} className="mb-2 h-16 text-2xl font-semibold tracking-tight text-gray-900  overflow-hidden">{post.postTitle}</h5>
                    <p className="mb-3 h-24 font-normal text-gray-700 overflow-hidden">{post.postSummary}</p>
                </div>
        </Link>
    );
}

export const CarouselPostCard = ({ post }: PostProps) => {
    return (
        <Link to={`/postagens/${post.id}`} className=" bg-zinc-200 border border-zinc-300 rounded-xl  hover:bg-zinc-100 shadow-md transition duration-700 hover:shadow-xl ">
            <div className="lg:w-full bg-zinc-100 border border-zinc-300 rounded-xl shadow hover:bg-zinc-300">
                <img className="object-cover w-full rounded-t-xl h-60" src={post.postImage ?? "https://cdn1.iconfinder.com/data/icons/dashboard-ui-vol-1/48/JD-46-512.png"} alt={post.postTitle} />
                <h5 title={post.postTitle} className="mb-2 h-24 p-4 text-xl font-semibold tracking-tight text-gray-900 overflow-hidden text-ellipsis">{post.postTitle}</h5>
            </div>
        </Link>
    );
}