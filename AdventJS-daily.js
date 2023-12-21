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

//DIA 8
function organizeGifts(gifts) {
    const obtenerObjeto = (str) => {
      const expresion = /(\d+)([a-zA-Z])/g;
      const match = str.match(expresion);
      if (!match) {
        return null;
      }
      let resultFinal = []
      for(let elem of match) {
          const expresion2 = /(\d+)([a-zA-Z])/
          const [_, numero, letra] = elem.match(expresion2);
        
          if(!numero || !letra) continue;
        
          const objeto = { numero: Number(numero), letra };
          const patronLetras = patron(objeto)
        
          resultFinal.push(patronLetras)
      }
      return resultFinal.join("");
    }
    
    const patron = (obj) => {
        if(!obj) return;
        const { numero, letra } = obj;
        if(numero < 10) {
            return "(" + letra.repeat(numero) + ")"
        }
        const result = []
        let division = Math.floor(numero / 10);
        let resto = Math.floor(numero % 10);
        
        if(division >= 5){
            //armo paquetes de 5
            let cantidadPaquetesDe5 = Math.floor(division / 5);
            let moduloPaquetesDe5 = Math.floor(division % 5);
            
            for(let i = 0; i < cantidadPaquetesDe5; i++){
                result.push("[" + letra + "]")
            }
            
            for(let i = 0; i < moduloPaquetesDe5; i++){
                result.push("{" + letra + "}")
            }
        }else{
            for(let i = 0; i < division; i++){
                result.push("{" + letra + "}")
            }
        }
        if(resto > 0) result.push("(" + letra.repeat(resto) + ")")
        return result.join("")
    }
    
    const data = obtenerObjeto(gifts);
    return data;
}

//DIA 9
function adjustLights(lights) {
    const red = '🔴';
    const green = '🟢';

    let changesForRedStart = 0;
    let changesForGreenStart = 0;

    for (let i = 0; i < lights.length; i++) {
        if (i % 2 === 0) { 
            if (lights[i] !== red) changesForRedStart++;
            if (lights[i] !== green) changesForGreenStart++;
        } else { 
            if (lights[i] !== green) changesForRedStart++;
            if (lights[i] !== red) changesForGreenStart++;
        }
    }

    return Math.min(changesForRedStart, changesForGreenStart);
}

//DIA 10
function createChristmasTree(ornaments, height) {
  const result = [];
  const characters = ornaments.split('');

  for(let i = 0; i < height; i++){
    let str = "";
    for(let j = 0; j <= i; j++){
      const value = characters.shift();
      characters.push(value);
      str += value + " ";
    }
    result.push(str.trim().padStart(height + i, " "));
  }
  result.push('|'.padStart(height, " "))
  
  return result.join("\n") + "\n";
}

//DIA 11
function getIndexsForPalindrome(word) {
  const isPalindome = (word) => word.split("")
  .every((x, i) => x === word[word.length - i - 1]);

  if(isPalindome(word)) return [];

  const splited = word.split("");
  const splited2 = word.split("");

  for(let i = 0; i < word.length / 2; i++){
    const {primero , segundo} = {
      primero: word[i], 
      segundo: word[word.length - 1 - i]
    }
    if(primero != segundo) {
      const index = splited.indexOf(segundo, i + 1);
      const index2 = splited.indexOf(primero, i + 1);
      let bool = true;
      
      if(index != -1) {
          [splited[index], splited[i]] = [splited[i], splited[index]]
          let esPalindrome = isPalindome(splited.join(""));
          if(esPalindrome) return [i, index];
          else bool = bool && !esPalindrome;
      }
      if(index2 != -1){
          [splited2[index2], splited2[word.length - 1 - i]] 
            = [splited2[word.length - 1 - i], splited2[index2]]
          let esPalindrome = isPalindome(splited2.join(""))
          if(esPalindrome) return [index2, word.length - 1 - i];
          else bool = bool && !esPalindrome;
      }
      if(bool) return null;
    }
  }
  return null
}

//DIA 12
function checkIsValidCopy(original, copy) {
  if(original.length != copy.length) return false;
  
  let [primero, segundo] = [original, copy]

  original = original.toLowerCase();
  copy = copy.toLowerCase();

  if(copy == original) return primero == segundo;
  let bool = true;
  
  for(let i = 0; i < original.length; i++){
    if(original[i] != copy[i]){
        if(original[i] == " " && copy[i] != " ") return false;
        let regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

        bool = bool && regex.test(copy[i])
    }
    if(!bool) return bool;
  }
  return bool
}

//DIA 13
function calculateTime(deliveries) {
  let counter = 0;
  const DATE_DEFAULT = "1999-05-18T";
  const today = new Date(DATE_DEFAULT + "00:00:00");
  for(let hours of deliveries){
    const result = new Date(DATE_DEFAULT + hours).getTime();
    counter += (result - today.getTime());
  }
  const siete = new Date(DATE_DEFAULT + "07:00:00").getTime();
  today.setMilliseconds(counter);
  const diff = siete - today.getTime();
  
  if(diff > 0){
    return `-${new Date(diff).toISOString().slice(11, 19)}`
  }else{
    return new Date(Math.abs(diff)).toISOString().slice(11, 19)
  }
}

//DIA 14
function maxGifts(houses) {
  if (houses.length === 0) return 0;
    if (houses.length === 1) return houses[0];

    let prevMax = houses[0];
    let currMax = Math.max(houses[0], houses[1]);

    for (let i = 2; i < houses.length; i++) {
        let newMax = Math.max(currMax, prevMax + houses[i]);
        prevMax = currMax;
        currMax = newMax;
    }

    return currMax;
}

function maxGifts(houses) {
  const obj = {}
  for(let i = 0; i < houses.length; i++){
    obj[i] = houses[i];
  }
  let result = 0;
  while(!!Object.keys(obj).length){
    let arr = Object.values(obj);
    let max = Math.max(...arr);
   
    let indexof = houses.indexOf(max);
    result += max;
    houses[indexof] = Infinity;
    delete obj[`${indexof}`]
    if(obj[`${indexof + 1}`]) {
        delete obj[`${indexof + 1}`]
        houses[indexof + 1] = Infinity;
    }
    if(obj[`${indexof - 1}`]) {
        delete obj[`${indexof - 1}`]
        houses[indexof - 1] = Infinity;
    }
  }
  return result;
}

//DIA 15
function autonomousDrive(store, movements) {
    if (store.length === 0) return [];

    let [fila, columna] = [0, 0];
    for (let i = 0; i < store.length; i++) {
        let j = store[i].indexOf('!');
        if (j !== -1) {
            fila = i;
            columna = j;
            break;
        }
    }

    store[fila] = store[fila].replace('!', '.');

    for (let move of movements) {
        let nuevaFila = fila, nuevaColumna = columna;
        switch (move) {
            case 'R': 
              nuevaColumna++; 
              break;
            case 'D': 
              nuevaFila++; 
              break;
            case 'L': 
              nuevaColumna--; 
              break;
            case 'U': 
              nuevaFila--; 
              break;
        }

        if (nuevaFila >= 0 
          && nuevaFila < store.length 
          && nuevaColumna >= 0 
          && nuevaColumna < store[nuevaFila].length 
          && store[nuevaFila][nuevaColumna] !== '*') 
        {
            fila = nuevaFila;
            columna = nuevaColumna;
        }
    }

    store[fila] = 
      store[fila].substring(0, columna) 
      + '!' 
      + store[fila].substring(columna + 1);

    return store;
}

//DIA 16
function transformTree(tree) {
  const insertLevelOrder = (arr, i) => {
    let root = null;

    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
      root = {
        value: arr[i]
      };

      root['left'] = insertLevelOrder(arr, 2 * i + 1);
      root['right'] = insertLevelOrder(arr, 2 * i + 2);
    }
    return root;
  }

  if (tree.length == 0) return null;

  const datos = insertLevelOrder(tree, 0);
  return datos;
}

//DIA 17
function optimizeIntervals(intervals) {
  if(intervals.length == 0) return null;
  if(intervals.length == 1) return intervals.pop();
  
  const array = intervals.sort((a, b) => a[0] - b[0]);
  const result = []
  
  let min = array[0][0];
  let max = array[0][1];
  
  for(let i = 1; i < array.length; i++){
      const [first, second] = intervals[i];
      if(first > max){
          result.push([min, max]);
          min = first;
          max = second;
      }else if(second > max){
          max = second;
      }
  }
  result.push([min, max]);
  
  return result
}


//DIA 18
function drawClock(time) {
  const numeros = [
    ["***", "* *", "* *", "* *", "* *", "* *", "***"], // 0
    ["  *", "  *", "  *", "  *", "  *", "  *", "  *"], // 1
    ["***", "  *", "  *", "***", "*  ", "*  ", "***"], // 2
    ["***", "  *", "  *", "***", "  *", "  *", "***"], // 3
    ["* *", "* *", "* *", "***", "  *", "  *", "  *"], // 4
    ["***", "*  ", "*  ", "***", "  *", "  *", "***"], // 5
    ["***", "*  ", "*  ", "***", "* *", "* *", "***"], // 6
    ["***", "  *", "  *", "  *", "  *", "  *", "  *"], // 7
    ["***", "* *", "* *", "***", "* *", "* *", "***"], // 8
    ["***", "* *", "* *", "***", "  *", "  *", "***"], // 9
    [" ", " ", "*", " ", "*", " ", " "]
  ];

  const hora = time.split(":").join("").split("").map(Number);
    hora.splice(2, 0, 10); // Insertamos el separador

    let resultado = [];

    for (let i = 0; i < 7; i++) {
        let linea = hora.map(n => numeros[n][i]).join(" ");
        resultado.push(linea.split(""));
    }

    return resultado;
}

//DIA 19
function revealSabotage(store) {
  const mapa = store
    .map(x => x.map(y => y == ' ' ? 0 : y));
  
  for(let i = 0; i < mapa.length; i++){
      for(let j = 0; j < mapa[i].length; j++){
          if(mapa[i][j] == '*'){
            if(j + 1 < mapa[i].length && 
              !isNaN(mapa[i][j + 1])) 
              mapa[i][j + 1]++; 
            if(j - 1 >= 0 && !isNaN(mapa[i][j - 1])) 
              mapa[i][j - 1]++;            
            if(i - 1 >= 0) {
                if(!isNaN(mapa[i - 1][j])) mapa[i - 1][j]++;                      
                if(j + 1 < mapa[i].length 
                  && !isNaN(mapa[i - 1][j + 1])) 
                  mapa[i - 1][j + 1]++; 
                if(j - 1 >= 0 && !isNaN(mapa[i - 1][j - 1])) 
                  mapa[i - 1][j - 1]++;            
            }
            if(i + 1 < mapa.length) {
                if(!isNaN(mapa[i + 1][j])) mapa[i + 1][j]++;                      
                if(j + 1 < mapa[i].length 
                  && !isNaN(mapa[i + 1][j + 1])) 
                  mapa[i + 1][j + 1]++; 
                if(j - 1 >= 0 && !isNaN(mapa[i + 1][j - 1])) 
                  mapa[i + 1][j - 1]++;            
            }
          }
      }
  }
 
  return mapa.map(x => x.map(y => {
    if(y == '*') return y;
    if(y == 0) return ' ';
    return y.toString()
  }))
}

//DIA 20
function distributeGifts(weights) {
  const result = [];
  for(let i = 0; i < weights.length; i++){
    const array = [];
    
    for(let j = 0; j < weights[i].length; j++){
    let suma = weights[i][j] || 0;
    let cantidadAyacentes = weights[i][j] ? 1 : 0;
      //sumo adyacentes izquierda y derecha
      if(j + 1 < weights[i].length && weights[i][j+1]){
        cantidadAyacentes++;
        suma += weights[i][j+1];
      } 
      if(j - 1 >= 0 && weights[i][j-1]){
        cantidadAyacentes++;
        suma += weights[i][j-1];
      }

      //sumo adyacentes arriba y abajo
      if(i + 1 < weights.length && weights[i + 1][j]){
        cantidadAyacentes++;
        suma += weights[i + 1][j];
      }
      if(i - 1 >= 0 && weights[i - 1][j]){
        cantidadAyacentes++;
        suma += weights[i - 1][j];
      }

      array.push(Math.round(suma / cantidadAyacentes));
    }
    result.push(array);
  }

  return result
}

//DIA 21
function findBalancedSegment(message) {
    let [maxLength, startIndex, count] = [0,-1,0]
    let map = { 0: -1 };

    for (let i = 0; i < message.length; i++) {
        count += message[i] === 1 ? 1 : -1;

        if (map.hasOwnProperty(count)) {
            let length = i - map[count];
            
            if (length > maxLength) {
                maxLength = length;
                startIndex = map[count] + 1;
            }
        } else {
            map[count] = i;
        }
    }

    if (startIndex === -1) return [];
    return [startIndex, startIndex + maxLength - 1];
}
