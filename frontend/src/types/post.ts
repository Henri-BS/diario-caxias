export type Post = {
  id: number;
  title: string;
  body: string;
  image: string;
  userId: number;
  userName: string;
};

export type PostPage = {
  content?: Post[];
  size?: number;
  pageNumber?: number;
  numberOfElements?: number;
  totalElements?: number;
  totalPages?: number;
  number: number;
  empty?: boolean;
  first?: boolean;
  last?: boolean;
};

export type PostProps = {
  post: Post;
};