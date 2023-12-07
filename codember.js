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

