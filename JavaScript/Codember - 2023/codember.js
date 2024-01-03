//cat CHALLENGE_01.txt

function CHALLENGE_01(str){
    const arr = str.split(" ").map(x => x.toLowerCase());
    const obj = {}
    
    for(let palabra of arr){
        if(obj[palabra]) obj[palabra]++;
        else obj[palabra] = 1
    }
    
    return Object.entries(obj).reduce((acc, res) => acc + res[0] + res[1], "");
}

//cat CHALLENGE_02.txt

function a(str){
    const arr = str.split("");
    let suma = 0;
    let result = ""
    for(let palabra of arr){
        switch(palabra){
            case "#":
                suma++;
                break;
            case "@":
                suma--;
                break;
            case "*":
                suma *= suma;
                break;
            case "&":
                result += suma;
                break;
        }
    }
    return result;
}

//cat CHALLENGE_03.txt
function CHALLENGE_03(cadenas) {
    const esValido = (string) => {
        const separate = string.split(":").map(x => x.trim());
        const [rango, letra] = separate[0].split(" ");
        const palabra = separate[1].split("");
        const [inicio, final] = rango.split("-").map(Number);
        
        const map = {}
        
        for(let letras of palabra){
            if(map[letras]) letras++;
            map[letras] = 1;
        }
        
        return { valor: map[letra] >= inicio && map[letra] <= final, resultado: separate[1] };
    } 

    let palabras = cadenas.split("\n");
    let cantidad = 0;
    for(let palabra of palabras){
        const {valor, resultado} = esValido(palabra);
        if(!valor) cantidad++;
        if(!valor && cantidad == 42) return resultado;
    }
    return cantidad;
}

//cat CHALLENGE_04.txt


