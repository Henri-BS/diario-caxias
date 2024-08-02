export type Category = {
  id: number;
  name: string;
  description: string;
  postId: number;
};

export type CategoryPage = {
  content?: Category[];
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

export type CategoryProps = {
  category: Category;
};
