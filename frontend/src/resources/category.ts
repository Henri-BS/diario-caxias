import axios from "axios";
import { useAuth } from "./auth";

export type Category = {
    id?: number;
    categoryName?: string;
    categoryDescription?: string;
};
  
export type CategoryPage = {
  content: Category[];
  page: {
    totalElements: number;
    number: number;
  };
};

export type CategoryProps = {
  category: Category;
};

class CategoryService {
  baseUrl: string = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080" + "/categories";
  auth = useAuth();

  async findCategories( pageNumber?: number, query?: string): Promise<CategoryPage> {
    const userSession = this.auth.getUserSession();
    const url = `${this.baseUrl}?page=${pageNumber}&query=${query}&size=12`;
    const response = axios(url, {
      headers: {
        Authorization: `Bearer ${userSession?.accessToken}`,
      },
    });
    const resp = await response;
    return resp.data;
  }


  async findUserById(id?: number): Promise<Category> {
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
}

export const useCategoryService = () => new CategoryService();

class UserCategoryService {
  baseUrl: string = process.env.NEXT_PUBLIC_API_URL + "/user-category";
  auth = useAuth();


  async findCategoriesByUser(userId?: number, pageNumber?: number): Promise<CategoryPage> {
    const userSession = this.auth.getUserSession();
    const url = `${this.baseUrl}/by-user/${userId}?page=${pageNumber}&size=8`;
    const response = axios(url, {
      headers: {
        Authorization: `Bearer ${userSession?.accessToken}`,
      },
    });
    const resp = await response;
    return resp.data;
  }
}

export const useUserCategoryService = () => new UserCategoryService();

class ProjectCategoryService {
  baseUrl: string = process.env.NEXT_PUBLIC_API_URL + "/project-category";
  auth = useAuth();


  async findCategoriesByUser(projectId?: number, pageNumber?: number): Promise<CategoryPage> {
    const userSession = this.auth.getUserSession();
    const url = `${this.baseUrl}/by-project/${projectId}?page=${pageNumber}&size=9`;
    const response = axios(url, {
      headers: {
        Authorization: `Bearer ${userSession?.accessToken}`,
      },
    });
    const resp = await response;
    return resp.data;
  }
}

export const useProjectCategoryService = () => new ProjectCategoryService();