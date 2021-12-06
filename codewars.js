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

