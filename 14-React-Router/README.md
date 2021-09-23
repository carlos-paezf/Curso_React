# Sección 16: React Router a Detalle

## Creación del proyecto

Este proyecto fue creado siguiendo los siguientes comandos:

- Creación del proyecto

    ```text
    create-react-app router --template cra-template-pwa
    ```

Los siguientes archivos fueron borrados:

- App.css
- App.test.js
- index.css
- setupTest.js

El archivo App.js presenta una cambio de la función, además de que pasa a tener la extensión .jsx. El archivo index.html tiene las lineas de CDN para Bootstrap. El archivo index.js presenta el cambio en la linea de registro del Service Worker para poder registrarlo.

```js
serviceWorkerRegistration.register();
```

En cada componente, se aplican clases de Bootstrap para tener una apariencia básica, pero decente. Se añadieron los CDN para el CSS de Bootstrap y Bootstrap-Icons. También se añadieron los enlaces para el uso de acciones que requieren js por parte de Bootstrap. (Se copio el enlace de Bundle)

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ" crossorigin="anonymous"></script>
```

## Archivos adicionales para el proyecto

Dentro de la carpeta `public/assets/` encontramos algunas imágenes que nos serviran como contenido para nuestra aplicación. También hay un archivo dentro de la carpeta `models` llamado `foods`, el cual contiene un arreglo de objetos con lo que asociaremos más adelante las imágenes antes mencionadas.

## Instalación de la librería `react-router-dom`

Para instalar la librería hice uso del comando:

```cmd
yarn add react-router-dom
```
