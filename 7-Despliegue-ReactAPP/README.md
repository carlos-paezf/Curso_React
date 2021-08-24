# Sección 9: Despliegue - React App

Para esta sección hago uso de la aplicación creada en la sección anterior.

> La carpeta `build` del proyecto de ejemplo no ha sido subida al repositorio por cuestiones de que se ha decidido ignorar en el archivo de .gitignore

## Bundle de Producción

Es una versión ya empaquetada de nuestra aplicación para poder publicar. Para ello ingresamos el siguiente comando dentro del directorio que contiene el proyecto: `yarn build`.

El anterior proceso genera una carpeta llamada `/build`, en la que se encuentran los archivos para poder desplegar.

## Desplegar en GithubPages

Creamos un repositorio para publicar nuestro proyecto y subimos los archivos que están dentro de la carpeta `build`, o una segunda opción es poder subir la carpeta, pero con el nombre de `docs`. Dentro del repositorio, podemos ir a la pestaña de *Settings*, en la sección de *Pages* y allí seleccionamos la rama a desplegar.

Si subimos solo los archivos de la carpeta `build`, podemos darle al botón de guardar. Pero, si subimos la carpeta `docs`, debemos desplegar el símbolo de la carpeta raíz para seleccionar nuestra carpeta, y luego si guardamos.

Cuando ya sea publicada la aplicación, podemos acceder al enlace que nos muestra Github.

## Solucionando Rutas

Cuando abrimos el enlace que nos entrega Github, la aplicación no carga, y podemos ver en consola que hay conflicto con algunos recursos que están con un code 404.

En el archivo `index.html` que se encuentra en la carpeta de `build` o `docs`, podemos observar que hay enlaces que empieza con `/`, lo cual en sistemas UNIX representa el directorio `root`, entonces es como si accediéramos a la raíz del servidor.

La forma de solucionar el error es simplemente cambiando de `/` a `./`. El punto antes de la barra inclinada indica que solo se debe buscar desde la carpeta actual y no desde la base.
