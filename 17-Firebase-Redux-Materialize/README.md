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

## Redux Thunk - Middleware

Vamos a instalar la librería de `redux-thunk` mediante el comando de:

```cmd
yarn add redux-thunk
```

Un *thunk* es una función que atrapa una expresión y retrasa su evaluación. Un *Middleware* es una lógica de intercambio de información entre aplicaciones, asiste a una aplicación para interactuar o comunicarse con otras aplicaciones, o paquetes de programas, redes hardware o sistemas operativos. 

La mayoría de aplicaciones extienden la funcionalidad del redux al añadir middleware o enhancers (potenciadores) pera sus store. Los middleware añaden funcionalidad extra a las funciones dispatch del Redux, mientras que los enhancers añaden funcionalidad a los store de Redux. Mediante el middleware de `redux-thunk` vamos a permitir un uso asincrono del dispatch. El middleware registras las acciones distribuidas el nuevos estados resultantes. Y el enhancer registra el tiempo que tardan los reductores en procesar cada acción.

En el caso de nuestro ejercicio, aplicamos el enhancer y el thunk de la siguiente manera:

```js
import { applyMiddleware, compose } from 'react-redux'
import thunk from 'redux-thunk'

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)

export const store = createStore(
    reducers, 
    composeEnhancers(
        applyMiddleware(thunk)
    )
)
```

## Configurar Firebase Web v9 (modular)

```cmd
yarn add firebase
```

Dentro de Firebase Console, ingresamos a nuestro proyecto, y en la Descripción General del Proyecto seleccionamos la opción de web, la cual esta representada por el icono `</>`, registramos nuestra app y copiamos la configuración que nos nuestra para nuestra aplicación dentro del archivo `firebase/config.js`. 

```js
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyCTOU7gNFH_rjkIS4IVA5-y8gVN3ZgeoS4",
  authDomain: "crud-react-226db.firebaseapp.com",
  projectId: "crud-react-226db",
  storageBucket: "crud-react-226db.appspot.com",
  messagingSenderId: "514854200161",
  appId: "1:514854200161:web:a8a186f1e28e5f3085db20"
};


const app = initializeApp(firebaseConfig);
```

Además también llamamos las librerías de firestore y auth de firebase:

```js
import { getFirestore } from 'firebase/firestore'
import { GoogleAuthProvider } from 'firebase/auth'

...
const db = getFirestore(app)
const googleAuthProvider = new GoogleAuthProvider() 

export { app, db, googleAuthProvider }
```

Vamos a hacer una modificación dentro del archivo de `actions/auth.js` en donde la función de `googleLogin()` sera la que tenga la conexión con Google mediante la autenticación con una ventana emergente que nos va a solicitar nuestro correo electronico. 

```js
import { getAuth, signInWithPopup } from "@firebase/auth"
import { googleAuthProvider } from "../firebase/config"

export const googleLogin = () => {
    const auth = getAuth()
    return (dispatch) => {
        signInWithPopup(auth, googleAuthProvider)
            .then((data) => console.log(data))
    }
}
```

Una vez se haya ingresado cualquier correo de google, nuestra aplicación registrara como nuevo usuario a dicho correo. De dicho usuario necesitamos el uid y el displayName, los cuales pasaremos por parámetros a la función `login` por medio del dispatch:

```js
const auth = getAuth()

export const googleLogin = () => {
    return (dispatch) => {
        signInWithPopup(auth, googleAuthProvider)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName))
            })
    }
}
```

Con lo anterior ya podemos ingresar a la herramienta de redux y observar que se están pasando un objeto con los 2 parámetros solicitados.

## Registren Screen

El formulario de registro contiene los campos de Email, Username, Password y Confirm Password.

## Capturar los datos del formulario

Dentro del Formulario de Registro, asignamos a la propiedad de onSubmit una función evitar que la página se refresque cuando se modifiquen los datos.

```js
<form onSubmit={handleRegister} className="col s12"> ... </form>
```

```js
const handleRegister = (e) => {
    e.preventDefault()
}
```

Para capturar los datos tomamos el nombre y el valor, se comparan con los campos de la data y se asignan en los campos respectivos:

```js
const handleChange = (e) => {
    const value = e.target.value
    setData({
        ...data,
        [e.target.name]: value
    })
}
```

```js
<input onChange={handleChange} value={email} name="email" id="icon_prefix1" className="materialize-textarea" type="text" />
```

## Validación de los datos

Establecemos que el email no este vacio y que debe contener un arroba, el username debe tener una longitud minima de 5 caracteres, la contraseña debe tener un minimo de 8 caracteres y si cumple dicha validación se pasa a verificar si la contraseña de confirmación es la misma a la ingresada en el campo anterior.

```js
const handleRegister = (e) => {
    e.preventDefault()

    if (email.trim() === '' || !email.trim().includes('@')) return 
    if (username.trim().length < 5) return
    if (password.trim().length < 8) return 
    else { 
        if(password.trim() === confirmPassword.trim) return
    }
}
```

Es importante recordar que estas validaciones no hacen segura nuestra aplicación, solo estamos simulando un registro de usuario desde el frontend, para mayor seguridad debemos aplicar las restricciones desde el backend.

## Registro de usuarios en Firebase

Dentro del archivo de `auth.js` creamos la función para registrar los usuario con email y contraseña dentro de Firebase, para lo cual creamos la siguiente función:

```js
const auth = getAuth()

export const register = (email, username, password) => {
    return (dispatch) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((data) => {console.log(data)})
    }
}
```

Dentro de `RegisterScreen.jsx` creamos un dispatch para poder enviar la información valida dentro la función de registro:

```js
const dispatch = useDispatch()

const handleRegister = (e) => {
    ...
    dispatch(register(email, username, password))
}
```

Si revisamos la consola del proyecto en firebase en la sección Authentication - Users, podemos observar que se registran nuevos usuario a medida que hacemos las pruebas al formulario

## Agregar displayName al registrar

Para poder modificar el usuario y agregar un displayName, debemos modificar la función de `register()` de la siguiente manera:

```js
const auth = getAuth()

export const register = (email, username, password) => {
    return (dispatch) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async ({ user }) => {
                await updateProfile(auth.currentUser, { displayName: username })
                dispatch(login(user.uid, user.displayName))
            })
    }
}
```

## Autenticación con Email y Password

Para hacer Login con el email y el password de un usuario registrado, creamos la función ``, la cual recibe por parámetros los elementos necesarios y dispara el evento de mostrar el logeo en el redux:

```js
const auth = getAuth()

export const emailAndPasswordLogin = (email, password) => {
    return (dispatch) => {
        signInWithEmailAndPassword(auth, email, password)
            .then( ({ user }) => {
                dispatch(login(user.uid, user.displayName))
            })
    }
}
```

Dentro del archivo de `LoginScreen.jsx` tenemos una función que valida los campos en cuanto al arroba o a la longitud y posteriormente, si son correctos, lanza la función de login:

```js
const handleEmailLogin = (e) => {
    e.preventDefault()
    if (email.trim() === '' || !email.trim().includes('@')) return 
    if (password.trim().length < 8) return 
    dispatch(emailAndPasswordLogin(email, password))
}
```

## Capturar sesiones iniciadas

Podemos capturar las sesione mediante el uso de Local Store o como se manejo en este caso, mediante los métodos de Firestore. Por ejemplo si queremos imprimir el último usuario que inicio sesión, podemos lograrlo mediante el siguiente código dentro del archivo de `AuthRouter.jsx`:

```js
import { getAuth, onAuthStateChanged } from '@firebase/auth'

const auth = getAuth()

useEffect(() => {
    onAuthStateChange(auth, (user) => console.log(user))
}, [auth])
```

También podemos disparar la función de `login()` al crear un dispatch y emplearlo dentro del `useEffect()`:

```js
import { useDispatch } from 'react-redux'
import { login } from '../actions/auth'


const dispatch = useDispatch()

useEffect(() => {
    onAuthStateChanged(auth, (user) => dispatch(login(user.uid, user.displayName)))
}, [])
```

Ahora si podemos observar dentro de la extensión de Redux DevTools, que cada que se hace login con un usuario diferente, la información del login se actualiza, y aún más importante, mantiene la información luego de recargar la página.

## Logout

Para efectuar el logout debemos tener una screen de nuestra app con un botón que tenga la acción de logout. La funcionalidad de dicho botón es que cada vez que se active dispare la función de logout de nuestro archivo `actions/auth.js`:

```js
import { useDispatch } from 'react-redux'
import { logout } from '../actions/auth' 

const Navbar = () => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        ...
        <button onCLick={handleLogout}>Logout</button>
        ...
    )
}
```

La función de `logout()` retorna una funcionalidad asincrona que espera el cierre de sesión dentro de firebase.

```js
const auth = getAuth()

export const logout() => {
    return async (dispatch) => {
        await signOut(auth)
        dispatch({
            type: types.logout
        })
    }
}
```

Cuando cerramos la sesión, también debemos validar que al no existe un usuario actualmente, no debe mostrar las propiedades de uid ni el displayName de algo null:

```js
useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            dispatch(login(user.uid, user.displayName))
        }
    })
}, [auth, dispatch])
```

## Protección de rutas

Dentro de nuestro archivo de `AppRouter.jsx` creamos una pequeña validación para saber si se esta logeado o no.

```js
const [log, setLog] = useState(false)

useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            dispatch(login(user.uid, user.displayName))
            setLog(true)
        } else {
            setLog(false)
        }
    })
}, [auth, dispatch])
```

Dicha validación la pasamos como props al componente que se encarga de proteger las rutas privadas es decir `PrivateRouter`, junto con el `AppScreen`. El componente `AuthRouter` va a contener las rutas para login y register, bajo el concepto de subruta, puesto que seran hijas de la ruta `/auth`.

```js
const AppRouter = () => {
    ...
    return (
        <BRouter>
            <Switch>
                <PublicRouter path="/auth" log={log} component={AuthRouter}/>
                <PrivateRouter log={log} component={AppScreen} />
            </Switch>
        </BRouter>
    )
}
```

```js
const AuthRouter = () => {
    return (
        <>
            <Route exact path="/auth/login" component={LoginScreen} />
            <Route exact path="/auth/register" component={RegisterScreen} />
            <Redirect to="/auth/login" />
        </>
    )
}
```

Al hacer lo anterior, implica que también se deben hacer los cambios para los enlaces que redirigen dentro de las páginas de `LoginScreen` y `RegisterScreen`.

El componente de `PrivateRouter` se encarga de hacer un renderizado condicional dependiendo del estado de login que se pasa por parámetro.

```js
const PrivateRouter = ({ log, component: Component, ...resto }) => {
    return (
        <Route
            {...resto}
            component={(props) =>
                log ? <Component {...props} /> : <Redirect to="/auth/login" />
            } />
    )
}
```

El componente de `PublicRouter` se encarga de redirigir a la zona privada una vez se halla logeado o por el contrario, enviar a la zona de inicio de sesion.

```js
const PublicRouter = ({ log, component: Component, ...resto }) => {
    return (
        <Route
            {...resto}
            component={(props) =>
                log ? <Redirect to="/" /> : <Component {...props} />
            } />
    )
}
```

El prop `...resto` es para poder añadir los props necesarios para el componente `Route` por ejemplo los props `exact` o `path`.

El componente principal `App.jsx` va a gestionar de manera global las rutas de `AppRouter`:

```js
const App = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </ Provider>
    )
}
```
