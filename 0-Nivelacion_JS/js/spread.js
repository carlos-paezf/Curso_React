const frutas = ["manzanas", "uva", "melón"];
const citricos = ["naranja", "toronja", "limón"];
document.write(frutas + "<br>");
document.write(citricos + "<br>");

const nuevo = [...frutas, ...citricos]
document.write(nuevo + "<br>");
