# Sección 13: Proyecto - Galería de imágenes

Se propone un proyecto que hace uso de imágenes libres de derechos de autor, las cuales se pueden buscar o descargar; tiene también el concepto de ser Progressive Web App (PWA) y también de poder hacer su uso en dispositivos móviles. Para crear este proyecto, se ha usado el comando:

`npx create-react-app images-gallery --template cra-template-pwa`

## Servicio - Unsplash API

En la página [Unsplash Image API | Free HD Photo API](https://unsplash.com/developers), podemos conseguir imágenes de alta calidad y libres de derechos de autor, las cuales seran muy útiles para nuestra aplicación. El ideal es registrarnos como desarrolladores para poder acceder a su API.

La API está disponible en el endpoint `https://api.unsplash.com/` y dara las respuestas en un formato JSON. Es importante tener una aplicación registrada en la plataforma de Unsplash Image API, con el fin de poder obtener una Access Key y una Secret Key.

## Authorization Header

Podemos acceder al servicio, si contamos con un access key, en este caso se puede hacer una prueba mediante POSTMAN, ingresando el endpoint de la sección anterior junto a una modificación para acceder a imágenes aleatorias (`https://api.unsplash.com/photos/random`), y en la sección de los headers de la petición ingresamos el siguiente formato.

| Key           | Value                  |
| ------------- | ---------------------- |
| Authorization | Client-ID *ACCESS_KEY* |

En mi caso, al día de redactar este readme, yo debería ingresar la siguiente info:

| Key           | Value                                                 |
| ------------- | ----------------------------------------------------- |
| Authorization | Client-ID m20vTpyUsw012OMX0b3xPzytBtyRVp7Xi9eM9IOLFNU |

## Authorization URL

En vez de enviar nuestra access key por los headers, podemos enviarla por medio de la URL, logrando un endpoint de la siguiente manera: `https://api.unsplash.com/photos/?client_id=m20vTpyUsw012OMX0b3xPzytBtyRVp7Xi9eM9IOLFNU`.

Si contamos con un backend, el ideal es que la access key se pase mediante los headers, pero en nuestro caso, REACT es meramente frontend, razón por la cual las peticiones se realizan mediante la URL.

## Cambios Iniciales

- Archivos Borrados:
  1. App.css
  2. App.test.js
  3. index.css
  4. logo.svg
  5. setupTests.js
- Archivos Cambiados:
  1. App.jsx
     - Cambio de extensión
     - Cambio a un arrow function
  2. index.html: Enlace de Bootstrap CDN
  3. index.js
     - Borrado de referencias a archivos eliminados
     - `serviceWorkerRegistration.register();`

## Container

Dentro de la carpeta `components` esta el archivo `Container.jsx`, el cual contiene la estructura de una card de Bootstrap. La imagen tiene por contenido del atributo src la url de una imagen aleatoria que se obtiene luego de pasar el siguiente endpoint: `https://api.unsplash.com/photos/random/?client_id=m20vTpyUsw012OMX0b3xPzytBtyRVp7Xi9eM9IOLFNU`. En la sección de URLS del JSON que se obtiene, copiamos la url de la opción regular.

Pero queremos tener una logica más independiente, razón por la cual creamos un componente llamado `Card.jsx` en el cual almacenamos la el código para crear una card, y otro componente llamado `Cards.jsx` para poder hacer uso de multiples card.

La generación de las images las podemos obtener al pasar una función async que ejecute el método `.fecth()` sobre el endpoint.

```js
const [images, setImages] = useState({
    urls: {
        regular: {}
    }
})

const peticion = async () => {
    const res = await fetch("https://api.unsplash.com/photos/random/?client_id=m20vTpyUsw012OMX0b3xPzytBtyRVp7Xi9eM9IOLFNU")
    const data = await res.json()
    setImages(data)
}
```

El componente `Card` ahora va a recibir un prop para cambiar la url del src de la imagen.

```js
<Card img={images.urls.regular} />
```

## Pintar un listado de imágenes

La anterior sección mostraba solo 1 imagen aleatoria, ahora necesitamos mostrar un álbum de imágenes. Para solucionar esta propuesta modificamos nuestro código de la siguiente manera: En el componente `Cards` cambiamos el tipo de `images` de objeto a array, para luego mapearlo y pasar los correspondientes props al componente `Card`. También tener en cuenta que nuestro endpoint cambia, pues ya no debe tener la directiva `random`.

```js
const [images, setImages] = useState([])

const peticion = async () => {
    const res = await fetch("https://api.unsplash.com/photos/?client_id=m20vTpyUsw012OMX0b3xPzytBtyRVp7Xi9eM9IOLFNU")
    const data = await res.json()
    setImages(data)
}
// ...
return (
    <>
        {images.map((img) => <Card key={img.id} img={img.urls.regular} />)}
    </>
)
```

```js
const Card = ({ key, img }) => {/* ... */}

Card.propTypes = {
    key: PropTypes.string,
    img: PropTypes.string
}
```

## Formulario de Búsqueda

Debemos crear una estructura `<form></form>` para recibir un parámetro de búsqueda. El texto que se pasa por el input de este formulario, se va a encontrar en la posición 0 del target. Esa entrada debe actualizarse cada vez que el usuario ingrese algo al input.

```js
const handleSubmit = (e) => {
    e.preventDefault()
    const text = e.target[0].value
    setInput(text)
}
```

Nuestro código vuelve a cambiar cuando queremos aplicar los parámetros de búsqueda en la url. En la nueva función, hemos decidido partir la ruta en diversas partes, con el fin de tener un acceso más comodo. Cada vez que detecte que la entrada es diferente a algo vacio, ingresa la query de acuerdo a lo ingresado.

```js
const peticion = async () => {
    const accessKey = "client_id=m20vTpyUsw012OMX0b3xPzytBtyRVp7Xi9eM9IOLFNU"
    let route = `https://api.unsplash.com/photos/?${accessKey}`
    if (input !== "") {
        route = `https://api.unsplash.com/search/photos/?query=${input}&${accessKey}`
    }
    const res = await fetch(route)
    const data = await res.json()
    setImages(data)
}
```

La petición se va a ejecutar al inicio y solo cuando cambie el valor del input.

```js
useEffect(() => {
    peticion()
}, [input])
```

Pero todo lo anterior nos arroja un error, y para ello modificamos de nuevo la petición: Lo primero fue aplicar un `useCallback()` que se modifique cada que cambia el input, el cual si viene con espacios se debe pasar a un formato que nos evite errores mediante la función `encodeURI()`. Ahora bien, cuando hacemos la búsqueda y obtenemos resultados, nuestra data debe cambiar, pues ahora pasa a encapsularse en una propiedad nueva llamada `results` (Nota: Esto pasa con la respuesta JSON que nos ofrece la API para este proyecto. Analizar en cada servicio que se use), de lo contrario se maneja la data normal.

```js
const peticion = useCallback(
    async () => {
        const accessKey = "client_id=m20vTpyUsw012OMX0b3xPzytBtyRVp7Xi9eM9IOLFNU"
        let route = `https://api.unsplash.com/photos/?${accessKey}`
        if (input !== "") {
            route = `https://api.unsplash.com/search/photos/?query=${encodeURI(input)}&${accessKey}`
        }
        const res = await fetch(route)
        const data = await res.json()
        if (data.results) {
            setImages(data.results)
        } else {
            setImages(data)
        }
    },
    [input]
)
```

Como le hemos dicho al callback que cambie cada que se modifique el input, ahora podemos cambiar el effect y esperar que se lancé cada que cambie la petición:

```js
useEffect(() => {
    peticion()
}, [peticion])
```

## Estilos del Proyecto

Podemos agregar estilos que ya estan definido en Bootstrap, incluso hasta iconos. Es importante recordad que para llamar las clases de estilos debemos usar la palabra `className` en vez de `class`, con el fin de evitar conflictos con la palabra reservada dentro del contexto de POO.

Para añadir iconos, añadimos el siguiente CDN dentro de nuestro archivo `index.html` dentro de la etiqueta `<head></head>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
```

## Componente Loading

Podemos contar un circulo de carga que se muestre cada vez que se envia una petición y mientras se espera una respuesta. Para ello traemos la base desde bootstrap y luego establecemos un estado, el cual inicia en un estado `true` y se mantiene de esa manera mientras se realiza la petición, y se convierte en `false` cuando la petición ha sido recibida.

```js
setLoading(true)
const res = await fetch(route)
const data = await res.json()
if (data.results) {
    setImages(data.results)
} else {
    setImages(data)
}
setLoading(false)
```

## Optimizar

Podemos "partir" nuestro código en más archivos y de esa manera tener scripts más limpios. Por ejemplo el código que ejecuta la petición ha sido pasado a un hook personalizado con el fin de poder reducir código en el componente de `Cards`.

## Configuración del Manifest

Podemos descargar una imagen y con un Image Generator para PWA convertimos la imagen a nuestras necesidades. Las carpetas con las imagenes las guardamos en la carpeta de `public`.

Las modificaciones básicas del `manifest.json` son el short name, name, description, iconos, theme color y background color.

## Bundle del Proyecto

Dentro del proyecto ingresamos el comando `yarn build`. El proyecto genera la carpeta `build`, la cual podemos montar por ejemplo en Netlify
