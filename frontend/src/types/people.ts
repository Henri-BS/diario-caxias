import { Dept } from "./dept";

export type People = {
    id: number;
    name: string;
    age: number;
    image: string;
    deptId: Dept;
    deptName: string;
}

export type PeoplePage = {
    content?: People[];
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

  export type PeopleProps = {
    people: People;
  }