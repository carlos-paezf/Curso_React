# Sección 2: Nivelación: JavaScript para principiantes

Por medio de la extensión *Live Server*, podemos tener una nueva pestaña en navegador, para observar los cambios que realizamos en nuestro archivo. La dirección base en la que se lanza (si el puerto no está ocupado), es la siguiente: `http://127.0.0.1:5500/` o lo que es igual a `http://localhost:5500/`. Cada que haya un cambio en nuestro archivo, gracias a Live Server, se hará un hot reload.

## var, let, const

- `var`: Cualquier variable o función que se declara como var, es procesada antes que cualquier otro código ejecutado, lo cual se presta para generar fallas en la seguridad del programa.
- `let`: Permite crear variables mutables, las cuales en cualquier punto del programa se puede cambiar, pero no es declara desde el punto de partida de la ejecución.
- `const`: Tiene la habilidad de hacer que su contenido sea inmutable.

## FatArrow Functions

Las funciones pueden ser declaradas de diversas formas:

- Forma 1:
  
  ```js
  function sumar1(a, b) {
    document.write(a + b + "<br>");
  }
  sumar1(1, 4);
  ```

- Forma 2:
  
  ```js
  function sumar2(a, b) {
    return a + b;
  }
  const resultado2 = sumar2(1, 3);
  document.write(resultado2 + "<br>");
  ```

Pero existe una forma que permite más seguridad en el momento de ejecución de nuestro archivo, y son las funciones FatArrow, las cuales al unir con `const` permiten que su valor no se cambie.

- Forma 3:
  
  ```js
  const sumar3 = (a, b) => a + b;
  const resultado3 = sumar3(5, 8);
  document.write(resultado3 + "<br>");
  ```

## Operador Ternario

El condicional if en su forma común se puede escribir de la siguiente manera:

```js
if (condición) return acciónParaVerdad;
else return acciónParaFalso;
```

Pero existe una forma más corta para operaciones más cortas, el operador ternario. Y su estructura sería la siguiente:

```js
const variable = condición ? acciónParaVerdad : acciónParaFalso;
```

En caso de no querer hacer nada cuando la condición sea falsa, podemos usar otra manera: (común vs segura)

```js
if (condición) return acciónParaVerdad;
```

```js
const variable = condición && acciónParaVerdad;
```

## JSON (JavaScript Object Notation)

JSON es un formato ligero de intercambio de objetos, el cual es ideal para usar en API REST o en AJAX. Podemos definir un objeto, y añadirle características, para luego acceder a ellas con la estructura `objeto.valor`.

```js
const Usuario = {
    name: 'David',
    age: 20,
    email: 'mail.com'
}
document.write(Usuario.name);
```

### Object Destructuring

En caso de tener muchas propiedades, tenemos la opción de poder traer las propiedades que nosotros necesitamos, teniendo un código más limpio, al evitar escribir el objeto dueño de las propiedades.

```js
const { nombre, edad, barrio} = {
    nombre: "David Ferrer",
    apodo: "Ferrer",
    edad: 20,
    email: "mail.com",
    barrio: "localidad"
}
document.write(nombre);
document.write(edad);
document.write(barrio);
```

## Function Map

Cuando tenemos un arreglo, podemos recorrerlo mediante un ciclo `for`, pero puede llegar a ser muy complicado de ver dentro del código. Pero hay métodos que nos permite simplificar y tener un código más limpio.

Con el ciclo for:

```js
for (i = 0; i < numeros.length; i++) {
    document.write(numeros[i]);
}
```

Con la función .map():

```js
numeros.map((numero) => document.write(numero));
```

## Array Destructuring

Para poder extraer los elementos del array, se debe tener en cuenta su indice, es decir, en la aplicación del destructuring, se debe nombrar cada elemento para luego poder usarlo.

Array normal:

```js
const clientes = ["Pepe", "Lucia", "Pedro", "Maria", "Juan", "Felipe"];
```

Array con destructuring:

```js
const [client1, , client3] = ["Pepe", "Lucia", "Pedro", "Maria", "Juan", "Felipe"];
```

Las comas se usan para no gastar memoria, y lograr obtener el indice correcto.

## Operador Spread

Este operador nos permite hacer una copia de un array, para luego ser utilizado dentro de otro. Por ejemplo, tenemos 2 array, pero queremos convertirlos en 1, en ese caso podemos tener un nuevo array que los contenga juntos, uno después del otro.

```js
const frutas = ["manzanas", "uva", "melón"];
const citricos = ["naranja", "toronja", "limón"];

const nuevo = [...frutas, ...citricos]
```

Por medio del operador Spread (`...`) pudimos tener 1 solo array donde se almacenan las copias de los otros.

## Template String

Existen diversas maneras de hacer uso de las variables dentro de los mensaje de texto, algunos de ellos son:

```js
console.log("Hola " + name + ", tu edad es de: " + age);

console.log("Hola", name, "tu edad es de:", age);
```

Pero la forma más segura y practica, es haciendo uso de backticks ` `` `:

```js
const men = `Hola ${name}, tu edad es de ${age}`.toUpperCase();
console.log(men);
```

## Intervalos

Los intervalos son muy poco usados, pero son buenos para practicar el tema de tiempo de respuesta de un servidor o servicio. Para ello hacemos uso de `setInterval()`, en donde su primer parámetro es lo que queremos repetir, y el segundo es el tiempo entre uno y otro, contado en milisegundos.

```js
setInterval(saludo, 2000);
```

En caso de llamar a la función a repetir con sus paréntesis, entonces el intervalo solo se efectuará una vez.

```js
setInterval(saludo(), 2000);
```

## TimeOut

La función de `setTimeout()`, nos permite hacer cualquier actividad luego de cierto tiempo de ejecución. Su primer parámetro es la acción a realizar por única vez, y la segunda es el tiempo en milisegundos.

```js
setTimeout(evaluar, 2000);
```

## Promesas

Las promesas permiten retornar algo en caso de que sea algo bueno o algo malo. El función en parámetro `reject()` retorna o muestra lo que queremos devolver en caso que falle, y la función en parámetros `resolve()` ejecuta lo que queremos pasar en un uso correcto.

Para mostrar los resultados, es importante hacer uso del `.then()`, y del `.catch()`, los cuales en ese orden ejecutan lo que sea correcto, o los errores que se muestren. Ejemplo:

```js
const sumar = (a, b) => new Promise((resolve, reject) =>{
    if (a < 0 || b < 0){
        reject("Aún no sumo negativos")
    } else {
        resolve(a + b);
    }
})

const resultLog = sumar(-1, 2)
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
const resultDocument = sumar(-1, 2)
    .then((res) => document.write(res))
    .catch((error) => document.write(error));
```

## Fetch API con Promise

Para este ejemplo, hacemos uso de la infraestructura REST por medio de una API llamada [{JSON} Placeholder](https://jsonplaceholder.typicode.com/). Podemos observar como `fetch()` devuelve promesas, a las cuales podemos concatenar más promesas.

En este caso, llamamos solo un elemento al cual le pedimos que la respuesta sea en formato json y posteriormente la imprimimos en consola.

```js
fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then((response) => response.json())
    .then((data) => {console.log(data)})
```

## Axios con Promesas

Para no tener que instalar Axios por npm, podemos acceder a él usando un enlace CDN, en este caso haré uso de unpkg CDN pegándolo debajo de las etiquetas `<title></title>`:

```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

Su uso es similar a `fetch()`, pero en este caso, haremos uso del destructuring para acceder a un elemento especifico de la data.

```js
axios.get("https://jsonplaceholder.typicode.com/todos/1")
    .then(({ data }) => console.log(data.title))
```

## Async y Await

Podemos convertir las promesas en funciones async, la cual mantiene la promesa. Async permite que la ejecución este en espera hasta que se de una respuesta.

```js
const saludoPromesa = () => 
  new Promise((resolve, reject) => 
    resolve("Hola mundo con una Promesa clásica <br>"));

const saludoAsync = async () => 
  "Hola mundo con Async <br>";
```

### Fetch con Async y Await

Podemos hacer las peticiones a un servidor, y por medio de Async la dejamos como una promesa pendiente, la cual podemos usar al hacer uso de Await. De esa manera nos ahorramos el uso continuo de `.then()` y podemos manipular la data a nuestra conveniencia.

```js
const peticionFetch = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await response.json();
    return data;
}
const data = await peticion().then(console.log);
```

### Axios con Async y Await

Pasa lo mismo con Axios, podemos hacerlo como promesa pendiente por medio de async y detener la espera con el await.

```js
const peticionAxios = async () => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos/3');
    return data;
}
const respuesta = peticionAxios().then(console.log);
```

