export type Post = {
  id?: number;
  imageUrl?: string;
  title?: string;
  description?: string;
  extension?: string;
  uploadDate?: string;
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
