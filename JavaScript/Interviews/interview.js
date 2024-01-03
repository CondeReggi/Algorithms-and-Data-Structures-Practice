
const isPalindrome = (word = '') => {
    let reverse = word.split('').reverse().join('')
    return reverse.toLocaleLowerCase() === word.toLocaleLowerCase()
}

const nFibonacci = (n) => {
    let arrFibonacci = [0, 1]
    for (let i = 2; i <= n; i++) {
        arrFibonacci[i] = arrFibonacci[i - 1] + arrFibonacci[i - 2]
    }
    return arrFibonacci[n]
}

// OR

function fibonacci(n) {
    return (n < 2) ? n : fibonacci(n - 1) + fibonacci(n - 2);
}

const FizzBuzz = (i) => {
    for (let n = 1; n <= i; n++) {
        if (n % 3 === 0 && n % 5 === 0) {
            console.log('FizzBuzz')
        } else if (n % 5 === 0) {
            console.log('Buzz')
        } else if (n % 3 === 0) {
            console.log('Fizz')
        } else {
            console.log(n)
        }
    }
}

const areAnagram = (word1 = '', word2 = '') => {

    if (word1 === word2) {
        return true;
    }

    if (word1.length !== word2.length) {
        return false;
    }

    let primerpalabra = word1.toLowerCase().split('');
    let segundapalabra = word2.toLowerCase().split('');

    let i = 0;

    while (i < word1.length && segundapalabra.includes(primerpalabra[i])) {
        console.log('hola')
        i++;
    }

    return i === word1.length;
}

// OR

const buildCharObject = str => {
    const charObj = {}
    for (let char of str.replace(/[^\w]/g).toLowerCase()) {
        charObj[char] = charObj[char] + 1 || 1
    }
    return charObj
}

const anagram = (strA, strB) => {
    const aCharObject = buildCharObject(strA)
    const bCharObject = buildCharObject(strB)
    if (Object.keys(aCharObject).length !== Object.keys(bCharObject).length) {
        return false
    }
    for (let char in aCharObject) {
        if (aCharObject[char] !== bCharObject[char]) {
            return false
        }
    }
    return true
}

const countVowels = ( word ) => {
    const vowels = ['a','e','i','o','u'];
    const obj = {}

    for (let char of word.toLowerCase()) {
        obj[char] = obj[char] + 1 || 1
    }

    // let suma = 0;
    // vowels.forEach( vocal => obj[vocal] ? suma += obj[vocal] : suma = suma )
    // return suma

    return vowels.reduce( (acc , res) => obj[res] ? acc += obj[res] : acc , 0)
}

// OR 

const findVowel = (str) => {
    let count = 0;
    let vowel = ['a', 'e', 'i', 'o', 'u'];
    for (let char of str.toLowerCase()) {
       if (vowel.includes(char)) {
            count++;
        }
      }
    return count;
}   

const stringReverse = ( str ) => str.toLowerCase().split('').reverse().join('')

const toCapitalize = ( str ) => {
    let string = str.toLowerCase().split(' ');

    string = string.map( word => word[0].toUpperCase() + word.substring(1) )
    return string.join(' ')
}

const repliceCharacter = ( replice = '' , toreplice = '' , str = '' ) => {
    let string = str.split('');
    return string.map( letter => letter === toreplice ? replice : letter ).join('')
}

const noDuplicates = ( arr = [] ) => {
    let obj = {}
    let array = []

    for (let element of arr) {
        obj[element] = obj[element] + 1 || 1
    }

    for ( let el in obj ){
        array.push( el )
    }

    return array
}

// OR

function removeDuplicate(arr) {
    let result = [...new Set(arr)];
    return result;
}


// function suma (a,b) { // Anashei
//     return a+b
// }

const sumPairs = ( arr = [] ) => {
    return arr.reduce( (acc , rec) => rec % 2 === 0 ? acc += rec : acc , 0 )
}

const whoseSumisEqual = ( arr , num ) => {
    let result = [];

    for (let i = 0; i < arr.length ; i++) {
        for (let j = i; j < arr.length; j++) {
            if ( arr[i] + arr[j] === num ) {
                result.push( [arr[j] , arr[i] ])
            }   
        }
    }
    return result
}

// Ejercicios sacados de 
// https://medium.com/@sojibrahmatuzzaman/10-common-javascript-interview-challenges-f2547db5370b

