# Sección 7: Fundamentos de React - CRA

CRA hace referencia a *Create React App*, y como base tenemos la siguiente página: [Create React App](https://create-react-app.dev/docs/getting-started/).

Para crear una nueva aplicación de React, debemos ubicarnos en la carpeta destino, y abrir una consola en dicha ubicación para escribir el siguiente comando: `npx create-react-app my-app`, en donde `my-app` es el nombre de la aplicación.

Si no hay problemas en la creación del proyecto, esperamos el mensaje de *Happy hacking!*. Para levantar el servidor, nos dirigimos a la ruta de nuestro proyecto (`cd my-app`), e iniciamos el servidor con `yarn start`. Podemos acceder a nuestra aplicación de 2 maneras:

- A través de localhost
- A través de la red local para dispositivos diferentes al de desarrollo (ejemplo, un celular).

Dentro de la carpeta `src/` podemos encontrar el archivo `index.js`, el cual importa a React y a ReactDom. También hace un llamado al componente `<App />` en donde podemos comenzar a modificar nuestra aplicación.

## Estructura del proyecto

```txt
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```

Para que el proyecto pueda compilar, los siguientes archivos deben siempre mantener sus nombres exactos:

- `public/index.html` es la plantilla de la página.
- `src/index.js` el cual es el punto de entrada de JavaScript.

## Crear un componente de manera rápida (Snippets)

Si en VSCode tenemos instalada la extensión *ES7 React/Redux/GraphQL/React-Native snippets*, podemos usar los snippets `rafc`, `rafce` o `rafcp`, ya depende de la funcionalidad que el desarrollador decida aplicar, según la documentación de los mismos snippets.

## Directivas IMPORT, EXPORT y DEFAULT

Podemos crear una carpeta en donde se alojen los componentes que centralicen todo el tema de HTML, y para reconocerlos tenemos la extensión de archivo `.jsx`. Para llamar nuestro componente en el archivo que se necesita, debemos tener en cuenta que podemos exportar el componente de 2 maneras:

- `export function Componente() {...}`, en este caso nos exporta un JSON y para hacer una llamada especifica a un componente debemos usar array destructuring, por ejemplo `import { Componente } from "./carpeta-contenedora/archivo"`.
- `export default Componente;` y en este caso no necesitamos de usar destructuring para llamar el componente, por ejemplo `import Componente from "./carpeta-contenedora/archivo"`.

## Importación de React

Al crear nuestro componente, se importa la librería de React por defecto, y si queremos traer métodos de dicha librería, podemos hacer un destructuring para traer los módulos que requerimos, con ello evitamos instanciar constantemente a React. Ejemplo con useState:

- Instanciando constantemente a React:
  
  ```js
  import React from "react";

  const Component = () => {
    const [foo, setFoo] = React.useState(estado);
  }
  ```

- Aplicando destructuring

  ```js
  import React, { useState } from "react";

  const Component = () => {
    const [foo, setFoo] = useState(estado);
  }
  ```

De esa manera, en caso de llamar muchas veces el método, evitamos usar `React.modulo`.

## Props

Los props nos permiten enviar la comunicación de un componente a otro. En el caso del contador, por ejemplo pasarle un valor inicial desde el punto de invocación.

```js
const App = () => {
  return <Contador inicial={5} />;
};
```

```js
const Contador = (props) => {
  const [contador, setContador] = useState(props.inicial);
  //...
  const reset = () => setContador((contador) => contador = props.inicial);
  //...
}
```

Ahora bien, en caso de querer usar varios props, podemos llamarlos de manera directa al hacer uso de destructuring en los parámetros del componente.

```js
const App = () => {
  return <Contador inicial={5} factorDisminuir={0.5} />;
};
```

```js
const Contador = ({inicial, factorDisminuir}) => {

  const [contador, setContador] = useState(inicial);

  const aumentar = () => setContador((actual) => actual + 1);
  const disminuir = () => setContador(contador - factorDisminuir);
  const reset = () => setContador((contador) => contador = inicial);
  //...
}
```
