const numeros = [1, 1, 2, 3, 5, 8];
document.write(numeros + "<br>");


document.write("<ul>");
for (i = 0; i < numeros.length; i++) {
    document.write("<li>" + numeros[i] + "</li>");
}
document.write("</ul>");


document.write("<ul>");
numeros.map((numero) => document.write("<li>" + numero + "</li>"));
document.write("</ul>");


const clientes = ["Pepe", "Lucia", "Pedro", "Maria", "Juan", "Felipe"];
clientes.map((cliente) => document.write(cliente + "<br>"));

const [client1, , client3] = ["Pepe", "Lucia", "Pedro", "Maria", "Juan", "Felipe"];
document.write(client1);
document.write(client3 + "<br>");
