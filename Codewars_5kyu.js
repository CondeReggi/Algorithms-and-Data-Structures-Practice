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

