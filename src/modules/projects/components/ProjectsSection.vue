<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import ProjectCard from './ProjectCard.vue';
import { ExternalLink, Github, Play, X } from 'lucide-vue-next';
import type { Project, ProjectCategory } from '../project.model';
import { projectService } from '../project.service';
import { useModal } from '@/composables/useModal';
import { useScrollLock } from '@/composables/useScrollLock';

// T-07: Los datos vienen del service, no están hardcodeados aquí (DIP)
const projects = ref<Project[]>([]);
const activeFilter = ref<'todos' | ProjectCategory>('todos');

const filterOptions = [
  { label: 'Todos', value: 'todos' },
  { label: 'Laborales / Clientes', value: 'laboral' },
  { label: 'Universidad / Académicos', value: 'academico' }
] as const;

onMounted(async () => {
  projects.value = await projectService.fetchProjects();
});

const filteredProjects = computed(() => {
  if (activeFilter.value === 'todos') {
    return projects.value;
  }
  return projects.value.filter(p => p.category === activeFilter.value);
});

// T-10 + T-11: Lógica del modal y scroll delegadas a composables (SRP)
const MODAL_TRANSITION_MS = 300;
const { isOpen: isModalOpen, selected: selectedProject, open, close } = useModal<Project>();
const { lock, unlock } = useScrollLock();

const openProject = (project: Project) => {
  open(project);
  lock();
};

const closeModal = () => {
  close();
  setTimeout(() => { selectedProject.value = null; }, MODAL_TRANSITION_MS);
  unlock();
};
</script>


<template>
  <section id="projects" class="projects-section">
    <div class="container">
      
      <div class="section-header">
        <h2 class="section-title">Proyectos & Casos de Éxito</h2>
        <div class="divider"></div>
        <p class="section-subtitle">
          Explora tanto proyectos en entornos de producción y empresas como desarrollos de ingeniería de software universitarios.
        </p>

        <!-- Filtros por categoría -->
        <div class="filters-container" role="tablist" aria-label="Filtrar proyectos">
          <button
            v-for="filter in filterOptions"
            :key="filter.value"
            role="tab"
            :aria-selected="activeFilter === filter.value"
            class="filter-btn"
            :class="{ 'filter-btn--active': activeFilter === filter.value }"
            @click="activeFilter = filter.value"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>

      <div class="projects-grid">
        <ProjectCard 
          v-for="project in filteredProjects" 
          :key="project.id" 
          :project="project"
          @open-project="openProject"
        />
      </div>
    </div>

    <!-- MODAL ANIMADO -->
    <Transition name="modal-fade">
      <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          
          <button class="close-btn" @click="closeModal">
            <X />
          </button>

          <div class="modal-body">
            <div class="modal-image-wrapper">
              <img 
                :src="selectedProject?.image" 
                :alt="selectedProject?.title" 
                class="modal-image"
                onerror="this.src='https://placehold.co/800x600/1f2937/10b981?text=Proyecto'"
              />
            </div>
            
            <div class="modal-details">
              <h3 class="modal-title">{{ selectedProject?.title }}</h3>
              
              <div class="tags">
                <span class="tag" v-for="tech in selectedProject?.technologies" :key="tech">
                  {{ tech }}
                </span>
              </div>
              
              <p class="modal-desc">{{ selectedProject?.description }}</p>
              
              <div class="modal-actions">
                <a v-if="selectedProject?.demoUrl" :href="selectedProject.demoUrl" target="_blank" class="btn btn-primary">
                  <ExternalLink class="icon-sm" /> Ver Proyecto
                </a>
                <a v-if="selectedProject?.videoUrl" :href="selectedProject.videoUrl" target="_blank" class="btn btn-video">
                  <Play class="icon-sm" /> Ver Video
                </a>
                <a v-if="selectedProject?.githubUrl" :href="selectedProject.githubUrl" target="_blank" class="btn btn-outline">
                  <Github class="icon-sm" /> Código Fuente
                </a>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.projects-section {
  padding: 6rem 0;
  background-color: var(--bg-main); /* o usa un color ligeramente distinto para contrastar */
}

.section-header {
  margin-bottom: 4rem;
  text-align: center;
}

.section-title {
  font-size: 2.5rem;
  color: var(--text-main);
  margin-bottom: 1rem;
}

.divider {
  width: 80px;
  height: 4px;
  background-color: var(--accent);
  margin: 0 auto 1.5rem auto;
  border-radius: 4px;
}

.section-subtitle {
  color: var(--text-muted);
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.1rem;
}

.filters-container {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.filter-btn {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-muted);
  padding: 0.6rem 1.4rem;
  border-radius: 9999px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  color: var(--text-main);
  border-color: var(--accent);
}

.filter-btn--active {
  background-color: var(--accent);
  color: #000;
  font-weight: 700;
  border-color: var(--accent);
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.25);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

/* ESTILOS DEL MODAL */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-content {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(17, 24, 39, 0.8);
  border: none;
  color: var(--text-main);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: background 0.3s ease;
}

.close-btn:hover {
  background: var(--accent);
  color: #000;
}

.modal-body {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .modal-body {
    flex-direction: row;
  }
}

.modal-image-wrapper {
  flex: 1;
  min-height: 250px;
}

.modal-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-details {
  flex: 1;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
}

.modal-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--text-main);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tag {
  background-color: rgba(16, 185, 129, 0.1);
  color: var(--accent);
  border: 1px solid rgba(16, 185, 129, 0.2);
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
}

.modal-desc {
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 2rem;
  flex-grow: 1;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.btn {
  flex: 1;
  padding: 0.8rem;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: var(--accent);
  color: #000;
}

.btn-primary:hover { background-color: var(--accent-hover); }

.btn-outline {
  background-color: transparent;
  color: var(--text-main);
  border: 1px solid var(--border-color);
}

.btn-outline:hover {
  border-color: var(--text-main);
}

.btn-video {
  background-color: rgba(239, 68, 68, 0.15);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.35);
}

.btn-video:hover {
  background-color: #ef4444;
  color: #ffffff;
  border-color: #ef4444;
  box-shadow: 0 4px 14px rgba(239, 68, 68, 0.35);
}

.icon-sm {
  width: 18px;
  height: 18px;
}

/* ANIMACIONES DEL MODAL (Transiciones de Vue) */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .modal-content,
.modal-fade-leave-to .modal-content {
  transform: scale(0.95) translateY(20px);
}
</style>