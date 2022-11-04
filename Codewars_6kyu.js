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

/*-Binary to Text (ASCII) Conversion-*/

function binaryToString(binary) {
  let array_to_binarys = []
  let cantidad = binary.length;
  while(binary != ""){
    array_to_binarys.push(binary.substring(0, 8))
    if(binary.length >= 8){
      binary = binary.substring(8, binary.length);
    }
  }
  array_to_binarys = array_to_binarys.map(x => parseInt(x, 2))
  return String.fromCharCode(...array_to_binarys)
}

/*-Highest Scoring Word-*/

function high(x){
  const rest = 'a'.charCodeAt(0) - 1;
  const arr = x.split(" ").map(x => {
    return {
      word: x,
      cant: x.split("").reduce((acc, res) => acc + res.charCodeAt(0) - rest,0)
    }
  });
  
  arr.sort((a, b) => b.cant - a.cant);
  return arr[0].word
}

/*-Split Strings-*/

function solution(str){
  if(str === "") return []
  let result = []
  while(str !== ""){
    if(str.length >= 2){
      result.push(str.substring(0,2));
      str = str.substring(2, str.length);
    }else{
      result.push(str.padEnd(2,'_'))
      str = ""
    }
  }
  return result;
}

/*-The maximum sum value of ranges -- Simple version-*/

function maxSum(arr,ranges){
  let values = []
  for(let range of ranges){
    let sum = 0;
    for(let i = range[0] ; i <= range[1] ; i++){
      sum += arr[i];      
    }
    values.push(sum);
  }
  return Math.max(...values)  
}

/*-Duplicate Encoder-*/

function duplicateEncode(words){
  let object = {}
  let result = ""
  
  for(let word of words.split("")){
    word = word.toLowerCase()
    object[word] = object[word] ? object[word] + 1 : 1
  }
  
  for(let word of words.split("")){
    result += object[word] === 1 ? '(' : ')'
  }
  return result;
}


/*-ASCII Fun #2: Funny Dots-*/

function dot(n,m){
  let circles = []
  let lines = []
  for(let i = 0; i <= n ; i++){
    circles.push("|");
    lines.push("+");
  }
  let resultado = []
  for(let i = 0; i <= m ; i++){
    resultado.push(lines.join("---") + '\n');
  }
  return resultado.join(circles.join(" o ") + '\n').trim()
}

/*-Maze Runner-*/

function mazeRunner(maze, directions) {
  let x = 0;
  let y = 0;
  let index = 0;
  for(let position of maze){
    if(position.some(x => x === 2)){
      y = index;
      x = position.indexOf(2);
    }
    index++;
  }
  
  for(let direction of directions){
    switch(direction){
        case 'N': y--;
          break;
        case 'S': y++;
          break;
        case 'E': x++;
          break;
        case 'W': x--;
          break;
    }
  }
  if(maze[y][x] === 3 || maze[y][x] === 0) return 'Finish'
  
  if(y < 0 || x < 0 || y === 0 || y === (maze.length - 1) || x === 0 || x === (maze[0].length - 1) ) return 'Dead'
  
  return 'Lost'
}

/*-Simple decrypt algo-*/

function decrypt(cry) {
  const arr = cry.replace(/[a-zA-Z]/ig, "");
  let obj = {}
  
  for(let word of cry.split("")){
    if(!arr.includes(word))
      obj[word] = obj[word] ? obj[word] + 1 : 1;
  }
  
  // 'a'.charCodeAt(0) = 97
  // 'z'.charCodeAt(0) = 122
  
  let result = "";
  for(let i = 97 ; i <= 122 ; i++){
    result += obj[String.fromCharCode(i)] ? obj[String.fromCharCode(i)] : "0"
  }
  return result
}

/*-Pyramid Array-*/

function pyramid(n) {
  let result = []
  for(let i = 1; i <= n; i++){
    let valueToPush = []
    for(let j = 0; j < i ; j++){
      valueToPush.push(1);
    }
    result.push(valueToPush)
  }
  return result
}

/*-Palindrome for your Dome-*/

function palindrome(string) {
  const palabra = string.toLowerCase().split("").filter(x => /[a-zA-Z0-9]/.test(x));
  return palabra.join("") === palabra.reverse().join("")
}

/*-Backspaces in string-*/

function cleanString(s) {
  let result = [];
  for(let i = 0; i < s.length ; i++){
    if(s[i] === "#"){
      result.pop();
    }else{
      result.push(s[i]);
    }
  }
  return result.join("")
}

/*-Multiplication table-*/

const multiplicationTable = function(size) {
  let result = Array(size).fill([]);
  let number = 1;
  for(let i = 0; i < size; i++){
    for(let j = 0; j < size ; j++){
      result[i] = [...result[i], number + (i+1)*j]
    }
    number++
  }
  return result;
}

/*-Reverse every other word in the string-*/

function reverse(str){
  return str.split(" ").map((x,i) => i % 2 === 0 ? x : x.split("").reverse().join("")).join(" ").trim()
}

/*-Unique In Order-*/

var uniqueInOrder=function(iterable){
  if(iterable.length === 0) return []
  let result = []
  let auxiliar = iterable[0]
  result.push(auxiliar);
  for(let i of iterable){
    if(i !== auxiliar){
      auxiliar = i;
      result.push(auxiliar);
    }
  }
  return result;
}

/*-Stop gninnipS My sdroW!-*/

function spinWords(str){
  return str.split(" ").map(x => x.length >= 5 ? x.split("").reverse().join("") :  x).join(" ")
}

/*-Counting Duplicates-*/

function duplicateCount(text){
  if(text == "") return 0;
  let obj = {}
  for(let elem of text.toLowerCase().split("")){
    obj[elem] = obj[elem] ? obj[elem] + 1 : 1
  }
  return Object.entries(obj).filter(x => x[1] !== 1).length
}

/*-Difference of perfect squares displayed as sum of consecutive odd numbers-*/

function squaresToOdd(sqr1, sqr2){
  const suma = Math.pow(sqr1, 2) - Math.pow(sqr2, 2);
  let sumar = 1;
  let initial_value = Math.min(sqr1, sqr2) * 2 + 1
  let resultado_en_suma = 0;
  let arr = []
  
  for(let i = initial_value; resultado_en_suma < suma; i += 2){
    resultado_en_suma += i;
    arr.push(i);
  }
  
  if(resultado_en_suma !== suma){
    return `${sqr1}^2 - ${sqr2}^2 = ${suma} = ${suma}`;
  }
  
  return `${sqr1}^2 - ${sqr2}^2 = ${arr.join(" + ")} = ${suma}`;
}

/*-Most consecutive 0's in a row [Code-golf]-*/

function f(input) {
  const arr = input.toString().split(/[1-9]/ig).map(x => x.length)
  return Math.max(...arr)
}

/*-Most consecutive 0's in a row [Code-golf]-*/

function f(input) {
  const arr = input.toString().split(/[1-9]/ig).map(x => x.length)
  const result = Math.max(...arr)
  
  return result >= 59 ? `oops, code length is ${result} but should be less than or equal to 60` : result
}

/*-Simple Simple Simple String Expansion-*/

function stringExpansion(s) {
  let initial_value = 1;
  let result = "";
  const arr = s.split("");
  if(arr.every(x => isNaN(x))){
    return arr.join("")
  }
  
  for(let element of arr){
    if(!isNaN(element)){
      initial_value = Number(element);
      continue;
    }
    
    if(initial_value > 0){
      result += element.repeat(initial_value)
    }
  }
  
  return result;
}

/*-Collatz-*/

function collatz(n){
  let result = n;
  let arr = []
  while(result !== 1){
    arr.push(result);
    if(result % 2){
      result = 3*result + 1
    }else{
      result = result/2
    }
  }
  arr.push(1);
  return arr.join("->")
}

/*-Are they the "same"?-*/

function comp(array1, array2){
  if(!array1 || !array2) return false
  if(array1.length === 0 || array2.length === 0) return true
  
  array1 = array1.sort((a,b) => a - b);
  array2 = array2.sort((a,b) => a - b);
  while(array1.length > 0 && array2.length > 0){
    if(array1.shift() !== Math.sqrt(array2.shift())){
      return false;
    }
  }
  return true
}

/*-N-th Fibonacci-*/

function nthFibo(n) {
  let [prev, curr] = [0, 1];
  for (let i = 1; i < n; i++) [prev, curr] = [curr, prev + curr];
  return prev;
}

/*-Rotate an array matrix-*/

function rotate(matrix, direction) {
  let new_matrix = []
  //Ordenar la matrix
  if(direction === 'clockwise'){
    for(let i = 0; i < matrix[0].length; i++){
      let fila = []
      for(let j = 0; j < matrix.length; j++){
        fila[j] = matrix[j][i]
      }
      new_matrix.push(fila.reverse())
    }
    return new_matrix
  }
  
  for(let i = matrix[0].length - 1; i >= 0; i--){
    let fila = []
    for(let j = matrix.length - 1; j >= 0; j--){
      fila[j] = matrix[j][i]
    }
    new_matrix.push(fila)
  }
  return new_matrix    
}

/*-Break camelCase-*/

// complete the function
function solution(string) {
  const arr = string.split("");
  let result = "";
  
  for(let word of arr){
    if(word.toUpperCase() === word){
      result += " " + word
    }else{
      result += word
    }
  }
  
  return result
}
