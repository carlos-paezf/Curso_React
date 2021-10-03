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
