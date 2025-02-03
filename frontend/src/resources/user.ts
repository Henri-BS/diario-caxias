import axios from "axios";
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

export type Credentials = {
  email?: string;
  password?: string;
}

export type AccessToken = {
  accessToken?: string;
}

export type UserSessionToken = {
  id?: number;
  username?: string;
  userImage?: string;
  email?: string;
  accessToken?: string;
  expiration?: number;
}

class UserService {
  baseUrl: string = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
  auth = useAuth();
  userSession = this.auth.getUserSession();

  async findUsers( pageNumber?: number, query?: string): Promise<UserPage> {
    const url = `${this.baseUrl}/users?page=${pageNumber}&query=${query}&size=12`;
    const response = axios(url, {
      headers: {
        Authorization: `Bearer ${this.userSession?.accessToken}`,
      },
    });
    const resp = await response;
    return resp.data;
  }

  async findUserById(id?: number): Promise<User> {
    const url = `${this.baseUrl}/users/${id}`;
    const response = axios(url, {
      headers: {
        Authorization: `Bearer ${this.userSession?.accessToken}`,
      },
    });
    const resp = await response;
    return resp.data;
  }
}

export const useUserService = () => new UserService();
