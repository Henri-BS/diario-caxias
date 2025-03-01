export type Project = {
  id?: number;
  projectTitle?: string;
  projectDescription?: string;
  projectImage?: string;
  userId?: number;
  username?: string;
};

export type ProjectPage = {
  content: Project[];
  page: {
    size?: number;
    totalElements: number;
    totalPages?: number;
    number: number;
  };
};

export type ProjectProps = {
  project: Project;
};

export type ItemDetails = {
  id?: number;
  itemType?: string;
  itemDescription?: string;
  projectId?: number;
  userId?: number;
};
