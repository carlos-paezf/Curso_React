# Sección 13: Proyecto - Galería de imágenes

Se propone un proyecto que hace uso de imágenes libres de derechos de autor, las cuales se pueden buscar o descargar; tiene también el concepto de ser Progressive Web App (PWA) y también de poder hacer su uso en dispositivos móviles. Para crear este proyecto, se ha usado el comando:

`npx create-react-app images-gallery --template cra-template-pwa`

## Servicio - Unsplash API

En la página [Unsplash Image API | Free HD Photo API](https://unsplash.com/developers), podemos conseguir imágenes de alta calidad y libres de derechos de autor, las cuales seran muy útiles para nuestra aplicación. El ideal es registrarnos como desarrolladores para poder acceder a su API.

La API está disponible en el endpoint `https://api.unsplash.com/` y dara las respuestas en un formato JSON. Es importante tener una aplicación registrada en la plataforma de Unsplash Image API, con el fin de poder obtener una Access Key y una Secret Key.

## Authorization Header

Podemos acceder al servicio, si contamos con un access key, en este caso se puede hacer una prueba mediante POSTMAN, ingresando el endpoint de la sección anterior junto a una modificación para acceder a imágenes aleatorias (`https://api.unsplash.com/photos/random`), y en la sección de los headers de la petición ingresamos el siguiente formato.

|Key|Value|
|--|--|
|Authorization|Client-ID *ACCESS_KEY*|

En mi caso, al día de redactar este readme, yo debería ingresar la siguiente info:

|Key|Value|
|--|--|
|Authorization|Client-ID m20vTpyUsw012OMX0b3xPzytBtyRVp7Xi9eM9IOLFNU|

## Authorization URL

En vez de enviar nuestra access key por los headers, podemos enviarla por medio de la URL, logrando un endpoint de la siguiente manera: `https://api.unsplash.com/photos/?client_id=m20vTpyUsw012OMX0b3xPzytBtyRVp7Xi9eM9IOLFNU`.

Si contamos con un backend, el ideal es que la access key se pase mediante los headers, pero en nuestro caso, REACT es meramente frontend, razón por la cual las peticiones se realizan mediante la URL.

## Cambios Iniciales

- Archivos Borrados:
  1. App.css
  2. App.test.js
  3. index.css
  4. logo.svg
  5. setupTests.js
- Archivos Cambiados:
  1. App.jsx
     - Cambio de extensión
     - Cambio a un arrow function
  2. index.html: Enlace de Bootstrap CDN
  3. index.js
     - Borrado de referencias a archivos eliminados
     - `serviceWorkerRegistration.register();`
