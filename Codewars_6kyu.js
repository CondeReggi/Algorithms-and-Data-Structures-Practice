/*-Number of permutations without repetitions-*/

function perms(elements) {
	let not_repeat = elements.toString().split("");
  let obj = {}
  
  for(let element of not_repeat){
    obj[element] ? obj[element] = obj[element] + 1 : obj[element] = 1;
  }
  
  let nuevo = Object.entries(obj).filter(x => x[1] !== 1 );
  let cantidad = 1;
  
  if(nuevo.length > 0){
    for(let numero of nuevo){
      cantidad *= factorial(numero[1]);
    }
  }
  return BigInt(factorial(not_repeat.length) / cantidad)  
}

function factorial(n){
  if(n === 1) return 1
  return n* factorial(n-1)
}

/*-Error correction #1 - Hamming Code-*/

function encode(text) {
  let arr = text.split("").map(x => x.charCodeAt())
  arr = arr.map(x => x.toString(2).padStart(8,"0"))
  arr = arr.map(x => {
    let split = x.split("");
    split = split.map(y => y.repeat(3))
    return split.join("")
  })
  return arr.join("")
}

function separateXCaracters(text, n){
  let result = [];
  for(let i = 0; i < text.length ; i++){
    if((i + 1) % n === 0){ //Cada 8
      const substring = text.substring(((i + 1) - n), i + 1);
      result.push(substring)
    }
  }
  return result;
}

function ocurrs(arr){
  let obj = { 1: 0 , 0: 0 }
  for(let binary of arr.split("")){
    obj[binary] = obj[binary] + 1
  }
  return obj[1] > obj[0] ? 1 : 0
}

function decode(bits) {
  let arr = separateXCaracters(bits, 3).map(x => ocurrs(x))
  let string = separateXCaracters(arr.join(""), 8)
  string = string.map(x => String.fromCharCode(parseInt(x, 2)))
  return string.join("")
}

/*-ASCII Fun #1: X- Shape-*/

function x(n){
  let result = [] 
  for(let i = 1; i <= n; i++)
    result.push(constructorMap(n, i))
  
  return result.join("\n")
}

const constructorMap = (n, index) => {
  let result = "";
  for(let i = 1; i <= n; i++){
    if(i === index || i === (n - index + 1)){
      result += "■";
    }else{
      result += "□";
    }
  }
  return result;
}

/*-The Spider and the Fly (Jumping Spider)-*/

var spiderToFly = function(spider, fly) {
  if(spider === fly)
    return 0;
  
  const numberSpider = parseInt(spider.replace(/^[a-zA-Z]/ig,""));
  const numberFly = parseInt(fly.replace(/^[a-zA-Z]/ig,""));
  
  const numberWordSpider = spider.replace(/^[0-9]/ig,"");
  const numberWordFly = fly.replace(/^[0-9]/ig,"");
                                    
  if((["H","B","D","F"].some(numberWordSpider) && ["H","B","D","F"].some(numberWordFly)) || (["G","A","C","E"].some(numberWordSpider) && ["G","A","C","E"].some(numberWordFly))){
    return numberSpider;
  }
  
  return Math.hypot()
                                    
}

/*-Back and forth then Reverse!-*/

function arrange(s, arr = []) {
  for(let i = 0; i < s.length / 2 ; i++){
    let index = i % 2 === 0 ? i : s.length - i - 1 ;
    const first = s[index];
    const last = s[s.length - index - 1];
    
    if(first || first === 0)
      arr.push(first)
  
    if((last || last === 0) && ((s.length - index - 1) !== index))
      arr.push(last)
  }
  return arr
}

/*-Help the bookseller !-*/

function stockList(listOfArt, listOfCat){
  let result = []
  
  for(let word of listOfCat){
    let words = listOfArt.filter(x => x[0] == word);
    words = words.map(x => Number(x.split(" ")[1]));
    
    let sum = words.reduce((acc, res) => acc + res, 0);
    result.push(`(${word} : ${sum})`)
  }
  
  let str = result.join(" - ");
  return /[1-9]/.test(str) ? result.join(" - ") : ""
}

/*-Count characters in your string-*/

function count (string) {  
  const order = string.split("").sort();
  let counter = {}
  for(let word of order){
    if(counter[word]){
      counter[word] = counter[word] + 1;
    }else{
      counter[word] = 1
    }
  }
  return counter;
}

/*-1RM Calculator-*/

function calculate1RM(w, r){
  if(r === 1) return w
  if(r === 0) return 0
  
  let results = []
  results.push(Math.round(w * (1 + (r/30))));
  results.push(Math.round(100 * w / (101.3 - 2.67123 * r) ))
  results.push(Math.round(w * Math.pow(r, 0.10)))
  return Math.max(...results)
}

/*-Who likes it?-*/

function likes(names) {
  const counter = names.length;
  if(counter === 0) return "no one likes this";
  if(counter === 1) return `${names.shift()} likes this`;
  if(counter === 2) return `${names.shift()} and ${names.shift()} like this`;
  if(counter === 3) return `${names.shift()}, ${names.shift()} and ${names.shift()} like this`;
  
  return `${names.shift()}, ${names.shift()} and ${counter - 2} others like this`;
}

/*-Roman Numerals Encoder-*/

function solution(number){
  const numeros = [[1,'I'],[5,'V'],[10,'X'],[50,'L'],[100,'C'],[500,'D'],[1000,'M']];
  let lastIndex = numeros.length - 1;
  let numeroRomano = []
  while(number > 0 && lastIndex >= 0){
    if(number - numeros[lastIndex][0] >= 0){
        const cantidadDe = Math.floor(number / numeros[lastIndex][0]);
        number = number - cantidadDe*numeros[lastIndex][0];
        numeroRomano.push(numeros[lastIndex][1].repeat(cantidadDe))
    }else{
      if((lastIndex - 1) >= 0 && (number + 1) === numeros[lastIndex - 1][0]){
        numeroRomano.push(numeros[lastIndex - 1][1]);
        number = numeros[lastIndex - 1][0] - number;
      }else{
        lastIndex--;
      }
    }
  }
  const result = numeroRomano.reverse().join("");
  return result
}

/*-Find the missing letter-*/

function findMissingLetter(array)
{
  let index = 1;
  let firstNumber = array[0].charCodeAt(0);
  
  while(index < (array.length - 1) && firstNumber === array[index].charCodeAt(0) - 1){
    firstNumber = array[index].charCodeAt(0);
    index++;
  }
  
  if(firstNumber !== array[index].charCodeAt(0)){
    return String.fromCharCode(firstNumber + 1)
  }
  
  return '';
}

/*-Persistent Bugger.-*/

function persistence(num) {
  if(num < 10) return 0;
  let aux = num.toString().split("");
  let sum = 1;
  
  while(aux.length !== 1){
    let multiply = 1;
    for(let number of aux){
      multiply *= Number(number);
    }
    
    if(multiply < 10) return sum;
    sum ++;
    aux = multiply.toString().split("");
  }
}


