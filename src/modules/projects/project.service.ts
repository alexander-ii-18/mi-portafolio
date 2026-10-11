import { projectRepository } from './project.repository';
import type { Project } from './project.model';

export const projectService = {
  async fetchProjects(): Promise<Project[]> {
    try {
      return await projectRepository.getProjects();
    } catch (error) {
      console.error('Error fetching projects', error);
      throw error;
    }
  }
};
