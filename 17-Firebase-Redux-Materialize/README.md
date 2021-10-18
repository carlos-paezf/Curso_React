# Sección 19: Firebase, Redux y Materialize

## Creación del proyecto

```cmd
create-react-app calculadora-nominal --template cra-template-pwa
```

## REDUX

Es una librería de JavaScript independiente a React, pero muy utilizada en el mismo. Como tal es otra manera de manejar el state de tu información utilizando el enfoque del patrón **Store**, el cual es considerado un banco de la verdad, debido a que es donde se almacena todo lo relacionado al estado de una aplicación.

![r1](img/redux_simple.png)

![r2](img/redux_patron_store.png)

[Documentación Oficial de Redux en Español](https://es.redux.js.org/)

[Documentación de React Redux](https://react-redux.js.org/)

## Instalación de `react-redux` y `redux`

Para instalar ambas librerías se usó el comando:

```yarn
yarn add redux react-redux
```

## Servicio Firebase

Backend construido por Google a la que podemos acceder con una cuenta de Google. Para crear un nuevo proyecto accedemos a la sección de *Consola* y añadimos nuestro proyecto. Al no ser un proyecto comercial desactivamos las Google Analythics y esperamos a la creación del proyecto.

Dentro de la sección de *Authentication* vamos a encontrar diversos proveedores de acceso, para este ejercicio vamos a manejar un Proveedor Nativo (*Correo electrónico*) y un Proveedor Adicional (*Google*). Para el correo electrónico habilitamos por el momento solo la primera caracteristica, y para la opción de Google habilitamos también la primera opción, pero añadimos un correo para la asistencia del proyecto.

## Integrando Materialize CSS

Para integrar [Materialize](https://materializecss.com/) utilizamos el CDN que nos ofrece y lo copiamos dentro del archivo `public/index.html` en el sector de head.

```html
<!-- Compiled and minified CSS -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libsmaterialize/1.0.0/css/materialize.min.css">

<!-- Compiled and minified JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0js/materialize.min.js"></script>
```

## Rutas de la aplicación

Para añadir la librería de `react-router-dom` se usó el siguiente comando:

```yarn
yarn add react-router-dom
```

```js
<BRouter>
    <Switch>
        <Route exact path="/login" component={LoginScreen}/>
        <Route exact path="/register" component={RegisterScreen} />
    </Switch>
</BRouter>
```

# Sección 20: Auth Service - Firebase

## Formulario de Login

Dentro de Materialize podemos obtener diversas plantillas para formularios, e incluso algunos estan acompañados por iconos. Para activar estos últimos, debemos copiar el siguiente link dentro del archivo de `index.html`

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

Para consultar estilos de elementos para nuestra página, debemos acceder a la documentación de Materialize para conocer los estilos de los cuales podemos disponer.

## Google Auth Button

Podemos tener un botón para acceso a Google con un estilo muy globalizado en todas las aplicaciones. Lo podemos obtener al instalar lo siguiente:

```cmd
yarn add react-google-button
```

Para su implementación hacemos la importación dentro del archivo:

```js
import GoogleButton from 'react-google-button'
```

Y por ejemplo, para ver sin funcionalidad:

```js
<GoogleButton onClick={() => console.log("google")} />
```

## Redux DevTools

En Chrome podemos buscar la extensión llamada Redux DevTools. Al tenerlo instalado, podemos acceder a él, dentro las herramientas de desarrollador.

## Configurando Redux

Creamos una carpeta y un archivo llamados `store`, el cual contiene todo el árbol de estado de estado de nuestra aplicación. El store no es una clase, es solo un objeto con unos pocos métodos. Para crearlo, pasamos muestras funciones reductoras al `createStore`, en caso de tener solo un reducer, pasamos su nombre a la función:

```js
import { createStore } from 'redux'
import { authReducer } from '../reducers/authReducer'


export const store = createStore(authReducer)
```

Para traer varios reducers, podemos usar la función `combineReducers`, la cuál recibira un objeto con los diferentes reducers de la aplicación.

```js
import { authReducer } from '../reducers/authReducer'
import { createStore, combineReducers } from 'redux'


const reducers = combineReducers({
    auth = authReducer
})

export const store = createStore(reducers)
```

El archivo `reducer/authReducer.js` consiste en un reducer para hacer acciones dependiendo de la acción, en este caso `login` y `logout`. Dichas acciones estaran definidas en el archivo `types/types.js`, pero definimos el tipo especifico que se tomara al escribir el nombre el tipo y su implicación: `'[Auth] login'`, en este caso definimos que login solo sera para autenticación.

## Store

Debemos proveer nuestro store a toda la aplicación, por lo que en el archivo `App.jsx` vamos a traer un `Provider` que entregara el store.

```js
import { Provider } from 'react-redux'
import { store } from './store/store'

const App = () => {
    return (
        <Provider store={store}>
            ...
        </Provider>
    )
}
```

## Activar Redux DevTools

Para activar la herramienta, podemos acceder a las instrucciones que ofrece, lo que nos redirige a un repositorio en github y nos muestra la instrucción de como añadirlo al store.

```js
export const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
```

## Primer dispatch Redux

Dentro de la carpeta `actions` tenemos el archivo `auth.js` en el cual tenemos las acciones de login o logout. Por ejemplo la acción de login sera de la siguiente manera:

```js
import { types } from "../types/types"

export const googleLogin = (id, username) => {
    return {
        type: types.login,
        payload: {
            id, username
        }
    }
}
```

Dentro de `LoginScreen.jsx` creamos la función que estará asociada al boton de inicio de sesión con Google Login. Dicha función "dispara" el estate para el login. Dicho dispatch lo importamos de `react-redux`.

```js
import { useDispatch } from 'react-redux'


const LoginScreen = () => {

    const dispatch = useDispatch()

    const handleGoogleLogin = () => {
        dispatch(googleLogin('124', 'Ferrer'))
    }

    return (...)

}
```
