import axios from "axios";
import { baseUrl } from "@/utils/resource";

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
  async savePost(post: Post): Promise<void> {
    const response = await axios(baseUrl + "/posts/save", {
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

