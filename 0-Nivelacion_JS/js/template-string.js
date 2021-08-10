const name = "David";
const age = new Date().getFullYear() - 2001;

console.log("Hola " + name + ", tu edad es de: " + age);

console.log("Hola", name, "tu edad es de:", age);


const men = `Hola ${name}, tu edad es de ${age}`.toUpperCase();
console.log(men);
document.write(men + "<br>");
