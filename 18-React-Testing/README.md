# Sección 22: React Testing - Testing Library

Creación del proyecto con el comando:

```yarn
create-react-app testing-react --template cra-template-pwa
```

## Mi primera prueba

Para ejecutar los tests vamos a emplear cualquiera de estos 2 comandos (depende del gestor de comandos que se empleé en el proyecto):

1. `npm run test`
2. `yarn test`

`setupTest.js` es un archivo que configura el intellisense para nuestras pruebas por medio de la importación de librerías. Pero primero vamos a crear una carpeta para componentes que vamos a testear.

Las extensiones para los archivos de test son: `.test.js` o `.spec.js`. Tenemos un componente llamado `Counter.jsx` y un archivo para sus pruebas llamado `Counter.test.js`. Mientras tengamos activas las pruebas, obtendremos un error si nuestro archivo de pruebas esta vacio, ahí tenemos nuestro primer `Fail`, ahora bien, podemos poner el siguiente código y dejar que pase el test:

```js
test('Pruebas al componente Counter', () => {})
```

## Wrapper

Podemos buscar la etiqueta que envuelve la frase `Contador: 0` mediante funciones que se disponen para los elementos que se renderizan durante el testeo

```js
import { render } from '@testing-library/react'


test('Pruebas al componente Counter', () => {
    const wrapper = render(<Counter />)
    console.log(wrapper.getByText("Counter: 0").tagName)
})
```

Por ejemplo el código anterior nos imprime que tenemos a `Counter: 0` dentro de una etiqueta `H2`

## Expect - ToBe

Un `matcher` es algo que esperamos que ocurra. Por ejemplo podemos decir que esperamos que el nombre de la etiqueta que contiene el texto `Counter: 0` sea un `H2`.

Es importante aclara que el nombre de las etiquetas que se devuelven en el test, estan en mayusculas. Si ponemos el siguiente código, nos muestra un error, diciendo que se recibio un `H2`, pero se esperaba un `h2`

```js
expect(wrapper.getByText("Counter: 0").tagName).toBe("h2")
```

También podemos negar una afirmación en nuestro test, esto a través del método `.not` después del `expect()`.

```js
test('1 + 1 no es 3', () => {
    expect(1+1).not.toBe(3)
})
```

## describe

Podemos agrupar las pruebas para poder localizar nuestros errores, por medio del método `describe()`. De esa forma sabemos que parte de nuestro código testeamos y cual es el punto donde está el error:

```js
describe('<Counter />', () => {
    test('Titulo y estado renderizan correctamente', () => {
        const wrapper = render(<Counter />)
        expect(wrapper.getByText("Counter: 0").tagName).toBe("H2")
    })
    
    test('1 + 1 no es 3', () => {
        expect(1+1).not.toBe(3)
    })
})
```

## it

Es muy común ver que la función `test()` se use de manera independiente, contrario a la función `it()` que se emplea cuando agrupamos las pruebas.

```js
describe('<Counter />', () => {
    it('Titulo y estado renderizan correctamente', () => {
        const wrapper = render(<Counter />)
        expect(wrapper.getByText("Counter: 0").tagName).toBe("H2")
    })
    
    it('1 + 1 no es 3', () => {
        expect(1+1).not.toBe(3)
    })
})
```

## Screen

Por medio de la propiedad `screen` podemos evitar tener que estar llamando la variable `wrapper` que renderiza nuestro componente.

```js
import { render, screen } from '@testing-library/react

test('Titulo y estado renderizan correctamente', () => {
    render(<Counter />)
    expect(screen.getByText("Counter: 0").tagName).toBe("H2")
})
```

Es importante aclarar que toca renderizar el componente en cada test que lo involucre, de lo contrario no va a funcionar.

```js
describe('<Counter />', () => {
    it('Titulo y estado renderizan correctamente', () => {
        render(<Counter />)
        expect(screen.getByText("Counter: 0").tagName).toBe("H2")
    })

    it('Verificar botón +1', () => {
        render(<Counter />)
        expect(screen.getByText('Aumentar +1').tagName).toBe('BUTTON')
    })
})
```

### fireEvent

Por medio de `fireEvent` podemos efectuar algunas acciones para los componentes en los que interactua el usuario, para los test usamos dicha función para simular esas acciones. En este caso simulamos la acción de un click en el que esperamos que el valor de `Counter: 0` pase a ser `Counter: 1`.

```js
it('Verificar botón +1', () => {
    render(<Counter />)
    const btn = screen.getByText('Aumentar +1').tagName
    fireEvent.click(btn)
    expect(screen.getByText('Counter: 1').textContent).toContain('Counter: 1')
})
```

Podemos definir un id para los elementos que queremos testear:

```js
<h2 data-testid="counter">Counter: {state}</h2>
```

Es id lo podemos llamar en nuestro test, con el método `getByTestId()`:

```js
it('Verificar botón +1', () => {
    render(<Counter />)
    const btn = screen.getByText('Aumentar +1')
    fireEvent.click(btn)
    expect(screen.getByTestId('counter').textContent).toContain('Counter: 1')
})
```

## getByRole y getByLabelText

Podemos usar la función `getByRole` mientras no haya 2 o más elementos con el mismo rol, por ejemplo 2 elementos rol de `counter`. Asignar un rol es la forma más recomenda por Testing Library:

```js
<h2 role="counter">Counter {state}</h2>
```

```js
it('Verificar botón -1', () => {
    render(<Counter />)
    const btn = screen.getByText('Disminuir -1')
    fireEvent.click(btn)
    expect(screen.getByRole('counter').textContent).toContain('Counter: -1')
})
```

Para emplear `getByLabelText` debemos poner la propiedad `aria-label` dentro de la etiqueta que queremos llamar.

```js
<button aria-label="disminuir" onClick={handleRestar}>Disminuir -1</button>
```

```js
it('Verificar botón -1', () => {
    render(<Counter />)
    const btn = screen.getByLabelText('disminuir')
    fireEvent.click(btn)
    expect(screen.getByRole('counter').textContent).toContain('Counter: -1')
})
```

## userEvent

Para usar `userEvent` debemos importarlo de la siguiente librería:

```js
import userEvent from '@testing-library/user-event'
```

`userEvent` recibe múltiples acciones, en este caso vamos a usar la acción click y vamos a esperar que nos la respuesta sea la que le entregamos por `expect()`. Estamos haciendo la misma comparación a la que empleabamos en la sección anterior.

```js
it('Verificar botón -1', () => {
        render(<Counter />)
        userEvent.click(screen.getByLabelText('disminuir'))
        expect(screen.getByRole('counter').textContent).toContain('Counter: -1')
    })
```

## Simulando el comportamiento de un usuario

Podemos simular una interacción mayor de un usuario, podemos ingresar un test algo extenso con dicho fin, en el cual definimos que elementos vamos a simular y que valores se esperan recibir.

Hay test que son muy grandes y si los ejecutamos en conjunto con otros, tendremos una gran demora. Pero, tenemos la solución de que al tener desplegada la consola de los test, podemos buscar la opción de `Press p to filter by a filename regex pattern` o `Press t to filter by a test name regex pattern`, con los cuales podemos ejecutar un test o un archivo de test especifico y demorar menos.

## Refactorizar el código

Podemos refactorizar el código para que sea más limpio, y vamos a observar que si la lógica que seguimos es correcta y disminuye las lineas de código u organiza mejor el mismo, entonces los test pasaran correctamente.

En el caso del ejemplo del contador que hemos estado manejando, podemos refactorizar el código de la siguiente manera y permitiendo que los test sean exitosos:

- Archivo `components/Counter.jsx`:

  ```js
  import { useCounter } from '../hooks/useCounter'

    const Counter = () => {

        const { state, handleModifyCounter } = useCounter()

        return (
            <>
                <h2 data-testid="counter" role="counter">Counter: {state}</h2>

                <button onClick={() => handleModifyCounter()}>Aumentar +1</button>
                <button aria-label="disminuir" onClick={() => handleModifyCounter(-1)}>Disminuir -1</button>
                <button aria-label='reset' onClick={() => handleModifyCounter(-state)}>Resetear Contador</button>
            </>
        )
    }

    export default Counter
  ```

- Archivo `hooks/useCounter.jsx`:
  
  ```js
  import { useState } from "react"

    export const useCounter = () => {
        const [state, setState] = useState(0)

        const handleModifyCounter = (value = 1) => {
            setState(state + value) 
        }

        return { state, handleModifyCounter}
    }
  ```

Podemos refactorizar aún más la aplicación al extraer los botones como un nuevo componente.

- Archivo `components/Counter.jsx`
  
  ```js
  import { useCounter } from '../hooks/useCounter'
    import ButtonCounter from './ButtonCounter'

    const Counter = () => {

        const { state, handleModifyCounter } = useCounter()

        return (
            <>
                <h2 data-testid="counter" role="counter">Counter: {state}</h2>

                <ButtonCounter name='Aumentar +1' action={handleModifyCounter} value={1} aria='aumentar' />
                <ButtonCounter name='Disminuir +1' action={handleModifyCounter} value={-1} aria='disminuir' />
                <ButtonCounter name='Resetear Contador' action={handleModifyCounter} value={-state} aria='reset' />
            </>
        )
    }

    export default Counter
  ```

- Archivo `components/ButtonCounter.jsx`
  
  ```js
  import React from 'react'

    const ButtonCounter = ({ name, value, action, aria}) => {
        return (
            <button aria-label={aria} onClick={() => action(value)}>{name}</button>
        )
    }

    export default ButtonCounter
  ```

Y con todas estas modificaciones, la aplicación sigue funcionando y dejando que los test sean exitosos.
