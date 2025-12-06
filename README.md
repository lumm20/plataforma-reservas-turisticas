# plataforma-reservas-turisticas 
- Adriana Gutiérrez Robles - 235633
- Cuauhtémoc Eliseo Vásquez Salcido - 247284
- Luisa Fernanda Morales Espinoza - 233450
- Paul Alejandro Vázquez Cervantes - 241400

- Link kanban: https://potros-team-gjcpzyef.atlassian.net/jira/software/projects/SCRUM/boards/1?atlOrigin=eyJpIjoiNTEyNWE2ZGFlNWIwNDIyMTljNzBkMDI3ZjkxMDc2ZjgiLCJwIjoiaiJ9

- Requisitos Previos ANode.js) y npm.
phpMyAdmin
Visual Studio Code

. Configuración de la Base de Datos:
Abra phpMyAdmin
Abra una nueva pestaña de consulta (Query).
Ejecute el siguiente comando SQL para crear la base de datos vacía: CREATE DATABASE reservas_turisticas;

. Configuración del Servidor (Backend)
El código fuente del servidor se encuentra en la carpeta server.
 Instalación de dependencias
Abra una terminal o línea de comandos.
Navegue hasta la carpeta del servidor: cd server
Ejecute el comando de instalación: npm install

Configuración de Variables de Entorno
Dentro de la carpeta server, cree un nuevo archivo llamado .env.
Copie y pegue el siguiente contenido dentro del archivo, asegurándose de actualizar el usuario y la contraseña de su base de datos phpMyAdmin:
PORT=3000 DB_HOST=localhost DB_USER=root DB_PASSWORD=tu_contraseña_mysql DB_NAME=reservas_turisticas DB_PORT=3306 db_USER=root JWT_SECRET=clave_secreta_segura
Iniciar el Servidor En la misma terminal, ejecute el siguiente comando para iniciar el servidor en modo desarrollo: npm run dev

Ejecución del Cliente (Frontend)
La interfaz de usuario se encuentra en la carpeta frontend.
Abra la carpeta frontend utilizando Visual Studio Code.
Para asegurar el correcto funcionamiento de las peticiones al servidor, se recomienda utilizar la extensión "Live Server".
Haga clic derecho sobre el archivo index.html y seleccione la opción "Open with Live Server".
El navegador se abrirá automáticamente mostrando la página de inicio o registro.


