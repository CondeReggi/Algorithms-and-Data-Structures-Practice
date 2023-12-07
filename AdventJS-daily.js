//DIA 1
function findFirstRepeated(gifts) {
  let min = Number.MAX_SAFE_INTEGER;
  for(let i = 0; i < gifts.length; i++){
    const first = gifts.indexOf(gifts[i]);
    const last = gifts.lastIndexOf(gifts[i]);
    if(first != last){
      min = last < min ? last : min;
    }
  }
  return min == Number.MAX_SAFE_INTEGER ? -1 : gifts[min];
}

//DIA 2
function manufacture(gifts, materials) {
  return gifts
    .filter(x => 
      x.split("")
      .every(y => materials.includes(y)))
}

//DIA 3
function findNaughtyStep(original, modified) {
  if(original.length == modified.length) return ""
  const obj = {}

  let chico = original.length < modified.length ? original : modified;
  let largo = original.length < modified.length ? modified : original;

  for(let i = 0; i < largo.length; i++){
    if(largo[i] != chico[i]) return largo[i];
  }

  return ""
}

//DIA 4
function decode(message) {
  while(message.indexOf(")") != -1){
    let firstIndex = message.lastIndexOf("(");
    let lastIndex = message.indexOf(")", firstIndex);
  
    if (firstIndex !== -1 && lastIndex !== -1) {
      let substring = message.substring(firstIndex + 1, lastIndex);

      message = message.slice(0, firstIndex) 
        + substring.split("").reverse().join("") 
        + message.slice(lastIndex + 1);
    }
  }

  return message;
}

//DIA 5
function cyberReindeer(road, time) {
    const result = []
    const ponerS = (str = [], index) => {
        return str.slice(0, index).join("") + "S" + str.slice(index + 1).join("")
    }
    const validatePipe = (a, obj = [], index) => {
        const array = a.split("");
        console.log({a, obj, index})
        for(let i = 0; i < array.length; i++){
            if(index > 4 && obj.includes(i) && array[i] !== 'S'){
                array[i] = "*";
            }
        }
        const result = array.join("");
        return index > 4 ? result.replaceAll("|","*") : result;
    }
    const esBarra = {}
    let j = 0;
    for(let i = 0; i < time; i++){
        if(road[j] == "|"){
            esBarra[j] = i;
            if(i <= 4){
                result.push(road);
            }else{
                road = road.replace("S",".")
                road = road
                  .split("")
                  .map((x, index) => {
                    if(index == j) return "S" 
                    return x;
                  })
                  .join("");
                 
                j++;
                result.push(road);
            }
        }else{
            road = road.replace("S",".").split("").map((x, index) => {
              if(index == j) return "S"
              return x;
            }).join("");
    
            result.push(road);
            j++;
        }
    }
    const resultado = result
        .map((x, i) => validatePipe(x, Object.entries(esBarra).map(x => Number(x[0])), i));
    return resultado;
}

//DIA 6
function maxDistance(movements) {
  let int = 0;
  return Math.abs(movements.split("").reduce((acc, res) => {
    switch(res){
      case '*':
        int++;
        break;
      case '>':
        acc += 1;
        break;
      case '<':
        acc -= 1;
        break;
    }
    return acc;
  }, 0)) +int;
}

//DIA 7
function drawGift(size, symbol) {
  const n = 2 * size - 1;
  let array = []
  for(let i = 0; i <= size - 1; i++){
      let str = "";
      if(i == 0) array.push("".padStart(size, "#"))
      else
      {
        for(let j = 0; j < n; j++){
            if(j == 0 || i == j || j == size + i - 1) str += "#"
            else if(i == size - 1) {
                if(j > size - 1) str += "#"
                else str += symbol
            }
            else if(j < size + i) str += symbol
        }
        array.push(str);
      }
  }
  array = array.map(x => x.padEnd(n, " "));
  const copiaSuperior = array.slice(0, size - 1)
    .map(x => x.split("").reverse().join("").trimEnd())
    .reverse()
    .map((x, index) => {
        const array = x.split("");
        array[size-1] = "#";
        
        if(index < size - 2){
            for(let i = size; i < n - 1; i++){
                if(array[i]) array[i] = symbol;
            }
        }
        return array.join("")
    })
  
  const result = array
    .concat(copiaSuperior)
    .map(x => x.split("").reverse().join("").trimEnd())
    return result.join("\n").trimEnd() + "\n";
}

