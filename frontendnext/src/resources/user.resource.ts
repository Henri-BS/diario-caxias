export type User = {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  bio?: string;
  imageUrl?: string;
  location?: string;
  createdDate?: string;
};

export type UserPage = {
  content: User[];
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
};

export type UserProps = {
  user: User;
};
