# Sección 17: Optimizaciones en React

Partimos con que copiamos el mismo proyecto de la sección anterior. La diferencia se da dentro de las opciones de desarrollador dentro del navegador usado. Allí vamos a seleccionar la pestaña de `Network` e inhabilitamos el cache en la opción de `Disable cache`. Además también tomaremos la simulación de una red lenta, por lo que en la lista desplegable que se encuentra disponible dentro de la misma pestaña, seleccionamos `Slow 3G`.

## Code Splitting

Por medio de esta técnica, nuestra aplicación se divide en diversos componentes que se van a renderizar de acuerdo al momento en que se llama, permitiendo que se tengan archivos de carga más rápidos, además de fraccionar la carga. Esta técnica viene acompañada de ***Lazy Loading component key*** (carga perezosa)

En la página [Can I use](caniuse.com), podemos conocer cuales navegadores soportan el atributo de Lazy Loading, y encontramos por ejemplo que Chrome logra soportarlo, Firefox tiene una implementación parcial, pero Safari no tiene soporte para esta caracteristica. Aquellos navegadores que no tienen soporte para esta característica, simplemente lanzaran todos los elementos de golpe, mientras que aquellos que soportan el atributo, cargaran a medida que se vaya consumiendo.

Por ejemplo para las imágenes. Dentro de la etiqueta para las imágenes, agregamos la propiedad `loading="lazy"`. (Ejemplo en las imágenes que renderiza el componente `Card`):

```js
<img loading="lazy" src={pathIMG} className="img-fluid rounded-start" alt={ id } />
```

Si tenemos las configuraciones mencionadas al inicio, podremos ver que en la pestaña de red, se cargan las imágenes de manera lenta, una tras otra.

## React Lazy y Suspense

También podemos pasar nuestros componentes para una carga perezosa. Por ejemplo en el lugar donde importamos nuestros componentes, podemos traer su importación mediante la función `lazy()` y luego establecemos el background para mientras se cargan los componentes mediante el componente `Suspense`. Esto concepto lo aplicamos por ejemplo en la carga de las rutas de la siguiente manera:

```js
import React, { lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

const Navbar = lazy(() => import('../components/Navbar'))
const DessertScreen = lazy(() => import('../pages/DessertScreen'))
const DishScreen = lazy(() => import('../pages/DishScreen'))
const MainCourse = lazy(() => import('../pages/MainCourse'))
const SearchScreen = lazy(() => import('../pages/SearchScreen'))

const AppRouter = () => {
    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <Navbar />
            <Switch>
                <Route exact path="/main-course" component={ MainCourse } />
                <Route exact path="/dessert" component={ DessertScreen } />
                <Route exact path="/search" component={ SearchScreen } />
                <Route exact path="/dish/:idFood" component={ DishScreen } />

                <Redirect to="/main-course" />
            </Switch>
        </Suspense>
    )
}

export default AppRouter
```

## React Snap

Vamos a instalar la librería `react-snap`, para lo cual usamos el siguiente comando:

```cmd
yarn add --dev react-snap
```

Posteriormente, dentro del archivo `package.json` modificamos la siguiente propiedad:

```json
"scripts": {
    ...,
    "postbuild": "react-snap",
}
```

Dentro del archivo `index.js` hacemos la siguiente modificación:

```js
import React from 'react';
import { hydrate, render } from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById("root")

if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement)
} else {
  render(<App />, rootElement)
}


serviceWorkerRegistration.register();


reportWebVitals();
```

## PWA como técnica de optimización

Al tener configurado el manifest de nuestra aplicación y tener activo el Service Worker, podemos tener una aplicación que cargue con información almacenada en la caché del equipo del usuario, lo que hace más rápida la carga de la página.

## Browser LightHouse

Chrome nos ofrece la opción de auditar nuestra aplicación mediante una opción de desarrollador llamado Lighthouse. Dicha opción la encontramos en el menú de inspeccionar. Nos brinda un resultado de las acciones que estan afectando el desempeño de nuestra aplicación, tales como malas practicas, desempeño, accesibilidad entre otras.
