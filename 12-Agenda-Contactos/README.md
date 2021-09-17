# Sección 14: Agenda de Contactos: Reducer + useReducer + localStorage

## Introducción a Reducer

Cuando nuestras aplicaciones de React se vuelven grandes es necesario pensar en un futuro escalamiento, nos daremos cuenta que nuestra aplicación se vuelve conflictiva para trabajar con muchos states, por ende, tenemos reducers que nos permiten centralizar toda la lógica del estado en un solo lugar y utilizarlo donde lo necesitamos, esto facilita la implementación y el mantenimiento de aplicaciones grandes.

Reducer es una función pura de JS que recibe parámetros, un estado y una acción. Esta función no puede llamar el localStorage, consumir API REST, o cosas por el estilo. Siempre retorna un nuevo State. El reducer no es lo mismo que el Hook `useReducer`, pero es necesario para dicho hook, ya que `useReduce` nos permite usar el state y modificarlo..

## Creación del Proyecto

Este proyecto fue creado siguiendo los siguientes comandos:

- Instalación de create-react-app

    ```cmd
    npm i -g create-react-app
    ```

- Creación del proyecto

    ```cmd
    create-react-app agenda-contactos --template cra-template-pwa
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
