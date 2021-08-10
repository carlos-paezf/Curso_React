var Pelota = {
    color: "rojo",
    tam: 3,
    rebota: false,
    setBotar: function () {
        this.rebota = true;
    },
};
console.log(Pelota);
document.write(Pelota.rebota + "<br>");


const Usuario = {
    name: 'David',
    age: 20,
    email: 'mail.com'
}
document.write(Usuario.name + "<br>");


const { nombre, edad, barrio} = {
    nombre: "David Ferrer",
    apodo: "Ferrer",
    edad: 20,
    email: "mail.com",
    barrio: "localidad"
}
document.write(nombre + "<br>");
document.write(edad + "<br>");
document.write(barrio + "<br>");
