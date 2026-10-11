export function useScrollLock() {
  const lock = () => document.body.classList.add('scroll-locked');
  const unlock = () => document.body.classList.remove('scroll-locked');
  return { lock, unlock };
}
