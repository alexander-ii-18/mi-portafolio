import type { Experience } from './experience.model';

export const experienceRepository = {
  async getExperiences(): Promise<Experience[]> {
    return Promise.resolve([
      {
        id: 1,
        role: 'Desarrollador Full-Stack',
        company: 'Cunej',
        period: 'Nov 2025 - Ago 2026',
        location: 'Piura, Perú',
        description: 'Responsable del ciclo de vida completo de desarrollo web, desde el diseño de la arquitectura hasta el despliegue en producción.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToeRUzYnSoicliYDTFMdxUmVjgSoQzkvMlSGwnRUl5hpH6W-CCf62kq8g&s=10',
        accentColor: '#10b981',
        type: 'Full-time',
        achievements: [
          'Diseño e implementación de lógicas de negocio estrictas para flujos de pago, inventarios y cálculos de comisiones.',
          'Integración nativa de múltiples APIs de terceros (servicios logísticos, WhatsApp Business, geolocalización).',
          'Administración de infraestructura Cloud (Railway, Hetzner, Hostinger) asegurando alta disponibilidad de los sistemas.',
          'Aplicación de principios de diseño SOLID para reducir la deuda técnica y crear arquitecturas escalables.'
        ]
      },
      {
        id: 2,
        role: 'Personal de Campo',
        company: 'Pez Gordo (Campaña Yape)',
        period: 'Oct 2024',
        location: 'Piura, Perú',
        description: 'Gestión comercial y técnica en terreno para la plataforma de pagos digitales del BCP.',
        image: 'https://elpezgordo.com.pe/wp-content/uploads/2026/05/favicon-Elpezgordo.webp',
        accentColor: '#6366f1',
        type: 'Campo',
        achievements: [
          'Afiliación y registro masivo de negocios locales al ecosistema digital Yape.',
          'Resolución de problemas técnicos de usuarios en campo y excelente atención al cliente.'
        ]
      },
      {
        id: 3,
        role: 'Practicante — Control de Asistencia',
        company: 'Hospital de Apoyo II',
        period: 'Feb 2024 - May 2024',
        location: 'Sullana, Perú',
        description: 'Apoyo tecnológico para la gestión de recursos humanos durante el periodo de contingencia sanitaria COVID-19.',
        image: 'https://placehold.co/800x450/0f172a/3b82f6?text=Hospital+Apoyo+II',
        accentColor: '#3b82f6',
        type: 'Prácticas',
        achievements: [
          'Digitalización de procesos manuales mediante el desarrollo de macros a medida en Excel VBA.',
          'Automatización exitosa en la generación de reportes de planillas e importación de roles al sistema SIGEA.'
        ]
      },
      {
        id: 4,
        role: 'Atención al Cliente',
        company: 'ABAI GROUP PERU',
        period: 'Nov 2023',
        location: 'Piura, Perú',
        description: 'Soporte de primer nivel y atención de incidencias técnicas para el segmento masivo móvil.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMYGvyQUGmanO6It2by7pW6qCKCMV5WbjLUxKcDJhnSyAfjji3QR0MzrK9&s=10',
        accentColor: '#f59e0b',
        type: 'Part-time',
        achievements: [
          'Manejo especializado de los sistemas +Simple y Visor para la gestión de usuarios.',
          'Resolución de problemas bajo presión manteniendo altos estándares de comunicación.'
        ]
      }
    ]);
  }
};

