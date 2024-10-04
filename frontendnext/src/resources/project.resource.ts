export type Project = {
    id?: number;
    title?: string;
    body?: string;
    image?: string;
}


export type ProjectPage = {
    content?: Project[];
    size?: number;
    totalElements: number;
    totalPages?: number;
    number: number;
  };
  
  export type ProjectProps = {
    project: Project;
  };