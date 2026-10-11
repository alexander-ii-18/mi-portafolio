import { ref } from 'vue';

/**
 * Composable generico para manejar modales con un elemento seleccionado.
 * T-10: Extrae la logica del modal de ProjectsSection (SRP).
 */
export function useModal<T>() {
  const isOpen = ref(false);
  const selected = ref<T | null>(null);

  const open = (item: T) => {
    selected.value = item;
    isOpen.value = true;
  };

  const close = () => {
    isOpen.value = false;
  };

  return { isOpen, selected, open, close };
}
