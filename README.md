# Plataforma de Reservas Turísticas

## 📋 Descripción

Sistema web para la gestión y reservación de servicios turísticos, permitiendo a los usuarios buscar, reservar y administrar experiencias turísticas de forma eficiente y segura.

## 👥 Equipo de Desarrollo

- **Adriana Gutiérrez Robles** - 235633
- **Cuauhtémoc Eliseo Vásquez Salcido** - 247284
- **Luisa Fernanda Morales Espinoza** - 233450
- **Paul Alejandro Vázquez Cervantes** - 241400

**Gestión del Proyecto:** [Tablero Kanban en Jira](https://potros-team-gjcpzyef.atlassian.net/jira/software/projects/SCRUM/boards/1?atlOrigin=eyJpIjoiNTEyNWE2ZGFlNWIwNDIyMTljNzBkMDI3ZjkxMDc2ZjgiLCJwIjoiaiJ9)

## 🛠️ Tecnologías

- **Backend:** Node.js, Express.js
- **Base de Datos:** MySQL
- **Frontend:** HTML, CSS, JavaScript
- **Autenticación:** JWT (JSON Web Tokens)
- **Herramientas:** phpMyAdmin, Visual Studio Code, Live Server

## ⚙️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- npm (incluido con Node.js)
- MySQL
- [Visual Studio Code](https://code.visualstudio.com/)
- Extensión [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) para VS Code

## 🚀 Instalación

### 1. Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd plataforma-reservas-turisticas
```

### 2. Configuración de la Base de Datos

1. Ejecuta el siguiente comando en tu DBMS de MySQL para crear la base de datos:

```sql
CREATE DATABASE reservas_turisticas_db;
```

4. La estructura de las tablas se creará automáticamente al iniciar el servidor por primera vez

### 3. Configuración del Backend

1. Navega a la carpeta del servidor:

```bash
cd server
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en la carpeta `server`:

```bash
# En Windows
type nul > .env

# En Linux/Mac
touch .env
```

4. Abre el archivo `.env` y agrega la siguiente configuración (ajusta los valores según tu entorno):

```env
# Configuración del Servidor
PORT=3000

# Configuración de la Base de Datos
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña_mysql
DB_NAME=reservas_turisticas_db
DB_PORT=3306

# Seguridad
JWT_SECRET=genera_tu_propia_clave_secreta_aqui
```

> **⚠️ Importante:** 
> - Reemplaza `tu_contraseña_mysql` con la contraseña de tu usuario root de MySQL
> - Genera tu propio `JWT_SECRET` único y seguro (puedes usar una cadena aleatoria larga)
> - **Nunca compartas tu archivo `.env` en repositorios públicos**

### 4. Configuración del Frontend

No requiere instalación adicional. Los archivos están listos para usar con Live Server.

## ▶️ Uso

### Iniciar el Backend

1. Desde la carpeta `server`, ejecuta:

```bash
npm run dev
```

2. El servidor se iniciará en `http://localhost:3000`
3. Deberías ver un mensaje indicando que el servidor está corriendo

### Iniciar el Frontend

1. Abre Visual Studio Code
2. Abre la carpeta `frontend` del proyecto
3. Localiza el archivo `index.html`
4. Haz clic derecho sobre `index.html` y selecciona **"Open with Live Server"**
5. El navegador se abrirá automáticamente mostrando la aplicación

## 📁 Estructura del Proyecto

```
plataforma-reservas-turisticas/
├── server/                 # Backend (Node.js/Express)
│   ├── .env               # Variables de entorno (no incluido en Git)
│   ├── package.json       # Dependencias del servidor
│   └── ...
├── frontend/              # Frontend (HTML/CSS/JS)
│   ├── index.html        # Página principal
│   └── ...
└── README.md             # Este archivo
```

## 🔧 Solución de Problemas

### El servidor no inicia

- Verifica que MySQL esté corriendo
- Confirma que las credenciales en `.env` sean correctas
- Asegúrate de haber ejecutado `npm install` en la carpeta `server`

### Error de conexión a la base de datos

- Verifica que la base de datos `reservas_turisticas_db` exista
- Confirma que el usuario de MySQL tenga permisos suficientes
- Revisa que el puerto `3306` no esté siendo usado por otra aplicación

### Live Server no abre la página

- Verifica que la extensión Live Server esté instalada en VS Code
- Intenta abrir manualmente `index.html` en tu navegador
- Comprueba que no haya otro proceso usando el puerto 5500

## 📝 Notas Adicionales

- El archivo `.env` debe ser creado manualmente y **nunca** debe ser subido al repositorio
- Asegúrate de mantener actualizadas las dependencias con `npm update`
- Para producción, considera usar variables de entorno más seguras y un servidor diferente a Live Server

## 🤝 Contribución

Si eres parte del equipo de desarrollo:

1. Crea una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
2. Realiza tus cambios y haz commit: `git commit -m "Descripción del cambio"`
3. Sube tus cambios: `git push origin feature/nueva-funcionalidad`
4. Crea un Pull Request en el repositorio
