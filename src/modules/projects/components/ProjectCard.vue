<script setup lang="ts">
import type { Project } from '../project.model';

// T-09: Usa el tipo compartido del modelo en lugar de definirlo inline
defineProps<{
  project: Project;
}>();

defineEmits<{
  'open-project': [project: Project];
}>();
</script>


<template>
  <div class="project-card" @click="$emit('open-project', project)">
    <div class="image-wrapper">
      <div class="image-overlay"></div>
      <img 
        :src="project.image" 
        :alt="project.title" 
        class="project-image"
        loading="lazy"
        onerror="this.src='https://placehold.co/800x600/1f2937/10b981?text=Proyecto'"
      />
      <span class="category-chip" :class="`category-chip--${project.category}`">
        {{ project.categoryLabel || (project.category === 'laboral' ? 'Laboral' : project.category === 'academico' ? 'Universidad' : 'Personal') }}
      </span>
      <span class="badge-hover">Ver detalles</span>
    </div>
    
    <div class="card-content">
      <h3 class="card-title">{{ project.title }}</h3>
      <p class="card-description">{{ project.description }}</p>
    </div>
  </div>
</template>

<style scoped>
.project-card {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.4s ease;
  height: 100%;
}

.project-card:hover {
  transform: translateY(-8px);
  border-color: var(--accent);
  box-shadow: 0 12px 30px rgba(16, 185, 129, 0.15);
}

.image-wrapper {
  position: relative;
  height: 220px;
  overflow: hidden;
  background-color: #111;
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(17, 24, 39, 1), rgba(17, 24, 39, 0.2));
  z-index: 10;
  opacity: 0.8;
  transition: opacity 0.4s ease;
}

.project-card:hover .image-overlay {
  opacity: 0.4;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.project-card:hover .project-image {
  transform: scale(1.1);
}

.badge-hover {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  z-index: 20;
  background-color: var(--accent);
  color: #000;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.4s ease;
}

.project-card:hover .badge-hover {
  opacity: 1;
  transform: translateY(0);
}

.category-chip {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 20;
  padding: 0.35rem 0.85rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.category-chip--laboral {
  background-color: rgba(16, 185, 129, 0.2);
  color: #34d399;
  border-color: rgba(16, 185, 129, 0.4);
}

.category-chip--academico {
  background-color: rgba(59, 130, 246, 0.2);
  color: #60a5fa;
  border-color: rgba(59, 130, 246, 0.4);
}

.category-chip--personal {
  background-color: rgba(168, 85, 247, 0.2);
  color: #c084fc;
  border-color: rgba(168, 85, 247, 0.4);
}


.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-title {
  font-size: 1.5rem;
  color: var(--text-main);
  margin-bottom: 0.8rem;
  transition: color 0.3s ease;
}

.project-card:hover .card-title {
  color: var(--accent);
}

.card-description {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>