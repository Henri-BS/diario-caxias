export type Project = {
  id?: number;
  title?: string;
  body?: string;
  image?: string;
};

export type ProjectPage = {
  content: Project[];
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
};

export type ProjectProps = {
  event: Project;
};
