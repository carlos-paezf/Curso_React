# Sección 11: Despliegue

Recordar que para poder montar nuestra aplicación en un servidor, debemos usar el comando `yarn build`.

GitHub Pages tienen inconvenientes con desplegar PWA, por lo tanto debemos disponer de nuevos dominios. Podemos conseguir un dominio gratuito a través de servicios de alojamiento como ***Netlify***.

En esta plataforma de Hosting gratuito, debemos registrarnos y ya podemos comenzar a hacer despliegues. Para desplegar nuestra aplicación, subimos la carpeta que se genera luego de construir la aplicación con el comando de arriba, y esperamos a que la url que se nos brinda, este disponible.

Al tener una PWA, podemos almacenar datos en cache, permitiendo un trabajo más ligero al servidor, y la disponibilidad de tener los archivos que se almacenan en el cache en modo Offline.

Podemos cambiar los iconos de nuestra aplicación o colores, desde el manifest.json de nuestra aplicación.

## Actualizar nuestra versión desplegada en Netlify

En caso de que hallamos modificado nuestra aplicación, podemos construir de nuevo nuestra versión de despliegue y actualizarla, nos dirigimos a la pestaña de ***Deploys*** en Netlify, dentro de nuestro proyecto, y subimos nuestra versión actualizada de la aplicación.
