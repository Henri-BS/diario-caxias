import { Dept, DeptRelation } from "./dept";
import { People } from "./people";

export type Page = {
  content?: People[] | Dept[] | DeptRelation[];
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
