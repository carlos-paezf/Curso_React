# Sección 10: Proyecto: Calculadora App

Se hace uso del comando `npx create-react-app calculadora-app`.

## CRA Template

En la página oficial de React, encontramos la sección de Selecting Template y el siguiente comando: `npx create-react-app my-app --template [template-name]`. Pero de que sirve: Podemos evitar el proceso de configuración para transformar nuestro proyecto a una PWA, mediante el comando de `npx create-react-app my-app --template cra-template-pwa`

## Archivo Service Worker

Por medio del comando anterior, podemos observar que se ha creado 2 nuevos archivos: `service-worker.js` y `serviceWorkerRegistration.js`.

En el archivo index.js podemos registrar el Service Worker luego de cambiar de `.unregister()` a `.register()`.

## React Developer Tools

Existe una extensión con el nombre del titulo de esta sección, la cual nos permite analizar desde consola, los componente de nuestra aplicación, viendo elementos como props, hooks, entre otras. Esta aplicación hace más fácil la observación de una aplicación REACT que esta en producción.

## Modularidad de los componentes

Para evitar código repetido que se pueda llegar a transformar en un code smell, podemos sacar por módulos las partes que pretendemos reutilizar. Por ejemplo dentro de la carpeta `components`, podemos crear una carpeta `modules` para extraer los fragmentos de código reutilizable, como la entrada para los números:

```js
import React from 'react'
import PropTypes from 'prop-types'

const NumberInput = ({name}) => {
    return (
        <>
            <label> 
                {name}: <input type="number" />
            </label>
            <br />
        </>
    )
}

NumberInput.propTypes = {
    name: PropTypes.string
}

export default NumberInput
```

## Capturar los datos de un Input

En la titulo anterior creamos un módulo para reutilizar código cuando llamáramos un input para ingresar números. Pero ahora, para capturar los números debemos obtener tanto su estado, como su función de cambio.

```js
const [numeros, setNumeros] = useState({
    numero1: 0,
    numero2: 0
})

const handleChange = (e) => {
    setNumeros(e.target.value)
}

return (
    <>
        <label> 
            {name}: <input type="number" onChange={handleChange}/>
        </label><br />
    </>
)
```

Pero con el código anterior tenemos el inconveniente que solo captura el primer input. Para solucionar esta lógica, modificamos el script de la siguiente manera: Lo primero es obtener estado de los 2 números, luego hacemos un destructuring de dicho objeto para poder hacer uso de los elementos dentro de otras partes del código de una manera más cómoda.

La función `handleChangle`, tiene la finalidad de capturar un evento y alterar los estado de los números. Recibe una copia del objeto `numeros`, y luego modifica el elemento que tenga el mismo nombre del valor del input.

```js
import React, { useState } from 'react'

const NumberInput = () => {

    const [numeros, setNumeros] = useState({
        numero1: 0,
        numero2: 0
    })

    const { numero1, numero2 } = numeros

    const handleChange = (e) => {
        setNumeros({
            ... numeros, 
            [e.target.name]: parseFloat(e.target.value),
        })
    }

    return (
        <>
            <label>
                Número 1: <input name="numero1" value={numero1} type="number" onChange={handleChange} />
            </label><br />
            <label>
                Número 2: <input name="numero2" value={numero2} type="number" onChange={handleChange} />
            </label><br />
        </>
    )
}


export default NumberInput
```

Podemos transportar los componentes de las operaciones al script de `NumberInput.jsx`, con el fin de poder operar los números de entrada, logrando así, que el archivo `Calculadora.jsx` se vea de la siguiente forma:

```js
import React from 'react'
import NumberInput from './modules/NumberInput';

const Calculadora = () => {
    return (
        <div>
            <NumberInput />
        </div>
    )
}

export default Calculadora
```

Y la función de suma dentro de nuestro componente `NumberInput.jsx` quedaría de la siguiente manera.

```js
const NumberInput = () => {
    const [numeros, setNumeros] = useState({
        numero1: 0,
        numero2: 0
    })

    const { numero1, numero2 } = numeros
    ...
    const suma = () => numero1 + numero2;

    return (
        <>
            ...
            <Resultado operacion="Suma" resultado={suma()} />
        </>
    )
}
```

Ahora bien, podemos reutilizar una misma función para las demás operaciones y nos quedaría así:

```js
const operacion = (operador) => {
        let res;
        switch (operador) {
            case "+": res = numero1 + numero2; break;
            case "-": res = numero1 - numero2; break;
            case "*": res = numero1 * numero2; break;
            case "/": res = numero1 / numero2; break;
            default: break;
        }
        return res;
    };

    return (
        <>
            ...
            <Resultado operacion="Suma" resultado={operacion("+")} />
            <Resultado operacion="Resta" resultado={operacion("-")} />
            <Resultado operacion="Multiplicación" resultado={operacion("*")} />
            <Resultado operacion="División" resultado={operacion("/")} />
        </>
    )
```

## Helpers

Si vemos nuestros archivo completo de `NumberInput.jsx`, en el momento es bastante grande y no cumple con el propósito exacto de la modularización de tareas. Es por ello que a través de los Helpers podemos contener funciones para reutilizar después.

En el archivo `operaciones.js` tengo una función que almacena las otras funciones de ayuda. Posteriormente en el lugar donde deseo usarlas, aplico destructuring.

```js
export const operacionesHelper = (numeros, setNumeros) => {
    const { numero1, numero2 } = numeros;

    const handleChange = (e) => {
        setNumeros({
            ... numeros, 
            [e.target.name]: parseFloat(e.target.value),
        })
    }
    
    const operacion = (operador) => {
        let res;
        switch (operador) {
            case "+": res = numero1 + numero2; break;
            case "-": res = numero1 - numero2; break;
            case "*": res = numero1 * numero2; break;
            case "/": res = numero1 / numero2; break;
            default: break;
        }
        return res;
    }

    return { handleChange, operacion, numero1, numero2 }
}
```

```js
import React, { useState } from 'react'
import { operacionesHelper } from '../../helpers/operaciones'
import Resultado from './Resultado'

const NumberInput = () => {
    const [numeros, setNumeros] = useState({
        numero1: 0,
        numero2: 0
    })

    const { 
        handleChange, 
        operacion, 
        numero1, 
        numero2 
    } = operacionesHelper(numeros, setNumeros)

    return (
        <>
            <label>
                Número 1: <input name="numero1" value={numero1} type="number" onChange={handleChange} />
            </label><br />
            <label>
                Número 2: <input name="numero2" value={numero2} type="number" onChange={handleChange} />
            </label><br />

            <Resultado operacion="Suma" resultado={operacion("+")} />
            <Resultado operacion="Resta" resultado={operacion("-")} />
            <Resultado operacion="Multiplicación" resultado={operacion("*")} />
            <Resultado operacion="División" resultado={operacion("/")} />
        </>
    )
}


export default NumberInput
```

## Agregando Bootstrap en React

La manera más fácil de dar estilo es por medio de Bootstrap, para lo cual copiamos el CDN de CSS que nos ofrece, dentro de nuestro archivo `public/index.html`, en el head bajo el titulo de la aplicación.

Por ejemplo, en el archivo `src/App.js` podemos comenzar a dar estilos a nivel general.

```js
import React from 'react'
import Calculadora from './components/Calculadora'

const App = () => {
  return (
    <div className="container text-center">
      <h1>Calculadora - React PWA</h1>
      <hr />
      <Calculadora />
    </div>
  )
}

export default App
```
