# Atlaspay · Frontend

Billetera digital multi-moneda (ARS, PEN, USD y EUR) pensada para viajeros y estudiantes de intercambio. Permite comprar, vender e intercambiar monedas de forma simulada, usando tasas de cambio reales.

> Proyecto Final de la carrera Full Stack de Henry. Todas las operaciones son simuladas: no se usa dinero real.

## Tecnologías

- React + TypeScript
- Vite
- ESLint y Prettier

## Requisitos previos

- [Node.js](https://nodejs.org/) (versión LTS reciente)
- npm
- Git

## Instalación y uso local

1. Clonar el repositorio:

```bash
   git clone https://github.com/nahuelcba22/atlaspay-frontend.git
```

2. Entrar a la carpeta del proyecto:

```bash
   cd atlaspay-frontend
```

3. Instalar las dependencias:

```bash
   npm install
```

4. Levantar el servidor de desarrollo:

```bash
   npm run dev
```

5. Abrir [http://localhost:5173](http://localhost:5173) en el navegador.

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Levanta la app en modo desarrollo |
| `npm run build` | Revisa los tipos de TypeScript y genera la versión de producción |
| `npm run preview` | Sirve localmente la versión de producción |
| `npm run lint` | Revisa el código con ESLint |
| `npm run format` | Formatea el código con Prettier |
| `npm run format:check` | Verifica el formato sin modificar archivos |

## Estructura del proyecto

```
src/
├── components/   # Componentes reutilizables, agrupados por sección
├── pages/        # Páginas de la aplicación
├── styles/       # Variables y estilos globales
├── App.tsx       # Componente raíz
└── main.tsx      # Punto de entrada
```

## Flujo de trabajo

- No trabajar directamente sobre `main`.
- Crear una rama por tarea: `feat/...`, `fix/...`, `docs/...`.
- Usar mensajes de commit con prefijo: `feat:`, `fix:`, `chore:`, `docs:`.
- Integrar los cambios mediante Pull Request con revisión de al menos un integrante.

## Repositorio relacionado

- Backend: [atlaspay-backend](https://github.com/nahuelcba22/atlaspay-backend)

## Equipo

- Mariano Nahuel Córdoba · Backend
- Nayla Pereira · Frontend
- Ludmila Acosta · Frontend
- Dayana Gonzales · Frontend
