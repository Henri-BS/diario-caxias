export type Dept = {
    id: number;
    name: string;
    description: string;
}

export type DeptPage = {
    content?: Dept[];
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

  export type DeptProps = {
    dept: Dept;
  }

  export type DeptRelation = {
    id: number;
    relatingDeptId: number;
    relatedDeptId: number; 
    relatingDeptName: string;
    relatedDeptName: string;
    description: string;
}

export type DeptRelationPage = {
  content?: DeptRelation[];
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


export type DeptRelationProps = {
    deptRelation: DeptRelation;
  }  