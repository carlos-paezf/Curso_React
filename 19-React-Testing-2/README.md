# Sección 23: React Testing - Spies, Mocks, Coverage, Snapshots

## Spies Functions

Tomamos como base el proyecto de la sección anterior. Queremos testear el componente `ButtonCounter`, pero para testearlo debemos tener en cuenta que se deben pasar información mediante props y una de ellas es una función.

```js
import { render } from '@testing-library/react'
import ButtonCounter from './ButtonCounter'

describe('<ButtonCounter />', () => {
    it('Crear un botón correctamente', () => {
        render(<ButtonCounter name="Prueba" value={3} action={} aria="prueba-aumentar" />)
    })
})
```

Una acción correcta es crear una función que instancie de `jest.fn()`, el cual es un Mock o simulación que nos va a permitir simular una función, mientras escanea cual es la función correcta para pasar por parámetro.

```js
import { render } from '@testing-library/react'
import ButtonCounter from './ButtonCounter'

describe('<ButtonCounter />', () => {

    const action = jest.fn()

    it('Crear un botón correctamente', () => {
        render(<ButtonCounter name="Prueba" value={3} action={action} aria="prueba-aumentar" />)
    })
})
```

## beforeEach

Dentro del archivo de prueba podemos observar que tenemos muchas pruebas, y en cada una aparece la instrucción `render(<Counter />)`. Una propuesta para poder pasar dicha instrucción antes de cada prueba es usar el método `beforeEach`, con el cual definimos que queremos que sea el estado inicial del componente al iniciar cada test.

```js
describe('<Counter />', () => {
    
    beforeEach(() =>{
        render(<Counter />)
    })

    it('', () => { ... })
    
    ...
})
```

## Snapshots

Snapshot es una herramienta que nos permite mantener controlados los cambios en la interfaz de nuestra aplicación, y que no cambie inesperadamente. Los snapshots que se capturan se guardan en la carpeta `__snapshots__` en el directorio donde se estan llevando a cabo las pruebas. Un caso de prueba de instantánea típico representa un componente de la interfaz de usuario, toma una instantánea y luego la compara con un archivo de instantánea de referencia almacenado junto con la prueba. La prueba fallará si las dos instantáneas no coinciden: el cambio es inesperado o la instantánea de referencia debe actualizarse a la nueva versión del componente de la interfaz de usuario.

```js
it('Primer Snapshots', () => {
    expect(screen.getByRole('counter')).toMatchSnapshot()
})
```

## JEST Coverage

El Coverage nos da un informe de que tanto cubren nuestros test sobres los archivos de nuestra aplicación. Para poder establecer un comando dentro del archivo `package.json` primero debes establecer cual sera el gestor de paquetes que usamos, si **yarn** o **npm**:

- Para npm:

  ```json
  "scripts": {
    ...,
    "test": "react-scripts test",
    "coverage": "npm run test -- --coverage",
    ...
  },
  ```

- Para yarn:
  ```json
  "scripts": {
    ...,
    "test": "react-scripts test",
    "coverage": "yarn test --coverage",
    ...
  },
  ```

Ya teniendo la configuración podemos ingresar `npm run coverage` o `yarn coverage` según el gestor. El reporte tendrá la siguiente apariencia:

```txt
 PASS  src/components/ButtonCounter.test.js
 PASS  src/App.test.js
 PASS  src/components/Counter.test.js   
-------------------------------|---------|----------|---------|---------|-------------------
File                           | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------------------|---------|----------|---------|---------|-------------------
All files                      |   12.82 |        0 |   14.81 |   12.82 |                   
 src                           |    1.49 |        0 |    4.55 |    1.49 |                   
  App.js                       |     100 |      100 |     100 |     100 |                   
  index.js                     |       0 |      100 |     100 |       0 | 8-23              
  reportWebVitals.js           |       0 |        0 |       0 |       0 | 1-8               
  service-worker.js            |       0 |        0 |       0 |       0 | 16-68             
  serviceWorkerRegistration.js |       0 |        0 |       0 |       0 | 13-134            
 src/components                |   83.33 |      100 |   66.67 |   83.33 |                   
  ButtonCounter.jsx            |   66.67 |      100 |      50 |   66.67 | 5                 
  Counter.jsx                  |     100 |      100 |     100 |     100 |                   
 src/hooks                     |      80 |        0 |      50 |      80 |                   
  useCounter.js                |      80 |        0 |      50 |      80 | 7                 
-------------------------------|---------|----------|---------|---------|-------------------

Test Suites: 3 passed, 3 total
Tests:       4 passed, 4 total
Snapshots:   2 passed, 2 total
Time:        6.423 s
Ran all test suites related to changed files.
```
