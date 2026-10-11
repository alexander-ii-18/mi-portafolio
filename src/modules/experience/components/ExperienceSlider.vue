<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { ChevronLeft, ChevronRight, X, MapPin, Calendar, CheckCircle2, Briefcase } from 'lucide-vue-next';
import type { Experience } from '../experience.model';
import { experienceService } from '../experience.service';
import ExperienceCard from './ExperienceCard.vue';
import { useModal } from '@/composables/useModal';
import { useScrollLock } from '@/composables/useScrollLock';

// ─── Datos ────────────────────────────────────────────
const experiences = ref<Experience[]>([]);
onMounted(async () => {
  experiences.value = await experienceService.fetchExperiences();
  // Esperamos a que Vue renderice las cards antes de calcular
  await nextTick();
});

// ─── Slider (scroll-based) ────────────────────────────
const viewport = ref<HTMLElement | null>(null);
const currentIndex = ref(0);

/** Número de tarjetas visibles por ancho de pantalla */
const visibleCount = ref(1);
const updateVisibleCount = () => {
  if (window.innerWidth >= 1024)     visibleCount.value = 3;
  else if (window.innerWidth >= 640) visibleCount.value = 2;
  else                               visibleCount.value = 1;
};

onMounted(() => {
  updateVisibleCount();
  window.addEventListener('resize', updateVisibleCount);
});
onUnmounted(() => {
  window.removeEventListener('resize', updateVisibleCount);
});

const maxIndex = computed(() =>
  Math.max(0, experiences.value.length - visibleCount.value)
);
const canPrev = computed(() => currentIndex.value > 0);
const canNext = computed(() => currentIndex.value < maxIndex.value);

/** Obtiene el ancho real de una tarjeta desde el DOM */
const getCardScrollWidth = (): number => {
  if (!viewport.value) return 0;
  const firstCard = viewport.value.querySelector<HTMLElement>('.exp-card-wrap');
  if (!firstCard) return 0;
  // offsetWidth de la tarjeta + su margen derecho (gap)
  const style = window.getComputedStyle(firstCard);
  const gap = parseFloat(style.marginRight) || 24;
  return firstCard.offsetWidth + gap;
};

const scrollToIndex = (index: number) => {
  if (!viewport.value) return;
  const clampedIndex = Math.max(0, Math.min(index, maxIndex.value));
  currentIndex.value = clampedIndex;
  const scrollX = clampedIndex * getCardScrollWidth();
  viewport.value.scrollTo({ left: scrollX, behavior: 'smooth' });
};

const slidePrev = () => { if (canPrev.value) scrollToIndex(currentIndex.value - 1); };
const slideNext = () => { if (canNext.value) scrollToIndex(currentIndex.value + 1); };
const goTo    = (i: number) => scrollToIndex(i);

// Sincronizar índice al hacer scroll manual (swipe táctil)
const onViewportScroll = () => {
  if (!viewport.value) return;
  const cardW = getCardScrollWidth();
  if (cardW > 0) {
    currentIndex.value = Math.round(viewport.value.scrollLeft / cardW);
  }
};

// ─── Modal ────────────────────────────────────────────
const { isOpen: isModalOpen, selected: selectedExp, open, close } = useModal<Experience>();
const { lock, unlock } = useScrollLock();

const openModal  = (exp: Experience) => { open(exp);  lock();   };
const closeModal = ()                 => { close();    unlock(); };

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isModalOpen.value) closeModal();
};
onMounted(()   => document.addEventListener('keydown', onKeydown));
onUnmounted(() => document.removeEventListener('keydown', onKeydown));
</script>

<template>
  <section id="experience" class="exp-section">
    <div class="container">

      <!-- Cabecera -->
      <div class="section-header exp-header">
        <h2 class="section-title">Experiencia Profesional</h2>
        <div class="divider exp-divider"></div>
        <p class="section-subtitle exp-subtitle">
          Mi trayectoria desde el soporte y gestión de datos hasta el desarrollo
          de arquitecturas cloud escalables.
        </p>
      </div>

      <!-- Slider con botones a los lados -->
      <div class="slider-shell">

        <!-- Botón Anterior -->
        <button
          class="nav-btn"
          :class="{ 'nav-btn--off': !canPrev }"
          :disabled="!canPrev"
          @click="slidePrev"
          aria-label="Ver experiencia anterior"
        >
          <ChevronLeft :size="22" />
        </button>

        <!-- Viewport con scroll oculto -->
        <div
          ref="viewport"
          class="slider-viewport"
          @scroll.passive="onViewportScroll"
        >
          <div class="slider-track">
            <div
              v-for="exp in experiences"
              :key="exp.id"
              class="exp-card-wrap"
            >
              <ExperienceCard
                :experience="exp"
                :isActive="selectedExp?.id === exp.id"
                @select="openModal"
              />
            </div>
          </div>
        </div>

        <!-- Botón Siguiente -->
        <button
          class="nav-btn"
          :class="{ 'nav-btn--off': !canNext }"
          :disabled="!canNext"
          @click="slideNext"
          aria-label="Ver experiencia siguiente"
        >
          <ChevronRight :size="22" />
        </button>

      </div>

      <!-- Dots indicadores -->
      <div class="dots-row" role="tablist" aria-label="Navegar por experiencias">
        <button
          v-for="(_, i) in experiences"
          :key="i"
          class="dot"
          :class="{ 'dot--active': i === currentIndex }"
          @click="goTo(i)"
          :aria-label="`Ir a experiencia ${i + 1}`"
          :aria-selected="i === currentIndex"
          role="tab"
        />
      </div>

    </div><!-- /container -->

    <!-- ───── MODAL ───── -->
    <Transition name="exp-modal">
      <div
        v-if="isModalOpen && selectedExp"
        class="modal-overlay"
        @click.self="closeModal"
        role="dialog"
        aria-modal="true"
        :aria-label="`Detalles: ${selectedExp.role}`"
      >
        <div
          class="modal-box"
          :style="{ '--m-accent': selectedExp.accentColor }"
        >
          <!-- Cerrar -->
          <button class="modal-close-btn" @click="closeModal" aria-label="Cerrar">
            <X :size="18" />
          </button>

          <!-- Imagen -->
          <div class="modal-img-wrap">
            <img :src="selectedExp.image" :alt="selectedExp.company" class="modal-img" loading="lazy" />
            <div class="modal-img-gradient"></div>
            <div class="modal-img-info">
              <span class="m-type-badge">{{ selectedExp.type }}</span>
              <h3 class="m-role">{{ selectedExp.role }}</h3>
              <div class="m-company">
                <Briefcase :size="14" />
                {{ selectedExp.company }}
              </div>
            </div>
          </div>

          <!-- Cuerpo -->
          <div class="modal-body">
            <!-- Chips de meta -->
            <div class="m-chips">
              <span class="m-chip">
                <Calendar :size="14" />
                {{ selectedExp.period }}
              </span>
              <span class="m-chip">
                <MapPin :size="14" />
                {{ selectedExp.location }}
              </span>
            </div>

            <!-- Descripción -->
            <p class="m-description">{{ selectedExp.description }}</p>

            <!-- Logros -->
            <div class="m-achievements">
              <p class="m-achievements-title">Logros y Responsabilidades</p>
              <ul class="m-list">
                <li
                  v-for="(item, i) in selectedExp.achievements"
                  :key="i"
                  class="m-list-item"
                >
                  <CheckCircle2 :size="16" class="m-check" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
/* ─── Sección ──────────────────────────────── */
.exp-section {
  padding: 6rem 0 5rem;
  background-color: var(--bg-secondary);
}

.exp-header {
  text-align: center;
  margin-bottom: 3rem;
}

.exp-divider {
  margin: 1rem auto 1.25rem;
}

.exp-subtitle {
  max-width: 540px;
  margin: 0 auto;
}

/* ─── Slider shell ─────────────────────────── */
.slider-shell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* ─── Viewport ─────────────────────────────── */
.slider-viewport {
  flex: 1;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  /* Ocultar scrollbar en todos los navegadores */
  scrollbar-width: none;
  -ms-overflow-style: none;
  /* Padding para que las sombras no se corten */
  padding: 1rem 0.5rem 1.5rem;
}
.slider-viewport::-webkit-scrollbar { display: none; }

/* ─── Track ────────────────────────────────── */
.slider-track {
  display: flex;
  gap: 1.5rem;
  /* width suficiente para que las tarjetas no colapsen */
  width: max-content;
}

/* ─── Tarjeta contenedora ──────────────────── */
.exp-card-wrap {
  scroll-snap-align: start;
  /* Móvil: ancho del viewport menos el padding del shell */
  width: calc(100vw - 7rem);
  max-width: 320px;
}

@media (min-width: 640px) {
  .exp-card-wrap {
    width: calc((100vw - 9rem) / 2);
    max-width: 340px;
  }
}

@media (min-width: 1024px) {
  .exp-card-wrap {
    width: calc((100vw - 12rem) / 3);
    max-width: 360px;
  }
}

/* ─── Botones de navegación ────────────────── */
.nav-btn {
  flex-shrink: 0;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background-color: var(--bg-main);
  border: 1px solid var(--border-color);
  color: var(--text-main);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.25s ease, color 0.25s ease,
              border-color 0.25s ease, transform 0.2s ease, opacity 0.25s ease;
}

.nav-btn:hover:not(.nav-btn--off) {
  background-color: var(--accent);
  border-color: var(--accent);
  color: #000;
  transform: scale(1.08);
}

.nav-btn--off {
  opacity: 0.25;
  cursor: not-allowed;
  pointer-events: none;
}

@media (max-width: 479px) {
  .nav-btn { width: 36px; height: 36px; }
}

/* ─── Dots ─────────────────────────────────── */
.dots-row {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.75rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--border-color);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.3s ease;
}

.dot--active {
  background-color: var(--accent);
  width: 26px;
  border-radius: 4px;
}

/* ─── Modal Overlay ────────────────────────── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.82);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

/* ─── Modal Box ────────────────────────────── */
.modal-box {
  background-color: var(--bg-secondary);
  border: 1px solid var(--m-accent, var(--accent));
  border-radius: 24px;
  width: 100%;
  max-width: 660px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 30px 70px -10px rgba(0, 0, 0, 0.7);
  scrollbar-width: thin;
  scrollbar-color: var(--border-color) transparent;
}
.modal-box::-webkit-scrollbar { width: 4px; }
.modal-box::-webkit-scrollbar-thumb { background-color: var(--border-color); border-radius: 4px; }

.modal-close-btn {
  position: absolute;
  top: 0.875rem;
  right: 0.875rem;
  z-index: 10;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--text-main);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}
.modal-close-btn:hover {
  background-color: var(--m-accent);
  color: #000;
}

/* ─── Modal Imagen ─────────────────────────── */
.modal-img-wrap {
  position: relative;
  height: 210px;
  border-radius: 24px 24px 0 0;
  overflow: hidden;
}
.modal-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.modal-img-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.75));
}
.modal-img-info {
  position: absolute;
  bottom: 1.25rem;
  left: 1.5rem;
  right: 3.5rem;
  z-index: 2;
}
.m-type-badge {
  display: inline-block;
  background-color: var(--m-accent);
  color: #000;
  font-size: 0.68rem;
  font-weight: 800;
  padding: 0.2rem 0.65rem;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  margin-bottom: 0.45rem;
}
.m-role {
  font-family: 'Poppins', sans-serif;
  font-size: 1.35rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.35rem;
  line-height: 1.25;
}
.m-company {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  color: rgba(255,255,255,0.7);
  font-size: 0.88rem;
}

/* ─── Modal Body ───────────────────────────── */
.modal-body {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.m-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}
.m-chip {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background-color: rgba(255,255,255,0.05);
  border: 1px solid var(--border-color);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.83rem;
  color: var(--text-muted);
}
.m-description {
  color: var(--text-main);
  font-size: 0.97rem;
  line-height: 1.75;
}
.m-achievements {
  background-color: rgba(255,255,255,0.03);
  border: 1px solid var(--border-color);
  border-left: 3px solid var(--m-accent);
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
}
.m-achievements-title {
  font-family: 'Poppins', sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: var(--m-accent);
  margin-bottom: 1rem;
}
.m-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.m-list-item {
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.65;
}
.m-check {
  color: var(--m-accent);
  flex-shrink: 0;
  margin-top: 2px;
}

/* ─── Animación modal ──────────────────────── */
.exp-modal-enter-active { transition: opacity 0.28s ease; }
.exp-modal-leave-active { transition: opacity 0.22s ease; }
.exp-modal-enter-from,
.exp-modal-leave-to { opacity: 0; }

.exp-modal-enter-active .modal-box,
.exp-modal-leave-active .modal-box {
  transition: transform 0.32s cubic-bezier(0.34, 1.4, 0.64, 1), opacity 0.28s ease;
}
.exp-modal-enter-from .modal-box,
.exp-modal-leave-to .modal-box {
  transform: scale(0.93) translateY(20px);
  opacity: 0;
}

/* ─── Responsive modal ─────────────────────── */
@media (max-width: 600px) {
  .modal-overlay { align-items: flex-end; padding: 0; }
  .modal-box {
    border-radius: 20px 20px 0 0;
    max-height: 92vh;
    border-left: none;
    border-right: none;
    border-bottom: none;
  }
  .modal-img-wrap { height: 170px; border-radius: 20px 20px 0 0; }
  .modal-body { padding: 1.25rem 1.25rem 2rem; }

  .exp-modal-enter-from .modal-box,
  .exp-modal-leave-to .modal-box {
    transform: translateY(40px);
    opacity: 0;
  }
}
</style>
