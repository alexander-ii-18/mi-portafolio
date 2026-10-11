<script setup lang="ts">
const techCategories = [
  {
    title: 'Desarrollo Backend',
    skills: [
      { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg' },
      { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
      { name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg' },
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' }
    ]
  },
  {
    title: 'Desarrollo Frontend',
    skills: [
      { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
      { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg' }
    ]
  },
  {
    title: 'Bases de Datos',
    skills: [
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
      { name: 'SQL Server', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg' }
    ]
  },
  {
    title: 'Cloud & Herramientas',
    skills: [
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original-wordmark.svg', isDark: true },
      { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg', isDark: true },
      { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' }
    ]
  }
];
</script>

<template>
  <section id="tech-stack" class="tech-section">
    <div class="container">
      
      <div class="section-header text-center">
        <h2 class="section-title">Stack Tecnológico</h2>
        <div class="divider mx-auto"></div>
        <p class="section-subtitle">
          Herramientas y tecnologías que utilizo para construir aplicaciones escalables, gestionar infraestructura cloud e integrar APIs complejas.
        </p>
      </div>

      <div class="categories-grid">
        <div class="category-card" v-for="category in techCategories" :key="category.title">
          <h3 class="category-title">{{ category.title }}</h3>
          
          <div class="skills-grid">
            <div class="skill-item" v-for="skill in category.skills" :key="skill.name">
              <div class="icon-box">
                <img 
                  :src="skill.icon" 
                  :alt="skill.name" 
                  class="skill-icon" 
                  :class="{ 'icon-invert': skill.isDark }"
                />
              </div>
              <span class="skill-name">{{ skill.name }}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.tech-section {
  padding: 6rem 0;
  background-color: var(--bg-main);
}

.text-center {
  text-align: center;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.section-header {
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  color: var(--text-main);
  margin-bottom: 1rem;
}

.divider {
  width: 80px;
  height: 4px;
  background-color: var(--accent);
  border-radius: 4px;
  margin-bottom: 1.5rem;
}

.section-subtitle {
  color: var(--text-muted);
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.1rem;
}

.categories-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.category-card {
  background-color: rgba(31, 41, 55, 0.5); /* bg-gray-800 con transparencia */
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 2rem;
  transition: border-color 0.3s ease;
}

.category-card:hover {
  border-color: rgba(16, 185, 129, 0.5); /* Borde verde sutil */
}

.category-title {
  font-size: 1.25rem;
  color: var(--text-main);
  margin-bottom: 1.5rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 1.5rem;
}

.skill-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.icon-box {
  width: 64px;
  height: 64px;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
  transition: all 0.3s ease;
}

.skill-item:hover .icon-box {
  transform: translateY(-5px);
  border-color: var(--accent);
  box-shadow: 0 10px 15px rgba(16, 185, 129, 0.15);
}

.skill-icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.skill-item:hover .skill-icon {
  transform: scale(1.1);
}

.icon-invert {
  filter: invert(1) brightness(2); /* Vuelve blancos los íconos negros como GitHub */
  opacity: 0.9;
}

.skill-name {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-weight: 500;
  transition: color 0.3s ease;
}

.skill-item:hover .skill-name {
  color: var(--accent);
}
</style>  