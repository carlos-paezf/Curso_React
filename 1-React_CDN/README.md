# Sección 3: React - CDN

## Importar React con un CDN

En la página oficial de React, podemos acceder a los CDN Links para hacer la "instalación". Recomendado hacer uso de los enlaces que permiten el uso en producción, es decir, las que se acompañan por el `.min`. Dichos scripts se utilizan antes de cerrar la etiqueta title en el archivo index.html

```html
<script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
```

Podemos observar las propiedades que tienen tanto React como ReactDOM, al ingresar las siguientes lineas de código:

```html
<script>
    console.log(React);
    console.log(ReactDOM);
</script>
```

La propiedad principal que vamos a usar sera la de `ReactDOM.render()`, el cual requiere de 2 argumentos, el primero pide que se va a hacer, y el segundo, en donde se va a hacer (Importante dar un identificador ID a cada etiqueta a manipular). Por ejemplo:

```html
<div id="root"></div>

<script>
    ReactDOM.render(
        React.createElement("h1", null, "Hola Mundo"),
        document.getElementById("root");
    );
</script>
```

## Problema de no trabajar con JSX

Lo anterior solo se ha hecho trabajando con propiedad de React, pero no se ha manejado JSX. Si siguiéramos de esa manera, nuestro código se haría muy extenso, ya que como medida de seguridad, para evitar ataques a nuestra página, React pasa los argumentos como texto plano. Entonces allí aparece la solución con JSX, donde podemos crear muchos elementos sin tener un código sucio.

## Babel y JSX

Babel permite convertir JavaScript moderno, a una versión antigua. Para usarlo existen diversas formas, pero en nuestro caso haremos uso de un CDN, el cual podemos obtener en la página de BabelJS, en la pestaña de Setup, en la opción de Prototyping - In the browser, en la sección Usage:

```html
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

Para hacer uso de Babel, debemos cambiar el tipo de nuestra sección `script`, en donde manipularemos el ReactDOM.render(), escribiendo lo siguiente:

```html
<script type="text/babel"> ... <script>
```

## Componentes

Un componente es una parte de código que realiza una función, el cual al ser agrupado con otros componentes, nos ayuda a la creación de nuestra aplicación. De esa manera podemos hacer archivos dedicados a toda la lógica de una parte de nuestra plataforma, permitiendo manipular un componente independientemente.

### Class Component - Legacy

Esta es la forma antigua de declarar componentes, actualmente esta en deprecated, pero aún así es importante conocer. EL componente es una clase que extiende de `React.Component`, el cual tiene dentro el método `render()`, el cual retorna código JSX. Por ejemplo:

```js
class Saludo extends React.Component {
    render() {
        return (
            <h1>Hola mundo - Legacy</h1>
        )
    }
}
ReactDOM.render(
    <Saludo />,
    document.getElementByID("root")
);
```

### Functional Components

Podemos simplificar la creación de componentes, haciendo uso de funciones, lo cual hace que el código sea menor, por ejemplo para el caso anterior, podemos observar como se simplifica nuestro código:

```js
const Saludo = () => {
    return (
        <h1>Hola Mundo - Functional Component</h1>
    )
}
ReactDOM.render(
    <Saludo />,
    document.getElementById("root")
)
```

## Interpolar Variables

Para hacer dinámica nuestra aplicación, se recomienda que al crear los componentes, hagamos uso de las llaves `{}` para aplicar el `return()` de la función, con el objetivo no solo devolver código JSX, sino también aplicar cualquier lógica necesaria.

Para interpolar una función o cualquier otra cosa dentro de código JSX, hacemos uso de las llaves `{}`, dentro de las cuales ingresamos nuestras variables. Ejemplo:

```js
const Interpolar = () => {
    const nombre = prompt("¿Cuál es tu nombre?");
    return (
        <div>
            <h1>Bienvenido { nombre }</h1>
            <h2>Fecha: { new Date().getFullYear() }</h2>
            <hr />
        </div>
    )
}
ReactDOM.render(
    <Interpolar />,
    document.getElementById("root")
)
```

## Introducción a los Estados

Nosotros no debemos manipular un estado de manera manual, por lo que React nos permite declarar un `setState` para modificar el estado de nuestra variable, partiendo de un punto inicial. El concepto de "estado" nos abre paso al tema de "Reactividad". En el siguiente caso concreto, intentamos crear un contador que incremente cada segundo, pero se genera un comportamiento no deseado: Cada segundo, se renderiza la variable partiendo desde el valor inicial.

```js
const Estados = () => {
    const [numero, setNumero] = React.useState(0)
    setInterval(() => setNumero(numero + 1), 1000);

    return (
        <div>
            <h1>Número: { numero }</h1>
            <hr />
        </div>
    )
}
ReactDOM.render(
    <Estados />,
    document.getElementById("root")
)
```
