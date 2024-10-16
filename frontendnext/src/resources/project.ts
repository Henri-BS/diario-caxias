import { BASE_URL } from ".";
import { useAuth } from "./auth";

export type Project = {
  id?: number;
  title?: string;
  body?: string;
  image?: string;
  userId?: number;
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
  project: Project;
};

class ProjectService {
  auth = useAuth();

  async saveProject(project: Project): Promise<void> {
    const response = await fetch(BASE_URL + "/projects/save", {
      method: "POST",
      body: JSON.stringify(project),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status == 409) {
      const responseError = await response.json();
      throw new Error(responseError.error);
    }
  }
}
export const useProjectService = () => new ProjectService();
