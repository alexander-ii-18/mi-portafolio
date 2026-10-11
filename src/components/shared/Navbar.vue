<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Menu, X } from 'lucide-vue-next';

const isScrolled = ref(false);
const isMenuOpen = ref(false);

const navLinks = [
  { label: 'Inicio', href: '#' },
  { label: 'Sobre Mí', href: '#about' },
  { label: 'Stack', href: '#tech-stack' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Experiencia', href: '#experience' },
];

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<template>
  <header class="navbar" :class="{ 'navbar--scrolled': isScrolled }" role="banner">
    <div class="container navbar-inner">

      <!-- Logo / Nombre -->
      <a href="#" class="navbar-brand" aria-label="Inicio">
        <span class="brand-accent">A</span>lexander
      </a>

      <!-- Links de escritorio -->
      <nav class="navbar-links" role="navigation" aria-label="Navegación principal">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="nav-link"
        >
          {{ link.label }}
        </a>
      </nav>

      <!-- CTA escritorio -->
      <a
        href="/public/CV-Alexander Coveñas Domador.pdf"
        download
        class="navbar-cta"
        aria-label="Descargar CV"
      >
        Descargar CV
      </a>

      <!-- Botón hamburguesa (móvil) -->
      <button
        class="hamburger-btn"
        @click="toggleMenu"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-menu"
        :aria-label="isMenuOpen ? 'Cerrar menú' : 'Abrir menú'"
      >
        <X v-if="isMenuOpen" />
        <Menu v-else />
      </button>
    </div>

    <!-- Menú móvil -->
    <Transition name="mobile-menu">
      <div
        v-if="isMenuOpen"
        id="mobile-menu"
        class="mobile-menu"
        role="navigation"
        aria-label="Menú móvil"
      >
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="mobile-link"
          @click="closeMenu"
        >
          {{ link.label }}
        </a>
        <a
          href="/CV-Alexander-Covenas.pdf"
          download
          class="mobile-cta"
          @click="closeMenu"
        >
          Descargar CV
        </a>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: transparent;
  border-bottom: 1px solid transparent;
  transition: background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease;
}

.navbar--scrolled {
  background-color: rgba(17, 24, 39, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom-color: var(--border-color);
}

.navbar-inner {
  display: flex;
  align-items: center;
  gap: 2rem;
  height: 64px;
}

.navbar-brand {
  font-family: 'Poppins', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-main);
  flex-shrink: 0;
}

.brand-accent {
  color: var(--accent);
}

.navbar-links {
  display: none;
  gap: 0.25rem;
  flex: 1;
  justify-content: center;
}

@media (min-width: 768px) {
  .navbar-links {
    display: flex;
  }
}

.nav-link {
  padding: 0.5rem 0.75rem;
  color: var(--text-muted);
  font-size: 0.95rem;
  font-weight: 500;
  border-radius: 6px;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.nav-link:hover {
  color: var(--text-main);
  background-color: rgba(255, 255, 255, 0.05);
}

.navbar-cta {
  display: none;
  padding: 0.5rem 1.25rem;
  background-color: var(--accent);
  color: #000;
  font-weight: 600;
  font-size: 0.9rem;
  border-radius: 8px;
  transition: background-color 0.2s ease, transform 0.2s ease;
  flex-shrink: 0;
}

.navbar-cta:hover {
  background-color: var(--accent-hover);
  transform: translateY(-1px);
}

@media (min-width: 768px) {
  .navbar-cta {
    display: block;
  }
}

.hamburger-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--text-main);
  cursor: pointer;
  margin-left: auto;
  padding: 0.4rem;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.hamburger-btn:hover {
  background-color: rgba(255, 255, 255, 0.08);
}

@media (min-width: 768px) {
  .hamburger-btn {
    display: none;
  }
}

/* Menú móvil */
.mobile-menu {
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem 1.5rem;
  background-color: rgba(17, 24, 39, 0.97);
  border-top: 1px solid var(--border-color);
  gap: 0.25rem;
}

.mobile-link {
  padding: 0.75rem 1rem;
  color: var(--text-muted);
  font-weight: 500;
  border-radius: 8px;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.mobile-link:hover {
  color: var(--text-main);
  background-color: rgba(255, 255, 255, 0.05);
}

.mobile-cta {
  margin-top: 0.75rem;
  padding: 0.8rem 1rem;
  background-color: var(--accent);
  color: #000;
  font-weight: 700;
  text-align: center;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.mobile-cta:hover {
  background-color: var(--accent-hover);
}

/* Animación del menú móvil */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.25s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
