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
  baseUrl: string = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
  auth = useAuth();
  userSession = this.auth.getUserSession();

  async findCategories(query?: string, pageNumber?: number, categoryName?: string): Promise<CategoryPage> {
    const url = `${this.baseUrl}/categories?query=${query}&categoryName${categoryName}&page=${pageNumber}&size=12`;
    const response = axios(url, {
      headers: {
        Authorization: `Bearer ${this.userSession?.accessToken}`,
      },
    });
    const resp = await response;
    return resp.data;
  }

  async findCategoryByName(name?: string): Promise<Category> {
    const url = `${this.baseUrl}/categories/by-name/${name}`;
    const response = axios(url, {
      headers: {
        Authorization: `Bearer ${this.userSession?.accessToken}`,
      },
    });
    const resp = await response;
    return resp.data;
  }

  async findUserByCategory(categoryName?: string, pageNumber?: number): Promise<CategoryPage> {
    const url = `${this.baseUrl}/user-category?categoryName=${categoryName}&page=${pageNumber}&size=9`;
    const response = axios(url, {
      headers: {
        Authorization: `Bearer ${this.userSession?.accessToken}`,
      },
    });
    const resp = await response;
    return resp.data;
  }

  async findCategoriesByUser(userId?: number, pageNumber?: number): Promise<CategoryPage> {
    const url = `${this.baseUrl}/user-category?userId=${userId}&page=${pageNumber}&size=9`;
    const response = axios(url, {
      headers: {
        Authorization: `Bearer ${this.userSession?.accessToken}`,
      },
    });
    const resp = await response;
    return resp.data;
  }

  async findProjectByCategory(categoryName?: string, pageNumber?: number): Promise<CategoryPage> {
    const url = `${this.baseUrl}/project-category?categoryName=${categoryName}&page=${pageNumber}&size=9`;
    const response = axios(url, {
      headers: {
        Authorization: `Bearer ${this.userSession?.accessToken}`,
      },
    });
    const resp = await response;
    return resp.data;
  }
}

export const useCategoryService = () => new CategoryService();
