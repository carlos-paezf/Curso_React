# Sección 5: Introducción a PWA (Progressive Web Apps)

## PWA ¿Qúe es?

Son simulaciones de aplicaciones nativas, por lo que no son aplicaciones móviles ni de escritorio. Se deben desarrollar con un enfoque Mobile First, es decir que se pueda ejecutar en dispositivos móviles. Par ser PWA, debe cumplir con:

- Correr bajo un protocolo seguro HTTPS o estar en localhost (127.0.0.1)
- Contar con un ServiceWorker
- Tener un archivo manifest.json

## Ventajas de usar PWA

- Detectables
- Instalables
- Corren sin conexión
- Acceden a recursos nativos del equipo
- Reconectables
- Responsivas
- Seguras
- Pesan muy poco
- Siempre están actualizadas

## HTTP vs HTTPS

Según el modelo cliente servidor, un cliente envía peticiones a un servidor y este le da una respuesta. Ese procedimiento se hace en un archivo plano, por lo que si es interceptado se puede comprometer al 100% la información. La idea de HTTPS es hacer ese mismo procedimiento, pero enviando de manera cifrada las peticiones y las respuestas, evitando de esa manera cualquier ataque.

Es necesario utilizar un protocolo seguro HTTPS, debido a que el Service Worker es muy poderoso y pude llegar a cambiar nuestra aplicación.

## Service Worker

Es una característica de los navegadores modernos, que nos permite ser un intermediario entre nuestra aplicación, el hardware y el cliente. Este ServiceWorker es un archivo JS, el cual es completamente independiente de nuestra aplicación y se encarga de manipular el comportamiento de nuestra aplicación como guardar o actualizar en cache, lanzar peticiones push, guardar acciones cuando se está sin conexión y una vez recuperada la conexión, lanzar las acciones de forma definitiva, etc.

En general, el Service Worker maneja absolutamente toda la aplicación y tiene tanto poder sobre la misma, que por lo mismo es necesario correr en un protocolo seguro.

## Registrar un Service Worker

A nivel del archivo `index.html`, debemos crear un archivo `register.js` en el cual podemos registrar un service worker en el navegador que ejecuta nuestra aplicación:

```html
<script src="./register.js"></script>
```

```js
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js");
}
```

En nuestro navegador, al inspeccionar nuestra aplicación, podemos acceder a la pestaña de `Red` o `Network` en la cual podemos observar las peticiones que se realizan junto a su estado. Lo que vamos a hacer es cachear todas esas peticiones en nuestro serviceWorker.

Lo primero es tomar los elementos que queremos guardar en el cache de la aplicación.

```js
const CACHE_ELEMENTS = [
    "./",
    "https://unpkg.com/react@17/umd/react.production.min.js",
    "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
    "https://unpkg.com/@babel/standalone/babel.min.js",
    "style.css",
    "./componentes/Contador.js"
];
```

Debemos darle un nombre a la versión de nuestro cache.

```js
const CACHE_NAME = "v1_cache_contador_react";
```

El evento que debemos escuchar es el de *install*, del cual obtenemos la propiedad `waitUntil()` con la que le decimos que espere que se ejecute la cache, la cual tiene nuestra versión de cache, y esto nos retorna una promesa, la cual manipulamos al añadir todos los elementos que queremos cachear, y esto de nuevo nos retorna una promesa, en la que le decimos que instalamos nuestro serviceWorker en nuestra aplicación.

```js
self.addEventListener(
    "install", 
    (e) => {
        e.waitUntil(caches.open(CACHE_NAME).then(cache => {
            cache.addAll(CACHE_ELEMENTS).then(() => {
                self.skipWaiting()
            }).catch(console.log);
        }))
    }
)
```

## Activar el Service Worker

Añadimos un nuevo evento llamado `activate`, dentro del cual lo primero que hacemos es crear un arreglo que contenga el nombre de nuestro cache. Posteriormente, accedemos a la lista de nuestros caches instalados con sus claves, a dicha promesa, tomamos los nombres de dichos caches y retornamos una promesa de que por cada cache, si no se encuentra en nuestra lista blanca de caches, debe ser eliminado el cache antiguo y reemplazado por el el nuevo. Terminado el análisis de los cache, el cliente reclama el uso del cache.

```js
self.addEventListener(
    "activate", 
    (e) => {
        const cacheWhiteList = [CACHE_NAME];
        e.waitUntil(
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        return cacheWhiteList.indexOf(cacheName) === -1
                            && caches.delete(cacheName)
                    })
                )
            }).then(() => self.clients.claim())
        )
    }
)
```

## Fetch Service Worker

El evento `fetch` se dispara cada vez que abramos la aplicación, buscando una nueva versión de nuestro archivo y luego retornar las respuestas cacheadas, en caso de que no tenga una respuesta en cache, hace un fetch de dicha petición.

```js
self.addEventListener(
    "fetch",
    (e) => {
        e.respondWith(
            caches.match(e.request).then((res) => {
                if (res) return res;
                return fetch(e.request);
            })
        )
    }
)
```

## Metadata para PWA

Podemos crear algunas etiquetas de metadata para optimizar nuestra aplicación en los dispositivos móviles, ya sean de android o de apple, en opciones como el color de tema, la optimización a lo ancho, etc.

```html
<meta name="theme-color" content="#333333">
<meta name="MobileOptimized" content="width">
<meta name="HandheldFriendly" content="true">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
```

## Iconos

Podemos descargar un icono en formato .png o .ico, dentro del directorio raíz de nuestro proyecto. Tener en cuenta que para apple toca hacer algunas configuraciones mas, para obtener el resultado deseado.

```html
<link rel="shortcut icon" href="./favicon.png" type="image/png">
<link rel="apple-touch-icon" href="./favicon.png" type="image/png">
<link rel="apple-touch-startup-image" href="./favicon.png" type="image/png">
```

## Archivo Manifest

En nuestro archivo `manifest.json`, podemos declarar el nombre de nuestra aplicación, la descripción, los iconos a usar, etc. Comúnmente para generar las etiquetas de nuestro iconos, podemos hacer uso de un generador de iconos para PWA online, por ejemplo [PWABuilder](https://www.pwabuilder.com/imageGenerator). De esa manera, ya podemos observar en el inspector del navegador, en la sección de Application, nuestro manifest.

Otra opción para generar nuestro iconos, es a través de [pwa-asset-generator](https://www.npmjs.com/package/pwa-asset-generator) con su instalación de One-off execution. Su uso seria por ejemplo:

`npx pwa-asset-generator favicon.png /assets -m manifest.json -i index.html`
