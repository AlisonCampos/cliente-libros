# cliente-libros

Aplicación web para la gestión de libros y autores, desarrollada con React y Material UI.

## Características

- Autenticación de usuarios.
- Listado y creación de libros.
- Listado y creación de autores.
- Consumo de APIs protegidas con JWT.
- Interfaz moderna usando Material UI.

## Estructura del proyecto

```
public/
src/
  api/
    auth.js
    autores.js
    libros.js
  pages/
    Autores.js
    Libros.js
    Login.js
  App.js
  index.js
  ...
package.json
```

## Instalación

1. Clona el repositorio:
   ```sh
   git clone <URL-del-repositorio>
   cd cliente-libros
   ```

2. Instala las dependencias:
   ```sh
   npm install
   ```

## Uso

Para iniciar la aplicación en modo desarrollo:

```sh
npm start
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## Pruebas

Para ejecutar los tests:

```sh
npm test
```

## Configuración de APIs

- Libros: `https://localhost:7065/api/libromaterial`
- Autores: `https://localhost:7069/api/autor`
- Autenticación: `https://localhost:7065/api/auth`

Asegúrate de que los servicios backend estén corriendo y accesibles desde el frontend.

## Dependencias principales

- React
- Material UI
- Axios
- React Router DOM
- JWT Decode

## Licencia

MIT
