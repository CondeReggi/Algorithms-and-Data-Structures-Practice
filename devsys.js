const tresArrays = ( arr1 , arr2 , arr3 ) => {
    let copyArr2 = arr2.slice(0, arr2.length);

    arr2 = arr1;
    arr3 = arr1.reverse();

    return {
        arr1,
        arr2, 
        arr3
    }
}

const contarElementos = ( arrA , arrB ) => {
    let contador = 0;
    for (let i = 0; i < arrB.length; i++) {
        if ( arrA.includes( arrB[i] ) ){
            contador++;
        }
    }

    return contador
}

//Se utilizaria una tabla de hash, ya que tiene O(1) en promedio

//Una tabla de hashe s una matriz donde cada elemento tiene asignado un numero (dada por una funcion de hashing) y dependiendo de ese valor lo manda a un espacio en memoria

class nodo {
    constructor( valor,  valor_siguiente ){
        this.valor =  valor;
        this.valor_siguiente = valor_siguiente; 
    }
}

class TCadena {
    constructor( nodo, tope ){
        this.nodo = nodo;
        this.tope = tope;
    }
}

class mapping{
    constructor( cadena, tope, cantidad ){
        this.cadena = cadena;
        this.tope = tope;
        this.cantidad = cantidad;
    }
};


const intercambiarDatos = ( a , b ) => {
    a = a + b; // a = 2 y b = 3 => a = 5
    b = a - b; // a = 5 y b = 3 => a = 2

    a = a - b; //b = 5 - 2 


    return {
        a,
        b
    }
}

const indiceDeElemento = ( arr , num ) => {
    let i = 0;
    while (num != arr[i] && i < arr.length - 1 ) {
        console.log("entre")
        if ( num === arr[i] ) {
            break;
        }
        i++;
    }
    return i;
}
