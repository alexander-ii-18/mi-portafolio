import { ref } from 'vue';
import { profileService } from './profile.service';
import type { ProfileData } from './profile.model';

export function useProfileController() {
  const profile = ref<ProfileData | null>(null);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const loadProfile = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      profile.value = await profileService.fetchProfile();
    } catch (err) {
      error.value = 'Error al cargar el perfil.';
    } finally {
      isLoading.value = false;
    }
  };

  return {
    profile,
    isLoading,
    error,
    loadProfile
  };
}