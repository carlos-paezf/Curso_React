# Sección 4: Proyecto 1: Contador

## Estructura del proyecto

Un proyecto puede ser dividido en diversos archivos, que nos dan la facilidad de manejar nuestro proyecto y organizar nuestra lógica. Por ejemplo, podemos tener una archivo `index.html` y al mismo nivel un archivo `index.js` en donde escribiríamos alguna lógica, también podemos tener una carpeta en donde almacenamos nuestros componentes.

Aquí es donde aparece la importancia de porque declarar los links de los CDN antes del cuerpo. En el flujo de ejecución serán las primeras propiedades en ejecutarse, permitiendo manipularlas a lo largo del programa.

En este caso de ejemplo, creamos un componente `Contador.js` dentro del cual codificamos una arrow function, la cual es llamada dentro del archivo `index.js`. Dentro del archivo `index.html`, debemos tener cuidado en el orden de las llamadas, porque primero se llamar al componente y luego al archivo que lo menciona, le contrario no puede funcionar.

```html
<div id="root" />

<script type="text/babel" src="./componentes/Contador.js"></script>
<script type="text/babel" src="./index.js"></script>
```

## Creando el Contador

El componente contador debe actualizar el estado de un elemento. Para ello se hace uso de `React.useState()`, y por medio de destructuring definimos la variable `contador` y el método para acceder a su estado `setContador`. La variable contador la interpolamos en lo que deseamos retornar.

```js
const Contador = () => {
    const [ contador, setContador ] = React.useState(0);

    return (
        <div>
            <h1>Contador: { contador }</h1>
            <hr />
            <button>Aumentar</button>
            <button>Disminuir</button>
        </div>
    )
}
```

## Actualizando el Estado

Nuestras etiquetas HTML o JSX permiten acceder los eventos que ocurren sobre ellas. Por ejemplo en el caso del botón *Aumentar*, podemos acceder al evento `onClick` y pasar una función que se ejecute cada vez que se presione dicho elemento. Dicha función puede ser pasada de dos maneras:

```js
<button onClick={() => setContador(contador + 1)}>Aumentar</button>
```

O:

```js
const aumentar = () => setContador(contador + 1);
<button onClick={ aumentar }>Aumentar</button>
```

## Estilos CSS

Podemos incluir archivos CSS a nuestro proyecto, teniendo en cuenta las propiedad `class` en las etiquetas HTML y añadiendo el link que relaciones el archivo `index.html` con el archivo de estilo.

Si queremos aplicar un estilo dinámico a nuestra componente, podemos crear los estilos respectivos en la hoja de estilos, pero, cuando decimos hacer uso de ellos, en las etiquetas JSX no debemos llamar la propiedad `class`, ya que esta se puede prestar para errores con las clases de JavaScript. La solución es hacer uso de la etiqueta `className`. Ejemplo:

```js
<h1 className={ contador < 0 ? "menor" : "mayor"}>Contador: { contador }</h1>
```
