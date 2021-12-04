# Sección 23: React Testing - Spies, Mocks, Coverage, Snapshots

Vamos a volver a emplear el proyecto de Images-Gallery para hacer test de sus funcionalidades. Para los archivos de test, creamos una carpeta llamada `src/__tests__`. La ventaja de tener una carpeta así, es que todos los archivos que se guarden en ese directorio serán reconocidos como archivos para test.

Para que se reconozca que vamos a hacer pruebas, debemos tener el archivo `src/setupTest.js`, con la importación más básica:

```js
import "@testing-library/jest-dom"
```

## Snapshot inicial a la aplicación

Lo primero que vamos a hacer es crear un snapshot del componente principal (`App.jsx`). Recordar que los snapshots generados se guardan en una carpeta llamada `__snapshots__`. Para ello escribimos el siguiente test:

```js
test('Snapshot de App', () => {
    render(<App />)

    expect(screen.getByRole("app")).toMatchSnapshot()
})
```

Dentro del componente de `App` definimos que el div tenga un rol llamado `app`.

## Pruebas a Container

Dentro del div del componente `Container` le añadimos la propiedad de aria-label con un nombre que usemos para el test, en este caso sera el mismo nombre del componente `container`.

```js
const Container = () => {
    return (
        <div aria-label="container">
            <Cards />
        </div>
    )
}
```

Para los test de este componente creamos un nuevo archivo llamado `__test__/Container.js` y tomamos una captura del componente.

```js
describe("<Container/>", () => {
    it("Snapshot principal", () => {
        render(<Container />)

        expect(screen.getAllByLabelText('container')).toMatchSnapshot()
    })
})
```

## Find All - Async Test

Cuando miramos los snapshots que se han tomado, se puede observar que no se carga el contendio asincrono, solo muestra o renderiza un loading. Queremos testear el componente de Cards, por lo que crearemos un nuevo archivo de test para él y tomamos un screenshot de lo que deseamos:

```js
const Cards = () => {

    return (
        <div>
            ...
            <div aria-label="cards">
                {images.map((img) => {
                    return <div key={img.id} className="col">
                        <Card img={img.urls.regular} />
                    </div>
                })}
            </div>
        </ div>
    )
}
```

```js
describe("<Cards />", () => {
    it("Snapshot principal de Cards", () => {
        render(<Cards />)

        expect(screen.getByLabelText('cards')).toMatchSnapshot()
    })
})
```

Podemos observar que como snapshot se nos captura lo siguiente:

```text
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`<Cards /> Snapshot principal de Cards 1`] = `
<div
  aria-label="cards"
  class="row"
/>
`;
```

Ahora bien, queremos observar el comportamiento de cada tarjeta, por lo que repetimos el procedimiento de añadir un aria-label al componente de `Card`.

```js
const Card = ({ img }) => {
    return (
        <div aria-label="card-img">
            <img src={img} className="card-img-top" alt="imagen.png" />
        </div>
    )
}
```

Para poder obtener los valores que se retornan a partir de una promesa, debemos usar `findAll` con el que podemos aplicar asyn y await. De esta manera podemos tomar una snapshot de lo que retorne nuestra aplicación de manera asincrona.

```js
it("Snapshot de Card", async () => {
    render(<Cards />)

    expect(await screen.findAllByLabelText('card-img')).toMatchSnapshot()
})
```

Podemos también hacer test para comprobar cuantos elementos se obtienen en la petición. Una manera es haciendo uso de `length`, y la otra manera es mediante `toHaveLength()`

```js
it("Se traen 10 elementos con res.length", async () => {
    render(<Cards />)

    const res = await screen.findAllByLabelText('card-img')

    expect(res.length).toBe(10)
})

it("Se traen 10 elementos con toHaveLength()", async () => {
    render(<Cards />)

    const res = await screen.findAllByLabelText('card-img')

    expect(res).toHaveLength(10)
})
```

## Por qué usar MOCKS

Para testing, en cuanto a llamados a una API, es mejor usar `axios` frente a `fecth`. Ahora bien, también debemos tener en cuenta que en muchos casos, hacer peticiones a una API externa puede incurrir en gastos monetarios por petición. Por ello es recomendable el uso de los mocks. Vamos a crear una carpeta llamada `src/__mocks__` para que guardemos los mokcs que usaremos para simular las peticiones en el testing. Por ejemplo traemos en un archivo llamado `images.js` un arreglo de imagenes para simular las peticiones.

Dentro el archivo de test escribimos nuestra prueba, pero debemos tener cuidado con el flujo de ejecución. Primero debemos definir el mock y luego si renderizar el componente, de lo contrario seguiremos haciendo peticiones directamente al servidor.

```js
it("Simular la carga de contendio de la API", async () => {
    axios.get = jest.fn().mockResolvedValue({ data : images})

    render(<Cards />);

    const res = await screen.findAllByLabelText('card-img')

    expect(res).toHaveLength(10)
})
```

Es recomendable que los test y los mocks no se suban al proyecto en producción. Por lo que en los archivos para exclusión como `.gitignore` ponemos lo siguiente.

```text
# testing
/coverage
/*/__tests__
/*/__mocks__
*.test.js
*.spec.js
```
