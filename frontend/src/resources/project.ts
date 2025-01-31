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
  baseUrl: string = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
  auth = useAuth();
  userSession = this.auth.getUserSession();

  async findProjects( pageNumber?: number, query?: string ): Promise<ProjectPage> {
    const url = `${this.baseUrl}/projects?page=${pageNumber}&query=${query}&size=8`;
    const response = axios(url, {
      headers: {
        Authorization: `Bearer ${this.userSession?.accessToken}`,
      },
    });
    const resp = await response;
    return resp.data;
  }

  async findProjectsByUser( userId?: number, pageNumber?: number ): Promise<ProjectPage> {
    const url = `${this.baseUrl}/projects/by-user/${userId}?page=${pageNumber}&size=10`;
    const response = axios(url, {
      headers: {
        Authorization: `Bearer ${this.userSession?.accessToken}`,
      },
    });
    const resp = await response;
    return resp.data;
  }

  async findProjectById(id?: number): Promise<Project> {
    const url = `${this.baseUrl}/projects/${id}`;
    const response = axios(url, {
      headers: {
        Authorization: `Bearer ${this.userSession?.accessToken}`,
      },
    });
    const resp = await response;
    return resp.data;
  }

  async findCategoriesByProject( projectId?: number, pageNumber?: number ): Promise<ProjectPage> {
    const url = `${this.baseUrl}/project-category?projectId=${projectId}&page=${pageNumber}&size=9`;
    const response = axios(url, {
      headers: {
        Authorization: `Bearer ${this.userSession?.accessToken}`,
      },
    });
    const resp = await response;
    return resp.data;
  }

  async findPostsByProject( projectId?: number, pageNumber?: number ): Promise<ProjectPage> {
    const url = `${this.baseUrl}/project-post?projectId=${projectId}&page=${pageNumber}&size=9`;
    const response = axios(url, {
      headers: {
        Authorization: `Bearer ${this.userSession?.accessToken}`,
      },
    });
    const resp = await response;
    return resp.data;
  }

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

