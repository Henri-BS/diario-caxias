import axios from "axios";
import { useAuth } from "./auth";

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
  baseUrl: string = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080" + "/projects";
  auth = useAuth();

  async findProjects( pageNumber?: number, query?: string ): Promise<ProjectPage> {
    const userSession = this.auth.getUserSession();
    const url = `${this.baseUrl}?page=${pageNumber}&query=${query}&size=8`;
    const response = axios(url, {
      headers: {
        Authorization: `Bearer ${userSession?.accessToken}`,
      },
    });
    const resp = await response;
    return resp.data;
  }

  async findProjectsByUser( userId?: number, pageNumber?: number ): Promise<ProjectPage> {
    const userSession = this.auth.getUserSession();
    const url = `${this.baseUrl}/by-user/${userId}?page=${pageNumber}&size=10`;
    const response = axios(url, {
      headers: {
        Authorization: `Bearer ${userSession?.accessToken}`,
      },
    });
    const resp = await response;
    return resp.data;
  }

  async findProjectById(id?: number): Promise<Project> {
    const userSession = this.auth.getUserSession();
    const url = `${this.baseUrl}/${id}`;
    const response = axios(url, {
      headers: {
        Authorization: `Bearer ${userSession?.accessToken}`,
      },
    });
    const resp = await response;
    return resp.data;
  }

  async saveProject(project: Project): Promise<void> {
    const response = await axios(this.baseUrl + "/save", {
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

