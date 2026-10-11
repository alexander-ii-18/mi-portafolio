<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-vue-next';
import type { Experience } from '../experience.model';
import { experienceService } from '../experience.service';

// T-08: Los datos vienen del service, no están hardcodeados aquí (DIP)
const experiences = ref<Experience[]>([]);
onMounted(async () => {
  experiences.value = await experienceService.fetchExperiences();
});
</script>


<template>
  <section id="experience" class="timeline-section">
    <div class="container timeline-wrapper">
      
      <div class="section-header">
        <h2 class="section-title">Experiencia Profesional</h2>
        <div class="divider"></div>
        <p class="section-subtitle">
          Mi trayectoria desde el soporte y gestión de datos hasta el desarrollo de arquitecturas cloud escalables.
        </p>
      </div>

      <div class="timeline">
        
        <div class="timeline-item" v-for="job in experiences" :key="job.id">
          
          <div class="timeline-dot"></div>
          
          <div class="timeline-card">
            
            <div class="card-header">
              <div class="role-info">
                <h3 class="role-title">{{ job.role }}</h3>
                <div class="company-name">
                  <Briefcase class="icon-sm accent-color" />
                  {{ job.company }}
                </div>
              </div>
              
              <div class="meta-info">
                <span class="meta-badge">
                  <Calendar class="icon-sm accent-color" />
                  {{ job.period }}
                </span>
                <span class="meta-text">
                  <MapPin class="icon-sm accent-color" />
                  {{ job.location }}
                </span>
              </div>
            </div>

            <p class="job-description">
              {{ job.description }}
            </p>

            <ul class="achievements-list">
              <li class="achievement-item" v-for="(achievement, index) in job.achievements" :key="index">
                <CheckCircle2 class="icon-check" />
                <span>{{ achievement }}</span>
              </li>
            </ul>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.timeline-section {
  padding: 6rem 0;
  background-color: var(--bg-secondary);
}

.timeline-wrapper {
  max-width: 1000px; /* Un poco más estrecho para mejor lectura */
  margin: 0 auto;
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
  border-radius: 4px;
  margin: 0 auto 1.5rem auto;
}

.section-subtitle {
  color: var(--text-muted);
  font-size: 1.1rem;
}

/* ESTRUCTURA DE LA LÍNEA DE TIEMPO */
.timeline {
  position: relative;
  border-left: 2px solid rgba(16, 185, 129, 0.3); /* Línea verde tenue */
  padding-left: 2rem;
  margin-left: 1rem;
}

@media (max-width: 768px) {
  .timeline {
    padding-left: 1.5rem;
    margin-left: 0.5rem;
  }
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

/* PUNTO DE LA LÍNEA */
.timeline-dot {
  position: absolute;
  left: -2.65rem; /* Ajustado para centrar con la línea */
  top: 1.5rem;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--bg-secondary);
  border: 4px solid var(--accent);
  transition: all 0.4s ease;
  z-index: 2;
}

@media (max-width: 768px) {
  .timeline-dot {
    left: -2.1rem;
  }
}

/* EL EFECTO MÁGICO: Al pasar el mouse por el item, brilla el punto */
.timeline-item:hover .timeline-dot {
  background-color: var(--accent);
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.6);
  transform: scale(1.2);
}

/* TARJETA DE CONTENIDO */
.timeline-card {
  background-color: var(--bg-main);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.timeline-item:hover .timeline-card {
  border-color: rgba(16, 185, 129, 0.5);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  transform: translateX(5px); /* Se mueve ligeramente a la derecha */
}

/* CABECERA DE LA TARJETA */
.card-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .card-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
}

.role-title {
  font-size: 1.5rem;
  color: var(--text-main);
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.timeline-item:hover .role-title {
  color: var(--accent);
}

.company-name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  color: var(--text-muted);
  font-weight: 600;
}

/* METADATOS (Fechas y lugar) */
.meta-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
}

@media (min-width: 768px) {
  .meta-info {
    align-items: flex-end;
  }
}

.meta-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.meta-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-muted);
}

/* CONTENIDO TEXTUAL */
.job-description {
  color: var(--text-main);
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.achievements-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.achievement-item {
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.5;
}

.icon-check {
  color: var(--accent);
  width: 20px;
  height: 20px;
  flex-shrink: 0; /* Evita que el ícono se aplaste si el texto es largo */
  margin-top: 2px;
}

.icon-sm {
  width: 16px;
  height: 16px;
}

.accent-color {
  color: var(--accent);
}
</style>