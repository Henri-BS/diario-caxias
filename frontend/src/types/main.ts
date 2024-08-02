import { Category } from "./category";
import { Project } from "./project";
import { User } from "./user";
import { Event } from "./event";

export type Page = {
    content?: Project[] | User[] | Category[] | Event[];
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