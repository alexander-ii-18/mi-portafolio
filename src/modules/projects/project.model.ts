export type ProjectCategory = 'laboral' | 'academico' | 'personal';

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  category: ProjectCategory;
  categoryLabel?: string;
  demoUrl?: string;
  githubUrl?: string;
}

