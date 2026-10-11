<script setup lang="ts">
import { onMounted } from 'vue';
import { useProfileController } from './modules/profile/profile.controller';

// Componentes compartidos
import Navbar from '@/components/shared/Navbar.vue';
import Footer from '@/components/shared/Footer.vue';

// Módulos
import HeroSection from './modules/profile/components/HeroSection.vue';
import AboutMe from './modules/profile/components/AboutMe.vue';
import TechStack from './modules/profile/components/TechStack.vue';
import ProjectsSection from './modules/projects/components/ProjectsSection.vue';
import ExperienceSlider from './modules/experience/components/ExperienceSlider.vue';

const { profile, isLoading, error, loadProfile } = useProfileController();

onMounted(() => {
  loadProfile();
});
</script>

<template>
  <div class="app-root">

    <Navbar />

    <!-- Estado: Cargando -->
    <div v-if="isLoading" class="state-screen" role="status" aria-label="Cargando">
      <div class="spinner"></div>
      <p class="state-text">Cargando...</p>
    </div>

    <!-- Estado: Error -->
    <div v-else-if="error" class="state-screen" role="alert">
      <p class="state-title">Algo salió mal</p>
      <p class="state-text">{{ error }}</p>
      <button class="retry-btn" @click="loadProfile">Reintentar</button>
    </div>

    <!-- Estado: Contenido -->
    <main v-else-if="profile">
      <HeroSection :profile="profile" />
      <AboutMe :profile="profile" />
      <TechStack />
      <ProjectsSection />
      <ExperienceSlider />
    </main>

    <Footer v-if="!isLoading && !error" />

  </div>
</template>