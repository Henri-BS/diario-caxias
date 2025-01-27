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
  baseUrl: string = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080" + "/users";

  auth = useAuth();

  async findUsers( pageNumber?: number, query?: string): Promise<UserPage> {
    const userSession = this.auth.getUserSession();
    const url = `${this.baseUrl}?page=${pageNumber}&query=${query}&size=12`;
    const response = axios(url, {
      headers: {
        Authorization: `Bearer ${userSession?.accessToken}`,
      },
    });
    const resp = await response;
    return resp.data;
  }

  async findUserById(id?: number): Promise<User> {
    const userSession = this.auth.getUserSession();
    const url = `${this.baseUrl}/${id}`;
    const response = axios(url, {
      headers: {
        Authorization: `Bearer ${userSession?.accessToken}`,
      },
    });
    const resp = await response;
    return resp.data;
  }

  async updateUserInfo(data: FormData): Promise<string> {
    const userSession = this.auth.getUserSession();
    const response = await axios(this.baseUrl + `/update`, {
      method: "PUT",
      data: data,
      headers: {
        Authorization: `Bearer ${userSession?.accessToken}`,
      },
    });
    return await response.data;
  }
}

export const useUserService = () => new UserService();

class EventUserService {
  baseUrl: string = process.env.NEXT_PUBLIC_API_URL + "/event-user";
  auth = useAuth();


  async findUsersByEvent(eventId?: number, pageNumber?: number): Promise<UserPage> {
    const userSession = this.auth.getUserSession();
    const url = `${this.baseUrl}/by-event/${eventId}?page=${pageNumber}&size=9`;
    const response = axios(url, {
      headers: {
        Authorization: `Bearer ${userSession?.accessToken}`,
      },
    });
    const resp = await response;
    return resp.data;
  }
}

export const useEventUserService = () => new EventUserService();