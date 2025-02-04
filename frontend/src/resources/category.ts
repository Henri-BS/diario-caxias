export type Category = {
    id?: number;
    categoryName?: string;
    categoryDescription?: string;
};
  
export type CategoryPage = {
  content: Category[];
  page: {
    totalElements: number;
    number: number;
  };
};

export type CategoryProps = {
  category: Category;
};

