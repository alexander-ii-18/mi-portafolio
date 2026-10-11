/**
 * Composable para bloquear el scroll del body.
 * T-11: Reemplaza la manipulacion directa de document.body.style (anti-patron Vue).
 */
export function useScrollLock() {
  const lock = () => document.body.classList.add('scroll-locked');
  const unlock = () => document.body.classList.remove('scroll-locked');
  return { lock, unlock };
}
