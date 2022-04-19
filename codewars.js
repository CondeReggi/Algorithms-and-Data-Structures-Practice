function toCamelCase(str) {

  if (str === '') {
    return ''
  }

  const arrStr = str.replaceAll(' ', '').split(/[ .*+\-_?^${}()|[\]\\]/g);

  let strAux = []
  arrStr.forEach((word, index) => {
    if (index === 0) {
      return word[0] !== word[0].toUpperCase() ? strAux.push(word) : strAux.push(word[0].toUpperCase() + word.substring(1))
    }
    strAux.push(word[0].toUpperCase() + word.substring(1))
  });

  return strAux.join('')
}

// Vives en la ciudad de Cartesia, donde todas las carreteras están dispuestas en una cuadrícula 
// perfecta. Llegaste diez minutos antes a una cita, así que decidiste aprovechar para dar un corto 
// paseo. La ciudad proporciona a sus ciudadanos una aplicación de generación de caminatas 
// en sus teléfonos: cada vez que presiona el botón, le envía una serie de cadenas de una 
// letra que representan las instrucciones para caminar (por ejemplo. ['n', 's', 'w', 'e']). 
// Siempre caminas solo una cuadra por cada letra (dirección) y sabes que te lleva un minuto 
// atravesar una cuadra de la ciudad, así que crea una función que volverá a ser verdadera 
// si la caminata que te da la aplicación te llevará exactamente diez minutos (¡no quieres llegar 
// temprano o tarde!) y, por supuesto, devolverte a tu punto de partida. Devuelva false de lo contrario.

function isValidWalk(walk) {
  // return walk.length === 10

  let obj = {}

  for (let i = 0; i < walk.length; i++) {
    obj[walk[i]] = obj[walk[i]] + 1 || 1
  }

  let keys = Object.keys(obj)

  let suma = keys.reduce((acc, res, index) => {
    return (index % 2 === 0) ? acc = acc + obj[res] : acc = acc - obj[res]
  }, 0)

  console.log('esta es la suma ', suma)

  return (walk.length === 10 && suma === 0)

}

// El Western Suburbs Croquet Club tiene dos categorías de membresía, Senior y Open. Les gustaría su 
// ayuda con un formulario de solicitud que les dirá a los posibles miembros en qué categoría se 
// colocarán.

// Para ser un adulto mayor, un miembro debe tener al menos 55 años de edad y tener una discapacidad 
// mayor de 7. En este club de croquet, los hándicaps van de -2 a +26; cuanto mejor sea el jugador, 
// menor será el hándicap.

// Entrada
// La entrada consistirá en una lista de pares. Cada par contiene información para un solo miembro 
// potencial. La información consiste en un entero para la edad de la persona y un entero para 
// la discapacidad de la persona.

// Salida
// La salida consistirá en una lista de valores de cadena (en Haskell: o ) que indique si el 
// miembro respectivo se colocará en la categoría senior o abierta.OpenSenior

function openOrSenior(data){
  let arrayFinal = [];
  
  data.forEach( (element) => {
    if ( element[0] >= 55 && element[1] > 7 ) {
      arrayFinal.push('Senior')
    }else{
      arrayFinal.push('Open')
    }
  } )
  
  return arrayFinal
}

// OR

function openOrSenior(data){
  return data.map(([age, handicap]) => (age > 54 && handicap > 7) ? 'Senior' : 'Open');
}


// Write a function that accepts an array of 10 integers (between 0 and 9), 
// that returns a string of those numbers in the form of a phone number.

function createPhoneNumber(numbers){

  let number = ""

  numbers.forEach( (num, index) => {

    if (index === 0){
      number = `(${num}`
    }else if( index === 2 ){
      number = number + `${num}) `
    }else if( index === 5 ){
      number = number + `${num}-`
    }else{
      number = number + num
    }

  } )

  return number

}

//OR

function createPhoneNumber(numbers){
  return numbers.reduce((p,c) => p.replace('x',c), "(xxx) xxx-xxxx");
}

// You probably know the "like" system from Facebook and other pages. 
// People can "like" blog posts, pictures or other items. We want to create the 
// text that should be displayed next to such an item.

// Implement the function which takes an array containing the names of people that 
// like an item. It must return the display text as shown in the examples:

// []                                -->  "no one likes this"
// ["Peter"]                         -->  "Peter likes this"
// ["Jacob", "Alex"]                 -->  "Jacob and Alex like this"
// ["Max", "John", "Mark"]           -->  "Max, John and Mark like this"
// ["Alex", "Jacob", "Mark", "Max"]  -->  "Alex, Jacob and 2 others like this"

function likes(names) {
  const cantidad = names.length
  if (cantidad === 0) {
    return 'no one likes this'
  }else if( cantidad > 3 ){
    return `${names[0]}, ${names[1]} and ${ cantidad - 2 } others like this`
  }else{
    let result = "";
    names.forEach( (name , index) => result += (index === 0) ? name : (index === cantidad - 1) ? ` and ${name}` : `, ${name}`)
    return `${result} ${ cantidad === 1 ? 'likes this' : 'like this' }`
  }
}

// Trolls are attacking your comment section!
// A common way to deal with this situation is to remove all of the 
// vowels from the trolls' comments, neutralizing the threat.
// Your task is to write a function that takes a string and return a 
// new string with all vowels removed.
// For example, the string "This website is for losers LOL!" would 
// become "Ths wbst s fr lsrs LL!".
// Note: for this kata y isn't considered a vowel.

function disemvowel(str) {

  let vowels = ['a','e','i','o','u'];
  let newStr = ""

  str.split('').forEach( word => vowels.includes(word.toLowerCase()) ? '' : newStr += word )

  return newStr;
}

// OR 

function disemvowel(str) {
  return str.replace(/[aeiou]/gi, '');
}

// Create a function named divisors/Divisors that takes an integer n > 1 and returns an 
// array with all of the integer's divisors(except for 1 and the number itself), 
// from smallest to largest. If the number is prime return the string '(integer) 
// is prime' (null in C#) (use Either String a in Haskell 
//   and Result<Vec<u32>, String> in Rust).

// divisors(12); // should return [2,3,4,6]
// divisors(25); // should return [5]
// divisors(13); // should return "13 is prime"

function divisors(integer) {
  let arrayOffDivisors = []

  for (let i = integer - 1 ; i > 1; i--) {
    if ( integer % i === 0 ) {
      arrayOffDivisors.push( i )
    }
  }

  return arrayOffDivisors.length === 0 ? `${ integer } is prime` : arrayOffDivisors.reverse()
};

// In a factory a printer prints labels for boxes. For one kind of boxes the printer has 
// to use colors which, for the sake of simplicity, are named with letters from a to m.
// The colors used by the printer are recorded in a control string. For example a
//  "good" control string would be aaabbbbhaijjjm meaning that the printer used 
//  three times color a, four times color b, one time color h then one time color a...
// Sometimes there are problems: lack of colors, technical malfunction and a
//  "bad" control string is produced e.g. aaaxbbbbyyhwawiwjjjwwm with letters 
//  not from a to m.
// You have to write a function printer_error which given a string will 
// return the error rate of the printer as a string representing a rational 
// whose numerator is the number of errors and the denominator the length of 
// the control string. Don't reduce this fraction to a simpler expression.
// The string has a length greater or equal to one and contains only letters from ato z.

// s="aaabbbbhaijjjm"
// printer_error(s) => "0/14"

// s="aaaxbbbbyyhwawiwjjjwwm"
// printer_error(s) => "8/22"

function printerError(s) {

  let menoresM = s.split('').filter( word => word <= 'm');

  return `${s.length - menoresM.length}/${s.length}`
}

// OR

function printerError(s) {
  return s.match(/[^a-m]/g).length + "/" + s.length;
}

// The goal of this exercise is to convert a string to a new string where each character 
// in the new string is "(" if that character appears only once in the original string, 
// or ")" if that character appears more than once in the original string. Ignore 
// capitalization when determining if a character is a duplicate.

// Examples
// "din"      =>  "((("
// "recede"   =>  "()()()"
// "Success"  =>  ")())())"
// "(( @"     =>  "))((" 

function duplicateEncode(word){
  let obj = {}
  let result = ""

  for (let i = 0; i < word.length; i++) {
    obj[word[i].toLowerCase()] = obj[word[i].toLowerCase()] + 1 || 1  
    console.log(i , word[i].toLowerCase() , obj[word[i].toLowerCase()] )
  }

  console.log(obj)

  // Object.keys(obj).forEach( elem => result += obj[elem] === 1 ? '(' : ')' )
  return word.split('').map( elem => obj[elem] === 1 ? '(' : ')' ).join('')
}

//OR

function duplicateEncode(word) {
  word = word.toLowerCase();
  return word.replace(/./g, m => word.indexOf(m) == word.lastIndexOf(m) ? '(' : ')');
}

// Digital root is the recursive sum of all the digits in a number.
// Given n, take the sum of the digits of n. If that value has more than 
// one digit, continue reducing in this way until a single-digit number is produced.
// The input will be a non-negative integer.

// Examples
//     16  -->  1 + 6 = 7
//    942  -->  9 + 4 + 2 = 15  -->  1 + 5 = 6
// 132189  -->  1 + 3 + 2 + 1 + 8 + 9 = 24  -->  2 + 4 = 6
// 493193  -->  4 + 9 + 3 + 1 + 9 + 3 = 29  -->  2 + 9 = 11  -->  1 + 1 = 2

function digital_root(n) {
  if ( n > 9 ) {
    let number = n.toString().split('');
    let sum = number.reduce( (acc , res) => acc = acc + Number(res) , 0 )
    return digital_root(sum)
  }else{
    return n
  }
}

// Write a function, persistence, that takes in a positive parameter num and returns its 
// multiplicative persistence, which is the number of times you must multiply the digits 
// in num until you reach a single digit.

// 39 --> 3 (because 3*9 = 27, 2*7 = 14, 1*4 = 4 and 4 has only one digit)
// 999 --> 4 (because 9*9*9 = 729, 7*2*9 = 126, 1*2*6 = 12, and finally 1*2 = 2)
// 4 --> 0 (because 4 is already a one-digit number)

function persistence(num) {
  if ( num < 10 ) return 0 

  let numero = num.toString().split('').reduce( (acc , res) => acc = acc * res , 1 )
  
  return persistence(numero) + 1
}

// OR

const persistence = num => {
  return `${num}`.length > 1 
    ? 1 + persistence(`${num}`.split('').reduce((a, b) => a * +b)) 
    : 0;
}

// You are given an array(list) strarr of strings and an integer k. Your task is to
// return the first longest string consisting of k consecutive strings taken in the array.

function longestConsec(strarr, k) {
  if (strarr.length == 0 || k > strarr.length || k <= 0) return '';
  
  let longStr = '';
  let newStr = '';
  
  for (let i = 0; i < strarr.length; i++){
    newStr = strarr.slice(i, i+k);
    if (newStr.join('').length > longStr.length ){
      longStr = newStr.join('');
    }
  }
  return longStr;
}

// Given two arrays of strings a1 and a2 return a sorted array r in 
// lexicographical order of the strings of a1 which are substrings of strings of a2.

function inArray(array1,array2){
  let arrAux = [];
  for ( let word of array1 ) {
    for (let i = 0; i < array2.length; i++) {
      if ( array2[i].includes(word) ) arrAux.push(word)
    }
  }
  return arrAux.filter( (item , index ) => arrAux.indexOf( item ) === index ).sort()
}

function inArray(array1,array2){
  return array1
    .filter(a1 => array2.find(a2 => a2.match(a1)))
    .sort()
}

// The number 89 is the first integer with more than one digit that fulfills the 
// property partially introduced in the title of this kata. What's the use of saying 
// "Eureka"? Because this sum gives the same number.

// In effect: 89 = 8^1 + 9^2

// The next number in having this property is 135.
// See this property again: 135 = 1^1 + 3^2 + 5^3
// We need a function to collect these numbers, that may receive two integers a, b 
// that defines the range [a, b] (inclusive) and outputs a list of the sorted numbers 
// in the range that fulfills the property described above.

function sumDigPow(a, b) {
  let arrAux = []

  for (let i = a; i < b; i++) {
    let number = i.toString().split('');
    let sum = number.reduce( (acc , res, index) => acc = acc + Math.pow( parseInt(res) , index + 1 ) , 0 )
    if ( sum === i ) arrAux.push( sum )
  }

  return arrAux;
}

// If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 
// 3, 5, 6 and 9. The sum of these multiples is 23.

// Finish the solution so that it returns the sum of all the multiples of 3 or 5 
// below the number passed in. Additionally, if the number is negative, return 0 
// (for languages that do have them).

// Note: If the number is a multiple of both 3 and 5, only count it once.

function solution(number){
  let num = 0;

  if ( number < 0 ) return 0

  for (let i = 0; i < number ; i++) {
    if ( i % 3 === 0 || i % 5  === 0 ) {
      num += i
    }
  }

  return num 
}

// Inclusion exclusion wenardiño

function solution(number){
  let n3 = Math.floor(--number/3), n5 = Math.floor(number/5), n15 = Math.floor(number/15);
  return (3 * n3 * (n3 + 1) + 5 * n5 * (n5 + 1) - 15 * n15 * (n15+1)) /2;
}

// Given an array of integers, find the one that appears an odd number of times.
// There will always be only one integer that appears an odd number of times.

// Examples
// [7] should return 7, because it occurs 1 time (which is odd).
// [0] should return 0, because it occurs 1 time (which is odd).
// [1,1,2] should return 2, because it occurs 1 time (which is odd).
// [0,1,0,1,0] should return 0, because it occurs 3 times (which is odd).
// [1,2,2,3,3,3,4,3,3,3,2,2,1] should return 4, because it appears 1 time (which is odd).

function findOdd(A) {
  
  let obj = {}

  for ( let number of A ) {
    obj[number.toString()] = obj[number] + 1 || 1
  }

  let result = Object.keys(obj).filter( el => obj[el] % 2 !== 0 )
  return parseInt(result)

}

// Hace como lo mismo pero usa un return dentro de un for

function findOdd(A) {
  var obj = {};
  A.forEach(function(el){
    obj[el] ? obj[el]++ : obj[el] = 1;
  });
  
  for(prop in obj) {
    if(obj[prop] % 2 !== 0) return Number(prop);
  }
}

// Write Number in Expanded Form
// You will be given a number and you will need to return 
// it as a string in Expanded Form. For example:

function expandedForm(num) {
  let largo = num.toString().length
  let number = num.toString()
  let cadena = []

  for (let i = 0; i < largo ; i++){
    if ( number[i] !== '0' ) {
      cadena.push( parseInt(number[i])*Math.pow(10 , (largo - i - 1)) )
    }
  }

  return cadena.join(' + ')
}


// Programa con python

// def filter_list(l) :
//     y = []
//     for number in l :
//         if ( type(number) == int ) : y.append( number )
//     return y

// What is an anagram? Well, two words are anagrams of each other if they both contain 
// the same letters. For example:

// 'abba' & 'baab' == true

// 'abba' & 'bbaa' == true

// 'abba' & 'abbba' == false

// 'abba' & 'abca' == false

// Write a function that will find all the anagrams of a word from a list. 
// You will be given two inputs a word and an array with words. You should 
// return an array of all the anagrams or an empty array if there are none. For example:

function anagrams(word, words) {
  let palabra = word.split('').sort().join('');
  let arrAux = [];

  for ( palabraWords of words ){
    let verificador = palabraWords.split('').sort().join('');

    if ( palabra.length === verificador.length && palabra.includes( verificador ) ) {
      arrAux.push( palabraWords )
    }
  }
  return arrAux
}

// Complete the solution so that it strips all text that follows any of a set of comment markers passed in. 
// Any whitespace at the end of the line should also be stripped out.

// Given an input string of:

// apples, pears # and bananas
// grapes
// bananas !apples

// The output expected would be:

// apples, pears
// grapes
// bananas

function solution(input, markers) {
  let isFounded = false;
  let letters = input.split('');
  let stripped = letters.reduce((acc , letter) => {
    if(markers.includes(letter)) isFounded = true;
    if(isFounded && letter === '\n') isFounded = false;
    if(!isFounded) acc.push(letter)
      return acc;
  }, [])
  
  return stripped.join('').replace(/\s\n/ , '\n').trim();
};

function solution(input, markers) {
  return input.split('\n').map(
    line => markers.reduce(
      (line, marker) => line.split(marker)[0].trim(), line
    )
  ).join('\n')
}

//Trim sirve para que no hayan espacios --> ' hoo     ' => 'hoo' 

// You are given a node that is the beginning of a linked list. This list always contains a tail and 
// a loop. Your objective is to determine the length of the loop.

// For example in the following picture the tail's size is 3 and the loop size is 12:
// Use the `getNext' method or 'next' property to get the following node.
// node.getNext()
// node.next

function loop_size(node){
  let numberOfNodes = 0;
  let nuevaCadena = [];
  
  while ( node && !nuevaCadena.includes(node) ){
    nuevaCadena.push( node )
    numberOfNodes++
    node = node.next
  }
  
  return numberOfNodes - nuevaCadena.indexOf(node)
}

// productFib(714) # should return (21, 34, true), 
//                 # since F(8) = 21, F(9) = 34 and 714 = 21 * 34

// productFib(800) # should return (34, 55, false), 
//                 # since F(8) = 21, F(9) = 34, F(10) = 55 and 21 * 34 < 800 < 34 * 55
// -----
// productFib(714) # should return [21, 34, true], 
// productFib(800) # should return [34, 55, false], 
// -----
// productFib(714) # should return {21, 34, 1}, 
// productFib(800) # should return {34, 55, 0},        
// -----
// productFib(714) # should return {21, 34, true}, 
// productFib(800) # should return {34, 55, false}, 

function productFib(prod) {
  return fib(0, 1, prod); //Condiciones inciales a0 = 0 a1= 1 
}

function fib(a, b, prod) {
  if (a * b < prod) {
    return fib(b, a + b, prod); // El recursivo de Fibonacci
  } else if (a * b == prod) {
    return [a, b, true]; // Si es eso return eso
  } else {
    return [a, b, false]; // Se paso entonces false
  }
}

// OR

function productFib(prod){
  let a0 = 0;
  let a1 = 1;
  let aux;

  while ( a0 * a1 < prod ) {
    aux = a1;
    a1 = a1 + a0
    a0 = aux;
  }

  return [ a0 , a1 , a0 * a1 === prod ];
}

// Take the following IPv4 address: 128.32.10.1
// This address has 4 octets where each octet is a single byte (or 8 bits).

// 1st octet 128 has the binary representation: 10000000
// 2nd octet 32 has the binary representation: 00100000
// 3rd octet 10 has the binary representation: 00001010
// 4th octet 1 has the binary representation: 00000001
// So 128.32.10.1 == 10000000.00100000.00001010.00000001
// Because the above IP address has 32 bits, we can represent it as the unsigned 32 bit number: 2149583361
// Complete the function that takes an unsigned 32 bit number and returns a string representation of its IPv4 address.

function int32ToIp(int32){
  let arr = [];
  let number = int32.toString(2);
  
  for ( let i = 0 ; i < 4 ; i++ ) {
    let binary = number.slice(8*i , 8*(i+1))
    
    if ( binary ) {
      arr.push( binary )
    }else{
      arr.push( '0' ) //Caso que es isNaN
    }
  }
  
  return arr.map( el => parseInt(el , 2) ).join('.')
}


function scramble(str1, str2) {
  if ( !str1 || !str2 ){
    return false;
  }

  for (let i = 0; i < str2.length; i++) {
    if ( str1.indexOf( str2[i] ) === -1 ) return false
  }

  return true
}

// Consider a sequence u where u is defined as follows:

// The number u(0) = 1 is the first one in u.
// For each x in u, then y = 2 * x + 1 and z = 3 * x + 1 must be in u too. There are no other numbers in u.
// Ex: u = [1, 3, 4, 7, 9, 10, 13, 15, 19, 21, 22, 27, ...]
// 1 gives 3 and 4, then 3 gives 7 and 10, 4 gives 9 and 13, then 7 gives 15 and 22 and so on...

// Task: Given parameter n the function dbl_linear (or dblLinear...) returns the element u(n) of the ordered (with <) sequence u.

// Example: dbl_linear(10) should return 22

function dblLinear(n) {
  
  var u = [1], pt2 = 0, pt3 = 0; //two pointer
  
  for(var i = 1;i<=n;i++){
    u[i] = Math.min(2* u[pt2] + 1, 3*u[pt3] + 1);
    if(u[i] == 2 * u[pt2] + 1) pt2++;
    if(u[i] == 3 * u[pt3] + 1) pt3++;
  }

  return u[n];

}

// Complete the function/method (depending on the language) to return true/True when its argument is an array that has the same nesting 
// structures and same corresponding length of nested arrays as the first array.

// For example:

//  // should return true
// [ 1, 1, 1 ].sameStructureAs( [ 2, 2, 2 ] );          
// [ 1, [ 1, 1 ] ].sameStructureAs( [ 2, [ 2, 2 ] ] );  

Array.prototype.sameStructureAs = function (other) {

  // this hace referencia a Array.prototype

  if ( this.length !== other.length ) return false;

  for ( let i = 0 ; i < this.length ; i++ ) {
    if ( Array.isArray( this[i] ) && !this[i].sameStructureAs(other[i]) ) return false;
    if ( !Array.isArray( this[i] ) && Array.isArray(other[i]) ) return false;
  }

  return true;
};

// Given an n x n array, return the array elements arranged from outermost elements to the middle element, traveling clockwise.

// array = [[1,2,3],
//          [4,5,6],
//          [7,8,9]]
// snail(array) #=> [1,2,3,6,9,8,7,4,5]

function snail(array) {
  var vector = [];
  while (array.length) {
    vector.push(...array.shift());
    array.map( row => vector.push(row.pop()) );
    array.reverse().map( row => row.reverse() );
  }
  return vector;
}

// In this kata, your task is to create a regular expression capable of evaluating binary strings 
// (strings with only 1s and 0s) and determining whether the given string represents a number divisible by 3.

// Take into account that:

// An empty string might be evaluated to true (it's not going to be tested, so you don't need to worry about 
// it - unless you want)
// The input should consist only of binary digits - no spaces, other digits, alphanumeric characters, etc.
// There might be leading 0s.
// Examples (Javascript)
// multipleof3Regex.test('000') should be true
// multipleof3Regex.test('001') should be false
// multipleof3Regex.test('011') should be true
// multipleof3Regex.test('110') should be true
// multipleof3Regex.test(' abc ') should be false
// You can check more in the example test cases

const multipleOf3Regex = /^(0*(1(01*0)*1)*)*$/;

// Given the string representations of two integers, return the string representation of the sum of those integers.
// For example: sumStrings('1','2') // => '3'

function sumStrings(a,b) { 
  let result = eval(`${a} + ${b}`);
  return result.toString()
}

// Encontrar numero duplicado en arreglo ordenado O(n^2)

const findDuplicate = ( arr ) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i+1; j < arr.length; j++) {
      if ( arr[i] == arr[j] ){
        return arr[i]
      }
    }
  }
}

// Emcontrar numero unico duplicado en arreglo ordenado O(n)

const findDuplicateGauss = ( arr ) => {
  const n = arr[ arr.length - 1 ]; // El mas grande
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]
  }
  return sum - ( n * ( n + 1 ) ) / 2 ;
}

// Write a function called sumIntervals/sum_intervals() that accepts an array of intervals, and returns the sum of all the interval 
// lengths. Overlapping intervals should only be counted once.

// Intervals
// Intervals are represented by a pair of integers in the form of an array. The first value of the interval will always be less than the second value. 
// Interval example: [1, 5] is an interval from 1 to 5. The length of this interval is 4.

function sumIntervals(intervals) {
  let sum = 0;

  for (let i = 0; i < intervals.length; i++) {
    let firstPosition = intervals[i][0];
    let lastPosition = intervals[i][ intervals[i].length - 1 ]

    sum += (lastPosition - firstPosition);
  }
  return sum
}

// Jaden Smith, the son of Will Smith, is the star of films such as The Karate Kid (2010) and After Earth (2013). Jaden is also known for some of his philosophy 
// that he delivers via Twitter. When writing on Twitter, he is known for almost always capitalizing every word. For simplicity, you'll have to capitalize each word, 
// check out how contractions are expected to be in the example below.
// Your task is to convert strings to how they would be written by Jaden Smith. The strings are actual quotes from Jaden Smith, but they are not capitalized 
// in the same way he originally typed them.

// Example:
// Not Jaden-Cased: "How can mirrors be real if our eyes aren't real"
// Jaden-Cased:     "How Can Mirrors Be Real If Our Eyes Aren't Real"

String.prototype.toJadenCase = function () {
  let variable = this.split(" ");
  variable = variable.map(x => x[0].toUpperCase() + x.substring(1, x.length));
  return variable.join(" ");
};

// The Western Suburbs Croquet Club has two categories of membership, Senior and Open. They would like your help with an application form that will tell 
// prospective members which category they will be placed.

// To be a senior, a member must be at least 55 years old and have a handicap greater than 7. In this croquet club, handicaps range from -2 to +26; 
// the better the player the lower the handicap.

// Input
// Input will consist of a list of pairs. Each pair contains information for a single potential member. Information consists of an integer for the person's 
// age and an integer for the person's handicap.

// Output
// Output will consist of a list of string values (in Haskell and C: Open or Senior) stating whether the respective member is to be placed in the 
// senior or open category.

function openOrSenior(data){
  return data.map( ([a,b]) => (a >= 55 && b > 7) ? "Senior" : "Open" )
}

// In this little assignment you are given a string of space separated numbers, and have to return the highest and lowest number.

// Examples:
// highAndLow("1 2 3 4 5");  // return "5 1"
// highAndLow("1 2 -3 4 5"); // return "5 -3"
// highAndLow("1 9 3 4 -5"); // return "9 -5"

function highAndLow(numbers){
  let arr = numbers.split(" ").map(x => parseInt(x));
  let min = arr[0] > arr[1] ? arr[1] : arr[0];
  let max = arr[0] < arr[1] ? arr[1] : arr[0];
  
  for (let i = 2 ; i < arr.length ; i++){
    if( arr[i] > max ){
      max = arr[i];
    }
    if( arr[i] < min ){
      min = arr[i];
    }
  }
  return `${max} ${min}`
  
  //OR
  // numbers = numbers.split(' ').map(Number);
  // return Math.max.apply(0, numbers) + ' ' + Math.min.apply(0, numbers);
} 

// Task:
// Given a list of integers, determine whether the sum of its elements is odd or even.
// Give your answer as a string matching "odd" or "even".
// If the input array is empty consider it as: [0] (array with a zero).

// Examples:
// Input: [0]
// Output: "even"

// Input: [0, 1, 4]
// Output: "odd"

function oddOrEven(array) {
   return array.reduce( (acc, sig) => acc + sig , 0) % 2 === 0 ? "even" : "odd"
}

// Enough is enough!
// Alice and Bob were on a holiday. Both of them took many pictures of the places they've been, and now they want to show Charlie their entire collection. However, 
// Charlie doesn't like these sessions, since the motive usually repeats. He isn't fond of seeing the Eiffel tower 40 times. He tells them that he will only sit 
// during the session if they show the same motive at most N times. Luckily, Alice and Bob are able to encode the motive as a number. Can you help them to remove 
// numbers such that their list contains each number only up to N times, without changing the order?

// Task
// Given a list and a number, create a new list that contains each number of lst at most N times without reordering. For example if the input number is 2, and the 
// input list is [1,2,3,1,2,1,2,3], you take [1,2,3,1,2], drop the next [1,2] since this would lead to 1 and 2 being in the result 3 times, and then take 3, which 
// leads to [1,2,3,1,2,3]. With list [20,37,20,21] and number 1, the result would be [20,37,21].

function deleteNth(arr,x){
  var obj = {}
  return arr.filter(function(number){
    obj[number] = obj[number] ? obj[number] + 1 : 1
    return obj[number] <= x
  })
}

// Make a program that filters a list of strings and returns a list with only your friends name in it.
// If a name has exactly 4 letters in it, you can be sure that it has to be a friend of yours! Otherwise, you can be sure he's not...
// Ex: Input = ["Ryan", "Kieran", "Jason", "Yous"], Output = ["Ryan", "Yous"]
// i.e.

// friend ["Ryan", "Kieran", "Mark"] `shouldBe` ["Ryan", "Mark"]

function friend(friends){
  return friends.filter(x => x.length === 4)
}

// Your task is to sort a given string. Each word in the string will contain a single number. This number is the position the word should have in the result.
// Note: Numbers can be from 1 to 9. So 1 will be the first word (not 0).
// If the input string is empty, return an empty string. The words in the input String will only contain valid consecutive numbers.

// Examples
// "is2 Thi1s T4est 3a"  -->  "Thi1s is2 3a T4est"

function order(words){
  let array = words.split(" ");
  let cadena = '';
  for(let i = 1; i <= array.length ; i++){
    cadena += `${array.filter(x => x.includes(i))} `;
  }
  return cadena.trim();
}

// Implement a function that accepts 3 integer values a, b, c. The function should return true if a triangle can be built with the sides of given length and 
// false in any other case.
// (In this case, all triangles must have surface greater than 0 to be accepted).

function isTriangle(a,b,c){
    let arr = [a,b,c].sort((a,b) => a-b);
    return arr[2] < arr[0] + arr[1] ? true : false
  
    // OR  =>  Math.max(a,b,c) < (a+b+c)/2
}

// Given an array of ones and zeroes, convert the equivalent binary value to an integer.
// Eg: [0, 0, 0, 1] is treated as 0001 which is the binary representation of 1.
// Examples:

// Testing: [0, 0, 0, 1] ==> 1
// Testing: [0, 0, 1, 0] ==> 2
// Testing: [0, 1, 0, 1] ==> 5

const binaryArrayToNumber = arr => {
    return parseInt( arr.join(""),2 )
};

// Write a function that takes an array of numbers (integers for the tests) and a target number. It should find two different items in the array that, when added together, give the target value. The indices of these items should then be returned in a tuple / list (depending on your language) like so: (index1, index2).
// For the purposes of this kata, some tests may have multiple answers; any valid solutions will be accepted.
// The input will always be valid (numbers will be an array of length 2 or greater, and all of the items will be numbers; target will always be the sum of two different items from that array).

// twoSum [1, 2, 3] 4 === (0, 2)

function twoSum(numbers, target) {
  for (i = 0; i < numbers.length; i++) {
    second = numbers.indexOf(target - numbers[i], i+1);
    if (second > i) {
      return [i, second];
    }
  }
}
