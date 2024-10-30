import axios from "axios";

export type Project = {
  id?: number;
  projectTitle?: string;
  projectDescription?: string;
  projectImage?: string;
  userId?: number;
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

class ProjectService {
  baseUrl: string = "http://localhost:8080";

  async saveProject(project: Project): Promise<void> {
    const response = await axios(this.baseUrl + "/projects/save", {
      method: "POST",
      data: JSON.stringify(project),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status == 409) {
      const responseError = await response.data();
      throw new Error(responseError.error);
    }
  }
}
export const useProjectService = () => new ProjectService();
