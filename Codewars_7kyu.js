/*-Find the next perfect square!-*/

function findNextSquare(sq) {
  const siguiente = Math.sqrt(sq) + 1;
  if(siguiente !== Math.floor(siguiente)) return -1
  
  return Math.pow(siguiente, 2);
}

/*-Reverse list-*/

function reverseList(arr) {
  return arr.reverse();
}

/*-Love vs friendship-*/

function wordsToMarks(s){
  return Array.from(s).map(x => x.charCodeAt(0) - 'a'.charCodeAt(0) + 1).reduce((acc, res) => acc + res, 0)
}

/*-The fusc function -- Part 1-*/

function fusc(n){
  if(n == 0) return 0
  if(n == 1) return 1
  
  if(n % 2 === 0){
    return fusc(n/2)
  }else{
    const value = Math.floor(n/2);
    return fusc(value) + fusc(value + 1)
  }
}

/*-Maximum Triplet Sum (Array Series #7)-*/

function maxTriSum(numbers){
  let obj = {}
  for(let numero of numbers){
    if(!obj[numero]){
      obj[numero] = 1;
    }
  }
  return Object.keys(obj)
    .map(Number)
    .sort((a,b)=>b-a)
    .slice(0,3)
    .reduce((acc, res) => acc + res, 0)
}

/*-Tidy Number (Special Numbers Series #9)-*/

function tidyNumber(n){
  const arr = Array.from(n.toString()).map(Number);
  let value = arr[0];
  for(let i = 1; i < arr.length ; i++){
    if(arr[i] < value){
      return false;
    }else{
      value = arr[i];
    }
  }
  return true;
}

/*-See You Next Happy Year-*/

function nextHappyYear(year){
  let nextYear = year+1;
  
  while (!checkHappyYear(nextYear)){
    nextYear++;
  }
  
  return nextYear;
}

function checkHappyYear(x){
  let y = String(x);
  let map = {};
  
  for (var i = 0; i < y.length; i++) {
    if (map[y[i]]) return false;
    map[y[i]] = 1;
  }
  return true;
}

/*-Two to One-*/

function longest(s1, s2) {
  let obj = {}
 
  for(let i = 0; i < Math.max(s1.length, s2.length) ; i++){
    if(obj[s1[i]]){
      obj[s1[i]] = obj[s1[i]] + 1
    }else{
      obj[s1[i]] = 1;
    }
    
    if(obj[s2[i]]){
      obj[s2[i]] = obj[s2[i]] + 1
    }else{
      obj[s2[i]] = 1;
    }
  }
  
  return Object.keys(obj).filter(x => x !== 'undefined').sort().join('')
}

const longest = (s1, s2) => [...new Set(s1+s2)].sort().join('') // Con Set

/*-Vowel Count-*/

function getCount(str) {
  const vowels = ['a','e','i','o','u'];
  
  return [...str].filter(x => vowels.includes(x)).length
}

/*-Form The Minimum-*/

function minValue(values){
  const unique = [...new Set(values)];
  return parseInt(unique.sort((a,b) => a - b).reduce((acc, res) => acc + res, ""))
}

/*-All unique-*/

function hasUniqueChars(str){
  const array = Array.from(str);
  return array.every(x => array.indexOf(x) === array.lastIndexOf(x))
}

/*-Chuck Norris I - Push Ups-*/

function chuckPushUps(string) {
  if(string === 1 || !string || string.length === 0) return 'FAIL!!'
  let binary = []
  
  if(Array.isArray(string)){
    binary = string.filter(x => x.includes('1') || x.includes('0'));
    
    if(binary.length === 0) 
      return 'FAIL!!';
  }else{
    if(Array.from(string).indexOf(' ') === -1){
      
      binary = string.toString().split('').filter(x => x.includes('1') || x.includes('0')).join('');
      const value = parseInt(binary, 2)
      return !isNaN(string) ? 'FAIL!!' : value
    }else{
      binary = string.split(' ').filter(x => x.includes('1') || x.includes('0'));
    }
  }
  
  if(binary.length === 0) return 'CHUCK SMASH!!';
  
  const numbers = binary.map(x => parseInt(x, 2));
  
  return Math.max(...numbers)
}

/*-Chuck Norris II - One Punch-*/

function onePunch(items){
  const result =  items.big && items.length ? items.split(' ').sort().join(' ').replace(/[ae]/ig,'') : "Broken!";
  return result;
  
  const removeAorR = items.split(' ').map(x => {
    const value = x.replace(/[a,e]/gi, '');
    const sum = x.length - value.length
    
    return {
      value,
      sum
    }
  });

  const sort = removeAorR.sort((a, b) => {
    if(b.sum - a.sum === 1){
      return a.value - b.value
    }else{
      return b.sum - a.sum;
    }
  });
  
  return sort.map(x => x.value).join(' ');
}

/*-Shortest Word-*/

function findShort(s){
  const results = s.split(' ').map(x => x.length);
  return Math.min(...results)
}

/*-Move 10-*/

function moveTen(s){
  const array = s.split('').map(x => {
    const charZ = "z";
    if(x.charCodeAt(0) > charZ.charCodeAt(0)){
      const value = x.charCodeAt(0) - charZ;
      return 'a'.charAt(0) + value;
    }else{
      return x.charCodeAt(0)
    }
  });
  
  return array.map(x => x.toString().charAt(0)).join('')
}

/*-Ordered Count of Characters-*/

const orderedCount = function (text) {
  let result = {}
  let resultArr = []
  
  for(let element of text.split('')){
    if(result[element]){
      result[element] = result[element] + 1;
    }else{
      result[element] = 1;
      resultArr.push([element, 1]);
    }
  }
  resultArr.map(x => {
    x[0] = x[0];
    x[1] = result[x[0]];
  })
  
  return resultArr;
}

/*-Holiday III - Fire on the boat-*/

function fireFight(s){
  return s.replace(/Fire/gi, '~~')
}

/*-Numbers to Letters-*/

function switcher(x){
  const arr =  x.map(x => {
    const number = Math.abs((-1)*parseInt(x) + 27);
    const char = String.fromCharCode(number + 96);
    const values = {
      27: '!',
      28: '?',
      29: ' '
    }
    return values[x] ? values[x] : char;
  })
  return arr.join('')
}

/*-Geometry Basics: Triangle Perimeter in 2D-*/

function trianglePerimeter(triangle){
  const first = Math.hypot(triangle.a.x - triangle.b.x, triangle.a.y - triangle.b.y);
  const second = Math.hypot(triangle.a.x - triangle.c.x, triangle.a.y - triangle.c.y);
  const third = Math.hypot(triangle.b.x - triangle.c.x, triangle.b.y - triangle.c.y);
  return first + second + third
}

/*-How many consecutive numbers are needed?-*/

function consecutive(arr) {
  let sum = 0;
  arr = arr.sort((a,b) => a - b)
  
  for(let i = 0; i < arr.length - 1 ; i++){
    if(arr[i + 1] - arr[i] > 1){
      sum += arr[i + 1] - arr[i] - 1;
    }
  }
  return sum
}

/*-Bumps in the Road-*/

function bump(x){
  const arr = x.split('');
  const countN = arr.filter(x => x === 'n').length;
  const count_ = arr.filter(x => x === '_').length;
  
  if(countN <= 15){
    return 'Woohoo!'
  }
  return "Car Dead"
}

/*-Makes the Sentence-*/

function makesTheSentence(characterArray, sentenceString) {
  const nonSpaces = sentenceString.split('').sort().join('').replace(/\s/g, '');
  const word = characterArray.sort().join('')
  
  return word === nonSpaces
}

/*-Arithmetic progression-*/

function arithmeticSequenceElements(a, d, n) {
  let arr = []
  arr[0] = a;
  for(let i = 1; i < n ; i++){
    arr[i] = arr[i - 1] + d;
  }
  return arr.join(', ')
}

/*-Cryptanalysis Word Patterns-*/

function wordPattern(word) {
  const toLower = word.toLowerCase();
  let obj = {}
  let result = []
  let value = 0;
  
  for(let i = 0; i < toLower.length ; i++){
    if(!obj[toLower[value]]){
      obj[toLower[value]] = value;
      result.push(obj[toLower[i]])
      value++;
    }else{
      result.push(obj[toLower[value]])
    }
  }
  return result.join('.'); 
}

/*-99 Problems, #1: last in list-*/

const last = xs => {
  return xs.length === 0 ? null : xs.pop()
}

/*-Tower of Hanoi-*/

function towerOfHanoi(rings){
  return Math.pow(2, rings) - 1
}

/*-Fibonacci's FizzBuzz-*/

var fibsFizzBuzz = function(n) {
  let result = []
  for(let i = 1; i <= n ; i++){
    if(i === 1){
      result.push(1)
    }else if(i === 2){
      result.push(1)
    }else{
      let primero = Array.isArray(result[i - 2]) ? result[i - 2][1] : result[i - 2];
      let segundo = Array.isArray(result[i - 3]) ? result[i - 3][1] : result[i - 3];
      let value = primero + segundo;
      
      if(value % 3 === 0 && value % 5 === 0){
        result.push(['FizzBuzz', primero + segundo]);
      }else if(value % 3 === 0){
        result.push(['Fizz', primero + segundo]);
      }else if(value % 5 === 0){
        result.push(['Buzz', primero + segundo]);
      }else{
        result.push(primero + segundo);
      }
    }
  }
  
  return result.map(x => {
    return Array.isArray(x) ? x[0] : x
  })
}

/*-Return the closest number multiple of 10-*/

const closestMultiple10 = num => {
  return Math.round(num / 10) * 10;
};

/*-Smallest value of an array-*/

function min(arr, toReturn) {
  const min = Math.min(...arr);
  return toReturn === 'value' ? min : arr.indexOf(min)
}

/*-Hells Kitchen-*/

function gordon(a){
  const split = a.split(' ').map(x => {
    x = x.replace(/[aA]/g, '@')
    x = x.replace(/[eEiIoOuU]/g, '*')
    
    return `${x.toUpperCase()}!!!!`;
  }).join(' ')
  
  return split;
}

/*-Binary Addition-*/

function addBinary(a,b) {
  return (a + b).toString(2)
}

/*-Area of an arrow-*/

function arrowArea(a,b) {
  return (a*b) / 4
}

/*-Multiply Word in String-*/

function modifyMultiply (str,loc,num) {
  let values = str.split(' ');
  let arr = []
  
  for(let i = 0; i < num; i++){
    arr.push(values[loc]);
  }
  return arr.join('-')
} 

/*-String ends with?-*/

function solution(str, ending){
  return str.endsWith(ending);
}

/*-Collatz Conjecture Length-*/

function collatz(n) {
  let arr = [n]
  let value = n;
  while(value !== 1){
    if(value % 2 === 0){
      value = value / 2;
    }else{
      value = value * 3 + 1;
    }
    arr.push(value)
  }
  return arr.length
}

/*-Colour Association-*/

function colourAssociation(array){
  return array.map(x => {
    const value = {};
    value[x[0]] = x[1];
    return value
  })
}

/*-Adding Arrays-*/

function arrAdder(arr) {
  if(arr.length === 0){
    return ""
  }
  const cantidad = arr[0].length;
  let constructor = [];
  
  for(let i = 0; i < cantidad; i++){
    let palabra = ""
    for(let j = 0; j < arr.length ; j++){
      palabra += arr[j][i];
    }
    constructor.push(palabra);
  }
  
  return constructor.join(" ")
}

/*-Four/Seven-*/

function fourSeven(n){
  const answers = {
    4: 7,
    7: 4
  }
  return answers[n] || 0
}

/*-Breaking chocolate problem-*/

function breakChocolate(n,m) {
  return n * m - 1 < 0 ? 0 : n * m - 1
}

/*-Make acronym-*/

function toAcronym(inp){
  return inp.split(" ").map(x => x[0].toUpperCase()).join("")
}

/*-Credit Card Mask-*/

function maskify(cc) {
  if(cc.length >= 5){
    let substring = cc.substring(cc.length - 4, cc.length)
    return substring.padStart(cc.length , "#")
  }else{
    return cc;
  }
}

/*-Square Every Digit-*/

function squareDigits(num){
  let aux = num.toString().split("").map(Number);
  let number = aux.map(x => Math.pow(x, 2))
  return parseInt(number.join(""))
}

/*-You're a square!-*/

var isSquare = function(n){
  let aux = Math.sqrt(n)
  return Math.floor(aux) === aux
}

/*-String ends with?-*/

function solution(str, ending){
  return str.endsWith(ending)
}

/*-Flatten and sort an array-*/

function flattenAndSort(array) {
  let arr = []
  array.forEach((acc) => {arr.push(...acc)});
  return arr.sort((a,b) => a - b)
}

/*-Printer Errors-*/

function printerError(s) {
  let ordenada = s.split("").sort().join("");
  return `${s.length - ordenada.lastIndexOf("m") - 1}/${s.length}`
}

/*-Number of Decimal Digits-*/

function digits(n) {
  return n.toString().length
}

/*-Name on billboard-*/

function billboard(name, price = 30){
  let suma = 0;
  for(let i = 1; i <= name.length ; i++){
    suma += price
  }
  return suma
} 

/*-You Got Change?-*/

function giveChange(amount) {
  const values = [1,5,10,20,50,100].reverse();
  let i = 0;
  let result = [];
  while(amount >= 0 && i < values.length){
    let value = Math.floor(amount / values[i]);
    result.push(value);
    amount = amount % values[i]
    i++;
  }
  return result.reverse();
}

/*-Currying functions: multiply all elements in an array-*/

const multiplyAll = (array) => {
  return function map(num){
    return array.map(x => x*num);
  }
}

/*-Predict your age!-*/

function predictAge(age1,age2,age3,age4,age5,age6,age7,age8){
  const args = Object.entries(arguments).map(x => x[1]);
  const multiply = args.map(x => Math.pow(x, 2)).reduce((acc, res) => acc + res, 0)
  return Math.floor((Math.sqrt(multiply) /2))
}

/*-Simple Fun #176: Reverse Letter-*/

function reverseLetter(str) {
  const arr = str.split("").filter(x => /^[a-zA-Z]/.test(x))
  return arr.reverse().join("")
}

/*-Product Array (Array Series #5)-*/

function productArray(numbers){
  return numbers.map((x, i) => {
    let numbersNoIndex = numbers.reduce((acc, res, index) => index !== i ? acc * res : acc , 1);
    return numbersNoIndex;
  })
}

/*-V A P O R C O D E-*/

function vaporcode(string) {
  return string.replace(/\s/ig, "").toUpperCase().split("").join("  ")
}

/*-Array.prototype.reverse()-*/

Array.prototype.reverse = function() {
  for(let i = 0; i < Math.ceil(this.length/2) ; i++){
    let value = this[i];
    this[i] = this[this.length - i - 1] 
    this[this.length - i - 1] = value
  }
  return this
};

/*-Drone Fly-By-*/

function flyBy(lamps, drone){
  if((lamps.length - drone.length) < 0){
    return 'o'.repeat(lamps.length)
  }else{
    return 'o'.repeat(drone.length) + 'x'.repeat(lamps.length - drone.length)
  }
}

/*-Sum of all arguments-*/

function sum() {
  return Array.from(arguments).reduce((acc, res) => acc + res , 0)
}

/*-Build a square-*/

function generateShape(integer){
  let result = [];
  for(let i = 0; i < integer; i++){
    result.push("+".repeat(integer))
  }
  return result.join("\n")
}

/*-Dot Calculator-*/

function dotCalculator (equation) {
  const [first, equal, second] = equation.split(" ");
  
  switch(equal){
      case "+":
        return ".".repeat(first.length + second.length)
        break;
      case "-":
        return ".".repeat(first.length - second.length)
        break;
      case "//":
        return ".".repeat(Math.floor(first.length / second.length))
        break;
      case "*":
        return ".".repeat(first.length * second.length)
        break;
      default:
        return;
  }
}

/*-TO DO Stanton measure-*/

function stantonMeasure(arr = []){
  let obj = {}
  if(arr.some(x=>x<0)) return 0
  
  for(let elem of arr){
    if(obj[Math.abs(elem)]){
      obj[Math.abs(elem)] = obj[Math.abs(elem)] + 1;
    }else{
      obj[Math.abs(elem)] = 1;
    }
  }
  console.log(obj)
  return Object.entries(obj).map(x => x[1]).sort((a,b) => b-a).shift()
}

/*-Isograms-*/

function isIsogram(str){
  return !str.toLowerCase().split("").some((x, index, arr) => arr.indexOf(x) !== arr.lastIndexOf(x))
}

/*-Simple Fun #37: House Numbers Sum-*/

function houseNumbersSum(arr) {
  let sum = 0;
  let index = 0;
  let aux = arr[0];
  
  while(aux !== 0){
    sum += arr[index];
    aux = arr[index];
    index++;
  }
  return sum;
}

/*-Simple Fun #63: Shape Area-*/

function shapeArea(n) {
  return n*n + (n-1)*(n-1)
}

/*-Simple Fun #152: Invite More Women?-*/

function inviteMoreWomen(L) {
  return L.reduce((acc, res) => acc + res, 0) > 0
}

/*-Coding 3min: Bug in Apple-*/

function sc(apple){
  let i = 0
  let j = 0;
  while(i < apple.length && apple[i][j] !== 'B'){
    j = 0;
    while(j < apple[i].length && apple[i][j] !== 'B'){
      j++;
    }
    if(apple[i][j] !== 'B'){
      i++;
    }
  }
  return [i,j]
}

/*-ex Hash Sum-*/

function hexHash(code){
  let arr = code.split("").map(x => x.charCodeAt(0).toString(16));
  let numbers = []
  for(let ar of arr){
    const filtrados = ar.split("").filter(x => !isNaN(x));
    numbers.push(...filtrados);
  }
  numbers = numbers.map(x => parseInt(x));
  return numbers.reduce((acc, res) => acc + res, 0)
}

/*-Maximum Multiple-*/

function maxMultiple(divisor, bound){
  const aRestar = bound % divisor 
  return bound - aRestar
}

/*-Remove anchor from URL-*/

function removeUrlAnchor(url){
  return url.split("#")[0]
}

/*-Stop gninnipS My sdroW!-*/

function spinWords(string){
  let mapeado = string.split(" ");
  mapeado = mapeado.map(x => {
    if(x.length >= 5){
      let reverse = x.split("").reverse().join("");
      return reverse;
    }
    
    return x;
  })
  return mapeado.join(" ")
}

/*-Filter the number-*/

var filterString = function(value) {
  const filter = value.split("").filter(x => !isNaN(x)).join("")
  return parseInt(filter)
}

/*-Sorted? yes? no? how?-*/

const isSortedAndHow = array => {
  let ascending = array.filter((e, i, a) => e > a[i+1]).length == 0
  let descending = array.filter((e, i, a) => e < a[i+1]).length == 0
  
  return ascending ? 'yes, ascending' : descending ? 'yes, descending' : 'no'
}

/*-Parts of a list-*/

function partlist(arr) {
  let result = []
  for(let i = 1; i <=  arr.length; i++){
    let value = []
    let auxiliar = arr;
    value.push(auxiliar.splice(0,i).join(" "), auxiliar.join(" "));
    result.push(value);
  }
  return result
}

/*-Filter the number-*/

var filterString = function(value) {
  return parseInt(value.match(/[0-9]/ig).join(""))
}

/*-Especially Joyful Numbers-*/

function numberJoy(n) {
  const digit = `${n}`.split("").reduce((acc, res) => acc + Number(res),0)
  return n === digit * parseInt(digit.toString().split("").reverse().join(""))
}

/*-Sorted? yes? no? how?-*/

function isSortedAndHow(array) {
  console.log(array)
  
  if(isAcending(array)){
    return 'yes, ascending'
  }else if(isDecending(array)){
    return 'yes, descending'
  }else{
    return 'no'
  }
}

function isAcending(arr){
  let result = true;
  for(let i = 1; i < arr.length; i++){
    if(arr[i - 1] >= arr[i]){
      return false;
    }
  }
  return result;
}

function isDecending(arr){
  let result = true;
  for(let i = 1; i < arr.length; i++){
    if(arr[i - 1] <= arr[i]){
      return false;
    }
  }
  return result;
}

/*-Testing 1-2-3-*/

var number=function(array){
  return array.map((x, i) => `${i + 1}: ${x}`)
}
