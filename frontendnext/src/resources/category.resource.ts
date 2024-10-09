export type Category = {
  id?: number;
  name?: string;
};

export type CategoryPage = {
  content: Category[];
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
};

export type CategoryProps = {
  category: Category;
};
