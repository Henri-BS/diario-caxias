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
  baseUrl: string =  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
  auth = useAuth();
  userSession = this.auth.getUserSession();


  async findPosts( pageNumber?: number, query?: string): Promise<PostPage> {
    const url = `${this.baseUrl}/posts?page=${pageNumber}&query=${query}&size=12`;
    const response = axios(url, {
      headers: {
        Authorization: `Bearer ${this.userSession?.accessToken}`,
      },
    });
    const resp = await response;
    return resp.data;
  }

  async findPostById(id?: number): Promise<Post> {
    const url = `${this.baseUrl}/posts/${id}`;
    const response = axios(url, {
      headers: {
        Authorization: `Bearer ${this.userSession?.accessToken}`,
      },
    });
    const resp = await response;
    return resp.data;
  }

  async savePost(post: Post): Promise<void> {
      await axios(this.baseUrl + "/posts/save", {
      method: "POST",
      data: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async findProjectsByPost( postId?: number, pageNumber?: number ): Promise<PostPage> {
    const url = `${this.baseUrl}/project-post?postId=${postId}&page=${pageNumber}&size=8`;
    const response = axios(url, {
      headers: {
        Authorization: `Bearer ${this.userSession?.accessToken}`,
      },
    });
    const resp = await response;
    return resp.data;
  }
}
export const usePostService = () => new PostService();