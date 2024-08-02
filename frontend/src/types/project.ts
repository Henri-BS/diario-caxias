export type Project = {
  id: number;
  title: string;
  body: string;
  image: string;
  userId: number;
  userFirstName: string;
  userLastName: string;
};

export type ProjectPage = {
  content?: Project[];
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

export type ProjectProps = {
  project: Project;
};
