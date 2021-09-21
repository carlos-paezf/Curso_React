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

## React Router

React es una librería, no un framework (no confundir con React Native), por lo que no nos provee de un sistema de rutas propio. Pero, podemos instalar una librería para rutas. [React Router](https://reactrouter.com/) nos provee documentación para rutas, en esta caso, para web. En este proyecto procedemos a ejecutar el siguiente comando:

```txt
yarn add react-router-dom
```

## Creación de Rutas

Podemos definir dentro de una carpeta con los componentes de las páginas por las cuales vamos a navegar y en otra capeta guardamos el administrador de las rutas.

Dentro del archivo `AppRouter.jsx` se esta haciendo una importación para el manejo de rutas:

```js
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
```

Dentro del componente se inicializa el gestor de rutas con las etiquetas `<Router></Router>` y dentro de las mismas tenemos unas etiquetas `<Switch></Switch>` que son parte de la importación anterior en las que definimos cuales son las rutas por las que nos vamos a mover y a que componente redirecciona cada una mediante las etiquetas `<Route />`

```js
<Router>
    <Header />
    <Switch>
        <Route path="/" component={Home} />
    </Switch>
</Router>
```

Cuando queremos crear más rutas debemos pasar el prop `exact` a nuestro componente `<Route />` con el fin de que reconozca el componente que le pasamos.

```js
<Router>
    <Header />
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
    </Switch>
</Router>
```

Cuando se ingresa una ruta que no existe, podemos enviar una página con error 404, para ello creamos una ruta sin el prop `exact` que nos redireccione a la página de Not Found.

```js
<Route path="/" component={NOTFound} />
```

Cuando tenemos botones para redirigir a alguna página de nuestra aplicación, tenemos la opción de usar el componente `<Link></Link>` el cual recibe un prop llamado `to` a donde pasamos la url de la página deseada.

```js
import { Link } from 'react-router-dom'
```

```js
<Link to="/about">About</Link>
```

La ventaja de hacer lo anterior, es que nos permite tener aplicaciones de tipo PWA.
