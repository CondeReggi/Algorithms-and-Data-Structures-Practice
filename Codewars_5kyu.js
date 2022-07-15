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


