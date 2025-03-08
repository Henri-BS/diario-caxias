export type Post = {
  postId?: number;
  postTitle?: string;
  postDescription?: string;
  postSummary?: string;
  postImage?: string;
  createdDate?: string;
  userId?: number;
  username?: string;
  userImage?: string;
  userBio?: string;
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
