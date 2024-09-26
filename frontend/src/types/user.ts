export type User = {
  id: number;
  username: string;
  image: string;
  email: string;
  password: string;
};

export type UserPage = {
  content?: User[];
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

export type UserProps = {
  user: User;
};
