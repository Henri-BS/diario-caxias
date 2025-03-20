export type Project = {
  id?: number;
  projectTitle?: string;
  projectDescription?: string;
  projectImage?: string;
  projectDetails?: string;
  userId?: number;
  username?: string;
  userImage?: string;
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

export type ProjectCategory = {
  id?: number;
  categoryName?: string;
  projectTitle?: string;
  projectDescription?: string;
  projectImage?: string;
  projectDetails?: string;
  userId?: number;
};

