/*-Memoized Fibonacci-*/

var fibonacci = function(n, valores = []) {
    if (n < 2) return n;
  
    if(valores[n])
      return valores[n]
  
    valores[n] = fibonacci(n-1, valores) + fibonacci(n-2, valores);
    return valores[n];
}

/*-Going to zero or to infinity?-*/

function going(n) { // Best practice
    var res = 1.0;
    var inter = 1.0;
    for (var i = n; i >=2; i--) {
        inter = inter * (1 / i);
        res += inter;
    }
    return Math.floor(res * Math.pow(10, 6)) / Math.pow(10, 6);
}

function going(n) {
  let result = 1;
  let suma = 0;
  for(let i = n ; i > 0 ; i--){
    let factorialValue = factorial(i);
    if(i === n){
      result /= factorialValue;
    }
    suma += factorialValue;
  }
  
  let cantidadDespuesDeLaComa = Math.min(n - 1, 6);
  let stringNumero = (result*suma).toString().split('.');
  
  if(stringNumero[1]){
    stringNumero[1] = stringNumero[1].substring(0, cantidadDespuesDeLaComa);
  }
  return parseFloat(stringNumero.join('.'));
}

function factorial(n, values = []){
  if(n === 1) return values[1] = 1;
  if(values[n]) return values[n];
  
  let valorToReturn = values[n] = n * factorial(n-1, values);
  return valorToReturn;
}

/*-Closest and Smallest-*/
// TO DO

function  closest(strng) {
  console.log(strng)
  if(strng === ""){
    return [];
  }
  const arrayAux = strng.split(" ")
  
  const array = arrayAux.map((x, index) => {    
    return {
      number_weight : Array.from(x).reduce((acc, res) => Number(acc) + Number(res) ,0),
      index_strng : index,
      original_corresponding : Number(x)
    }
  });
  
  array.forEach((x, index) => {
    if(array[index + 1]){
      x['diff_next'] = Math.abs(array[index + 1].number_weight - x.number_weight);
    }else{
      if(array[index - 1]){
        x['diff_next'] = array[index - 1].diff_next;
      }else{
        x['diff_next'] = 0;
      }
    }
  })
  array.sort((a,b) => (a.diff_next + a.number_weight) - (b.number_weight + b.diff_next));
}

/*-Buddy Pairs-*/

function arrayDivisior(n){
  let result = [];
  let num = 2;
  while(n > 1){
    if(n % num === 0){
      n = n / num;
      if(!result[n]){
        result.push(n)
      }
    }else{
      num++;
    }
  }
  return result.reduce((acc, res) => acc + res, 1);
}

/*-Pascal's Diagonals-*/

function generateDiagonal(n, l){
  if (l === 0) {
    return []
  }
  let result = [1]
  for(let i = 1; i < l; i++) {
      result[i] =  ( result[i-1] *  (n + i) /  i);
  }
  
  return result;
}

/*-John and Ann sign up for Codewars-*/

function createJohnAnna(n) {
  let john = [0];
  let ann = [1];

  for (let i = 1; i < n; i++) {
    john.push(i - ann[john[i - 1]]);
    ann.push(i - john[ann[i - 1]]);
  }

  return {
    john,
    ann
  }
}        

function john(n) {
  const { john } = createJohnAnna(n);
  return john;
}

function ann(n) {
  const { ann } = createJohnAnna(n);
  return ann;
}

function sumJohn(n) {
  const { john } = createJohnAnna(n);
  return john.reduce((acc, res) => acc + res, 0);
}

function sumAnn(n) {
  const { ann } = createJohnAnna(n);
  return ann.reduce((acc, res) => acc + res, 0);
}

/*-Human Readable Time-*/

function humanReadable (seconds) {
  let hours = Math.trunc(seconds / (60*60));
  let minutes = Math.trunc( (seconds - (hours*60*60)) / 60 );
  let segundos = seconds - minutes*60 - (hours*60*60);
  
  if(hours.toString().length === 1){
    hours = `0${hours}`
  }
  
  if(minutes.toString().length === 1){
    minutes = `0${minutes}`
  }
  
  if(segundos.toString().length === 1){
    segundos = `0${segundos}`
  }
  
  return `${hours}:${minutes}:${segundos}`
}

/*-Number of trailing zeros of N!-*/

function zeros (n) {
  if (n === 0) return 0;
  
  let count = 0;
 
  for (let i = 5; Math.floor(n / i) >= 1; i *= 5)
      count += Math.floor(n / i);
 
  return count;
  
  //Esta idea no funciono, era mas rebuscada :(
  
  const valor = factorial(n).toString()
  
  const array = Array.from(valor);
  let index = 0;
  let results = [];
  
  while(index < array.length){
    if(array[index] === '0'){
      let valueToPush = 0;
      while(index < array.length && array[index] === '0'){
        index++
        valueToPush++;
      }
      results.push(valueToPush)
    }else{
      index++;
    }
  }
  
  
  console.log(valor, array, results)
  return Math.max(...results);
}

function factorial(n){
  return n === 1 ? 1 : n * factorial(n - 1)
}

/*-Evaluate a postfix expression-*/

function postfixEvaluator(string) {
  const array = string.split(" ");
  const numbers = array.filter(x => !isNaN(x)).map(Number).sort((a,b) => a - b);
  const expresions = array.filter(x => isNaN(x)).sort();
  
  while(numbers.length > 1){
    let first = numbers.pop();
    let second = numbers.pop();
    let expresion = expresions.pop();
    let result = calculate(first, second, expresion);
    numbers.push(result);
  }
  
  return numbers.pop();
}

function calculate(num1, num2, expresion){
  let result;
  switch(expresion){
      case "+": result = num1 + num2;
        break;
      case "-": result = num1 - num2;
        break;
      case "*": result = num1 * num2;
        break;
      case "/": result = num1 / num2;
        break
      default:
        return;
  }
  return result;
}

/*-Mean Square Error-*/

var solution = function(firstArray, secondArray) {
  let sum = 0;
  for(let i = 0; i < firstArray.length; i++){
    sum += Math.pow(Math.abs(secondArray[i] - firstArray[i]), 2);
  }
  return sum / firstArray.length
}

/*-Numbers and its Reversal Having Same Prime Factors.-*/

function esPrimo(n){
  for(let i = n-1; i > 1 ; i--){
    if(n % i === 0){
      return false;
    }
  }
  return true;
}

function isPalindrome(str){
  return str.toString() === str.toString().split("").reverse().join("")
}

function descompositionFactorial(n){
  let value = 2
  let arr = []
  while(n > 1 && value < n){
    if(n % value === 0 && esPrimo(value)){
      n = n / value;
      if(arr.indexOf(value) === -1){
        arr.push(value);
      }
    }else{
      value++;
    }
  }
  return arr.sort((a,b) => a-b).join();
}


function sameFactRev(nMax) {
  let descomposicionNMax = descompositionFactorial(nMax);
  let number = nMax - 1;
  let result = [];
  while(number > 1){
    if(!isPalindrome(number) && descompositionFactorial(number) === descomposicionNMax){
      result.push(number);
    }
    number--;
  }
  return result;
}

/*-Lazy Repeater-*/

function makeLooper(str) {
  let memo = str.split("");
  return () => {
    const result = memo.shift();
    memo.push(result);
    return result;
  }
}

/*-Array.diff hero-*/

function arrayDiffVeryFast(a, b) {
  let array = []
  let object = {}
  
  for(let elem of b){
    object[elem] = object[elem] ? object[elem] + 1 : 1;
  }
  
  for(let element of a){
    if(!object[element]){
      array.push(element)
    }
  }
  return array
}

/*-Least Common Multiple-*/

var lcm = function () {
  let args = Array.from(arguments);
  
  if(args.length === 1) return args[0]
  
  //To-Do sacar multiplos
  
  args = args.map(x => {
    return encontrar(x, Array.from(args));
  });
  
  args = [... new Set(args)]
  
  console.log(args)
  return args.reduce((acc, res) => acc * res, 1)
};

function encontrar(x, arr){
  let encontre = false;
  let maximo = 9999999999999999;
  while(!encontre && arr.length > 0){
    let variable = arr.shift();
    if(variable !== x && variable % x === 0){
      encontre = true;
      maximo = Math.max(variable, x);
    }
  }
  
  if(maximo === 9999999999999999){
    return x;
  }else{
    return maximo;
  }
}

/*-Math Issues-*/

Math.round = function(number) {
  const result = number.toString().split(".");
  if(result.length < 2) return Number(result[0])
  
  if(Number(result[1][0]) >= 5)
    return Number(result[0]) + 1

  return Number(result[0]);
};

Math.ceil = function(number) {
  const result = number.toString().split(".");
  if(result.length < 2) return Number(result[0])
  return Number(result[0]) + 1
};

Math.floor = function(number) {
  const result = number.toString().split(".");
  if(result.length < 2) return Number(result[0])
  return Number(result[0])
};

/*--*/
