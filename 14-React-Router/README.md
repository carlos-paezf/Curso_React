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

## Rutas

Dentro de la carpeta `routes` tenemos 2 archivos con los que nos moveremos por el Login y luego de estar logeados en la aplicación. En el archivo `LoginRouter.jsx` tenemos la ruta hacia una pantalla de Login. Dentro del archivo `AppRouter.jsx` se crean las rutas para las pantallas especificas de la aplicación. Posteriormente, el componente `AppRouter` es llamada dentro del componente `LoginRouter`:

```js
<Router>
    <AppRouter />
    <Switch>
        <Route exact path="/login" component={ LoginScreen } />
    </Switch>
</Router>
```

En caso de que se ingrese una url erronea, la aplicación redirecciona a una página en especifico, esto se declara dentro de las rutas de `AppRouter`:

```js
<Redirect to="/with-meat" />
```

## Diferencia entre Link y NavLink

Dentro de la documentación de `react-router-dom`, podemos encontrar que se dispone de 2 formas de enlazar links. `Link` es bastante útil para enlaces dentro del cuerpo de la aplicación. `NavLink` tiene la función principal de servir para los enlaces en los elementos `nav`, permitiendo que aplique por defecto la clase `active` en el elemento seleccionado, otra ventaja es que tambien nos permite dar estilos personalizados a la clase activa.

```js
<NavLink activeClassName="text-danger" className="nav-link" aria-current="page" to="/main-course">Main Course</NavLink>
```

## History

Tenemos un hook que nos permite acceder al historial de rutas de nuestra aplicación, se llama `useHistory()` y es provisto por la librería de react-router-dom. En esta aplicación tenemos su uso al dar en el botón de Logout.

```js
const history = useHistory()
const handleLogout = () => {
    history.replace("/login")
}
```

```js
<button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
```

## Filter

En este proyecto tenemos 2 tipos de alimentos, los que considero platillo fuerte y los postres. Cada alimento registrado dentro del archivo `foods.js` presenta una categoría, los que tienen la categoría `A` pertenecen al grupo de los platillos fuerte, y el grupo `B` pertenece a los postres. Para renderizar cada elemento dentro de los grupos adecuados, hacemos uso de la función `.filter()`, con el fin de guardar en una variable cada grupo.

```js
const food = Foods.filter(f => f.categoria === categoria)
```

## Cards

El componente card recibe como props los elementos del arreglo de objetos de comida. Aqui es importante tener el cuenta lo siguiente: Debemos pasar el nombre tal cual de los campos de nuestro arreglo, con el din de que reconozca dichas caracteristicas.

Aquí pasamos el mapeo de una comida y por cada elemento, se debe renderizar una card. Los props se los voy a mandar en conjunto mediante el operado spread.

```js
mainCourse.map(dish => 
    <Card key={dish.id} {...dish} />
)
```

El proceso anterior me evita tener que poner:

```js
mainCourse.map(dish => 
    <Card key={dish.id} id={dish.id} nombre={dish.nombre} descripcion={dish.descripcion} categoria={dish.categoria} />
)
```

Ahora bien, insisto, como le pasamos por props una copia del elemento en vez de la línea anterior, debemos poner dentro de nuestro componente `Card` el nombre exacto de los atributos de mi elemento. Por ejemplo estoy manejando la programación de mi aplicación en inglés, pero mi arreglo de objetos esta en español, los props que se pongan en `Card` no pueden estar en ingles, deben estar también en español.

Podemos graficar las imagenes de nuestros elementos, al traer la url dinamica mediante un template string, donde, si seguimos un patrón en su nombre y el id de la comida dentro de nuestro, podemos traer facilmente su ubicación.

```js
const pathIMG = `/assets/${id}.png`
```

## Rutas con parámetros y useParam

Dentro de la carpeta `pages` tendremos el archivo `DishScreen.jsx` el cual nos servira para retornar una vista por cada plato del que queremos ver más. Creamos una constante para traer el id que pasamos de cada alimento, el cual obtenemos del hook `useParams()` que nos provee el core `react-router`.

Nosotros cuando pasamos un parámetro por una ruta y decimos que nos redireccione a otro componente, dicho componente va a recibir un objeto con los parámetros. y eso lo podemos comprar si escribimos:

```js
const params = useParams()
console.log(params)
```

Nosotros, por el momento solo haremos uso del parámetro que usemos como id, en este caso, para diferenciar, quise poner el nombre del parámetro como `idFood`

```js
<Route exact path="/dish/:idFood" component={ DishScreen } />
```

```js
const { idFood } = useParams()
```

## Método `goBack()`

En nuestro componente `DishScreen` tenemos una columna con una descripción de los elementos y demás. Lo importante aquí, es el botón que tiene la función de regresar a la página o ruta anterior.

```js
<button onClick={handleBack}> Go Back </button>
```

Esta función va a llamar la propiedad historial de la cual tiene acceso ya que nuestro componente esta involucrado en el Router, de esa manera al tener acceso a `history`, podemos acceder también a la función `goBack()` con la que podemos regresar a la ruta anterior.

```js
const DishScreen = ({ history }) => {
    const handleBack = () => {
        history.goBack()
    }
    ...
}
```

## Search Screen

Dentro de nuestra página de búsqueda, tenemos un formulario que tiene un input y un botón. Como requerimos obtener el valor que se ingrese, requerimos alterar un estado.

```js
const [inputValue, setInputValue] = useState("")

const handleChange = (e) => {
    const value = e.target.value
    setInputValue(value)
}
```

```js
<input value={inputValue} onChange={handleChange} />
```

Ahora bien también requerimos que nuestro formulario al darle enviar reciba el valor pasado por input, pero evitando que la aplicación se refresque. Es por ello que usamos la propiedad `preventDefault()` del evento que se ejecuta. Ahora bien, para pasar el parámetro a la url, accedemos al prop `history` que se puede obtener al tener la clase relacionada en el Router, y empujamos la consulta. Esto se hará cada vez que el usuario presione el botón de enviar.

```js
const handleSubmit = (e) => {
    e.preventDefault()
    history.push(`?q=${inputValue}`)
}
```

```js
<form onSubmit={handleSubmit}>...</form>
```

## Location y queryString

Por medio de la función `useLocation()` que ofrece `react-router` podemos obtener algunos parámetros de nuestra consulta, tales como: pathname, search, hash, state y key. En nuestro caso queremos recuperar la búsqueda, por lo que extraemos el parámetro search.

Vamos a usar la librería de `query-string` por lo que ingresamos el siguiente comando en la consola de nuestro proyecto:

```cmd
yarn add query-string
```

De la anterior librería usamos la función `.parse()` dentro de la cual pasamos el atributo `search` de nuestro location, con ello logramos parsear el string que se pasa por consulta a un objeto. Veamos la comparativa de los resultado

| location.search  | queryString.parse(location.search) |
| ---------------- | ---------------------------------- |
| `?q=hamburguesa` | `{q: 'hamburguesa'}`               |

El código base quedaría de la siguiente manera:

```js
const location = useLocation()
const param = queryString.parse(location.search)
```

Ahora bien, en caso de que nuestra query este vacia, el resultado que vamos a obtener va a ser: `{q: ''}`.

Podemos usar destructuring para obtener el el valor de la llave `q` con lo que tendríamos el siguiente código:

```js
const location = useLocation()
const { q = ''} = queryString.parse(location.search)
```

Para obtener el alimento tomamos el valor que se esta ingresando (obviamente si es un valor diferente a un string vacio), luego lo convertimos a minusculas y comparamos dentro de los objetos de comida si el nombre de los elementos se encuentra contenido el valor ingresado. Esto luego lo pasamos a un array de alimentos que va estar cambiando con las nuevas coincidencias.

```js
const [foods, setFoods] = useState([])

const getFoods = () => {
    if (inputValue.trim() !== '') {
        const value = inputValue.toLowerCase()
        const coincidence = Foods.filter(f => f.nombre.toLowerCase().include(value))
        setFoods(coincidence)
    } else {
        setFoods([])
    }
}
```

La función anterior solo se va a ejecutar cada vez que cambie el valor de la query que se pasa por parámetro en la URL.

```js
useEffect(() => {
    getFoods()
}, [q])
```

## Componente Private Router

El componente privado nos ayuda a determinar estado de logeado. Dicho componente lo encontramos en la carpeta de `routes` con el nombre de `PrivateRouter.jsx`. El componete va a recibir como prop el componente al que se debe redirigir.

```js
const PrivateRouter = ({ component: Component }) => {
    return <Route component={<Component />} />
}
```

También vamos a manejar un contexto para la autenticación, por lo que creamos el archivo `context/AuthContext.js`. El archivo `reducers/AuthReducer.js` nos provee de una función, que a partir de la validación de un tipo de acción cambia el estado.

```js
export const AuthReducer = (state, action) => {
    switch (action.type) {
        case authTypes.login: return { log: true }
        case authTypes.logout: return { log: false }
        default: return state
    }
}
```

Por simple practicidad y seguridad, tenemos un archivo llamado `types/authTypes.js` el cual posee un objeto con los tipos posibles para las acciones del reducer.

Todo se une en el archivo `App.jsx` en el cual hacemos uso del hook `useReducer()` que trae a `AuthReducer` y propone un estado inicial de un arreglo vacio y por init recibe una función para crear dentro del localStorage un item llamado `log`. Dicho item va a cambiar cada que `state` cambie su valor. Por último retornamos el contexto de la autenticación.

```js
const init = () => {
    return JSON.parse(localStorage.getItem('log')) || { log: false }
}

const App = () => {
    const [state, dispatch] = useReducer(AuthReducer, [], init)

    useEffect(() => {
        localStorage.setItem('log', JSON.stringify(state))
    }, [state])

    return (
        <AuthContext.Provider value={{state, dispatch}}>
            <LoginRouter />
        </AuthContext.Provider>
    )
}
```

## Componente Public Router

Para configurar la ruta pública debemos establecer uq nuestro componente `PublicRouter` pueda recibir el componente al cual nos vamos a dirigir, en este caso sería el componente `LoginScreen`. Además debe ser capaz de recibir un contexto y las props que recibe `Route`.

```js
const PublicRouter = ({ auth, component: Component, ...rest}) => {
    return <Route {...rest} component={() => <Component />} />
}
```

Como pretendemos cambiar la forma en que llegamos a `LoginScreen` dejaremos l gestión de rutas del componente `LoginRouter` de la siguiente manera:

```js
<Router>
    <Switch>
        <PublicRouter path="/login" auth={log} component={LoginScreen} />
    </Switch>
</Router>
```

Como nos damos cuenta, estamos pasando el contexto de autenticación y un prop caracteristico de Route, el cual es recibido por `...rest` dentro de `PublicRouter`.

## Alternar entre la zona pública y la privada

Dentro del componente `LoginRouter` a parte de llamar el componente para redirigir a la zona pública, también llamamos el componente para la zona privada (`AppRouter`), al cual también le pasamos el contexto de auth y el path al cual debe dirigirse.

```js
<Router>
    <Switch>
        <PublicRouter path="/login" auth={log} component={LoginScreen} />
        <PrivateRouter parh="/" auth={log} component={AppRouter} />
    </Switch>
</Router>
```

Como nosotros no tenemos ningún componente que haga render cuando la aplicación se dirija a la ruta `/` entonces dentro del componente `AppRouter` habilitamos la redirección a una zona elegida.

```js
<Redirect to="/main-course" />
```

Luego de todo lo anterior, podemos determinar dentro del componente `LoginScreen` el dispatch que va a manejar la acción y así modificar un estado del contexto, en esta ocasión, determinar el tipo login:

```js
const history = useHistory()
    
const { dispatch } = useContext(AuthContext)

const handleLogin = () => {
    dispatch({ type: authTypes.login })
    history.push("/search")
}
```

Lo mismo para el botón de logout dentro del componente `Navbar`:

```js
const history = useHistory()

const { dispatch } = useContext(AuthContext)

const handleLogout = () => {
    dispatch({ type: authTypes.logout })
    history.replace("/login")
}
```

## Proteger las rutas

Este proyecto es sencillo, no tenemos un sistema de Login profesional, pero si podemos observar como se protegen las rutas, en este caso queremos que no se pueda acceder al contenido privado si no ha dado click al botón de `Login`.

Lo primero es dentro del componente `PublicRouter` en donde evaluamos la renderización del componente según el estado de auth. Si el estado es false, se renderiza el componente de `LoginScreen`, en caso contrario se redirige a la zona privada.

```js
return <Route {...rest} component={(props) => !auth.log ? <Component {...props} /> : <Redirect to="/" />} />
```

Y aplicamos la misma lógica para el componente `PrivateRouter`, si el estado de login es verdadero entonces, renderizamos el contenido privado, de lo contrario lo redirigimos a la página de login:

```js
return <Route {...rest} component={(props) => auth.log ? <Component {...props}/> : <Redirect to="/login" />} />
```
