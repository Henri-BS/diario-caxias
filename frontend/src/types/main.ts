import { Category } from "./category";
import { Post } from "./post";
import { User } from "./user";

export type Page = {
    content?: Post[] | User[] | Category[];
    last?: boolean;
    totalElements?: number;
    totalPages?: number;
    size?: number;
    number: number;
    first?: boolean;
    numberOfElements?: number;
    empty?: boolean;
    pageNumber?: number;
  };
  
  export type Props = {
    id: string;
  };