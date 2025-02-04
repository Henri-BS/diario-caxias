import axios from "axios";
import { useAuth } from "./auth";
import { baseUrl } from "utils/requests";

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
  auth = useAuth();
  userSession = this.auth.getUserSession();

  async savePost(post: Post): Promise<void> {
      await axios(baseUrl + "/posts/save", {
      method: "POST",
      data: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

}
export const usePostService = () => new PostService();