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

