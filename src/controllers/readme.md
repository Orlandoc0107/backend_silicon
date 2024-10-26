# controllers

Las carpetas en un proyecto como el que describí siguen una arquitectura modular, cada una con responsabilidades específicas. A continuación, te explico el propósito de las carpetas controllers, routes, models, config, entre otras, y por qué es útil mantener esta estructura organizada.

1. controllers/ – Controladores
La carpeta controllers contiene archivos que gestionan la lógica de negocio de tu aplicación. Aquí se manejan las operaciones sobre los datos (como crear, leer, actualizar, y eliminar) y las interacciones entre el modelo y las vistas.

Ejemplo:
Función: Obtener todos los usuarios, validar datos, y responder al cliente.
Ubicación: /controllers/userController.js
