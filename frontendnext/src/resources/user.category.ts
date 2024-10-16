export type UserCategory = {
    id?: number;
    userId?: number;
    username?: string;
    categoryId?: number;
    categoryName: string;
  };
  
  export type UserCategoryPage = {
    content: UserCategory[];
    page: {
      size: number;
      totalElements: number;
      totalPages: number;
      number: number;
    };
  };
  
  export type UserCategoryProps = {
    user: UserCategory;
  };
  