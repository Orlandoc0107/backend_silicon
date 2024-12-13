# Proyecto final backend Silicon Misiones.

<div align="left">
  <img src="https://img.shields.io/badge/Express-000000?logo=express&logoColor=white&style=for-the-badge" height="40" alt="express logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white&style=for-the-badge" height="40" alt="nodejs logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/Postman-FF6C37?logo=postman&logoColor=black&style=for-the-badge" height="40" alt="postman logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white&style=for-the-badge" height="40" alt="postgresql logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white&style=for-the-badge" height="40" alt="docker logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/Discord-5865F2?logo=discord&logoColor=white&style=for-the-badge" height="40" alt="discord logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&style=for-the-badge" height="40" alt="javascript logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white&style=for-the-badge" height="40" alt="git logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white&style=for-the-badge" height="40" alt="github logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/Markdown-000000?logo=markdown&logoColor=white&style=for-the-badge" height="40" alt="markdown logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=white&style=for-the-badge" height="40" alt="npm logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?logo=visualstudiocode&logoColor=white&style=for-the-badge" height="40" alt="vscode logo"  />
</div>

## Distribuidora de Alimentos - Sistema Ecommerce

## INTEGRANTES DEL EQUIPO:
Cardenas Orlando, Mazur Sebastian, Perone Rocholl Julio jose

## Descripción del Proyecto
Este proyecto consiste en un sistema ecommerce para una distribuidora de alimentos, el mismo proporciona las funcionalidades necesarias para la gestión de usuarios, productos y compras, 
implementando características de seguridad, autenticación y autorización.

## Características Principales
* Autenticación y autorización con roles (administrador y cliente).
* Registro e inicio de sesion
* Gestión de usuarios: creación, actualización y eliminación
* Endpoints seguros para realizar pedidos y consultar el historial de compras.
* Documentación de API interactiva con Swagger.
* Conexión a base de datos PostgreSQL.
* Validación de datos robusta usando Zod.
* Seguridad: Autenticación, autorización con JSON Web Tokens (JWT), encriptación de contraseñas con bcrypt.

# Los usuarios Administradores podran: 
* gestionar inventarios,
* Crear, buscar, actualizar y eliminar productos
* añadir productos al carrito y realizar la compra.
  
# Los usuarios Clientes podran:
* ver productos, filtro por categorías y búsqueda avanzada: cantidad de resultados por pagina.
* Creación y seguimiento de pedidos.
* confirmar o cancelar compra.

## Dependencias Utilizadas:
* express: Framework web para Node.js.
* express-promise-router: Router para manejar promesas en Express.
* pg: Cliente de PostgreSQL para Node.js.
* ejs: Motor de plantillas para renderizar vistas dinámicas.
* dotenv: Manejo de variables de entorno.
* cookie-parser: Manejo de cookies en las peticiones HTTP.
* cors: Permite configurar políticas de CORS.
* jsonwebtoken: Creación y verificación de tokens JWT.
* swagger-jsdoc: Generación de documentación Swagger a partir de JSDoc.
* swagger-ui-express: Interfaz para mostrar la documentación Swagger.
* md5: Cifrado utilizando el algoritmo MD5.
* morgan: Middleware para registrar peticiones HTTP.

## Tecnologías Utilizadas
* Node.js, Express
* Base de Datos: PostgreSQL
* Autenticación: JSON Web Tokens (JWT)
* Validación: Zod
* Documentación API: Swagger

## Configuración e Instalación:
1) Clonar el repositorio: git clone https://github.com/Orlandoc0107/backend_silicon.git
2) Instalar dependencias: cd backend_silicon, npm install
3) Configurar el archivo .env con las siguientes variables:
PORT=8080
POSTGRES_URL="postgres://default:6zW0pskUEbCD@ep-dark-unit-a49k7mhf-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
SECRET_KEY=esto_es_la_secret_key
4) Iniciar el servidor: npm run dev

## Licencia
Este proyecto está licenciado bajo la MIT License.
