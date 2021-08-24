# Sección 8: WebComponents Avanzados

He decido crear un nuevo proyecto, razón por la cual uso los comandos de `npx create-react-app my-app` dentro de este directorio.

## Estructurando una plantilla

Lo más usual es dentro de la carpeta de los componentes, tener el acompañamiento de la hoja de estilos `.css`, e importarlo en nuestro componente:

```js
import "./HojaEstilos.css";
```

Cuando decidamos llamar un estilo dentro de cualquier etiqueta HTML de nuestro componente, en vez de usar `class=""`, emplear `className=""`, debido a que la primera opción entra en conflicto con la programación orientada a objetos de JS.

## Fragment

Podemos emplear varias veces uno o varios componentes, pero por ejemplo, si las llamadas a los mismos están en una mismos componente global, dichos componentes se verán encapsulados dentro de un div "basura". Para solucionar eso, tenemos 2 maneras:

- ```js
    const Cards = () => {
        return (
            <React.Fragment>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </React.Fragment>
        )
    }
  ```

- ```js
    const Cards = () => {
        return (
            <>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </>
        )
    }
  ```

Las llamadas anteriores solo son de ejemplo de como se vería encapsulado de manera rustica las respuestas de un JSON.

## Generar constantes dinámicamente

En este proyecto de ejemplo manejamos una data estática, pero en un proyecto real, la información esta dinámica, razón por la cual debemos recorrerla y por cada dato hacer una acción. Es allí donde aplicamos los bucles para recorrer los arreglos que nos lleguen por respuesta, y también los props para manejar un contenido dinámico. En el siguiente ejemplo, se toma la "respuesta" que se encuentra en el archivo `cards.json` y posteriormente se itera cada elemento en una nueva card.

```js
const Card = ({lang, img, fcolor, scolor}) => {
    return (
        <div className="card">
            <img src={img} alt="lang.svg" />
            <h3>{lang}</h3>
        </div>
    )
}
```

```js
const Cards = () => {
    const data = [
        //... Respuestas del JSON
    ]

    return (
        <>{data.map(
                ({lang, url, fcolor, scolor}) => {
                    return <Card key={lang} lang={lang} img={url} />
                }
            )
        }</>
    )
}
```

## PropTypes

Es importante determinar los tipos de datos admitidos por props, para evitar errores. Esto nos permite tener control sobre nuestras aplicaciones. La manera de determinar dichos tipos es haciendo uso de PropTypes (Se puede hacer uso del snippet `rafcp`):

```js
import PropTypes from "prop-types"

const Componente = ({prop1, prop2, ..., propn}) => { 
    //... 
}

Componente.propTypes = {
    prop1: PropTypes.tipo,
    prop2: PropTypes.tipo,
    //...
    propn: PropTypes.tipo
}

export default Component
```

## Inline Style Components

Cuando queremos darle un estilo a un componente de manera directa, sin llamar una hoja de estilos, los elementos son llamados de una manera diferente, por ejemplo `border-radius` pasa a ser llamada `borderRadius`. En el ejemplo de este proyecto llamamos 2 colores que queremos pasar como un linear-gradient hacia la izquierda:

```js
<div className="card" style={{background: `linear-gradient(to left, ${fcolor}, ${scolor})`}}>
```
