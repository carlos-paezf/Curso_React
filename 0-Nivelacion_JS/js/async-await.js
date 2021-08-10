const saludoPromesa = () => 
    new Promise((resolve, reject) => 
        resolve("Hola mundo con una Promesa clásica <br>"));
saludoPromesa().then((response) => document.write(response));


const saludoAsync = async () => 
    "Hola mundo con Async <br>";
saludoAsync().then((response) => document.write(response));


const peticion = async () => 
    setTimeout(() => {
        const datos = {
            id: 3,
            name: "David Ferrer",
            username: "DavidFerrer",
        };
        console.log(datos);
    }, 2000);
peticion().then(console.log);