import axios from "axios";
import { useAuth } from "./auth";

export type Post = {
  id?: number;
  postTitle?: string;
  postDescription?: string;
  postSummary?: string;
  postImage?: string;
  createdDate?: string;
  userId?: number;
};

export type PostPage = {
  content: Post[];
  page: {
    totalElements: number;
    number: number;
  };
};

export type PostProps = {
  post: Post;
};

class PostService {
  baseUrl: string =  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080" + "/posts";
  auth = useAuth();

  async findPosts( pageNumber?: number, query?: string): Promise<PostPage> {
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

  async findPostById(id?: number): Promise<Post> {
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

  async savePost(post: Post): Promise<void> {
    const response = await axios(this.baseUrl + "/save", {
      method: "POST",
      data: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status == 409) {
      const responseError = await response.data;
      throw new Error(responseError.error);
    }
  }
}
export const usePostService = () => new PostService();