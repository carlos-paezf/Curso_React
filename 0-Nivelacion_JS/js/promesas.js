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