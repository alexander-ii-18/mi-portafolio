import { experienceRepository } from './experience.repository';
import type { Experience } from './experience.model';

export const experienceService = {
  async fetchExperiences(): Promise<Experience[]> {
    try {
      return await experienceRepository.getExperiences();
    } catch (error) {
      console.error('Error fetching experiences', error);
      throw error;
    }
  }
};
