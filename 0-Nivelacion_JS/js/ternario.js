const cuenta = 10;

//? Forma común
let mensaje;
if (cuenta < 0) mensaje = "Sin saldo";
else mensaje = "Tienes saldo";
document.write(mensaje + "<br>");


//? Con el ternario
const ternario =
    cuenta < 0 ? "No tienes saldo según ternario" : "Tienes saldo según ternario";
document.write(ternario + "<br>");


//? Comparar solo verdad:
//* Común
if (cuenta < 20) mensaje = "Estas por debajo de los 20 pesos";
document.write(mensaje + "<br>");

//* Segura
const condicional = cuenta < 20 && "Tienes menos de 20 pesos";
document.write(condicional + "<br>");
