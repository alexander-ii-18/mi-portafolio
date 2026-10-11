<script setup lang="ts">
import type { Experience } from '../experience.model';
import { MapPin, Calendar, Briefcase } from 'lucide-vue-next';

defineProps<{
  experience: Experience;
  isActive: boolean;
}>();

defineEmits<{
  'select': [experience: Experience];
}>();
</script>

<template>
  <article
    class="exp-card"
    :class="{ 'exp-card--active': isActive }"
    :style="{ '--card-accent': experience.accentColor }"
    @click="$emit('select', experience)"
    tabindex="0"
    role="button"
    :aria-label="`Ver detalles de ${experience.role} en ${experience.company}`"
    @keydown.enter="$emit('select', experience)"
    @keydown.space.prevent="$emit('select', experience)"
  >
    <!-- Imagen de portada -->
    <div class="card-image-wrapper">
      <img
        :src="experience.image"
        :alt="`${experience.company} — ${experience.role}`"
        class="card-image"
        loading="lazy"
      />
      
      <div class="card-overlay"></div>

      <span class="type-badge">{{ experience.type }}</span>

      <span class="view-more-hint">Ver detalles →</span>
    </div>

    <div class="card-body">
      <div class="card-meta">
        <span class="card-period">
          <Calendar class="meta-icon" />
          {{ experience.period }}
        </span>
        <span class="card-location">
          <MapPin class="meta-icon" />
          {{ experience.location }}
        </span>
      </div>

      <div class="card-company">
        <Briefcase class="company-icon" />
        <span>{{ experience.company }}</span>
      </div>

      <h3 class="card-role">{{ experience.role }}</h3>

      <p class="card-description">{{ experience.description }}</p>

      <!-- Indicador de logros -->
      <div class="achievements-count">
        <span class="dot" v-for="n in experience.achievements.length" :key="n"></span>
        <span class="count-text">{{ experience.achievements.length }} logros</span>
      </div>
    </div>

    <!-- Borde acento inferior -->
    <div class="card-accent-bar"></div>
  </article>
</template>

<style scoped>
.exp-card {
  position: relative;
  background-color: var(--bg-main);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  /* El ancho lo controla el .exp-card-wrap del slider */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease,
              box-shadow 0.3s ease,
              border-color 0.3s ease;
  outline: none;
  user-select: none;
}

.exp-card:hover,
.exp-card:focus-visible {
  transform: translateY(-8px);
  border-color: var(--card-accent);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.4),
              0 0 0 1px var(--card-accent);
}

.exp-card--active {
  border-color: var(--card-accent);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3),
              0 0 0 1px var(--card-accent);
}

/* ─── Imagen ──────────────────────────── */
.card-image-wrapper {
  position: relative;
  height: 180px;
  overflow: hidden;
  background-color: #0f172a;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.exp-card:hover .card-image {
  transform: scale(1.05);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.6) 100%
  );
}

/* Badge de tipo */
.type-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: var(--card-accent);
  color: #000;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  z-index: 2;
}

/* Hint de "Ver más" */
.view-more-hint {
  position: absolute;
  bottom: 0.75rem;
  right: 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
  font-weight: 500;
  opacity: 0;
  transform: translateX(6px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: 2;
}

.exp-card:hover .view-more-hint {
  opacity: 1;
  transform: translateX(0);
}

/* ─── Body ────────────────────────────── */
.card-body {
  padding: 1.5rem 1.5rem 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.card-period,
.card-location {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--text-muted);
  font-size: 0.8rem;
}

.meta-icon {
  width: 13px;
  height: 13px;
  flex-shrink: 0;
}

.card-company {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--card-accent);
  font-size: 0.85rem;
  font-weight: 600;
}

.company-icon {
  width: 14px;
  height: 14px;
}

.card-role {
  font-family: 'Poppins', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-main);
  line-height: 1.3;
  transition: color 0.3s ease;
}

.exp-card:hover .card-role {
  color: var(--card-accent);
}

.card-description {
  color: var(--text-muted);
  font-size: 0.875rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

/* Indicador de logros */
.achievements-count {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: auto;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--card-accent);
  opacity: 0.6;
}

.count-text {
  font-size: 0.78rem;
  color: var(--text-muted);
  margin-left: 0.25rem;
}

/* ─── Barra acento inferior ──────────── */
.card-accent-bar {
  height: 3px;
  background-color: var(--card-accent);
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.exp-card:hover .card-accent-bar {
  opacity: 1;
}
</style>
