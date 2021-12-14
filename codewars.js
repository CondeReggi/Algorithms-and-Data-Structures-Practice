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








