import { ProjectPage } from "./project.resource";

class ProjectService {
    baseUrl: string = "http://localhost:8080/project"


    
    async findProjects(query?: string, pageNumber?: number): Promise<ProjectPage>{
        const url = `${this.baseUrl}/list?page=${pageNumber}&query=${query}`;
        const response = await fetch(url);
        return await response.json();
    }
}


export const useProjectService = () => new ProjectService();