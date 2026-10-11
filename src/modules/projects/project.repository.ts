import type { Project } from './project.model';
import imgTerry from '@/assets/img/pagina-terry.png';
import imgSeguimiento from '@/assets/img/pagina-seguimiento.png';

export const projectRepository = {
  async getProjects(): Promise<Project[]> {
    // Fuente de datos centralizada. Facilmente reemplazable por una API call.
    return Promise.resolve([
      {
        id: 1,
        title: 'QASO SYSTEM',
        category: 'laboral',
        categoryLabel: 'Laboral',
        description: 'Plataforma integral e-commerce y logistica para gestion de ventas e inventarios. Integra un modulo de call center utilizando la API oficial de WhatsApp Business y un agente inteligente para automatizar la asignacion de pedidos y comisiones en ciclos de 24 horas.',
        technologies: ['Laravel', 'Vue.js', 'MySQL', 'WhatsApp API', 'Principios SOLID'],
        image: imgTerry,
        demoUrl: 'https://front-terry-out-production-5ac8.up.railway.app/'
      },
      {
        id: 2,
        title: 'Sincronizacion Logistica',
        category: 'laboral',
        categoryLabel: 'Laboral',
        description: 'Sistema de rastreo y sincronizacion automatica de ordenes en tiempo real. Gestiona paqueteria integrando la API de Shalom y la API de Eva bajo una arquitectura distribuida en la nube.',
        technologies: ['Node.js', 'Shalom API', 'Eva API', 'Railway', 'Hetzner'],
        image: imgSeguimiento,
        demoUrl: 'https://front-terry-out-production-5ac8.up.railway.app/track/OWNZIEXV'
      },
      {
        id: 3,
        title: 'Control de Asistencia Hospitalaria',
        category: 'laboral',
        categoryLabel: 'Laboral / Prácticas',
        description: 'Solucion digital desarrollada para el Hospital de Apoyo II durante la contingencia por COVID-19. Automatiza el registro del personal, importacion de roles y generacion de reportes de asistencia mediante macros y el sistema SIGEA.',
        technologies: ['Macros Excel VBA', 'SIGEA', 'Automatizacion de Datos'],
        image: 'https://placehold.co/800x600/1f2937/10b981?text=Hospital+Apoyo+II',
      },
      {
        id: 4,
        title: 'Sistema Biométrico Facial Android',
        category: 'academico',
        categoryLabel: 'Universidad',
        description: 'Aplicativo móvil nativo para reconocimiento y registro facial mediante Computer Vision e Inteligencia Artificial embebida. Implementa MediaPipe Vision Tasks y ML Kit con persistencia local de embeddings vectoriales y base de datos Room.',
        technologies: ['Kotlin', 'Jetpack Compose', 'MediaPipe AI', 'ML Kit', 'Room DB', 'CameraX'],
        image: 'https://placehold.co/800x600/1e293b/38bdf8?text=Reconocimiento+Facial+Android',
      },
      {
        id: 5,
        title: 'Gestor Full-Stack de Empleados y Usuarios',
        category: 'academico',
        categoryLabel: 'Universidad',
        description: 'Sistema web integral para gestión de usuarios y roles corporativos. Desarrollado con backend en Node.js Express, autenticación JWT, ORM Sequelize con soporte multi-base de datos (PostgreSQL, SQL Server) y cliente SPA en React con Bootstrap.',
        technologies: ['React', 'Node.js', 'Express', 'JWT', 'Sequelize', 'PostgreSQL', 'SQL Server'],
        image: 'https://placehold.co/800x600/1e293b/60a5fa?text=Sistema+Web+Full-Stack',
      },
      {
        id: 6,
        title: 'Inteligencia de Negocios & Text Analytics',
        category: 'academico',
        categoryLabel: 'Universidad',
        description: 'Proyecto de análisis de datos y Business Intelligence en contexto universitario y gubernamental. Modelado de Data Warehouse multidimensional, cubos OLAP, minería de texto en R y tableros analíticos en Power BI.',
        technologies: ['R', 'Power BI', 'SQL Server Data Warehouse', 'ETL / OLAP', 'Text Analytics'],
        image: 'https://placehold.co/800x600/1e293b/a78bfa?text=Business+Intelligence',
      }
    ]);
  }
};
