<script setup lang="ts">
import { computed } from 'vue';
import type { ProfileData } from '../profile.model';
import { Github, Linkedin, Download, Mail, MessageCircle } from 'lucide-vue-next';

const props = defineProps<{
  profile: ProfileData;
}>();

// T-12: Lógica de formateo fuera del template — seguro aunque el nombre tenga menos palabras
const displayName = computed(() => {
  const parts = props.profile.name.split(' ');
  return parts.length >= 3 ? `${parts[0]} ${parts[2]}` : parts[0];
});
</script>


<template>
  <section class="hero-section">
    <div class="container hero-container">

      <!-- Lado Izquierdo (Texto) -->
      <div class="hero-content">
        <h2 class="subtitle">{{ profile.subtitle }}</h2>
        <h1 class="title">
          Hola, soy <br />
          <span class="highlight">{{ displayName }}</span>
        </h1>
        <p class="description">{{ profile.title }}</p>

        <div class="actions">
          <a href="#projects" class="btn btn-primary">Ver Proyectos</a>
          <a href="/public/CV-Alexander Coveñas Domador.pdf" target="_blank" download="CV-Alexander-Covenas.pdf"
            class="btn btn-outline" aria-label="Descargar CV de Alexander Coveñas">
            <Download class="icon" /> Descargar CV
          </a>
        </div>

        <div class="social-links">
          <a href="https://github.com/alexander-ii-18" target="_blank" rel="noopener noreferrer"
            class="social-btn" aria-label="GitHub de Alexander">
            <Github />
          </a>
          <a href="https://www.linkedin.com/in/alexander-coveñas-damador-626832282/" target="_blank" rel="noopener noreferrer"
            class="social-btn" aria-label="LinkedIn de Alexander">
            <Linkedin />
          </a>
          <a href="mailto:gamanielcovenasdomador@gmail.com?subject=Contacto desde tu Portafolio Web&body=Hola Alexander, he visto tu portafolio y me gustaría hablar contigo sobre..."
            class="social-btn" aria-label="Enviar correo a Alexander">
            <Mail />
          </a>
          <a href="https://wa.me/51928968757?text=Hola%20Alexander,%20he%20visto%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20hablar%20contigo"
            target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="WhatsApp de Alexander">
            <MessageCircle />
          </a>
        </div>
      </div>

      <!-- Lado Derecho (Imagen) -->
      <div class="hero-image-wrapper">
        <div class="glow-effect"></div>
        <img src="@/assets/img/foto.png" alt="Foto de perfil de Alexander Coveñas" class="profile-img" />
      </div>

    </div>
  </section>
</template>

<style scoped>
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 80px;
}

.hero-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  width: 100%;
}

.hero-content {
  flex: 1;
  max-width: 600px;
}

.subtitle {
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.title {
  font-size: 4rem;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.highlight {
  color: var(--accent);
  background: linear-gradient(90deg, #10b981, #06b6d4);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description {
  font-size: 1.25rem;
  color: var(--text-muted);
  margin-bottom: 2.5rem;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
}

.btn {
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-primary {
  background-color: var(--accent);
  color: #000;
}

.btn-primary:hover {
  background-color: var(--accent-hover);
  transform: translateY(-2px);
}

.btn-outline {
  background-color: transparent;
  color: var(--accent);
  border: 2px solid var(--accent);
}

.btn-outline:hover {
  background-color: rgba(16, 185, 129, 0.1);
  transform: translateY(-2px);
}

.icon {
  width: 20px;
  height: 20px;
}

.social-links {
  display: flex;
  gap: 1.5rem;
}

.social-btn {
  color: var(--text-muted);
  transition: color 0.3s ease, transform 0.3s ease;
}

.social-btn:hover {
  color: var(--text-main);
  transform: translateY(-3px);
}

.hero-image-wrapper {
  position: relative;
  width: 320px;
  height: 320px;
}

.glow-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: var(--accent);
  filter: blur(60px);
  opacity: 0.2;
  border-radius: 50%;
  animation: pulse 4s infinite alternate;
}

.profile-img {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid var(--bg-secondary);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.1;
  }

  100% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0.3;
  }
}

/* Responsividad para móviles */
@media (max-width: 768px) {
  .hero-container {
    flex-direction: column-reverse;
    text-align: center;
  }

  .title {
    font-size: 2.5rem;
  }

  .actions,
  .social-links {
    justify-content: center;
  }

  .hero-image-wrapper {
    width: 250px;
    height: 250px;
  }
}
</style>