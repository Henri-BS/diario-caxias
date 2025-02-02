import { UserProps } from "resources/user";

export const UserCard = ({ user}: UserProps) => {
    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-xl transition duration-700 hover:scale-105">
            <div className="flex flex-col h-48 items-center pb-10">
                <img className="w-24 h-24 mb-3 rounded-full shadow-xl" src={user.userImage ?? "https://cdn1.iconfinder.com/data/icons/basic-ui-element-2-2-line/512/Basic_UI_Elements_-_2.1_-_line-11-256.png"} alt=""/>
                <h5 className="mb-1 text-xl font-medium text-gray-900 ">{user.username}</h5>
                <span className="text-sm text-gray-500">{user.userLocation}</span>
            </div>
        </div>
    );
}
