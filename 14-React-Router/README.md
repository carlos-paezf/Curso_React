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
