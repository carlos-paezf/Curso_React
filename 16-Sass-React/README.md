# Sección 18: SASS y React

## Creación del proyecto

```cmd
create-react-app sass --template cra-template-pwa
```

## ¿Qué es SASS?

SASS es un preprocesador de CSS y no u lenguajes de estilos, simplemente es una forma diferente de escribir CSS, de una manera más limpia. El código SASS necesita compilarse a CSS, pues los navegadores no lo entienden. Esta última necesidad se ve satisfecha por React, ya que esta configurado para dicha funcionalidad. SASS usa la extensión `.scss`. Es una herramienta más en el mercado como LESS o Stylus

## Instalar SASS

En este proyecto se instalo SASS mediante el comando:

```cmd
yarn add sass
```

## Variables en SASS e importaciones

Lo primero que se realizo fue eliminar el archivo `App.css`, además de reformular el componente `App`. El archivo `index.css` cambio su extensión a `.scss`. También creamos una carpeta llamada `sass`, donde almacenaremos el código que escribamos con SASS.

Dentro del archivo `variables.scss` definimos variables de colores. Para definir una variable anteponemos al nombre de la misma el signo `$`, obteniendo por ejemplo: `$foo`. PAra asignar u valor escribimos `: valor`.

```scss
$primary: #a12325;
$secondary: #0956ae;
$white: snow;
$dark: #333;
```

Para emplear dichas variables en otro archivo damos la importación con la palabra `@import "ruta_del_archivo.scss";`. Es importante siempre importarlas antes de los componentes que las emplean para evitar errores. Por lo general las importaciones se realizan dentro del archivo `index.scss`.

En este ejemplo vamos a emplear las variables creadas para darle algo de forma a un titulo dentro del archivo `Title.scss`:

```scss
.title {
    color: $primary;
    font-size: 3.5rem;
}
```

Como decia anteriormente, importante poner la importación de las variables antes que el componente que las usa.

```scss
@import "./sass/variables.scss";
@import "./sass/Title.scss"
```

## SASS Partials

Una de las ventajas de SASS es que podemos dividir nuestras hojas de estilo en pequeños archivos denominados *partials*, los cuales posteriormente podemos importar en nuestras hojas de estilo principales mediante la expresión `@import`. Los archivos partials tienen la nomenclatura de `_nombre.scss`. De esta manera podemos tener la estructura básica de un proyecto para nuestros estilos.

## Anidamiento de elementos

Puede que tengamos que estilizar elementos que estan dentro de otros elementos, como es el caso de este ejemplo:

```js
<ul>
    <li><a href="#">Google</a></li>
    <li><a href="#">Facebook</a></li>
    <li><a href="#">Github</a></li>
</ul>
```

Una opción para dar estilos es la siguiente:

```css
ul {
    list-style: none;
}

ul li {
    display: inline-block;
    padding: 10px;
    margin: 0 10px;
    border: 1px solid #000;
    background-color: $dark;
}

ul li a {
    text-decoration: none;
    font-size: 2rem;
    color: $white;
}
```

Pero SASS nos permite anidar los elementos dejando más practicidad, obteniendo un código como el siguiente:

```scss
ul {
    list-style: none;
    
    li {
        display: inline-block;
        padding: 10px;
        margin: 0 10px;
        border: 1px solid #000;
        background-color: $dark;
        
        a {
            text-decoration: none;
            font-size: 2rem;
            color: $white;
        }
    }
}
```

## Pseudoclases y Pseudoelementos

Podemos pasar de esto:

```css
ul li:hover {
    background-color: #111;
}
```

A tener de manera más compacta lo siguiente:

```scss
ul {
    ...
    
    li {
        ...
        
        &:hover {
            background-color: #111;
        }

        a {
            ...
        }
    }
}
```

## Darken y Lighten

Podemos establecer un color base y luego en otros elemento asociado, oscurecer o aclarar el valor del color de dicha variable, esto lo logramos con:

Para oscurecer cierto porcentaje:

```scss
...: darken($color: color, $amount: cantidad);
```

Para aclarar cierto porcentaje:

```scss
...: lighten($color: color, $amount: cantidad);      
```

## Modularidad en Componentes

Podemos simular los estilos de Bootstrap para los botones anidando y compartiendo los elementos:

```js
<button className="btn btn-outline-primary">Sumar 1</button>
```

```scss
.btn {
    background-color: $white;
    color: $dark;
    font-size: 1rem;
    border: solid 1px $dark;
    border-radius: 2rem;
    padding: 5px 10px;

    &.btn-outline-primary {
        border-color: $primary;
        
        &:hover {
            background-color: $primary;
            color: $white;
        }
    }
}
```
