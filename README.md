# Task Management App

Aplicación de gestión de tareas para equipos, creada y desplegada en Vercel.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/nicolasbriccas-projects-5b3bd492/v0-task-management-app)

## Descripción

Task Management App es una solución moderna y colaborativa para gestionar tareas en equipo. La aplicación permite crear, editar, eliminar y organizar tareas en diferentes estados, con una interfaz intuitiva y funcionalidades avanzadas como drag and drop y un tour interactivo para nuevos usuarios.

## Características

- **Crear, Editar y Eliminar Tareas** - CRUD completo con validación de campos requeridos
- **Estados de Tareas** - Organiza tus tareas en 3 columnas: Por Hacer, En Progreso y Completadas
- **Drag and Drop** - Arrastra tareas entre columnas para cambiar su estado automáticamente
- **Asignación de Responsables** - Asigna cada tarea a un miembro del equipo
- **Tour Interactivo** - Guía visual para nuevos usuarios que explica cómo usar la app
- **Interfaz Moderna** - Diseño limpio y profesional con modo responsivo
- **Persistencia de Datos** - Los datos se guardan de forma segura en el servidor

## Cómo Usar

1. **Crear una Tarea** - Haz click en el botón "Nueva Tarea" y completa el formulario
2. **Editar una Tarea** - Haz click en el ícono de edición de la tarjeta
3. **Cambiar Estado** - Arrastra la tarjeta a otra columna
4. **Eliminar una Tarea** - Haz click en el ícono de eliminar y confirma la acción
5. **Ver Tour** - Haz click en el ícono "?" en la esquina superior derecha para ver el recorrido

## Getting Started

### Requisitos Previos

- Node.js 18+ instalado
- npm o yarn como gestor de paquetes

### Instalación Local

1. **Clonar el repositorio**
   \`\`\`bash
   git clone https://github.com/nicolasbriccas/v0-task-management-app.git
   cd v0-task-management-app
   \`\`\`

2. **Instalar dependencias**
   \`\`\`bash
   npm install
   \`\`\`

3. **Ejecutar el servidor de desarrollo**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Abrir en el navegador**
   - Ve a [http://localhost:3000](http://localhost:3000)

### Comandos Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter del proyecto

## Stack Tecnológico

- **Frontend** - Next.js 16, React 19, TypeScript
- **Styling** - Tailwind CSS v4
- **Componentes UI** - Shadcn/ui
- **Hosting** - Vercel

## Autores

- **Jose Gabriel Gutierrez**
- **Matias Nicolas Bricca**
