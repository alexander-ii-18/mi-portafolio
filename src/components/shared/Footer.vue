<script setup lang="ts">
import { Github, Linkedin, Mail, MessageCircle, Heart } from 'lucide-vue-next';

const currentYear = new Date().getFullYear();

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/alexander-ii-18',
    icon: Github,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/alexander-coveñas-damador-626832282/',
    icon: Linkedin,
  },
  {
    label: 'Email',
    href: 'mailto:gamanielcovenasdomador@gmail.com?subject=Contacto desde tu Portafolio',
    icon: Mail,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/51928968757?text=Hola%20Alexander,%20vi%20tu%20portafolio',
    icon: MessageCircle,
  },
];

const navLinks = [
  { label: 'Inicio', href: '#' },
  { label: 'Sobre Mí', href: '#about' },
  { label: 'Stack', href: '#tech-stack' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Experiencia', href: '#experience' },
];
</script>

<template>
  <footer class="footer" role="contentinfo">
    <div class="container footer-inner">

      <!-- Columna Izquierda: Marca + descripción -->
      <div class="footer-brand-col">
        <a href="#" class="footer-brand">
          <span class="brand-accent">A</span>lexander Coveñas
        </a>
        <p class="footer-tagline">
          Desarrollador Full-Stack · Piura, Perú<br />
          Construyendo soluciones que escalan.
        </p>
        <div class="footer-socials">
          <a
            v-for="social in socialLinks"
            :key="social.label"
            :href="social.href"
            :aria-label="social.label"
            target="_blank"
            rel="noopener noreferrer"
            class="social-icon"
          >
            <component :is="social.icon" />
          </a>
        </div>
      </div>

      <!-- Columna Derecha: Navegación -->
      <nav class="footer-nav" aria-label="Navegación del footer">
        <p class="footer-nav-title">Secciones</p>
        <ul>
          <li v-for="link in navLinks" :key="link.href">
            <a :href="link.href" class="footer-nav-link">{{ link.label }}</a>
          </li>
        </ul>
      </nav>

    </div>

    <!-- Barra inferior -->
    <div class="footer-bottom">
      <p class="copyright">
        © {{ currentYear }} Alexander Coveñas.
        Hecho para el conocimiento de todos <Heart class="heart-icon" aria-hidden="true" />
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  padding-top: 4rem;
}

.footer-inner {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding-bottom: 3rem;
}

@media (min-width: 768px) {
  .footer-inner {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
}

/* Columna Marca */
.footer-brand-col {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 320px;
}

.footer-brand {
  font-family: 'Poppins', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-main);
}

.brand-accent {
  color: var(--accent);
}

.footer-tagline {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.7;
}

.footer-socials {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: var(--bg-main);
  border: 1px solid var(--border-color);
  color: var(--text-muted);
  transition: all 0.3s ease;
}

.social-icon:hover {
  color: var(--accent);
  border-color: var(--accent);
  transform: translateY(-3px);
}

/* Columna Navegación */
.footer-nav-title {
  font-family: 'Poppins', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--text-muted);
  margin-bottom: 1.25rem;
}

.footer-nav ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-nav-link {
  color: var(--text-muted);
  font-size: 0.95rem;
  transition: color 0.2s ease;
}

.footer-nav-link:hover {
  color: var(--accent);
}

/* Barra inferior */
.footer-bottom {
  border-top: 1px solid var(--border-color);
  padding: 1.5rem 0;
  text-align: center;
}

.copyright {
  color: var(--text-muted);
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.heart-icon {
  width: 14px;
  height: 14px;
  color: #ef4444;
  fill: #ef4444;
}
</style>
