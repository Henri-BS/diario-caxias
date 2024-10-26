import axios from "axios";
import { BASE_URL } from ".";

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

  async saveProject(project: Project): Promise<void> {
    const response = await axios(BASE_URL + "/projects/save", {
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
