# Sección 15: Context API - Estado Global

## Introducción al Context

Muchas veces tenemos la necesidad de compartir información entre componentes o entre pantallas, y enviar props por 20 components para usarlo solo en el componente 20, se vuelve complicado de seguir. Tenemos la solución del ***Context***, el cual nos permite compartir un State de manera global, para poder usarlo en donde lo necesitemos, sin necesidad de mandarlo por todos lados e inclusive modificarlo y notificar el cambio automáticamente.

Un ejemplo es cuando tenemos 2 páginas dentro de nuestra aplicación. Una es una página de login y otra es por ejemplo un blog. Mientras yo no este logeado en la aplicación yo no puedo acceder al contenido del blog. Una vez inicio sección puedo acceder al blog, pero el login que inhabilitado para mi como usuario. Una vez cierro sesión, login se habilita, pero blog nuevamente es inaccesible para mi.

## Creación del proyecto

Este proyecto fue creado siguiendo los siguientes comandos:

- Creación del proyecto

    ```cmd
    npx create-react-app context-router --template cra-template-pwa
    ```

Los siguientes archivos fueron borrados:

- App.css
- App.test.js
- index.css
- setupTest.js

El archivo `App.js` presenta una cambio de la función, además de que pasa a tener la extensión `.jsx`. El archivo `index.html` tiene las lineas de CDN para Bootstrap. El archivo `index.js` presenta el cambio en la linea de registro del Service Worker para poder registrarlo.

```js
serviceWorkerRegistration.register();
```

En cada componente, se aplican clases de Bootstrap para tener una apariencia básica, pero decente. Se añadieron los CDN para el CSS de Bootstrap y Bootstrap-Icons. También se añadieron los enlaces para el uso de acciones que requieren js por parte de Bootstrap. (Se copio el enlace de Bundle)

```html
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ" crossorigin="anonymous"></script>
```
