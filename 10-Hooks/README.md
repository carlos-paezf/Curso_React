# Sección 12: Hooks (Detallados)

## useState

Nosotros podemos acceder al estado de una variable y alterarlo teniendo en cuenta la función `useState()` de React. Podemos ver que hay en ella si escribimos:

```js
import {useState} from 'react'

const State = () => {
    const stateFoo = useState()
    console.log(stateFoo)
}
```

Si necesitamos cambiar el estado de dicha variable podemos ingresar el método set:

```js
...
const [ stateFoo, setStateFoo ] = useState({})
...
```

Es importante declarar que se va a cambiar y cuando, de lo contrario se puede entrar en un loop infinito de renderización. Por ejemplo, si declaramos de la siguiente manera, el navegador hara llamadas constantes para renderizar el componente y por lo tanto tendra un alto consumos de recursos.

```js
setStateFoo(10)
```

```js
setInterval(() => {
    setStateFoo(stateFoo + 1)
})
```

```js
setInterval(() => {
    setStateFoo(stateFoo + 1)
}, 3000)
```

En el primer caso, el navegador nos lanzara un error; en el segundo, se va a renderizar sin un tiempo fijo y de manera ilimitado; en el tercer caso, se va a llamar el método de cambio desde su estado original hasta el estado nuevo de manera constante, entrando en un bucle infinito.

## useEffect

Cuando tenemos una variable y pedimos hacer un cambio, como en el caso anterior, la petición se ejecutara de manera constante, lo cual conlleva a un alto consumo de servicios. Ahora bien, tenemos la función de `useEffect()`, la cual recibe un callback con una función imperativa para determinar un efecto, y un arreglo de dependencias para tener como condicionales de la ejecución del efecto.

```js
import { useState, useEffect } from 'react'

const [ foo, setFoo ] = useState()

useEffect(() => {
    setFoo(foo + 1)
}, [])
```

Si queremos copiar snippets de Bootstrap dentro de JSX, tendremos errores debido a la sintaxis, entonces para evitar ello usamos un convertidor de [HTML a JSX](https://magic.reactjs.net/htmltojsx.htm)

## Prevent Default

Podemos tener un formulario y evitar que se recargue la página en cada petición mediante el evento `preventDefault()` con el cual podemos detener la recarga de nuestra aplicación.

```js
const handleSubmit = (e) => {
    e.preventDefault()
}
```

Tenemos de ejemplo hacer una petición a {JSON}Placeholder para obtener una lista de usuarios, son el siguiente código, nuestra aplicación no se va a recargar, pero si se vera envuelta en un bucle infinito de peticiones que devora recursos, todo gracias al mal manejo de `setUsers()` y `getUsers()`:

```js
const [ users, setUsers ] = useState([])
    
const getUsuarios = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await res.json()
    setUsers(data)
}
getUsuarios()

console.log(users)
```

Necesitamos que solo se ejecute una vez la petición que se ubica en el método `getUsers()`, es allí donde aplicamos el concepto de `useEffect()`, dejando el código de la siguiente manera, teniendo en cuenta que la función callback que recibe no puede ser async:

```js
const [ users, setUsers ] = useState([])

useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then(data => setUsers(data))
}, [])
```

La idea es obtener un usuario en base de un id, en ese caso establecemos otro efecto bajo un estado, y enlazamos el id como dependencia para el effect y como valor para el input de búsqueda:

```js
const [id, setId] = useState(null)

useEffect(() => {
    console.log(users[id - 1])
}, [id])

const handleSubmit = (e) => {
    e.preventDefault()
}

<form onSubmit={handleSubmit}>
    <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
</form>
```

## cleanUp

Uno de los riesgos de usar `useEffect()`, es que luego de que se aprueba una condición, la funcionalidad se sigue ejecutando, para terminarla, debemos aplicar el concepto de `cleanUp` y su estructura es la siguiente:

```js
useEffect(() => {
    effect
    return () => {
        cleanup
    }
}, [input])
```

En donde reemplazamos `cleanup` por la funcionalidad que deseamos en caso de que no se cumpla la condición del efecto.

## useLayoutEffect

La diferencia de este vs `useEffect` es solo que `useLayoutEffect` se ejecuta de manera síncrona después de las mutaciones del DOM, lo cual puede ser útil solo en casos especificos.

## useRef

`useRef()` nos permite acceder a un componente de la misma manera que accedieramos por un id:

```js
const handleRef = () => {
    const ref = document.getElementById("area")
    console.log(ref)
}
return (
    <>
        <h2 onClick={handleRef}>useRef</h2>
        <textarea id="area" placeholder="Escribe un mensaje..."></textarea>
    </>
)
```

```js
const ref = useRef(null)

const handleRef = () => {
    console.log(ref)
}
return (
    <>
        <h2 onClick={handleRef}>useRef</h2>
        <textarea ref={ref} placeholder="Escribe un mensaje..."></textarea>
    </>
)
```
