import { BASE_URL } from ".";
import { useAuth } from "./auth";

export type Post = {
  id?: number;
  image?: string;
  title?: string;
  description?: string;
  uploadDate?: string;
  userId?: number;
};

export type PostPage = {
  content: Post[];
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
};

export type PostProps = {
  post: Post;
};

class PostService {
  async savePost(post: Post): Promise<void> {
    const response = await fetch(BASE_URL + "/posts/save", {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status == 409) {
      const responseError = await response.json();
      throw new Error(responseError.error);
    }
  }
}
export const usePostService = () => new PostService();