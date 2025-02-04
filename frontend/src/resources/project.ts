import axios from "axios";
import { useAuth } from "./auth";
import { baseUrl } from "utils/requests";

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
  auth = useAuth();
  userSession = this.auth.getUserSession();

  async saveProject(project: Project): Promise<void> {
     await axios(baseUrl + "/projects/save", {
      method: "POST",
      data: JSON.stringify(project),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export const useProjectService = () => new ProjectService();

