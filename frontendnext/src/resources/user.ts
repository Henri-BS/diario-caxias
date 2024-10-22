import axios from "axios";
import { BASE_URL } from ".";
import { useAuth } from "./auth";

export type User = {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  userBio?: string;
  userImage?: string;
  userCoverImage?: string;
  userLocation?: string;
  createdDate?: string;
};

export type UserPage = {
  content: User[];
  page: {
    size?: number;
    totalElements: number;
    totalPages?: number;
    number: number;
  };
};

export type UserProps = {
  user: User;
};


export class Credentials {
    email?: string;
    password?: string;
}

export class AccessToken {
    accessToken?: string;
}

export class UserSessionToken {
    id?: number;
    username?: string;
    image?: string;
    email?: string;
    accessToken?: string;
    expiration?: number;
}

class UserService {
 auth = useAuth();
  async updateUserInfo(data: FormData): Promise<string> {
    const userSession = this.auth.getUserSession();
    const response = await axios(BASE_URL + `/users/update`, {
      method: "PUT",
      data: data,
      headers: {
        "Authorization": `Bearer ${userSession?.accessToken}`
      },
    });
    return await response.data;
  }  
}

export const useUserService = () => new UserService();
