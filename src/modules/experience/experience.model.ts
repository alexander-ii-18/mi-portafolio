export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  /** URL de imagen de portada para la tarjeta del slider */
  image: string;
  /** Color de acento hexadecimal para cada empresa */
  accentColor: string;
  /** Etiqueta de tipo de contrato */
  type: 'Full-time' | 'Part-time' | 'Prácticas' | 'Freelance' | 'Campo';
}

