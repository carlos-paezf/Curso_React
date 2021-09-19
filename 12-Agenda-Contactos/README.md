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

El proyecto se estructura principalmente por un Header, un formulario de registro y una tabla para listar los contactos registrados. En cada componente, se aplican clases de Bootstrap para tener una apariencia básica, pero decente.

## Creando el primer Reducer

Dentro de la carpeta `reducers` agregamos los reducers que vamos a emplear. Para crear una función exportable, podemos usar el snippet `enf` (export Named Function), y es justo el que se uso para crear la función `ContactosReducer()` que recibe por parámetros un estado y una acción.

Lo primero es validar el tipo de acción que recibe y retornar algo según dicho valor. En nuestro ejemplo, recibe una función de tipo `add`, por lo que retorna una copia del arreglo inicial y la información que contiene. Por default esta retornando el arreglo inicial sin modificaciones.

```js
export const ContactosReducer = (state, action) => {
    switch (action.type) {
        case 'add': return [...state, action.payload]
        default: return state
    }
}
```

Posteriormente en el componente que lo vamos a usar ingresamos la función `useReducer()` pasando por parametros el reducer y estado inicial.

```js
const [state, dispatch] = useReducer(ContactosReducer, contactos)
```

El dispatch nos permite informar los cambios a los componentes que tienen que dibujar el estado. Realizamos cambios con su ayuda y el notifica que a los componentes usuarios que redibujen el nuevo contenido. Por ejemplo pasamos la función `dispatch` al componente de `FormularioADD`

```js
<FormularioADD dispatch={dispatch} />
```

Dentro de nuestro formulario tenemos un boton que nos permite añadir un contacto a partir de una función que emplea el dispatch para efectuar la comparación dentro del reducer, del tipo de la acción a ejecutar:

```js
const handleAdd = () => {
    dispatch(actionAdd)
}
```

El tipo definido aqui nos ayuda a determinar en el reducer la forma en que se va a ejecutar la función.

```js
const actionAdd = {
    type: "add", 
    payload: {
        id: '1ad23df',
        nombre: 'Ferrer',
        numero: '912389'
    }
}
```

## Capturar la información del formulario

En la sección anterior podemos observar que pasamos información en el payload de manera manual. Ahora bien, para capturar la información que entra en el formulario, establecemos un objeto `data` que tiene por valores iniciales los los elementos que vamos a usar en nuestro formulario.

```js
const [data, setData] = useState({nombre: '', numero: ''})
```

Debemos anclar los valores de nuestros elementos dentro de los input, para lo cual aplicamos destructuring en el objeto y así extraer sus datos.

```js
const { nombre, numero } = data
```

Nuestros inputs requieren de un nombre para hacer la comparación al momento de añadir lo que reciben dentro de nuestro objeto. También requieren de la función que nos permite registrar los cambios y registrarlos en la data.

```js
const handleChange = (e) => {
    setData({
        ...data,
        [e.target.name]: [e.target.value]
    })
}

<input type="text" name="nombreElemento" id="nombreElemento" value={nombreElemento} onChange={handleChange}/>
```

Con la data capturada podemos pasarla a nuestro objeto de `actionAdd` en la sección de payload (si los nombres no cambian, es porque el el nombre del valor es igual al nombre de la caracteristica):

```js
const actionAdd = {
    type: 'add',
    payload: {
        id: '',
        nombre,
        numero
    }
}
```

## Generar un ID de manera aleatoria

Podemos instalar un paqueta para generar los ID de manera aleatoria, como el paquete `uuid`, el cual instalamos con cualquiera de los siguientes comandos en consola:

```text
npm install --save uuid
```

```text
npm i --save uuid
```

```text
yarn add uuid
```

Lo demás es facil. Importarlo e instanciarlo en el campo de id del `payload`:

```js
import { v4 as uuidV4} from 'uuid'

const actionAdd = {
    payload: {
        id: uuidV4(),
        ...
    }
}
```

Nos crea un id bastante largo, pero único. Si queremos que en nuestra tabla solo se muestre el primer octeto del serial, podemos agregar una funcionalidad en el mapeo de los contactos:

```js
{contactos.map(contacto => {
    const finalID = contacto.id.split("-")
    return (
        <tr key={contacto.id}>
            <th>{ finalID[0] }</th>
            ...
        </tr>
    )
})}
```

La función `split` va a crearnos un array el cual contiene por elemento cada sector que este separado por un "-" (en este caso).

| ID Original                          | Array generado por split                             |
| ------------------------------------ | ---------------------------------------------------- |
| 1de280bb-cb9b-4afd-8d30-46709c5f809f | ["1de280bb", "cb9b", "4afd", "8d30", "46709c5f809f"] |

## Capturar un contacto por el ID

Para eliminar un registro, debemos capturar su id. Primero debemos pasar como prop el dispatch para capturar la acción que se desea realizar y luego, dependiendo el tipo, ejecutar una acción.

```js
<TablaContactos contactos={state} dispatch={dispatch} />
```

Para capturar el id del contacto, cada que pulsemos sobre el botón de eliminar, debemos pasar una función que reciba dicho id.

```js
<button className="btn btn-outline-danger" onClick={() => handleDelete(contacto.id)}>
    Eliminar &nbsp;
</button>
```

La función contiene un objeto con el tipo de acción, y el contenido a manipular. Dicho objeto luego se para por medio del dispatch a nuestro reducer.

```js
const handleDelete = (id) => {
    const actionDelete = {
        type: 'delete',
        payload: id
    }
    dispatch(actionDelete)
}
```

El reducer quedaria de la siguiente manera: En caso de que la acción sea eliminar, debe retornar dentro del nuevo state, todos los id, menos el que se ha seleccionado.

```js
export const ContactosReducer = (state, action) => {
    switch (action.type) {
        case 'add': return [...state, action.payload]
        case 'delete': return state.filter(actual => actual.id !== action.payload)
        default: return state
    }
}
```
