import { profileRepository } from './profile.repository';
import type { ProfileData } from './profile.model';

export const profileService = {
  async fetchProfile(): Promise<ProfileData> {
    try {
      const data = await profileRepository.getProfile();
      // Aquí podrías agregar lógica extra si fuera necesario (ej. formatear el teléfono)
      return data;
    } catch (error) {
      console.error("Error fetching profile data", error);
      throw error;
    }
  }
};