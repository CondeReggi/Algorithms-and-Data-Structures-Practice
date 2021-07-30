let patron = "";

function mostrar(array){
    array.forEach(element => {
        console.log(element);
    });
}

//MODULO DE BUCLES

//Cuadrado lleno

for (let index = 0; index < 5; index++) {
    for (let index2 = 0; index2 < 5; index2++) {
        patron += "*";
    }
    patron += `<br>`;
}

//Cuadrado hueco

for (let index = 0; index < 5; index++) {
    for (let index2 = 0; index2 < 5; index2++) {
        if (index === 0 || index === 4){
            patron += "*";
        }else{
            if(index2 === 0 || index2 === 4){
                patron += "*";
            }else{
                patron += `0`; //Pongo el 0 porque " " no lo reconoce como el espacio completo
            }
        }
    }
    patron += `<br>`;
}

//Tablero de Ajedrez:

for (let index = 0; index < 8; index++) {
    for (let index2 = 0; index2 < 16; index2++) {
        if (index % 2 != 0){
            if (index2 % 2 != 0) patron += "0"
            else patron += "*";
        }else{
            if (index2 % 2 === 0) patron += "0"
            else patron += "*";
        }
    }
    patron += `<br>`;
}

//Piramide Izquierda

for (let index = 0; index < 5; index++) {
    for (let index2 = 0; index2 < index + 1; index2++) {
        patron += "*";
    }
    patron += `<br>`;
}

//Pirámide centrada

for (let index = 0; index < 5; index++) {
    for (let index2 = 0; index2 < (2*index + 1); index2++) {
        patron += "*";
    }
    patron += `<br>`;
}

//Pirámide invertida

altura = 5;

for (let index = 0; index < altura; index++) {
    for (let index2 = index; index2 < ((2*altura - index) - 1); index2++) {
        patron += "*";
    }
    patron += `<br>`;
}

//Me costo una barbaridad

altura = 5;

for (let index = 0; index < (2 * altura); index++) {

    if(index < altura){
        for (let index2 = 0; index2 < (2*index + 1); index2++) {
            patron += "*";
        }
    }else{
        //alert(index);
        for (let index2 = 0; index2 < ((2*altura - 2*(index - altura)) - 3); index2++) {
            patron += "*";
        }
    }
    patron += `<br>`;
}

document.write(patron);

//MODULO DE FUNCIONES

//Crear una función que reciba un valor cualquiera y lo muestre ocupando console.log(), llamar a la función pasando el valor 5

function mostrar_numero_pasado(a){
    console.log(a);
}
mostrar_numero_pasado(5);

//La siguiente función devuelve undefined en lugar de la multiplicación, se pide arreglarla

function multiply(a, b){
    return a * b;
}

console.log(multiply(5,5));

//Crear una función que reciba dos valores y devuelva la suma de ellos.

function sumar_numeros(a, b){
    return a + b;
}

//Crear una función que reciba un número entero y muestre un error si el tipo de dato pasado es de otro tipo.

recibo_entero = (numero) => {
    if (Number.isInteger(numero)){
        if(numero <= 0){
            return "Error garrafal";
        }else{
            return "muy bien, tu numero es valido";
        }
    }
}

//Crear una función autoejecutable que muestre "muuu" en pantalla

(function (){
    this.console.log("Muuuu");
})(); //Siempre se ultiliza ;

/*
Dado el array = [1,2,3,4,5,6]

- Iterar por todos los elementos dentro de un array utilizando while y mostrarlos en pantalla.

- Iterar por todos los elementos dentro de un array utilizando for y mostrarlos en pantalla.

- Iterar por todos los elementos dentro de un array utilizando .forEach y mostrarlos en pantalla.

- Mostrar todos los elementos dentro de un array sumándole uno a cada uno.

- Generar una copia de un array pero con todos los elementos incrementado en 1.

- Calcular el promedio
*/

array = [1,2,3,4,5,6];

let sum = array.reduce((previous, current) => current += previous);

let avg = sum/array.length;

console.log(avg);

i = 0;
while(i < array.length){
    console.log(array[i]);
    i++;
}

for (let i = 0; i < array.length; i++) console.log(array[i]);    

array.forEach(element => {
    console.log(element);
});

for (let i = 0; i < array.length; i++) console.log(array[i] + 1);    

ArrayAux = [];

ArrayAux = array.slice(); //con esto hacemos una copia identica

for (let i = 0; i < array.length; i++) ArrayAux[i] = (array[i] + 1);
//Para mostrarlo y asegurar => for (let i = 0; i < ArrayAux.length; i++) console.log("Nuevo array:" + ArrayAux[i]);    

//Crear un array vacío, luego generar 20 números al azar y guardarlos en un array.

arr = [];

for (let i = 0; i < 20; i++) {
    arr[i] = parseInt(Math.random()*100); 
}

//Crear un array vacío, luego generar N números al azar y guardarlos en un array, N es introducido por el usuario a través de un prompt.

const N = prompt("ingresa un numero:");

for (let i = 0; i < parseInt(N); i++) arr[i] = parseInt(Math.random()*100); 

//Dado un array que contiene ["azul", "amarillo", "rojo", "verde", "café", "rosa"] determinar si un color introducido por el usuario a través de un prompt se encuentra dentro del array o no.

arr = ["azul", "amarillo", "rojo", "verde", "café", "rosa"];
let variable = prompt("ingrese color:");
let encontrado = arr.find(element => element === variable);

encontrado ? console.log("esta") : console.log("no esta"); 

//STRINGS Y ARRAYS
//El usuario ingrese un string con varias palabras separadas por coma en un popup y se deben convertir en un array, (el usuario ingresa: "1,2,3,4,5" y se convierte en [1,2,3,4,5])

cadena = "Hola, mi, nombre, es, lucas, conde, reggi, y, estoy, aprendiendo, javascript"
arr = cadena.split(",");

//Unión, intersección y conteo
//Existen dos arrays, cada uno con 5 palabras, generar un nuevo array con la intersección de ambos elementos. (Ejemplo: [1,2,3] unión [1,2,4] = [1,2]

arr1 = ["lucas","conde","reggi","daguer","de leon"];
arr2 = ["batman","conde","albert","pepe","de leon"];

ArrayAuxiliar = [];

ArrayAuxiliar = arr1.slice();

arr2.forEach(elemento => {
    if( !(ArrayAuxiliar.find(elem => elem === elemento)) ){
        ArrayAuxiliar.push(elemento);
    }
})

//Existen dos arrays, cada uno con 5 palabras, generar un nuevo array con la unión de ambos elementos, (Ejemplo: [1,2,3] unión [1,2,4] = [1,1,2,2,3,4]

ArrayAuxiliar2 = arr1.concat(arr2).slice();

//El usuario ingresa dos conjuntos de números separados por coma, el programa debe determinar si ambos conjuntos tienen la misma cantidad de números

cadena1 = "1,2,3,5,2";
cadena2 = "3,1,6,3,5";

(cadena1.split(",").length === cadena2.split(",").length) ? console.log("si") : console.log("no")

//El usuario ingresa dos conjuntos de números separados por coma, si ambos conjuntos tienen la misma cantidad de elementos mostrar un arreglo que contenga la suma de cada elemento. (Ejemplo: [1,2,3] + [2,3,4] = [3,5,7])

if(cadena1.split(",").length === cadena2.split(",").length){
    ArrayAux = [];
    for (let i = 0; i < cadena1.split(",").length; i++) {
        ArrayAux[i] = (parseInt(cadena1.split(",")[i]) + parseInt(cadena2.split(",")[i]));       
    }  
    mostrar(ArrayAux);
}else{
    console.log("no se puede, no son iguales");
}

//Filtrando datos en arreglo

//Crear una función que reciba un arreglo con números y devuelva un nuevo arreglo con solo los números pares, hint: utilizar reduce()

arr = [1,2,3,5,2,48];
ArrayAux = [];

ArrayAux = arr.reduce(function(arr, issue){
    if (issue % 2 === 0){
        ArrayAux.push(issue);
    }
    return ArrayAux
}, [] );

mostrar(ArrayAux) //No se pero funciona

//Crear una función que reciba un arreglo con palabras, crear un nuevo arreglo que contenga solo las palabras que empiezan con una vocal.

arr2 = ["batman","conde","albert","pepe","de leon"];

function contenido_solo_vocal(arr){
    ArrayAux = [];
    arr.forEach(element => {
        if (["a","e","i","o","u"].find(elem => elem === element[0])){
            ArrayAux.push(element);
        }
    })
    return ArrayAux;
}

mostrar(contenido_solo_vocal(arr2));

//Crear un método que permite intercambiar las posiciones de dos elementos de un arreglo en base a sus índices ej:

function intercambiar(indice1, indice2, arr){
    let auxiliar = arr[indice1];
    arr[indice1] = arr[indice2];
    arr[indice2] = auxiliar;
}

//Realizar el mismo ejercicio anterior pero que en esta ocasión devuelva un arreglo nuevo con los datos cambiados.

arr1 = ["lucas","conde","reggi","daguer","de leon"];

function intercambiar(indice1, indice2, arr){
    ArrayAux = arr.slice(); //me creo la copia

    let auxiliar = ArrayAux[indice1];
    ArrayAux[indice1] = ArrayAux[indice2];
    ArrayAux[indice2] = auxiliar;

    return ArrayAux;
}

console.log(arr1);
console.log(intercambiar(0,2,arr1));

//Crear una función que reciba un arreglo y que cree uno nuevo con todos los elementos ordenados de menor a mayor, (sin ocupar el método .sort)

arr = [1,2,3,5,2,48];

function comparar ( a, b ){ return a - b; }

function ordenar_menor_mayor(arr){
    return arr.sort(comparar);
}

console.log(ordenar_menor_mayor(arr)); //Funca

//Arreglos de arreglos
//Crear una función que permite aplanar un arreglo dado, Ejemplo:

var arr = [[1,2,3],[4,5,6],[7,8,9]];

function aplanar(arr){
    ArrayAux = [];
    arr.forEach(element => {
        element.forEach(elem => {
            ArrayAux.push(elem);
        })
    })
    return ArrayAux;
}

console.log(aplanar(arr)); // [1,2,3,4,5,6,7,8,9]

//Crear una función que divida un arreglo en dos partes con la misma cantidad de elementos (o una diferencia de máximo un elemento) y devuelva un arreglo que contenga al grupo1 y al grupo2

arr = [[1,2,3],[5,2,48,75]];

function separar_a_la_mitad(arr){
    ArrayAux = new Array();
    ArrayAux[0] = new Array();
    ArrayAux[1] = new Array();

    for (let i = 0; i < arr.length; i++) {
        if(i < (arr.length / 2)){
            ArrayAux[0].push(arr[i]);
        }else{
            ArrayAux[1].push(arr[i]);
        }
    }
    return ArrayAux;
}

console.log(separar_a_la_mitad(arr));

//Recorrer un arreglo de arreglos para mostrarlo como una matriz, ejemplo [[1,1],[2,2]] se mostraría de la siguiente forma:

function mostrar_matriz(arr){
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            patron += `[${arr[i][j]}]`;
        }
        patron += "<br>";
    }
    document.write(patron);
}

//mostrar_matriz(arr);


//Sumar [[1,1],[2,2]] con [[3,1],[3,2]].

Matriz1 = [[1,1],[2,2]]; 
Matriz2 = [[3,1],[3,2]];

function sumar_matrices(Matriz1, Matriz2){
    Matriz_Resultante = [];
    for (let u = 0; u < Matriz1.length; u++) {
        Matriz_Resultante[u] = new Array();
    }
    for (let i = 0; i < Matriz1.length; i++) {
        for (let j = 0; j < Matriz1[i].length; j++) {
            Matriz_Resultante[i].push( Matriz1[i][j] + Matriz2[i][j]);
        }
    }
    return Matriz_Resultante;
}

mostrar_matriz(sumar_matrices(Matriz1,Matriz2));

//Contar la cantidad de elementos dentro de una matriz.
function contar_elementos_matriz(arr){
    //Las matrices son cuadradas o rectangulares, entonces la cantidad de elementos en ella, son la multiplicacion de el largo y el ancho
    let ancho = arr.length;
    let alto = 0;
    arr.forEach(elemento => {
        if (elemento.length > alto) alto = elemento.length;
    })
    return ancho*alto;
}

arr = [[1,2,3],[4,5,6]];

function multiplicar_escalar(arr, escalar){
    arr.forEach(element => {
        console.log(element);
        for (let i = 0; i < element.length; i++) {
            element[i] = element[i]*escalar;
        }
    })
    return arr;
}

mostrar_matriz(multiplicar_escalar(arr, 5));

function encontrar_numero_mayor(arr){
    let mayor = arr[0][0];
    arr.forEach(elemento => {
        for (let i = 0; i < elemento.length; i++) {
            if(elemento[i] > mayor) mayor = elemento[i];
        }
    })
    return mayor;
}

console.log(encontrar_numero_mayor(arr)); 

function encontrar_en_matriz(arr, encontrar){
    booleano = false;
    arr.forEach(elemento => {
        for (let i = 0; i < elemento.length; i++) {
            if(elemento[i] === encontrar) booleano = true;
        }
    })
    return booleano;
}

//Devolver la suma de todos los elementos en la diagonal de la matriz

arraiii = [[1,2,3],[4,5,6],[4,5,7]];

function sumar_diagonal(arr){
    suma = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (i === j) suma += (arr[i][j]);
        }
    }
    return suma;
}

console.log("Suma : "+ sumar_diagonal(arraiii));

//Mostrar la transpuesta de una matriz, o sea dado:

function mostrar_matriz(arr){
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            patron += `[${arr[i][j]}]`;
        }
        patron += "<br>";
    }
    document.write(patron);
}

arraiii = [[1,2,3],[4,5,6],[4,5,7]];

function trasponer_matriz(mat) { 
    for (var i = 0; i < mat.length; i++) { 
        for (var j = 0; j < i; j++) { 
            const tmp = mat[i][j]; 
            mat[i][j] = mat[j][i]; 
            mat[j][i] = tmp; 
        } 
    } 
    return mat;
}

mostrar_matriz(trasponer_matriz(arraiii));

//Funciones y arreglos
//Crear una función que reciba un arreglo como parámetro y devuelva una copia del arreglo.

function copia_del_arreglo(arr){
    return arr.slice();
}

console.log(copia_del_arreglo(arraiii));
//Crear una función que devuelva el promedio de un arreglo, en caso de que el arreglo esté vacío debe devolver cero.

function avg(arr){
    if (arr.length === 0){
        return 0;
    }else{
        let sum = arr.reduce((previous, current) => current += previous);
        let avg = sum/arr.length;
        return avg;
    }
}

//Objetos
class persona{
    constructor(nombre, edad){
        this.nombre = nombre;
        this.edad = edad;
    }
    mayor_edad(){
        return (this.edad >= 18);
    }
}

array_personas = new Array(persona);
