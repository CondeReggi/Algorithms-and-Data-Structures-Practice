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

// Given two arrays of strings a1 and a2 return a sorted array r in lexicographical order of the strings of a1 which are substrings of strings of a2.

// Example 1:
// a1 = ["arp", "live", "strong"]
// a2 = ["lively", "alive", "harp", "sharp", "armstrong"]

function inArray(array1,array2){
  return array1.filter(x => array2.some(y => y.includes(x))).sort()
}

// There is an array with some numbers. All numbers are equal except for one. Try to find it!

// findUniq([ 1, 1, 1, 2, 1, 1 ]) === 2
// findUniq([ 0, 0, 0.55, 0, 0 ]) === 0.55
// It’s guaranteed that array contains at least 3 numbers.
// The tests contain some very huge arrays, so think about performance.
// This is the first kata in series:

function findUniq(arr) {
  let obj = {}
  for (let i = 0; i < arr.length; i++) {
    obj[arr[i]] = obj[arr[i]] + 1 || 1
  }
  let number;
  Object.keys(obj).forEach(x => {
    if (obj[x] == 1) {
      number = x;
    }
  })
  return Number(number);
  
  //OR =>  return arr.find(n => arr.indexOf(n) === arr.lastIndexOf(n));
}

// In this simple Kata your task is to create a function that turns a string into a Mexican Wave. You will be passed a string and you must return 
// that string in an array where an uppercase letter is a person standing up

// Example
// wave("hello") => ["Hello", "hEllo", "heLlo", "helLo", "hellO"]

function wave(str){
  let arr = [];
  str.split("").forEach( (x,i) => { 
    if (x !== " ") {
      arr.push( `${ str.substring(0, i) }${ str[i].toUpperCase() }${str.substring(i + 1, str.length )}` )
    }
  });
  return arr;
}

// Write a function that when given a URL as a string, parses out just the domain name and returns it as a string. For example:
// url = "http://github.com/carbonfive/raygun" -> domain name = "github"

function domainName(url){
  let link = url.split("//")[1].split("www.");
  if( link[0] === "" ) {
    link.shift();
  };
  return link[0].split('.')[0];
}

// Digital root is the recursive sum of all the digits in a number.
// Given n, take the sum of the digits of n. If that value has more than one digit, 
// continue reducing in this way until a single-digit number is produced. The input will be a non-negative integer.

// Examples
//    16  -->  1 + 6 = 7
//   942  -->  9 + 4 + 2 = 15  -->  1 + 5 = 6

function digital_root(n) {
  let a = n.toString().split("").reduce((a,b) => Number(b) + Number(a), 0);
  if (a > 9) {
    return digital_root(a);
  }
  return  a;
}

// If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
// Finish the solution so that it returns the sum of all the multiples of 3 or 5 below the number passed in. Additionally, if the number 
// is negative, return 0 (for languages that do have them).
// Note: If the number is a multiple of both 3 and 5, only count it once.

function solution(number){
  let a = 0;
  for(let i = number - 1 ; i > 0 ; i--){
    if( i % 3 === 0 || i % 5 === 0 ) a += i;
  }
  return a;
}

// Write a function named first_non_repeating_letter that takes a string input, and returns the first character that is not repeated anywhere in the string.
// For example, if given the input 'stress', the function should return 't', since the letter t only occurs once in the string, and occurs first in the string.
// As an added challenge, upper- and lowercase letters are considered the same character, but the function should return the correct case for the initial letter. For example, the input 'sTreSS' should return 'T'.
// If a string contains all repeating characters, it should return an empty string ("") or None -- see sample tests.

function firstNonRepeatingLetter(s) {
  let arr1 = s.split("")
  let arr = arr1.map(x => x.toLowerCase());
  arr = arr.filter(x => arr.indexOf(x) === arr.lastIndexOf(x));
  if (arr.length > 0 && arr1.indexOf(arr[0]) !== -1){
    return arr[0];
  }
  return arr[0] ? arr[0].toUpperCase() : '';
}

// Your job is to write a function which increments a string, to create a new string.
// If the string already ends with a number, the number should be incremented by 1.
// If the string does not end with a number. the number 1 should be appended to the new string.
// Examples:

// foo -> foo1
// foobar23 -> foobar24

function incrementString (strng) {
  let i = 0;
  //Encontrar primer ocurrencia de numero
  while(i < strng.length && isNaN(strng[i])){
    i++;
  }
  let numero = strng.substring(i, strng.length);
  let numeroAPoner = eval(`${numero} + 1`).toString();
  let returnable = `${strng.substring(0,i)}`;
  for(let i = 0; i < numero.length - numeroAPoner.length ; i++){
    returnable += '0'
  }
  return returnable + numeroAPoner;
}

// The number 89 is the first integer with more than one digit that fulfills the property partially introduced in the title of this kata. What's the use of saying "Eureka"? Because this sum gives the same number.
// In effect: 89 = 8^1 + 9^2
// The next number in having this property is 135.
// See this property again: 135 = 1^1 + 3^2 + 5^3
// We need a function to collect these numbers, that may receive two integers a, b that defines the range [a, b] (inclusive) and outputs a list of the sorted numbers in the range that fulfills the property described above.
// Let's see some cases:

// sumDigPow(1, 10) == [1, 2, 3, 4, 5, 6, 7, 8, 9]
// sumDigPow(1, 100) == [1, 2, 3, 4, 5, 6, 7, 8, 9, 89]
// If there are no numbers of this kind in the range [a, b] the function should output an empty list.
// sumDigPow(90, 100) == []

function sumDigPow(a, b) {
  let arr = [];
  for(let i = a; i <= b; i++){
    if (i == calculateProperty(i.toString())) arr.push(i);
  }
  return arr;
}

const calculateProperty = (number) => {
  let num = number.split("").map(x => Number(x)); // [1,3,4]
  let sum = num.reduce( (a, b, i) => a + Math.pow(b, i + 1) , 0)
  return sum;
}

// You will be given an array of numbers. You have to sort the odd numbers in ascending order while leaving the even numbers at their original positions.
// Examples
// [7, 1]  =>  [1, 7]
// [5, 8, 6, 3, 4]  =>  [3, 8, 6, 5, 4]
// [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]  =>  [1, 8, 3, 6, 5, 4, 7, 2, 9, 0]

function sortArray(array) {
  const odd = array.filter((x) => x % 2).sort((a,b) => a - b);
  return array.map((x) => x % 2 ? odd.shift() : x);
}

// You are given a node that is the beginning of a linked list. This list always contains a tail and a loop. Your objective is to determine the length of the loop.
//For example in the following picture the tail's size is 3 and the loop size is 12:
// Use the `getNext' method or 'next' property to get the following node.
// node.getNext()
// node.next
// Note: do NOT mutate the nodes!
// Thanks to shadchnev, I broke all of the methods from the Hash class.
// Don't miss dmitry's article in the discussion after you pass the Kata !! 

function loop_size(node){
  let arr = [];
  let valor = node;
  
  while( arr.indexOf(valor) === -1 ){
    arr.push(valor);
    valor = valor.getNext();
  }
  return arr.length - arr.indexOf(valor)
}

// The marketing team is spending way too much time typing in hashtags.
// Let's help them with our own Hashtag Generator!

// Here's the deal:

// It must start with a hashtag (#).
// All words must have their first letter capitalized.
// If the final result is longer than 140 chars it must return false.
// If the input or the result is an empty string it must return false.
// Examples
// " Hello there thanks for trying my Kata"  =>  "#HelloThereThanksForTryingMyKata"
// "    Hello     World   "                  =>  "#HelloWorld"
// ""                                        =>  false

function generateHashtag (str) {
  if (str == " " || str == "" ) return false;
  let arr = str.split("").map(x => x.trim()).join("");
  return arr.lenth > 140 ? false : `#${arr}`;
}

// You need to write regex that will validate a password to make sure it meets the following criteria:
// At least six characters long
// contains a lowercase letter
// contains an uppercase letter
// contains a number
// Valid passwords will only be alphanumeric characters.

function validate(password) {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/.test(password);
}

// This time we want to write calculations using functions and get the results. Let's have a look at some examples:
// seven(times(five())); // must return 35
// four(plus(nine())); // must return 13
// eight(minus(three())); // must return 5
// six(dividedBy(two())); // must return 3
// Requirements:

// There must be a function for each number from 0 ("zero") to 9 ("nine")
// There must be a function for each of the following mathematical operations: plus, minus, times, dividedBy
// Each calculation consist of exactly one operation and two numbers
// The most outer function represents the left operand, the most inner function represents the right operand
// Division should be integer division. For example, this should return 2, not 2.666666...:
// eight(dividedBy(three()));

function zero(a) {
  return a !== undefined ? parseInt(0) : "0"
}

function one(a) {
  return a !== undefined ? eval("1" + a) : "1"
}
function two(a) {
  return a !== undefined ? eval("2" + a) : "2"
}
function three(a) {
  return a !== undefined ? eval("3" + a) : "3"
}
function four(a) {
  return a !== undefined ? eval("4" + a) : "4"
}
function five(a) {
  return a !== undefined ? eval("5" + a) : "5"
}
function six(a) {
  return a !== undefined ? eval("6" + a) : "6"
}
function seven(a) {
  return a !== undefined ? eval("7" + a) : "7"
}
function eight(a) {
  return a !== undefined ? eval("8" + a) : "8"
}
function nine(a) {
  return a !== undefined ? eval("9" + a) : "9"
}

function plus(a) { 
  return "+" + a }
function minus(a) {
  return "-" + a }
function times(a) {
  return "*" + a }
function dividedBy(a) {
  return "/" + a }

// Given the string representations of two integers, return the string representation of the sum of those integers.
// For example:
// sumStrings('1','2') // => '3'

function sumStrings(a,b) {
  //Tengo que borrar los ceros a la izquierda para usar el eval
  let arrayDeA = a.split("");
  let arrayDeB = b.split("");
  let i = 0;
  while(arrayDeA[i] == "0"){
    arrayDeA.shift();
  }
  i = 0;
  while(arrayDeA[i] == "0"){
    arrayDeB.shift();
  }
  a = arrayDeA.join("");
  b = arrayDeB.join("");
  
  //Use big int to values — which are too large (acept string)
  
  return (BigInt(a || 0) + BigInt(b || 0)).toString();
  // OR return (BigInt(a) + BigInt(b)).toString(); 
}

// In this kata you have to correctly return who is the "survivor", ie: the last element of a Josephus permutation.
// Basically you have to assume that n people are put into a circle and that they are eliminated in steps of k elements, like this:
// josephus_survivor(7,3) => means 7 people in a circle;
// one every 3 is eliminated until one remains
// [1,2,3,4,5,6,7] - initial sequence
// [1,2,4,5,6,7] => 3 is counted out
// [1,2,4,5,7] => 6 is counted out
// [1,4,5,7] => 2 is counted out
// [1,4,5] => 7 is counted out
// [1,4] => 5 is counted out
// [4] => 1 counted out, 4 is the last element - the survivor!
// The above link about the "base" kata description will give you a more thorough insight about the origin of this kind of permutation, but basically that's all that there is to know to solve this kata.

function josephusSurvivor(n,k){
  if(n > 1){
    return (josephusSurvivor(n - 1, k) + k - 1) % n + 1;
  }
  return 1
}

// The prime numbers are not regularly spaced. For example from 2 to 3 the gap is 1. From 3 to 5 the gap is 2. From 7 to 11 it is 4. Between 2 and 50 we have the following pairs of 2-gaps primes: 3-5, 5-7, 11-13, 17-19, 29-31, 41-43
// A prime gap of length n is a run of n-1 consecutive composite numbers between two successive primes (see: http://mathworld.wolfram.com/PrimeGaps.html).
// We will write a function gap with parameters:
// g (integer >= 2) which indicates the gap we are looking for
// m (integer > 2) which gives the start of the search (m inclusive)
// n (integer >= m) which gives the end of the search (n inclusive)
// n won't go beyond 1100000.
// In the example above gap(2, 3, 50) will return [3, 5] or (3, 5) or {3, 5} which is the first pair between 3 and 50 with a 2-gap.
// So this function should return the first pair of two prime numbers spaced with a gap of g between the limits m, n if these numbers exist otherwise `nil or null or None or Nothing (or ... depending on the language).

// Examples:
// - gap(2, 5, 7) --> [5, 7] or (5, 7) or {5, 7}
// gap(2, 5, 5) --> nil. In C++ {0, 0}. In F# [||]. In Kotlin, Dart and Prolog return []`
// gap(4, 130, 200) --> [163, 167] or (163, 167) or {163, 167}

function gap(g, m, n) {
  let arr = []
  let j = m + g - 1;
  let booleano = false;
  while(j <= n){
    if(esPrimo(j) && arr.length < 2){
      arr.push(j);
      booleano = true;
    }
    console.log(g ,"ocurrencia: ", j - m, "valor: ", j, "largo del array: ", arr.length, "array: ", arr)
    j += g;
  }
  return arr.length !== 0 ? arr : null;
}
function esPrimo(a){
  for (let i = 2; i < a; i++){
    if( a % i === 0) return false;
  }
  return true;
}

// The rgb function is incomplete. Complete it so that passing in RGB decimal values will result in a hexadecimal representation being returned. Valid decimal values for RGB are 0 - 255. Any values that fall out of that range must be rounded to the closest valid value.
// Note: Your answer should always be 6 characters long, the shorthand with 3 will not work here.
// The following are examples of expected output values:

// rgb(255, 255, 255) // returns FFFFFF
// rgb(255, 255, 300) // returns FFFFFF
// rgb(0,0,0) // returns 000000
// rgb(148, 0, 211) // returns 9400D3

function rgb(r, g, b){
  let array = [r , g , b];
  return array.map( x => {
    if (x < 0) x = 0;
    if(x > 255) x = 255;
    return x.toString(16).padStart(2, '0').toUpperCase()
  } ).join('');
}

// For a given chemical formula represented by a string, count the number of atoms of each element contained in the molecule and return an object (associative array in PHP, Dictionary<string, int> in C#, Map<String,Integer> in Java).
// For example:
// var water = 'H2O';
// parseMolecule(water); // return {H: 2, O: 1}
// var magnesiumHydroxide = 'Mg(OH)2';
// parseMolecule(magnesiumHydroxide); // return {Mg: 1, O: 2, H: 2}
// var fremySalt = 'K4[ON(SO3)2]2';
// parseMolecule(fremySalt); // return {K: 4, O: 14, N: 2, S: 4}
// As you can see, some formulas have brackets in them. The index outside the brackets tells you that you have to multiply count of each atom inside the bracket on this index. For example, in Fe(NO3)2 you have one iron atom, two nitrogen atoms and six oxygen atoms.

function parseMolecule(formula) {
  let arr = formula.split("");
  let obj = {}
  let solo_letras = arr.filter(x => RegExp(/^[A-Z]/).test(x));
  
  for(let i = 0; i < solo_letras.length ; i++){
    let indexOfletraEnArray = arr.indexOf(solo_letras[i]);
    
    if(arr[indexOfletraEnArray + 1] && !RegExp(/^[A-Z]/).test(arr[indexOfletraEnArray + 1])){
      obj[solo_letras[i]] = parseInt(arr[indexOfletraEnArray + 1])
    }else{
      obj[solo_letras[i]] = 1
    }
  }
  return obj
}

// The Fibonacci numbers are the numbers in the following integer sequence (Fn):
// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, ...
// such as
// F(n) = F(n-1) + F(n-2) with F(0) = 0 and F(1) = 1.
// Given a number, say prod (for product), we search two Fibonacci numbers F(n) and F(n+1) verifying
// F(n) * F(n+1) = prod.
// Your function productFib takes an integer (prod) and returns an array:
// [F(n), F(n+1), true] or {F(n), F(n+1), 1} or (F(n), F(n+1), True)

function productFib(prod){
  var a = 1
  var b = 1;
  while (a*b < prod) {
    var next = a+b;
    a = b;
    b = next;
  }
  return [a, b, a*b===prod];
}

// For this exercise you will be strengthening your page-fu mastery. You will complete the PaginationHelper class, which is a utility class helpful for querying paging information related to an array.
// The class is designed to take in an array of values and an integer indicating how many items will be allowed per each page. The types of values contained within the collection/array are not relevant.
// The following are some examples of how this class is used:

// TODO: complete this object/class

// The constructor takes in an array of items and a integer indicating how many
// items fit within a single page
function PaginationHelper(collection, itemsPerPage){
  this.collection = collection;
  this.items = itemsPerPage;
}

// returns the number of items within the entire collection
PaginationHelper.prototype.itemCount = function() {
  return this.collection.length;
}

// returns the number of pages
PaginationHelper.prototype.pageCount = function() {
  return Math.ceil(this.collection.length / this.items);
}

// returns the number of items on the current page. page_index is zero based.
// this method should return -1 for pageIndex values that are out of range
PaginationHelper.prototype.pageItemCount = function(pageIndex) {
  let numberOfIndex = this.items * pegeIndex; 
  
  if(numberOfIndex > this.itemCount() || pageIndex < 0) {
    return -1;
  }else{
    if(pageIndex === this.pageCount){
      return (this.Count() - (this.items * (this.itemCount() - 1)))
    }else{
      return this.items
    }
  }
}

// determines what page an item is on. Zero based indexes
// this method should return -1 for itemIndex values that are out of range
PaginationHelper.prototype.pageIndex = function(itemIndex) {
  if(itemIndex > this.itemCount() - 1 || itemIndex < 0) return -1
  
  return Math.ceil(itemIndex / this.items) - 1
}

// Complete the solution so that it strips all text that follows any of a set of comment markers passed in. Any whitespace at the end of the line should also be stripped out.
// Example:

// Given an input string of:
// apples, pears # and bananas
// grapes
// bananas !apples

// The output expected would be:
// apples, pears
// grapes
// bananas

function solution(input, markers) {
  markers.push(" ")
  let array = JSON.stringify(markers).replace(/(["',])/g,"");
  let regEx = new RegExp(array);
  array = input.split(regEx);
  return array.filter(x => x).join("");
};

//OR 
return input.split('\n').map(line => markers.reduce((line, marker) => line.split(marker)[0].trim(), line)).join('\n')

// The maximum sum subarray problem consists in finding the maximum sum of a contiguous subsequence in an array or list of integers:
// maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4])
// should be 6: [4, -1, 2, 1]
// Easy case is when the list is made up of only positive numbers and the maximum sum is the sum of the whole array. If the list is made up of only negative numbers, return 0 instead.

var maxSequence = function(arr){
  var max = 0;
  var cur = 0;
  arr.forEach(function(i){
    cur = Math.max(0, cur + i);
    max = Math.max(max, cur);
  });
  return max;
}

// Write an algorithm that will identify valid IPv4 addresses in dot-decimal format. IPs should be considered valid if they consist of four octets, with values between 0 and 255, inclusive.
// Valid inputs examples:
// Examples of valid inputs:
// 1.2.3.4
// 123.45.67.89

function isValidIP(str) {
  let arr = str.replace(/[\n e+-]/g, "a").split(".").map(x => {
    return x !== '' && x[0] == "0" && x.length > 1 ? NaN : Number(x)
  });
  return arr.length === 4 && arr.every(x => !isNaN(x) && x >= 0 && x <= 255);
}

// Given an n x n array, return the array elements arranged from outermost elements to the middle element, traveling clockwise.

// array = [[1,2,3],
//          [4,5,6],
//          [7,8,9]]
// snail(array) #=> [1,2,3,6,9,8,7,4,5]

snail = function(array) {
  const arr = [];
  while (array.length) { //Mientras haya algo en el array 
    arr.push(
      ...array.shift(),
      ...array.map(a => a.pop()),
      ...(array.pop() || []).reverse(),
      ...array.map(a => a.shift()).reverse()
    );
  }
  return arr;
}

// For a given list [x1, x2, x3, ..., xn] compute the last (decimal) digit of x1 ^ (x2 ^ (x3 ^ (... ^ xn))).
// E. g.,
// lastDigit([3, 4, 2]) === 1
// because 3 ^ (4 ^ 2) = 3 ^ 16 = 43046721.
// Beware: powers grow incredibly fast. For example, 9 ^ (9 ^ 9) has more than 369 millions of digits. lastDigit has to deal with such numbers efficiently.
// Corner cases: we assume that 0 ^ 0 = 1 and that lastDigit of an empty list equals to 1.

function lastDigit(as){
  if( as.length === 0 ){
    return 1;
  }
  if( as.length === 1 ){
    return as.shift();
  }  
  let last = as.pop();
  return Math.pow( lastDigit(as) , last )
  
  let first = as.shift();
  let exp = as.reduce( (acc, sig) => acc*sig, 1);
  
  return Math.pow(first, exp);
}

// Description
// Middle Earth is about to go to war. The forces of good will have many battles with the forces of evil. Different races will certainly be involved. Each race has a certain worth when battling against others. On the side of good we have the following races, with their associated worth:

// Hobbits: 1
// Men: 2
// Elves: 3
// Dwarves: 3
// Eagles: 4
// Wizards: 10
// On the side of evil we have:

// Orcs: 1
// Men: 2
// Wargs: 2
// Goblins: 2
// Uruk Hai: 3
/// Trolls: 5
// Wizards: 10

// Although weather, location, supplies and valor play a part in any battle, if you add up the worth of the side of good and compare it with the worth of the side of evil, the side with the larger worth will tend to win.
// Thus, given the count of each of the races on the side of good, followed by the count of each of the races on the side of evil, determine which side wins.
// Input:
// The function will be given two parameters. Each parameter will be a string of multiple integers separated by a single space. Each string will contain the count of each race on the side of good and evil.
// The first parameter will contain the count of each race on the side of good in the following order:
// Hobbits, Men, Elves, Dwarves, Eagles, Wizards.
// The second parameter will contain the count of each race on the side of evil in the following order:
// Orcs, Men, Wargs, Goblins, Uruk Hai, Trolls, Wizards.
// All values are non-negative integers. The resulting sum of the worth for each side will not exceed the limit of a 32-bit integer.
// Output:
// Return "Battle Result: Good triumphs over Evil" if good wins, "Battle Result: Evil eradicates all trace of Good" if evil wins, or "Battle Result: No victor on this battle field" if it ends in a tie.

function goodVsEvil(good, evil){
  const ValuesEvil = [1,2,2,2,3,5,10];
  const ValuesGood = [1,2,3,3,4,10];
  
  const countEvil = evil.split(" ").reduce( (acc, sig, index) =>  acc+(Number(sig)*ValuesEvil[index]) , 0);
  const countGood = good.split(" ").reduce( (acc, sig, index) =>  acc+(Number(sig)*ValuesGood[index]) , 0);
  
  if(countEvil === countGood){
    return 'Battle Result: No victor on this battle field'
  }else if(countEvil > countGood){
    return 'Battle Result: Evil eradicates all trace of Good'
  }else{
    return 'Battle Result: Good triumphs over Evil'
  }
}

// Write a function that takes a positive integer and returns the next smaller positive integer containing the same digits.
// For example:

// nextSmaller(21) == 12
// nextSmaller(531) == 513
// nextSmaller(2071) == 2017
// Return -1 (for Haskell: return Nothing, for Rust: return None), when there is no smaller number that contains the same digits. Also return -1 when the next smaller number with the same digits would require the leading digit to be zero.

// nextSmaller(9) == -1
// nextSmaller(111) == -1
// nextSmaller(135) == -1
// nextSmaller(1027) == -1 // 0721 is out since we don't write numbers with leading zeros
// some tests will include very large numbers.
// test data only employs positive integers.

const anagrams = str => {
  if (str.length <= 2)
  {
      return str.length === 2 ? [str, str[1] + str[0]] : [str];
  }
  else
  {
      return str.split('').reduce((acc, letter, i) =>
      acc.concat(anagrams(str.slice(0, i) + str.slice(i + 1)).map(val => letter + val)), []);
  }
};

function nextSmaller(n) {
  let anagram = anagrams(n.toString());
  anagram = anagram.filter(x => Number(x) < Number(n));
  anagram = anagram.map(x => {
    if(x[0] == "0"){
      return -1
    }else{
      return Number(x)
    }
  }).sort((a,b) => b - a);
  return anagram.shift() || -1;
}

// OR

const nextSmaller = n => {
  let num = Array.from(String(n), Number);
  //Prev lexicographical permutation algorithm
  let pivot = num.reduce((max,_,i) => num[i - 1] > num[i] ? i : max, 0);
  let swap  = num.reduce((max,_,i) => num[i] < num[pivot - 1] ? i : max, 0);
  [num[swap], num[pivot - 1]] = [num[pivot - 1], num[swap]];
  return pivot && num[0] ? Number(num.concat(num.splice(pivot).reverse()).join('')) : -1;
};

// A Hamming number is a positive integer of the form 2i3j5k, for some non-negative integers i, j, and k.
// Write a function that computes the nth smallest Hamming number.
// Specifically:
// The first smallest Hamming number is 1 = 203050
// The second smallest Hamming number is 2 = 213050
// The third smallest Hamming number is 3 = 203150
// The fourth smallest Hamming number is 4 = 223050
// The fifth smallest Hamming number is 5 = 203051
// The 20 smallest Hamming numbers are given in example test fixture.

function hamming (n) {
  let obj = {
    2: 0,
    3: 0,
    5: 0,
  }
  
  let arr = descomposicion(n);
  
  console.log(descomposicion(4))
  
  for(let varibale of arr){
      if( obj[ varibale ] !== undefined ){
        obj[ varibale ] = obj[ varibale ] + 1
      }
  }
  return Math.pow(2, obj[ 2 ]) * Math.pow(3, obj[ 3 ]) * Math.pow(5, obj[ 5 ])
}

function descomposicion(n) {
  let arr = [];
  let i = 2;
  
  if(n === 1){
    return [1]
  }
  
  while(i <= n){
    if( esPrimo(i) && n % i === 0 ){
      arr.push(i)
      n = n / i;
      i = 2;
    }
    i++;
  }
  return arr;
}

// Create a RomanNumerals class that can convert a roman numeral to and from an integer value. It should follow the API demonstrated in the examples below. Multiple roman numeral values will be tested for each helper method.
// Modern Roman numerals are written by expressing each digit separately starting with the left most digit and skipping any digit with a value of zero. In Roman numerals 1990 is rendered: 1000=M, 900=CM, 90=XC; resulting in MCMXC. 2008 is written as 2000=MM, 8=VIII; or MMVIII. 1666 uses each Roman symbol in descending order: MDCLXVI.
// Input range : 1 <= n < 4000
// In this kata 4 should be represented as IV, NOT as IIII (the "watchmaker's four").
// Examples
// RomanNumerals.toRoman(1000); // should return 'M'
// RomanNumerals.fromRoman('M'); // should return 1000

const solution = (num) => {
  const roman = {
    M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90,
    L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1,
  };
  
  let str = "";
  for (var i of Object.keys(roman)) {
    var q = Math.floor(num / roman[i]);
    num -= q * roman[i];
    str += i.repeat(q);
  }
  return str;
};

// What is an anagram? Well, two words are anagrams of each other if they both contain the same letters. For example:
// 'abba' & 'baab' == true
// 'abba' & 'bbaa' == true
// 'abba' & 'abbba' == false
// 'abba' & 'abca' == false
// Write a function that will find all the anagrams of a word from a list. You will be given two inputs a word and an array with words. You should return an array of all the anagrams or an empty array if there are none. For example:
// anagrams('abba', ['aabb', 'abcd', 'bbaa', 'dada']) => ['aabb', 'bbaa']

function objetivizar(palabra){
  let objetoInicial = {}
  for(let i = 0 ; i < palabra.length ; i++){
    objetoInicial[palabra[i]] = objetoInicial[palabra[i]] ? objetoInicial[palabra[i]] + 1 : 1
  }
  return objetoInicial;
}

function anagrams(word, words) {
  word = objetivizar(word);
  let boleano = false;
  let arr = [];
  for(let palabra of words){
    let obj = objetivizar(palabra);
    
    Object.keys(obj).forEach(x => {
      if(obj[x] !== word[x]){
        boleano = true;
      } 
    })
    
    if(!boleano){
      arr.push( Object.Keys(obj).join("") )
    }
    
  }
  return arr;
}

// OR

function anagrams(word, words) {
  word = word.split('').sort().join('');
  return words.filter(function(v) {return word == v.split('').sort().join('');});
}

// Write a function that counts how many different ways you can make change for an amount of money, given an array of coin denominations. For example, there are 3 ways to give change for 4 if you have coins with denomination 1 and 2:
// 1+1+1+1, 1+1+2, 2+2.
// The order of coins does not matter:
// 1+1+2 == 2+1+1
// Also, assume that you have an infinite amount of coins.

var countChange = function(money, coins) {
  if(money < 0 || coins.length === 0)
    return 0
  else if(money === 0)
    return 1
  else
    return countChange(money - coins[0], coins) + countChange(money, coins.slice(1))
}

// Write a function validSolution/ValidateSolution/valid_solution() that accepts a 2D array representing a Sudoku board, and returns true if it is a valid solution, or false otherwise. The cells of the sudoku board may also contain 0's, which will represent empty cells. Boards containing one or more zeroes are considered to be invalid solutions.
// The board is always 9 cells by 9 cells, and every cell only contains integers from 0 to 9.

function validSolution(board){
  return board.filter(x => x.includes(0)).length === 0 ? true : false
}

// In this kata you will create a function that takes a list of non-negative integers and strings and returns a new list with the strings filtered out.
// Example
// filter_list([1,2,'a','b']) == [1,2]
// filter_list([1,'a','b',0,15]) == [1,0,15]
// filter_list([1,2,'aasf','1','123',123]) == [1,2,123]

function filter_list(l) {
  return l.filter(x => !isNaN(x) && typeof x != 'string' )
}

function filter_list_v1(l) {
  return l.filter(x => typeof x != 'number' )
}

function filter_list_v2(l) {
  var arrayToReturn = [];
  l.map(x => {
    if(!isNaN(x) && typeof x != 'string'){
      arrayToReturn.push(x);
    }
  });
  return arrayToReturn;
}

//var builder = new UriBuilder('http://www.codewars.com')
//builder.params.page = 1
//builder.params.language = 'javascript'

// new builder instance to demonstrate pre-existing params.
//builder = new UriBuilder('http://www.codewars.com?page=1')

//builder.params.page = 2
// should return 'http://www.codewars.com?page=2'
// builder.build()

// if you delete params then they will disappear from the url string
// delete builder.params.page

// should return 'http://www.codewars.com'
// builder.build()

function UriBuilder(fullUrl){
  const [url, allParams] = fullUrl.split('?');
  this.url = url;
  
  this.params = allParams.split('&').reduce((acc, curr) => {
    const [clave, valor] = curr.split('=');
    
    return {
      ...acc,
      [clave]: valor
    }
  }, {});
  
  this.build = function(){
    return this.url + '?' + Object.keys(this.params).map(x => `${x}=${this.params[x]}`).join('&');
  }
}

// TODO
// Multiply two numbers! Simple!

// Rules
// The arguments are passed as strings.
// The numbers will be very large
// The arguments can be negative, in decimals, and might have leading and trailing zeros. e.g. "-01.300"
// Answer should be returned as string
// The returned answer should not have leading or trailing zeroes (when applicable) e.g. "0123" and "1.100" are wrong, they should be "123" and "1.1"
// Zero should not be signed and "-0.0" should be simply returned as "0".

function multiply(n, o){
  if(o[0] === "0") return "0";
  
  //let countToFixed = o[o.length - 1] === "0" ? n.length : o.length;
  
  let multi = o;
  let multiplicacion = eval(`${n}*${multi}`)
  let oArr = o.split("").reverse();
  
  let toFix = 0;
  while(oArr[0] && oArr[0] === "0"){
    toFix++;
    oArr.shift();
  }
  
  if(toFix >= n.length){
    toFix = n.length - n.indexOf(".");
  }
  
  let result = toFix > 0 ? multiplicacion.toFixed(toFix - 1).toString() : multiplicacion.toString()
  
  if(result.includes("+") || result.includes("n")){
    result = result.split(".");
    const positionDot = parseInt(result[1].split("+")[1]);
    const bigNumber = BigInt(parseFloat(result[1]));
    
    console.log(positionDot, bigNumber, result)
    
    //return `${result[0]}${bigNumber.toString().substring(0,positionDot-1)}.${bigNumber.substring(positionDot-1, bigNumber.toString().length - 1)}`
    //TO DO
  }else{
    return result;
  }
}

// Consider an array/list of sheep where some sheep may be missing from their place. 
// We need a function that counts the number of sheep present in the array (true means present).

function countSheeps(arrayOfSheep) {
  return arrayOfSheep.filter(x => x).length;
  
  /*---------------------------------------*/
  
  let cantidad = 0;
  for(let oveja of arrayOfSheep){
    if (oveja === true){
      cantidad = cantidad + 1;
    }
  }
  return cantidad;
  
   /*---------------------------------------*/
  
  return arrayOfSheep.reduce((acc, res) => acc + res, 0)
  
   /*---------------------------------------*/
  
  const newArrayInOrder1 = arrayOfSheep.sort((a,b) => b-a);
  return newArrayInOrder.indexOf(false)
  
   /*---------------------------------------*/
  
  const newArrayInOrder = arrayOfSheep.sort((a,b) => b-a);
  const index = newArrayInOrder.indexOf(false);
  return newArrayInOrder.slice(0, index).length
}


function formatDuration (seconds) {
  const medidas = ["second","minute","hour"];
  let arr = [];
  while(seconds > 1){
    let aux = seconds % 60;
    
    if(aux === 0){
      arr.push(seconds / 60);
    }else{
      
    }
    
    arr.push(seconds);
  }
  
  console.log(arr)
  
  return arr.length > 0 ? arr.join("") : (seconds > 1 ? `${seconds} seconds` : `${seconds} second`)
}


// You are given a string s. Every letter in s appears once.
// Consider all strings formed by rearranging the letters in s. After ordering these strings in dictionary order, return the middle term. (If the sequence has a even length n, define its middle term to be the (n/2)th term.)
// Example For s = "abc", the result should be "bac".
// The permutations in order are: "abc", "acb", "bac", "bca", "cab", "cba" So, The middle term is "bac".

function middlePermutation(s) {
  let arr = s.split("");
  arr = permutations(arr.sort()).map(x => x.join("")).sort();
  let count = 0;
  if(arr.length % 2 === 0){
    count = Math.ceil((arr.length)/2) - 1
  }else{
    count = Math.ceil((arr.length)/2)
  }
  console.log(arr, count)
  return arr[count]
}

function permutations(arr) {
    var finalArr = [];
    function iterator(arrayTaken, tree) {
        var temp;
        for (var i = 0; i < tree; i++) {
            temp = arrayTaken.slice();
            temp.splice(tree - 1 - i, 0, temp.splice(tree - 1, 1)[0]);
            if (tree >= arr.length) {
                finalArr.push(temp);
            } else {
                iterator(temp, tree + 1);
            }
        }
    }
    iterator(arr, 1);
    return finalArr;
};

// A rectangle with sides equal to even integers a and b is drawn on the Cartesian plane. Its center (the intersection point of its diagonals) coincides with the point (0, 0), but the sides of the rectangle are not parallel to the axes; instead, they are forming 45 degree angles with the axes.
// How many points with integer coordinates are located inside the given rectangle (including on its sides)?
// Example
// For a = 6 and b = 4, the output should be 23

function rectangleRotation(a, b) {
  let cantidadRaizDosAncho = 0;
  let sumCantidadRaizDosAncho = 0;
  
  while(sumCantidadRaizDosAncho < b){
    sumCantidadRaizDosAncho += Math.sqrt(2);
    cantidadRaizDosAncho ++;
  }
  
  let cantidadRaizDosAlto = 0;
  let sumCantidadRaizDosAlto = 0;
  
  while(sumCantidadRaizDosAlto < a){
    sumCantidadRaizDosAlto += Math.sqrt(2);
    cantidadRaizDosAlto ++;
  }
  let rest = (cantidadRaizDosAlto - cantidadRaizDosAncho) < 2 ? 1 : 0;
  
  if((b/2) > ((cantidadRaizDosAncho/2)*Math.sqrt(2))){
    rest = rest - 1
  }
  
  return ((cantidadRaizDosAlto) * (cantidadRaizDosAncho)) + ((cantidadRaizDosAlto > 0 && cantidadRaizDosAncho > 0) ? ((cantidadRaizDosAlto - 1) * (cantidadRaizDosAncho - 1)) : 0) - rest 
}
// A rectangle with sides equal to even integers a and b is drawn on the Cartesian plane. Its center (the intersection point of its diagonals) coincides with the point (0, 0), but the sides of the rectangle are not parallel to the axes; instead, they are forming 45 degree angles with the axes.

function rectangleRotation(a, b) {
  let raiz2sobre2A = 2 * Math.floor(a/(Math.sqrt(2))) + 1; //hay que revisar esto
  let raiz2sobre2B = 2 * Math.floor(b/(Math.sqrt(2))) + 1; //hay que revisar esto
  let cantidad = Math.ceil(((a)/(Math.sqrt(2)))) //La linea mas grande
  let imparesMasUno = 2 * Math.floor(((b/2)/(Math.sqrt(2)))) + 1
  
  let resta = 0;
  let restaAux = 0;
  
  console.log(raiz2sobre2A, raiz2sobre2B, cantidad)
  
  if(raiz2sobre2B % 2 !== 0){
    let aBorrar = raiz2sobre2B - imparesMasUno;
    resta += (cantidad) * aBorrar + (imparesMasUno * (cantidad - 1)); 
    restaAux += (cantidad - 1) * aBorrar + (imparesMasUno * (cantidad)); 
    
    console.log("entee", raiz2sobre2A * raiz2sobre2B, resta, restaAux, "\n")
  }
  
  //Revisar la condicion para que este en el medio el chico
  const lineaGrandeEnMedio = ((a/2) % (Math.sqrt(2))) <= (Math.sqrt(2)/2);
  //console.log((a % Math.sqrt(2)), 2 * Math.floor((a/2)/Math.sqrt(2)) + 1, cantidad, lineaGrandeEnMedio)
  console.log(lineaGrandeEnMedio)
  //Estoy haciendo inclusion exclusion, tengo que deducir cuando el del medio es mas chico que los pares a su alrededor
  //No se
  
  //return raiz2sobre2A * raiz2sobre2B - (lineaGrandeEnMedio ? Math.min(resta, restaAux) : Math.max(resta, restaAux))
  
  return raiz2sobre2A * raiz2sobre2B - (restaAux % 2 === 0 ? restaAux : resta)
  
  //Intento fallido
  
  let suma = 0;
  let booleano = ((((a/2) % Math.sqrt(2))/2) > (Math.sqrt(2)/2)) // Resto
  
  
  for(let i = 1; i <= imparesMasUno; i++){
    //Quiere decir que 
    if(imparesMasUno % 2 !== 0){
      if(i % 2 !== 0){
        suma += cantidad
      }else{
        suma += cantidad - 1
      }
    }else{
      if(i % 2 === 0){
        suma += cantidad - 1
      }else{
        suma += cantidad
      }
    }
  }
  console.log(imparesMasUno, a,b, suma, cantidad)
  
  return imparesMasUno % 2 === 0 ? cantidad + 2 * suma : cantidad + 2 * suma - 1; 
}

// Professor Chambouliard hast just discovered a new type of magnet material. He put particles of this material in a box made of small boxes arranged in K rows and N columns as a kind of 2D matrix K x N where K and N are postive integers. He thinks that his calculations show that the force exerted by the particle in the small box (k, n) is:
// v(k,n)=1k(n+1)2k \displaystyle v(k,n) = \dfrac{1}{k(n+1)^{2k}}v(k,n)= k(n+1) 2k 1 ​
// The total force exerted by the first row with k = 1 is:
//u(1,N)=∑n=1n=Nv(1,n)=11⋅22+1⋅32+⋯+11⋅(N+1)2 \displaystyle u(1, N) = \sum_{n=1}^{n=N}v(1, n) = \dfrac{1}{1 \cdot 2^2}+\dfrac{1}{1\cdot 3^2} + \dots + \frac{1}{1 \cdot (N+1)^2}u(1,N)=  n=1∑n=N​v(1,n)= 1⋅2 21​ + ⋅3 1​ +⋯+ 1⋅(N+1) 2 1​
 
// We can go on with k = 2 and then k = 3 etc ... and consider:
// S(K,N)=∑k=1k=Ku(k,N)=∑k=1k=K(∑n=1n=Nv(k,n))→(double(maxk,maxn))\
// displaystyle S(K, N) = \sum_{k=1}^{k=K} u(k, N) = \sum_{k=1}^{k=K} \bigg(\sum_{n=1}^{n=N} v(k, n) \bigg) \to(double(max_k, max_n))S(K,N)= 
// k=1 ∑ k=K ​ u(k,N)=  k=1 ∑ k=K ​ ( n=1 ∑ n=N ​ v(k,n))→(double(max k ​,max n ​))

function doubles(maxk, maxn) {
    let result = 0;
    for(let i = 1; i <= maxk ; i++){
      let sum = 0;
      for(let j = 1; j <= maxn; j++){
        sum += (1 / ( i * Math.pow((j + 1), 2 * i) ) )
      }
      result += sum;
    }
    return result;
}

// No time for stories. Reverse an array, return the result. Do whatever you want with the original array. Don't use Array.prototype.reverse.
// You have 30 bytes to spare.
// Example: [1, 2, 3] → [3, 2, 1]

const reverse = a => [...a].map(a.pop ,a)


