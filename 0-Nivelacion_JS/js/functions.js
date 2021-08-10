//? Forma 1 de crear una función
function sumar1(a, b) {
    document.write(a + b + "<br>");
}
sumar1(1, 4);


//? Forma 2 de crear una función
function sumar2(a, b) {
    return a + b;
}
const resultado2 = sumar2(1, 3);
document.write(resultado2 + "<br>");


//? Forma 3 de crear una función
const sumar3 = (a, b) => a + b;
const resultado3 = sumar3(5, 8);
document.write(resultado3 + "<br>");