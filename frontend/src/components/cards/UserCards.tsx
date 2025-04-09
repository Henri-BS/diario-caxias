import { Link } from "react-router-dom";
import { UserProps } from "resources/user";

export const UserCard = ({ user }: UserProps) => {
    return (
        <Link to={`/usuarios/${user.id}`} className="flex flex-row items-center w-full p-2 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition duration-700 hover:scale-105">
            <img className="w-24 h-24 mb-3 rounded-full shadow-lg border-2" src={user.userImage ? user.userImage : require("assets/img/user_profile.png")} alt={user.username} />
            <div className="flex flex-col justify-between gap-2 pl-2">
                <h5 className="mb-1 text-xl font-medium text-gray-900 ">{user.username}</h5>
                <span className="text-sm text-gray-500">{user.userLocation}</span>
            </div>
        </Link>
    );
}
