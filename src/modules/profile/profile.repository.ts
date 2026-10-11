import type { ProfileData } from './profile.model';

export const profileRepository = {
  async getProfile(): Promise<ProfileData> {
    // Simulamos una carga asíncrona (como si viniera de una API)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: 'Alexander Gamaniel Coveñas Domador',
          title: 'Desarrollador Full-Stack',
          subtitle: 'Bachiller en Ingeniería Informática',
          email: 'gamanielcovenasdomador@gmail.com',
          phone: '+51 928 968 757',
          location: 'Piura, Perú',
          aboutText: 'Bachiller en Ingeniería Informática con sólida experiencia desarrollando soluciones tecnológicas de alto impacto. Me apasiona el diseño de arquitecturas escalables y la resolución de problemas técnicos complejos. Mi enfoque principal está en la optimización de interfaces, la mejora de la experiencia del cliente y la integración de herramientas como agentes inteligentes y APIs de terceros.'
        });
      }, 500); // 500ms de retraso simulado
    });
  }
};