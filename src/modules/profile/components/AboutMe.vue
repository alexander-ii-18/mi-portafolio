<script setup lang="ts">
import type { ProfileData } from '../profile.model';
import { MapPin, GraduationCap, Code2, Sparkles } from 'lucide-vue-next';

defineProps<{
  profile: ProfileData;
}>();
</script>

<template>
  <section id="about" class="about-section">
    <div class="container">
      
      <div class="section-header">
        <h2 class="section-title">Sobre Mí</h2>
        <div class="divider"></div>
      </div>

      <div class="about-content">
        <!-- Lado Izquierdo: Texto -->
        <div class="about-text-column">
          <h3 class="highlight-title">Transformando ideas en ecosistemas escalables</h3>
          <p class="text-body">{{ profile.aboutText }}</p>
          <p class="text-body">
            Mi experiencia abarca desde el diseño de lógica estricta para pasarelas de pago hasta la sincronización logística en tiempo real. Siempre priorizo la calidad del código aplicando principios SOLID para evitar deuda técnica y garantizar proyectos duraderos.
          </p>
        </div>

        <!-- Lado Derecho: Tarjetas rápidas -->
        <div class="about-cards-column">
          <div class="info-card">
            <Code2 class="card-icon" />
            <h4 class="card-title">Perfil</h4>
            <p class="card-desc">Desarrollador Full-Stack</p>
          </div>
          
          <div class="info-card">
            <GraduationCap class="card-icon" />
            <h4 class="card-title">Educación</h4>
            <p class="card-desc">Bachiller en Ing. Informática (UNP)</p>
          </div>
          
          <div class="info-card">
            <MapPin class="card-icon" />
            <h4 class="card-title">Ubicación</h4>
            <p class="card-desc">{{ profile.location }}</p>
          </div>
          
          <div class="info-card">
            <Sparkles class="card-icon" />
            <h4 class="card-title">Enfoque</h4>
            <p class="card-desc">Arquitecturas Escalables & APIs</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.about-section {
  padding: 6rem 0;
  background-color: var(--bg-secondary); /* Contraste con el Hero */
}

.section-header {
  margin-bottom: 4rem;
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
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

@media (min-width: 992px) {
  .about-content {
    flex-direction: row;
    align-items: center;
  }
}

.about-text-column {
  flex: 1;
}

.highlight-title {
  font-size: 1.5rem;
  color: var(--accent);
  margin-bottom: 1.5rem;
}

.text-body {
  color: var(--text-muted);
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.about-cards-column {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.info-card {
  background-color: var(--bg-main);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.info-card:hover {
  transform: translateY(-5px);
  border-color: var(--accent);
  box-shadow: 0 10px 20px rgba(16, 185, 129, 0.1);
}

.card-icon {
  color: var(--accent);
  width: 32px;
  height: 32px;
  margin-bottom: 1rem;
}

.card-title {
  color: var(--text-main);
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.card-desc {
  color: var(--text-muted);
  font-size: 0.9rem;
}
</style>