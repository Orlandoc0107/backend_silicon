# Guia de trabajo con Github (main y develop)

Este documento define el flujo de trabajo para mantener un control organizado del código en este proyecto. Sigue estos pasos para evitar conflictos y mantener el proyecto limpio.

## Estructura de Ramas

* main: Esta rama contiene siempre la versión en producción o estable del proyecto. Ningún cambio directo debe hacerse aquí sin revisión.

* develop: Aquí es donde se integran los cambios y nuevas funcionalidades antes de fusionarlas con main. Es la rama de trabajo principal para los desarrolladores.

## Flujo de Trabajo para Nuevas Funcionalidades o Arreglos
Cada vez que empieces una nueva funcionalidad, arreglo o tarea, sigue estos pasos:

1. Actualizar tu rama local con la última versión de develop
Antes de comenzar, asegúrate de que tu rama local esté actualizada.

```bash
git checkout develop
git pull origin develop
```

2. Crear una nueva rama para tu funcionalidad o arreglo

La nueva rama debe crearse desde develop. Usa un nombre descriptivo para la rama. Puedes seguir este formato:

* feature/nombre-funcionalidad – Para nuevas funcionalidades.
* fix/arreglo-bug – Para arreglos de errores.
* hotfix/correccion-rapida – Para correcciones urgentes.

comando :

```bash
git checkout -b feature/agregar-login
```

3. Realizar cambios y hacer commits
Haz los cambios necesarios y realiza commits pequeños y descriptivos. Asegúrate de que cada commit explique bien qué cambiaste.

```bash
git add .
git commit -m "feat: agregar formulario de login"
```

4. Cuando termines una nueva funcionalidad o arreglo en tu rama, sigue estos pasos antes de abrir un Pull Request (PR) hacia develop.

---

## Pull Request

1. Cambiar a la rama develop y actualizarla
Primero, asegúrate de que tienes la última versión de develop en tu máquina local:

```bash
git checkout develop
git pull origin develop
```

2. Cambiar a tu rama de funcionalidad
Ahora, vuelve a la rama en la que has trabajado (por ejemplo, feature/agregar-login):

```bash
git checkout feature/agregar-login
```

3. Fusionar los cambios recientes de develop en tu rama de funcionalidad

Antes de subir tus cambios, es importante que traigas las actualizaciones de develop a tu rama. Esto ayuda a evitar conflictos en el Pull Request.


```bash
git merge develop
```

Nota: Si ocurren conflictos, resuélvelos en este paso. Una vez resueltos, haz un commit:

```bash
git add .
git commit -m "fix: resolver conflictos con develop"
```

5. Crear un Pull Request (PR) en GitHub

* Ve al repositorio en GitHub y abre un Pull Request desde tu rama (feature/agregar-login) hacia develop.
* Asegúrate de añadir una descripción clara de los cambios.
* Pide a un compañero que revise y apruebe tu Pull Reques

6. Fusionar el PR con develop (Después de Aprobación tambien se puede hacer en github )

Una vez aprobado el PR, fusiona los cambios en develop. Puedes hacer esto desde GitHub o usando los siguientes comandos (si tienes permisos):

```bash
git checkout develop
git pull origin develop
git merge feature/agregar-login
```

Nota: Si fusionaste directamente en tu máquina, sube los cambios al remoto:

```bash
git push origin develop
```

7. Borrar la rama de funcionalidad (Opcional)
Una vez que los cambios se han fusionado, puedes borrar la rama localmente y en el remoto para mantener el repositorio limpio:

```bash
git branch -d feature/agregar-login
git push origin --delete feature/agregar-login
```
---

## Detectar ramas eliminadas en github


* Paso 1: Detectar Ramas Remotas Eliminadas

Primero, necesitas sincronizar tus referencias locales con las del repositorio remoto para detectar las ramas que ya no existen en el servidor remoto:

```bash
git fetch -p
```

El comando `git fetch -p` (o `git fetch --prune`) elimina las referencias a ramas remotas que ya no existen en el servidor.

* Paso 2: Verificar Ramas Locales y Remotas

Ahora, puedes listar todas tus ramas locales y remotas para verificar cuáles ya no están sincronizadas:

```bash
git branch -vv

```

Este comando te mostrará una lista de ramas locales y si están configuradas para hacer seguimiento a una rama remota. Las ramas con `[gone]` indican que la rama remota ya no existe.

* Paso 3: Eliminar Ramas Locales

Una vez que hayas identificado las ramas locales que ya no necesitas, puedes eliminarlas con el siguiente comando:

```bash
git branch -d nombre-de-la-rama
```

Si la rama no está totalmente fusionada y quieres forzar la eliminación, usa:

```bash
git branch -D nombre-de-la-rama

```

---
## Opcional, tipo de ambito 

```bash

- **feat**: cuando se añade una nueva funcionalidad.
- **fix**: cuando se arregla un error.
- **chore**: tareas rutinarias que no sean específicas de una feature o un error como por ejemplo añadir contenido al fichero `.gitignore` o instalar una dependencia.
- **test**: si añadimos o arreglamos tests.
- **docs**: cuando solo se modifica documentación.
- **build**: cuando el cambio afecta al compilado del proyecto.
- **ci**: el cambio afecta a ficheros de configuración y scripts relacionados con la integración continua.
- **style**: cambios de legibilidad o formateo de código que no afecta a funcionalidad.
- **refactor**: cambio de código que no corrige errores ni añade funcionalidad, pero mejora el código.
- **perf**: usado para mejoras de rendimiento.
- **revert**: si el commit revierte un commit anterior. Debería indicarse el hash del commit que se revierte.

```