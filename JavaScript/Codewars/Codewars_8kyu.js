/*-Do I get a bonus?-*/

function bonusTime(salary, bonus) {
  return `£${salary}${ bonus ? '0' : '' }`
}

/*-Sum Mixed Array-*/

function sumMix(x){
  const mapeado = x.map(Number);
  return mapeado.reduce((acc, res) => acc + res ,0)
}

/*-Jenny's secret message-*/

function greet(name){
  if(name === "Johnny")
    return "Hello, my love!";
  return "Hello, " + name + "!";
}

/*-Century From Year-*/

function century(year) {
  if(year % 10 === 0){
    return Math.ceil(year / 100)
  }
  return Math.floor(year / 100) + 1
}

/*-Count of positives / sum of negatives-*/

function countPositivesSumNegatives(input) {
  if(!input || input.length === 0) return []
  const mapeadoPositive = input.filter(x => x > 0 && x != 0)
  const mapeadoNegative = input.filter(x => x < 0)
  let arrayResult = [];
  let counter = 0;
  for(let value of mapeadoPositive){
    counter += value;
  }
  arrayResult.push(counter);
  for(let value of mapeadoNegative){
    counter += value;
  }
  arrayResult.push(counter);
  arrayResult[0] += (-1)*arrayResult[1]
  arrayResult[1] = (-1)*mapeadoPositive.length
  console.log(arrayResult)
  return arrayResult.reverse().map(x => x === 0 ? 0 : (-1)*x);
}

/*-Take the Derivative-*/

function derive(coefficient,exponent) {
  let multiplicacion = coefficient * exponent;
  let exponentDerivate = exponent - 1;
  return `${multiplicacion}x^${exponentDerivate}`
}

/*-Count by X-*/

function countBy(x, n) {
  let z = [];
  for(let i = 1; i <= n ; i++){
    z.push(i * x)
  }
  return z;
}

/*-Beginner Series #4 Cockroach-*/

function cockroachSpeed(s) {
  return Math.floor((s / 3.6)*100)
}

/*-Find Nearest square number-*/

function nearestSq(n){
  let truncateOne = Math.floor(Math.sqrt(n));
  let truncateTwo = Math.ceil(Math.sqrt(n));
  
  let firstDiff = Math.abs(Math.pow(truncateOne, 2) - n);
  let secondDiff = Math.abs(Math.pow(truncateTwo, 2) - n);
  
  if(firstDiff <= secondDiff){
    return Math.pow(truncateOne, 2);
  }
  return Math.pow(truncateTwo, 2);
}

/*-Even or Odd-*/

function even_or_odd(number) {
  return number % 2 ? "Odd" : "Even"
}

/*-Quarter of the year-*/

const quarterOf = (month) => {
  if(month <= 12 && month > 9){
    return 4
  }else if(month <= 9 && month > 6){
    return 3
  }else if(month <= 6 && month > 3){
    return 2
  }else{
    return 1
  }
}

/*-Beginner - Lost Without a Map-*/

function maps(x){
  return x.map(x => 2 * x)
}

/*-Online RPG: player to qualifying stage?-*/

function playerRankUp (points) {
  return points >= 100 ? "Well done! You have advanced to the qualifying stage. Win 2 out of your next 3 games to rank up." : false
}

/*-Square(n) Sum-*/

function squareSum(numbers){
  return numbers.reduce((acc, val) => acc + (Math.pow(val,2)), 0)
}

/*-Remove String Spaces-*/

function noSpace(x){
  return Array.from(x).filter(x => x !== " ").join("")
}

/*-Sum of positive-*/

function positiveSum(arr) {
  let suma = 0;
  for(let i = 0; i < arr.length ; i++){
    if(arr[i] > 0){
      suma += arr[i];
    }
  }
  return suma;
}

/*-How good are you really?-*/

function betterThanAverage(classPoints, yourPoints) {
  const average = classPoints.reduce((acc, res) => acc + (res/classPoints.length),0);
  return yourPoints > average ? true : false
}

/*-Convert boolean values to strings 'Yes' or 'No'-*/

function boolToWord( bool ){
  return bool ? "Yes" : "No"
}

/*-Convert a Number to a String!-*/

function numberToString(num) {
  return num.toString()
}

/*-Find Multiples of a Number-*/

function findMultiples(integer, limit) {
  let result = []
  let counter = integer;
  do{
    result.push(counter)
    counter += integer;
  }while(counter <= limit)
  return result;
}

/*-Opposite number-*/

function opposite(number) {
  return (-1)*number
}

/*-Beginner Series #1 School Paperwork-*/

function paperwork(n, m) {
  if(n <= 0 || m <= 0) return 0;
  
  return n*m
}

/*-Geometry Basics: Distance between points in 2D-*/

function distanceBetweenPoints(a, b) {
  const distance = Math.sqrt( Math.pow((a.x - b.x),2) + Math.pow((a.y - b.y),2) );
  return distance
}

/*-FIXME: Replace all dots-*/

var replaceDots = function(str) {
  return str.replace(/[.]/g, '-');
}

/*-N-th Power-*/

function index(array, n){
  if(n > (array.length - 1)) return -1
  return Math.pow(array[n],n)
}

/*-Convert a Boolean to a String-*/

function booleanToString(b){
  return b ? "true" : "false"
}

/*-Find the position!-*/

function position(letter){
  const letterLower = letter.toLowerCase();
  return "Position of alphabet: " + (letterLower.charCodeAt() + 1 - "a".charCodeAt())
}

/*-Sum without highest and lowest number-*/

function sumArray(array) {
  if(!array || array === NaN || array.length < 2) return 0
  const max = Math.max(...array);
  const min = Math.min(...array);
  return array.reduce((acc, res) => acc + res, 0) - (max + min)
}

/*-Is he gonna survive?-*/

function hero(bullets, dragons){
  return bullets / 2 - dragons >= 0 
}

/*-Return Negative-*/

function makeNegative(num) {
  if(num < 0) return num
  return (-1)*num
}

/*-Hex to Decimal-*/

function hexToDec(hexString){
  return parseInt(hexString, 16)
}

/*-Is n divisible by x and y?-*/

function isDivisible(n, x, y) {
  return (n % x === 0 && n % y === 0)
}

/*-Capitalization and Mutability-*/

function capitalizeWord(word) {
  return word[0].toUpperCase() + word.substring(1, word.length);
}

/*-Sum Arrays-*/

function sum (numbers) {
  return numbers.reduce((acc, res) => acc + res, 0)
};

/*-Playing with cubes II-*/

class Cube {
  constructor(n){
    this.setSide(n || 0);
  }
  getSide() {
    return this.side; 
  }
  setSide(n) {
    this.side = Math.abs(n);
  }
}

/*-Powers of 2-*/

function powersOfTwo(n){
  let result = [1];
  for(let i = 1; i <= n; i++){
    result.push( Math.pow(2, i) )
  }
  return result
}

/*-CSV representation of array-*/

function toCsvText(array) {
   const mapeado = array.map(x => x.join()).join('\n')
   return mapeado
}

/*-Well of Ideas - Easy Version-*/

function well(x){
  const goods = x.filter(x => x === 'good')
  if(goods.length > 2) return 'I smell a series!'
  if(goods.length === 0) return 'Fail!'
  return 'Publish!'
}

/*-Reverse List Order-*/

function reverseList(list) {
  return list.reverse()
}

/*-Volume of a Cuboid-*/

class Kata {
  static getVolumeOfCuboid(length, width, height) {
    return length* width* height;
  }
}

/*-L1: Set Alarm-*/

function setAlarm(employed, vacation){
  return employed && !vacation
}

/*-A wolf in sheep's clothing-*/

function warnTheSheep(queue) {
  const lastWolf = queue.lastIndexOf("wolf");
  if (queue.length === lastWolf + 1) return "Pls go away and stop eating my sheep"
  
  return `Oi! Sheep number ${queue.length - lastWolf - 1}! You are about to be eaten by a wolf!`
}

/*-Convert a String to a Number!-*/

const stringToNumber = function(str){
  return parseInt(str);
}

/*-Correct the mistakes of the character recognition software-*/

function correct(string){
	const values = {
    5: 'S',
    0: 'O',
    1: 'I'
  }
  
  return string.split('').map(x => {
    if(values[x]){
      return values[x]
    }
    return x
  }).join('')
}

/*-Function 3 - multiplying two numbers-*/

const multiply = (a,b) => a*b

/*-String Templates - Bug Fixing #5-*/

function buildString(...template){
  return `I like ${template.join(', ')}!`;
}

/*-Find Maximum and Minimum Values of a List-*/

var min = function(list){
    return Math.min(...list);
}

var max = function(list){
    return Math.max(...list);
}

/*-You only need one - Beginner-*/

function check(a, x) {
  return a.some(y => y === x)
}

/*-I love you, a little , a lot, passionately ... not at all-*/

function howMuchILoveYou(nbPetals) {
   const values = {
     0: "not at all",
     1: "I love you",
     2: "a little",
     3: "a lot",
     4: "passionately",
     5: "madly",
   }
   
   return values[nbPetals % 6]
}

/*-If you can't sleep, just count sheep!!-*/

var countSheep = function (num){
  let array = [];
  for(let i = 1; i <= num ; i++){
    array.push(i + " sheep...");
  }
  return array.join("")
}

/*-Returning Strings-*/

function greet(name){
  return `Hello, ${name} how are you doing today?`
}

/*-Reversed Strings-*/

function solution(str){
  return str.split("").reverse().join("")
}

/*-Sum of a sequence-*/

const sequenceSum = (begin, end, step) => {
  let sum = 0;
  for(let i = begin; i <= end; i += step) {
     sum += i;
  }
  return sum
};

/*-Sum of two lowest positive integers-*/

function sumTwoSmallestNumbers(numbers) {  
  numbers = numbers.sort((a,b) => a-b);
  return numbers.shift() + numbers.shift()
}

/*-Reversed Words-*/

function reverseWords(str){
  return str.split(" ").reverse().join(" ")
}

/*-Exclamation marks series #1: Remove an exclamation mark from the end of string-*/

function remove (string) {
  if(string[string.length - 1] == "!"){
    return string.substring(0, string.length - 1)
  }
  return string;
}

/*-Remove exclamation marks-*/

function removeExclamationMarks(s) {
  return s.replace(/!/gi, "");
}

/*-Basic Training: Add item to an Array-*/
var websites = []
websites.push("codewars")

/*-Beginner - Reduce but Grow-*/

function grow(x){
  return x.reduce((acc, res) => acc * res ,1)
}

/*-Filling an array (part 1)-*/

function arr(N){
  let arr = [];
  for (let i = 0; i < N; i++){
    arr.push(i)
  }
  return arr;
}

/*-Factorial-*/

function factorial(n){ 
  if (n < 0 || n > 12) throw new RangeError('Range must be between 0 and 12')
  return n > 1 ? n * factorial(n-1) : 1;
}

/*-Array plus array-*/

function arrayPlusArray(arr1, arr2) {
  return [...arr1, ...arr2].reduce((acc, res) => acc + res, 0) //something went wrong
}

/*-Grasshopper - Personalized Message-*/

function greet (name, owner) {
  return name == owner ? 'Hello boss' : 'Hello guest'
}

/*-Simple multiplication-*/

function simpleMultiplication(number) {
  return number % 2 ? 9 * number : 8 * number
}

/*-Remove First and Last Character-*/

function removeChar(str){
  return str.slice(1, -1)
};

/*-Grasshopper - If/else syntax debug-*/

function checkAlive(health) {
  return health > 0;
}

/*-The Wide-Mouthed frog!-*/

function mouthSize(animal) {
  return animal.toLowerCase() == "alligator" ? "small" : "wide"
}

/*-Remove duplicates from list-*/

function distinct(a) {
  return Array.from(new Set(a));
}

/*-Grasshopper - Messi goals function-*/

function goals (laLigaGoals, copaDelReyGoals, championsLeagueGoals) {
  return laLigaGoals + copaDelReyGoals + championsLeagueGoals
}

/*-Find the first non-consecutive number-*/

function firstNonConsecutive (arr) {
  for(let i = 1; i < arr.length ; i++){
    if(arr[i] !== arr[i - 1] + 1) return arr[i]
  }
  return null
}

/*-Abbreviate a Two Word Name-*/

function abbrevName(name){
  const spliteo = name.split(" ").map(x => x[0].toUpperCase()).join(".");
  return spliteo
}

/*-Basic Mathematical Operations-*/

function basicOp(operation, value1, value2)
{
  let result = 0;
  switch(operation){
      case "+": 
        result += value1 + value2;
        break;
      case "-": 
        result += value1 - value2;
        break;
      case "*": 
        result += value1 * value2;
        break;
      case "/": 
        result += value1 / value2;
        break;
      default:
  }
  return result;
}

/*-Grasshopper - Check for factor-*/

function checkForFactor (base, factor) {
  return !(base % factor)
}

/*-For Twins: 1. Types-*/

function typeValidation(variable, type) {
  if(type == "number"){
    return typeof variable === "number"
  }else{
    return typeof variable !== "number"
  }
}

/*-For Twins: 1. Types-*/

function typeValidation(variable, type) {
  return typeof variable === type
}

/*-Multiple of index-*/

function multipleOfIndex(arr) {
  return arr.filter((x, i) => i >= 1 && x % i === 0 );
}

/*-Multiplication table for number-*/

function multiTable(number) {
  let result = [];
  for(let i = 1; i <= 10 ; i++){
    result.push(`${i} * ${number} = ${number * i}`);
  }
  return result.join("\n");
}

/*-Type of sum-*/

function typeOfSum(a, b) {
  if(typeof a === "string" || typeof b === "string") return "string"
  return "number"
}

/*-Convert to Binary-*/

function toBinary(n){
  return parseInt(n.toString(2))
}

/*-Training JS #9: loop statement --while and do..while-*/

function padIt(str,n){
  if(n % 2){
    return "*".repeat(Math.ceil(n/2)) + str + "*".repeat(Math.floor(n/2))
  }else{
    return "*".repeat(n/2) + str + "*".repeat(n/2)
  }
}

/*-Training JS #12: loop statement --for..in and for..of-*/

function giveMeFive(obj){
  let result = []
  for(let value in obj){
    if(value.length === 5)
      result.push(value);
    
    if(obj[value].length === 5)
      result.push(obj[value])
  }
  return result
}

/*-Training JS #10: loop statement --for-*/

function pickIt(arr){
  var odd=[],even=[];
  
  while(arr.length > 0){
    let value = arr.shift();
    if(value % 2){
      odd.push(value);
    }else{
      even.push(value);
    }
  }
  
  return [odd,even];
}

/*-All Star Code Challenge #18-*/

function strCount(str, letter){ 
  let counter = 0;
  for(let i = 0; i < str.length ; i++){
    if(str[i] === letter){
      counter++
    }
  }
  return counter
}

/*-Grasshopper - Terminal game move function-*/

function move (position, roll) {
  return position + 2*roll
}

/*-Removing Elements-*/

function removeEveryOther(arr){
  return arr.filter((x, i) => i % 2 === 0)
}

/*-DNA to RNA Conversion-*/

function DNAtoRNA(dna) {
  return dna.replace(/T/ig, "U")
}

/*-Area of a Square-*/

function squareArea(A){
  const result = Math.pow(4 * (A / (2 * Math.PI)), 2).toFixed(2);
  
  const divide = result.toString().split(".")
  
  if(divide[1] === '00'){
    return parseInt(result);
  }
  
  return parseFloat(result)
}

/*-Switch/Case - Bug Fixing #6-*/

function evalObject(value){
  
  console.log(value)
  
  var result = 0;
  switch(value.operation){
    case'+': 
      result = value.a + value.b;
      break;
    case'-': 
      result = value.a - value.b;
      break;
    case'/': 
      result = value.a / value.b;
      break;
    case'*': 
      result = value.a * value.b;
      break;
    case'%': 
      result = value.a % value.b;
      break;
    case'^': 
      result = Math.pow(value.a, value.b);
      break;
  }
  return result;
}

/*-Is it even?-*/

function testEven(n) {
  return n % 2 === 0
}

/*-Power-*/

function numberToPower(number, power){
  let result = 1;
  for(let i = 1; i <= power; i++){
    result *= number;
  }
  return result;
}

/*-pick a set of first elements-*/

function first(arr, n) {
  if (arguments.length === 1) return [arr.shift()]; 
  return arr.slice(0, n)
}

/*-Localize The Barycenter of a Triangle-*/

function barTriang(p1, p2, p3){
  let x = ((p1[0] + p2[0] + p3[0]) / 3)
  let y = ((p1[1] + p2[1] + p3[1]) / 3)
  
  if(!Number.isInteger(x)){
    x = parseFloat(x.toFixed(4))
  }
  
  if(!Number.isInteger(y)){
    y = parseFloat(y.toFixed(4))
  }
  
  return [x, y]
}

/*-Beginner Series #2 Clock-*/

function past(h, m, s){
  return 1000 * ((h * 60 * 60) + (m * 60) + s)
}

/*-String repeat-*/

function repeatStr (n, s) {
  return s.repeat(n)
}

/*-You Can't Code Under Pressure #1-*/

function doubleInteger(i) {
  return 2 * i;
}

/*-Count Odd Numbers below n-*/

function oddCount(n){
  return Math.floor(n / 2)
}

/*-The 'if' function-*/

function _if(bool, func1, func2) {
  return bool ? func1() : func2()
}

/*--*/
