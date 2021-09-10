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

## Memo

Tenemos un contador y deseamos aumentar su valor o darle la funcionalidad de mostrar u ocultar el dato. Dichas acciones estan asociadas con algunos botones. Es importante aclarar que el dato es un componente aparte. Cada que se pulsa en uno de los botones, el componente Dato, se renderiza una y otra vez mientras se cambia su valor. Esta bien que se recargue el valor, pero no todo el componente.

La solución que se propone, es por medio de la función `memo()`, la cual va a *memorizar* todo el estado del componente. Entonces pasamos de esto:

```js
import React from 'react'

const Dato = ({value}) => {
    console.log('Me acabo de renderizar')
    return <>{ value }</>
}
```

a tener esto:

```js
const Dato = React.memo(({value}) => {
    console.log('Me acabo de renderizar')
    return <>{ value }</>
})
```

O si también queremos:

```js
const Dato = ({value}) => {
    console.log('Me acabo de renderizar')
    return <>{ value }</>
}

export default React.memo(Dato)
```

`React.memo` es un componente de orden superior. Si el componente renderiza el mismo resultado dado las mismas props, entonces se puede usar este componente, con el fin de mejorar el desempeño de la aplicación. Es decir, cada vez que tengamos resultado sea igual al último, el componente no se va a renderizar, sino, que se mostrara ese último valor.

## useMemo

Puede que hayan ocasiones en que una función depende del valor devuelto de otro componente. Dicho componente puede o no estar ajustado por `React.memo`. El problema radica en que la función va a renderizar una y otra vez su acción, sin importar que el resultado sea el mismo. En ese caso, podemos regular su actividad por medio de la función `useMemo()`, la cual va a guardar el valor que se requiere en memoria, y de esa forma evitar una renderización innecesaria.

Por ejemplo tenemos una función pesada, que depende del valor actual del contador. Cada que doy click al boton de aumentar el contador, el valor se recarga, lo cual es correcto. Pero, cuando le doy click al boton de ocultar, dicha función se vuelve a renderizar, aunque el valor del contador no ha cambiado.

```js
const funPesada = (iteracion) => {
    for (let i = 0; i < iteracion; i++) {
        console.log('procesando')
    }
    return 'Fin del proceso'
}


return (
    ...
    {funPesada(contador)}
    ...
)
```

Aplicamos la función `useMemo()`, la cual recibe una función y una lista de dependencias que guarda los resultados previos. Con ello evitamos que cada vez que presionamos el boton de ocultar, se ejecute de nuevo la función, contrario a que si el valor del contador cambia.

```js
const funPesadoMemo = useMemo(() => funPesada(contador), [contador])

return (
    ...
    {funPesadaMemo}
    ...
)
```

## useCallback

Cada que muto un componente, la función que se encarga de dicha acción, se va a renderizar en cada mutación, ubicandose en un lugar de memoria distinto. La función `useCallback()` recibe la función que va a analizar, y una lista de resultados, con los cuales evita que si hay resultados iguales, se ejecute la función que ha recibido.

```js
const handleAdd = useCallback(() => {
    setContador(actual => actual + 1)
}, [setContador])
```

Pero también, para obtener el correcto funcionamiento de nuestra logica, debemos usar `React.memo` dentro del componente que se ve afectado por la renderización.

```js
export default memo(BotonAdd)
```

## CustomHooks

Son funciones reutilizables, en la cual podemos centralizar parte de nuestra logica. Es muy común encontrarlos en una carpeta llamada `hooks` y con una patrón de `useFuncionalidad.js`. En este caso, tenemos un hook personalizado para incrementar y decrementar un valor inicial.

```js
import { useState } from 'react'

export const useCounter = (initialValue, range = 1) => {
    const [counter, setCounter] = useState(initialValue)

    const increment = () => {
        setCounter(counter + range)
    }
    const decrement = () => {
        setCounter(counter - range)
    }

    return [counter, increment, decrement]
}
```

Su implementación dentro de un componente es de la siguiente manera:

```js
    const [counter, increment, decrement] = useCounter(10)
```
